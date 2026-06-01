'use client'

import { useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, RefreshCw } from "lucide-react"

export function Hero() {
  const [flipped, setFlipped] = useState(false)

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-primary font-medium mb-4 text-sm tracking-wide uppercase">
              Bienvenue sur mon portfolio
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Elvis Houssou
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
              Développeur Full-Stack | Software Engineer
            </p>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Je conçois des solutions digitales performantes et des architectures de données robustes.
              Passionné par le développement web et l&apos;ingénierie des données, je transforme vos idées en applications concrètes.
            </p>

            {/* Availability Card */}
            <div className="inline-flex flex-wrap gap-x-6 gap-y-3 mb-6 p-4 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold text-foreground">Disponible maintenant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Poste :</span>
                <span>Temps plein · Contrat</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Mode :</span>
                <span>Télétravail · Hybride</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Langues :</span>
                <span>Français (natif) · Anglais (avancé)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button asChild size="lg" className="rounded-full">
                <a href="#projects">Voir mes projets</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="#contact">Me contacter</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/Elvis-Houssou"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/elvis-houssou"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:houssouelvis@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Flip Card */}
          <div className="order-1 lg:order-2 flex flex-col items-center gap-5">
            {/* Card wrapper with 3D perspective */}
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              style={{ perspective: '1000px' }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110 pointer-events-none" />

              {/* Inner flip container */}
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front — photo */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image
                    src="/images/elvis-houssou.jpeg"
                    alt="Elvis Houssou - Développeur Software & Data Engineer"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Back — logo */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-card flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <Image
                    src="/images/elvis-dev-logo.png"
                    alt="Logo Elvis Houssou"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Flip button */}
            <button
              onClick={() => setFlipped((f) => !f)}
              aria-label={flipped ? "Voir la photo" : "Voir le logo"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-sm"
            >
              <RefreshCw
                size={15}
                className="transition-transform duration-500"
                style={{ transform: flipped ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
              {flipped ? 'Voir la photo' : 'Voir le logo'}
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12 lg:mt-16">
          <a
            href="#about"
            className="animate-bounce p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}
