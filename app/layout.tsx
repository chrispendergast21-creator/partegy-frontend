import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Partegy | Partnership Governance Platform',
  description: 'Govern strategic partnerships using proprietary health scoring, behavioral intelligence, and executive-level ecosystem visibility.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://plausible.io/js/pa-rpM4rrRPF5JTlXp9OrlJf.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init()
        `}} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
