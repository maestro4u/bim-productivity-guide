'use client'

import Link from 'next/link'
import { LangToggle } from './LangToggle'
import { ThemeToggle } from './ThemeToggle'
import type { Lang } from '@/types'

interface NavProps {
  lang: Lang
  onToggle: () => void
  mobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

export function Nav({ lang, onToggle, mobileMenuOpen, onMobileMenuToggle }: NavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 lg:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-mono text-lg font-bold text-zinc-900 dark:text-white">
          <span className="text-orange-500 dark:text-orange-400">▸</span>
          <span>BIM Productivity</span>
          <span className="hidden text-xs font-normal text-zinc-400 sm:inline">
            {lang === 'ko' ? 'Civil 3D + Dynamo 가이드' : 'Civil 3D + Dynamo Guide'}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/maestro4u/bim-productivity-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 sm:flex dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            GitHub
          </a>
          <ThemeToggle />
          <LangToggle lang={lang} onToggle={onToggle} />
          <button
            onClick={onMobileMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 lg:hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
