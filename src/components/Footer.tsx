'use client'

import type { Lang } from '@/types'

interface FooterProps {
  lang: Lang
}

export function Footer({ lang }: FooterProps) {
  const ko = lang === 'ko'
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="font-mono text-xl font-bold text-zinc-900 dark:text-white">
            <span className="text-orange-500 dark:text-orange-400">▸</span> BIM Productivity
          </div>

          <p className="max-w-md text-sm text-zinc-500">
            {ko
              ? 'Civil 3D + Dynamo를 중심으로 반복 설계업무를 줄이는 데 필요한 자료를 정리한 가이드입니다.'
              : 'A guide for reducing repetitive civil design work with Civil 3D + Dynamo.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400 dark:text-zinc-500">
            <a
              href="https://help.autodesk.com/view/CIV3D/2027/KOR/?guid=Civil3D_Dynamo_Samples_for_Dynamo_for_Autodesk_Civil_3D_html"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              {ko ? 'Autodesk 도움말' : 'Autodesk Docs'}
            </a>
            <a
              href="https://primer2.dynamobim.org/dynamo-for-civil-3d"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              Dynamo Primer
            </a>
            <a
              href="https://github.com/maestro4u/bim-productivity-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
            >
              GitHub
            </a>
          </div>

          <p className="text-xs text-zinc-300 dark:text-zinc-700">
            © {year} BIM Productivity · {ko ? '비공식 커뮤니티 가이드' : 'Unofficial community guide'}
          </p>
        </div>
      </div>
    </footer>
  )
}
