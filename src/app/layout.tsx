import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'BIM Productivity',
  description: 'Civil 3D + Dynamo 기반 반복 설계업무 줄이기 가이드',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
