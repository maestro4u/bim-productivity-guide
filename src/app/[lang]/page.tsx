import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getSectionMetasWithToc, getAllSectionMarkdowns } from '@/lib/content'
import { PageClient } from '@/components/PageClient'
import { SectionBlock } from '@/components/SectionBlock'
import type { Lang } from '@/types'

const SUPPORTED_LANGS = ['ko', 'en'] as const

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params

  if (lang === 'en') {
    return {
      title: 'BIM Productivity — Civil 3D 6-Month Course',
      description:
        'A concise six-month Civil 3D course covering coordinates, terrain, alignment, corridors, drainage, standards, and Dynamo automation.',
    }
  }

  return {
    title: 'BIM Productivity — Civil 3D 6개월 과정',
    description: 'Civil 3D 6개월 과정의 핵심만 정리한 요약 가이드',
  }
}

export default async function Page({ params }: PageProps) {
  const { lang: langParam } = await params

  if (!SUPPORTED_LANGS.includes(langParam as (typeof SUPPORTED_LANGS)[number])) {
    notFound()
  }

  const lang = langParam as Lang
  const sections = getSectionMetasWithToc(lang)
  const sectionContents = getAllSectionMarkdowns(lang)

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PageClient lang={lang} sections={sections}>
        {sectionContents.map(({ meta, markdown }) => {
          const title = lang === 'ko' ? meta.title_ko : meta.title_en
          const description = lang === 'ko' ? meta.description_ko : meta.description_en
          const badge = lang === 'ko' ? meta.badge : (meta.badge_en ?? meta.badge)

          return (
            <SectionBlock
              key={meta.id}
              id={meta.id}
              order={meta.order}
              tier={meta.tier}
              title={title}
              description={description}
              badge={badge}
              lang={lang}
            >
              <MDXRemote
                source={markdown}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </SectionBlock>
          )
        })}
      </PageClient>
    </Suspense>
  )
}
