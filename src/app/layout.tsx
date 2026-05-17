import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const BASE_URL = "https://portfolio-jpwl-dxo227ah9-elvishoussou.vercel.app/"
// const BASE_URL = "https://elvishoussou.dev"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
 
  // Title avec template pour les sous-pages éventuelles
  title: {
    default: "Elvis Houssou — Développeur Full-Stack & Software Engineer",
    template: "%s | Elvis Houssou",
  },
 
  description:
    "Portfolio d'Elvis Houssou, Développeur Full-Stack et Software Engineer basé à Abidjan, Côte d'Ivoire. Conception d'applications web complètes avec React, Next.js, Laravel, FastAPI et PostgreSQL.",
 
  // Keywords : utiles pour Bing, moins pour Google — reste propre et précis
  keywords: [
    "Elvis Houssou",
    "développeur full-stack",
    "software engineer",
    "développeur web Abidjan",
    "développeur Côte d'Ivoire",
    "React",
    "Next.js",
    "Laravel",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "portfolio développeur",
  ],
 
  authors: [{ name: "Elvis Houssou", url: BASE_URL }],
  creator: "Elvis Houssou",
 
  // Indique aux moteurs comment crawler le site
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
 
  // URL canonique
  alternates: {
    canonical: BASE_URL,
  },
 
  // Open Graph — affiché lors du partage sur LinkedIn, Facebook, WhatsApp…
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Elvis Houssou — Portfolio",
    title: "Elvis Houssou — Développeur Full-Stack & Software Engineer",
    description:
      "Applications web complètes, APIs performantes et architectures robustes. Basé à Abidjan, disponible en remote.",
    images: [
      {
        url: "/og-image.png", // ← crée une image 1200x630px avec ton nom + titre
        width: 1200,
        height: 630,
        alt: "Elvis Houssou — Développeur Full-Stack & Software Engineer",
      },
    ],
  },
 
  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Elvis Houssou — Développeur Full-Stack & Software Engineer",
    description:
      "Applications web complètes, APIs performantes et architectures robustes. Basé à Abidjan, disponible en remote.",
    images: ["/og-image.png"],
    // creator: "@tonhandle", // ← ajoute si tu as un compte X
  },
 
  // Icônes
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png",  media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
 
  // Ne pas exposer l'outil utilisé pour construire le site
  // generator supprimé volontairement
}
 
// JSON-LD — données structurées pour Google (rich results, Knowledge Panel)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Elvis Houssou",
  url: BASE_URL,
  jobTitle: "Développeur Full-Stack & Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Africa Digitalizer",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  sameAs: [
    "https://linkedin.com/in/elvis-houssou",
    "https://github.com/Elvis-Houssou",
  ],
  knowsAbout: ["React", "Next.js", "Laravel", "FastAPI", "Python", "PostgreSQL"],
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
