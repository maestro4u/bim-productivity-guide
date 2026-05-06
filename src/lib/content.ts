import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Lang, SectionMeta, SectionTocItem, SectionsConfig } from '@/types'

const contentDir = path.join(process.cwd(), 'content')

export function getSectionsConfig(): SectionsConfig {
  const configPath = path.join(contentDir, 'sections.json')
  const raw = fs.readFileSync(configPath, 'utf-8')
  return JSON.parse(raw) as SectionsConfig
}

export function getSectionMetas(): SectionMeta[] {
  const config = getSectionsConfig()
  return config.sections.sort((a, b) => a.order - b.order)
}

function slugifyHeading(text: string): string {
  return text
    .replace(/[`*_~[\]()]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9가-힣.-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function shouldBuildToc(section: SectionMeta): boolean {
  return section.tier === 'core' && section.order >= 1 && section.order <= 3
}

function buildHeadingId(section: SectionMeta, title: string, index: number): string {
  const slug = slugifyHeading(title)
  return `${section.id}-${slug || `item-${index + 1}`}`
}

function simplifyTocTitle(title: string): string {
  return title
    .replace(/`/g, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/을\/를/g, '')
    .replace(/을\s+/g, ' ')
    .replace(/를\s+/g, ' ')
    .replace(/한다$/g, '')
    .replace(/작성한다$/g, '작성')
    .replace(/생성한다$/g, '생성')
    .replace(/설정한다$/g, '설정')
    .replace(/검토한다$/g, '검토')
    .replace(/확인한다$/g, '확인')
    .replace(/추출한다$/g, '추출')
    .replace(/불러온다$/g, '불러오기')
    .replace(/들어간다$/g, '들어가기')
    .replace(/만든다$/g, '생성')
    .replace(/정리한다$/g, '정리')
    .replace(/이해한다$/g, '이해')
    .trim()
}

function extractTocItems(section: SectionMeta, markdown: string): SectionTocItem[] {
  if (!shouldBuildToc(section)) return []

  return markdown
    .split('\n')
    .map((line) => line.match(/^###\s+(.+?)\s*$/)?.[1])
    .filter((title): title is string => Boolean(title))
    .map((title, index) => ({
      id: buildHeadingId(section, title, index),
      title: simplifyTocTitle(title),
      order: index + 1,
    }))
}

function addHeadingAnchors(section: SectionMeta, markdown: string): string {
  if (!shouldBuildToc(section)) return markdown

  let headingIndex = 0
  let inFence = false

  return markdown
    .split('\n')
    .map((line) => {
      if (line.trim().startsWith('```')) {
        inFence = !inFence
        return line
      }

      if (inFence) return line

      const match = line.match(/^###\s+(.+?)\s*$/)
      if (!match) return line

      const title = match[1]
      const id = buildHeadingId(section, title, headingIndex)
      headingIndex += 1
      return `<h3 id="${id}">${title}</h3>`
    })
    .join('\n')
}

function readSectionMarkdown(section: SectionMeta, lang: Lang): string {
  const filePath = path.join(contentDir, lang === 'ko' ? section.file_ko : section.file_en)

  let raw = ''
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch {
    try {
      const fallbackPath = path.join(contentDir, section.file_ko)
      raw = fs.readFileSync(fallbackPath, 'utf-8')
    } catch {
      return `# ${lang === 'ko' ? section.title_ko : section.title_en}\n\n콘텐츠 준비 중입니다.`
    }
  }

  const { content } = matter(raw)
  return content
}

export function getSectionMarkdown(section: SectionMeta, lang: Lang): string {
  return addHeadingAnchors(section, readSectionMarkdown(section, lang))
}

export function getAllSectionMarkdowns(lang: Lang): Array<{ meta: SectionMeta; markdown: string }> {
  const metas = getSectionMetas()
  return metas.map((meta) => ({
    meta,
    markdown: getSectionMarkdown(meta, lang),
  }))
}

export function getSectionMetasWithToc(lang: Lang): SectionMeta[] {
  return getSectionMetas().map((meta) => ({
    ...meta,
    toc: extractTocItems(meta, readSectionMarkdown(meta, lang)),
  }))
}
