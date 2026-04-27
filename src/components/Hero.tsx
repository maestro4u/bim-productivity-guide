'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Lang } from '@/types'
import { trackCtaClick } from '@/lib/analytics'

interface HeroProps {
  lang: Lang
}

export function Hero({ lang }: HeroProps) {
  const ko = lang === 'ko'
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 })
  const [typedPrompt, setTypedPrompt] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const [phase, setPhase] = useState<'waiting' | 'typing' | 'done'>('waiting')

  const prompt = ko ? '> 어떤 과정을 먼저 볼까요?' : '> Which module should we start with?'

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 'waiting') {
      t = setTimeout(() => setPhase('typing'), 900)
    } else if (phase === 'typing') {
      let i = 0
      const tick = () => {
        i++
        setTypedPrompt(prompt.slice(0, i))
        if (i < prompt.length) t = setTimeout(tick, 55)
        else setPhase('done')
      }
      t = setTimeout(tick, 0)
    } else {
      t = setTimeout(() => {
        setTypedPrompt('')
        setPhase('waiting')
      }, 3500)
    }
    return () => clearTimeout(t)
  }, [phase, prompt])

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 520)
    return () => clearInterval(id)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative z-[2] overflow-hidden border-b border-zinc-200 bg-white pb-16 pt-32 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <style>{`
        @keyframes aurora-move {
          from { background-position: 50% 50%, 50% 50%; }
          to   { background-position: 350% 50%, 350% 50%; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: [
              'repeating-linear-gradient(100deg, #09090b 0%, #09090b 7%, transparent 10%, transparent 12%, #09090b 16%)',
              'repeating-linear-gradient(100deg, #f97316 10%, #fb923c 15%, #f59e0b 20%, #ea580c 25%, #f97316 30%)',
            ].join(', '),
            backgroundSize: '300%, 200%',
            animation: 'aurora-move 60s linear infinite',
            filter: 'blur(10px) opacity(0.22) saturate(180%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: [
              'repeating-linear-gradient(100deg, #09090b 0%, #09090b 7%, transparent 10%, transparent 12%, #09090b 16%)',
              'repeating-linear-gradient(100deg, #f97316 10%, #fb923c 15%, #f59e0b 20%, #ea580c 25%, #f97316 30%)',
            ].join(', '),
            backgroundSize: '200%, 100%',
            animation: 'aurora-move 60s linear infinite',
            filter: 'blur(8px) opacity(0.10) saturate(180%)',
            mixBlendMode: 'screen',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute z-0 hidden h-[400px] w-[400px] rounded-full bg-orange-500 blur-[100px] opacity-20 md:block"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 1s cubic-bezier(0.25,0.46,0.45,0.94), top 1s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-500 dark:text-orange-400">
          <span className="font-mono">▸</span>
          <span>{ko ? 'Civil 3D 6개월 과정' : 'Civil 3D 6-Month Course'}</span>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          {ko ? (
            <>
              <span className="text-orange-500 dark:text-orange-400">Civil 3D</span> 6개월 과정으로
              <br />
              핵심만 빠르게 익히기
            </>
          ) : (
            <>
              Learn the Civil 3D Course
              <br />
              in Six Months
            </>
          )}
        </h1>

        <p className="mb-10 text-lg text-zinc-500 sm:text-xl dark:text-zinc-400">
          {ko ? (
            <>
              좌표, 지형, 선형, 배수, 기준, 자동화를
              <br className="sm:hidden" />
              핵심만 정리한 실전형 요약
            </>
          ) : (
            'A concise summary of the six-month Civil 3D training path'
          )}
        </p>

        <div className="mx-auto mb-10 max-w-lg rounded-xl border border-zinc-200 bg-zinc-50 text-left shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-xs text-zinc-400 dark:text-zinc-600">Terminal</span>
          </div>
          <div className="p-4 font-mono text-sm">
            <div className="text-zinc-400 dark:text-zinc-500">$ start civil3d-course</div>
            <div className="mt-1 text-green-600 dark:text-green-400">✓ Civil 3D course outline ready</div>
            <div className="mt-2 text-zinc-400 dark:text-zinc-500">$ module 01</div>
            <div className="mt-1 min-h-[1.5rem] text-orange-500 dark:text-orange-400">
              {typedPrompt}
              <span
                className="ml-px inline-block h-[0.9em] w-[8px] translate-y-[1px] rounded-[1px] bg-orange-500 align-middle dark:bg-orange-400"
                style={{ opacity: cursorOn ? 0.85 : 0 }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="#00-before-you-start"
            onClick={() =>
              trackCtaClick({
                cta_id: 'start_course',
                destination: '#00-before-you-start',
                lang,
              })
            }
            className="min-w-[10rem] rounded-lg bg-orange-500 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-400"
          >
            {ko ? '과정 보기 →' : 'View Course →'}
          </Link>
          <a
            href="https://help.autodesk.com/view/CIV3D/2027/KOR/?guid=Civil3D_Dynamo_Samples_for_Dynamo_for_Autodesk_Civil_3D_html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackCtaClick({
                cta_id: 'official_docs',
                destination:
                  'https://help.autodesk.com/view/CIV3D/2027/KOR/?guid=Civil3D_Dynamo_Samples_for_Dynamo_for_Autodesk_Civil_3D_html',
                lang,
              })
            }
            className="min-w-[10rem] rounded-lg border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            {ko ? '공식 도움말' : 'Official Docs'}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 dark:text-orange-400">09</span>
            <span>{ko ? '섹션' : 'Sections'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 dark:text-orange-400">02</span>
            <span>{ko ? '고급확장 - Dynamo' : 'Advanced - Dynamo'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 dark:text-orange-400">KO</span>
            <span>/</span>
            <span className="text-orange-500 dark:text-orange-400">EN</span>
          </div>
        </div>
      </div>
    </section>
  )
}
