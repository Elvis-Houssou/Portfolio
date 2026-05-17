import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Elvis Houssou | Développeur Software & Data Engineer',
  description: 'Portfolio professionnel de Elvis Houssou - Développeur Software & Data Engineer Junior basé à Abidjan. Spécialisé en React, NextJS, FastAPI, Python et Data Engineering.',
  keywords: ['développeur', 'software engineer', 'data engineer', 'react', 'nextjs', 'python', 'fastapi', 'abidjan', 'côte d\'ivoire'],
  authors: [{ name: 'Elvis Houssou' }],
  openGraph: {
    title: 'Elvis Houssou | Développeur Software & Data Engineer',
    description: 'Portfolio professionnel de Elvis Houssou - Développeur Software & Data Engineer Junior',
    type: 'website',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}
