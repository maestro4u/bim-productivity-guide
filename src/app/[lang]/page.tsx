import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getSectionMetas, getAllSectionMarkdowns } from '@/lib/content'
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
      title: 'BIM Productivity — Civil 3D + Dynamo Guide',
      description:
        'A practical guide for reducing repetitive civil design work with Civil 3D, Dynamo, Revit, Navisworks, and BIM automation.',
    }
  }

  return {
    title: 'BIM Productivity — Civil 3D + Dynamo 가이드',
    description:
      'Civil 3D + Dynamo를 중심으로 반복 설계업무를 줄이기 위한 학습자료, 샘플 그래프, 실행계획 가이드',
  }
}

export default async function Page({ params }: PageProps) {
  const { lang: langParam } = await params

  if (!SUPPORTED_LANGS.includes(langParam as (typeof SUPPORTED_LANGS)[number])) {
    notFound()
  }

  const lang = langParam as Lang
  const sections = getSectionMetas()
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
