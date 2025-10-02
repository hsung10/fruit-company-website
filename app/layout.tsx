import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Script
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=cc70aa4e6c4416c91a18643e3e1593f6"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log('✅ 카카오맵 스크립트 로드 완료')
            console.log('🌐 window.kakao:', !!window.kakao)
          }}
          onError={(e) => {
            console.error('❌ 카카오맵 스크립트 로드 실패:', e)
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
