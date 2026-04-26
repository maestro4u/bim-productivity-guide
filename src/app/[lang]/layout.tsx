import type { ReactNode } from 'react'
import { LangSetter } from './LangSetter'

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <>
      <LangSetter lang={lang} />
      {children}
    </>
  )
}
