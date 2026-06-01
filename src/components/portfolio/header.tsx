"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, Code, GraduationCap, HelpCircle, Mail } from "lucide-react"
import Image from "next/image"

const navItems = [
  { label: "Accueil", href: "#hero", icon: Home },
  { label: "A propos", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Projets", href: "#projects", icon: Briefcase },
  { label: "Parcours", href: "#experience", icon: GraduationCap },
  // { label: "FAQ", href: "#faq", icon: HelpCircle },
  // { label: "Contact", href: "#contact", icon: Mail },
]

// Reduced nav items for mobile bottom bar (most important ones)
const mobileNavItems = [
  { label: "Accueil", href: "#hero", icon: Home },
  { label: "A propos", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Projets", href: "#projects", icon: Briefcase },
  { label: "Parcours", href: "#experience", icon: GraduationCap },
  // { label: "Contact", href: "#footer", icon: Mail },
]

function DiagonalTooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute z-50 pointer-events-none"
          style={{ bottom: 20, right: "calc(100% + 6px)" }}
          initial={{ opacity: 0, x: 8, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 8, y: 8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <span className="whitespace-nowrap bg-foreground text-background text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg">
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Header() {
  const [activeSection, setActiveSection] = useState("hero")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navItems.map((item) => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Vertical Sidebar - Right side */}
      <motion.nav
        className="fixed right-4 z-50 hidden lg:flex flex-col bg-background/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-visible min-w-[58px]"
        style={{ top: "50%", y: "-50%" }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 24 }}
      >
        {/* Logo */}
        <div className="flex justify-center pt-4 pb-2 px-4">
          <a href="#" className="text-sm font-bold text-foreground">
            Elvis<span className="text-primary">.</span>
          </a>
        </div>

        <div className="w-9 h-px bg-border mx-auto my-1" />

        {/* Nav Links */}
        <div className="flex flex-col py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const sectionId = item.href.replace("#", "")
            const isActive = activeSection === sectionId
            const isHovered = hoveredItem === item.href
            return (
              <div key={item.href} className="relative">
                <DiagonalTooltip label={item.label} visible={isHovered} />
                <motion.a
                  href={item.href}
                  className="group relative flex items-center justify-center w-full px-4 py-4 transition-colors"
                  whileHover={{ x: -2 }}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-1 rounded-xl bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 relative z-10 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                </motion.a>
              </div>
            )
          })}
        </div>

        {/* <div className="w-9 h-px bg-border mx-auto my-1" /> */}

        {/* Active dot indicator */}
        {/* <div className="flex justify-center pb-5 pt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div> */}
      </motion.nav>

      {/* Mobile Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 24 }}
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      >
        {/* Gradient fade above bar */}
        <div className="h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className={`bg-background/90 backdrop-blur-xl border-t border-border px-2 pb-safe transition-shadow duration-300 ${scrolled ? 'shadow-2xl' : ''}`}>
          <div className="flex items-center justify-around py-2">
            {mobileNavItems.map((item) => {
              const Icon = item.icon
              const sectionId = item.href.replace("#", "")
              const isActive = activeSection === sectionId
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveIndicator"
                      className="absolute inset-0 rounded-xl bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 w-5 h-5 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`relative z-10 text-[10px] font-medium mt-1 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Bar - Logo only */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 24 }}
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm' : ''
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4">
          <a href="#hero" className="flex items-start gap-2">
            <Image
              src="/images/elvis-dev-logo.png"
              alt="Elvis Dev Logo"
              width={32}
              height={32}
              className="rounded-lg object-cover"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : -10 }}
              className="font-semibold text-sm text-foreground"
            >
              Elvis Houssou
              <p className="text-xs text-muted-foreground">Software & Data Engineer</p>
            </motion.span>
          </a>
          
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-[10px] font-medium text-green-600 dark:text-green-400">Dispo</span>
          </motion.div>
        </div>
      </motion.header>
    </>
  )
}
