'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { contacts } from '@/data/moks'



// ─── Desktop item: magnification on mouseY ──────────────────────────────────
function DockItemDesktop({
  contact,
  mouseY,
}: {
  contact: typeof contacts[0]
  mouseY: ReturnType<typeof useMotionValue<number>>
}) {
  const Icon = contact.icon
  const ref = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseY, (val) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    return Math.abs(val - (rect.top + rect.height / 2))
  })
  const scale = useTransform(distance, [0, 60, 120], [1.45, 1.2, 1])
  const scaleSpring = useSpring(scale, { stiffness: 320, damping: 26 })

  return (
    <motion.a
      ref={ref}
      href={contact.href}
      target={contact.id !== 'phone' && contact.id !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ scale: scaleSpring }}
      layout
      layoutId={`dock-item-${contact.id}`}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="relative flex items-center justify-center origin-center"
    >
      {/* Tooltip — appears to the left of the dock */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 6, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 6, scale: 0.9 }}
            transition={{ duration: 0.14 }}
            className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-foreground text-background text-xs font-semibold whitespace-nowrap pointer-events-none shadow-lg"
          >
            {contact.label}
            <span className="absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-foreground" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${contact.color} shadow-md ${contact.shadow}`}>
        <Icon size={16} className="text-white" />
      </div>
    </motion.a>
  )
}

// ─── Mobile item: compact, no magnification ──────────────────────────────────
function DockItemMobile({ contact }: { contact: typeof contacts[0] }) {
  const Icon = contact.icon
  return (
    <motion.a
      href={contact.href}
      target={contact.id !== 'phone' && contact.id !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      layout
      layoutId={`dock-item-${contact.id}`}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="relative flex items-center justify-center"
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br ${contact.color} shadow-md ${contact.shadow}`}>
        <Icon size={14} className="text-white" />
      </div>
    </motion.a>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export function FloatingDock() {
  const [inFooter, setInFooter] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mouseY = useMotionValue(Infinity)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setInFooter(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(footer)

    return () => {
      window.removeEventListener('resize', checkMobile)
      observer.disconnect()
    }
  }, [])

  if (inFooter) return null

  // ── Mobile: vertical pill on the right ──────────────────────────────────
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.4 }}
        className="fixed right-2 z-30"
        style={{ top: "50%", y: "-50%" }}
      >
        <div className="flex flex-col items-center gap-2 px-2 py-3 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-xl">
          {contacts.map((c) => (
            <DockItemMobile key={c.id} contact={c} />
          ))}
        </div>
      </motion.div>
    )
  }

  // ── Desktop: horizontal dock at the bottom ───────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
      onMouseMove={(e) => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="fixed bottom-6 z-30"
      style={{ left: "50%", x: "-50%" }}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-3xl bg-background/75 backdrop-blur-xl border border-border shadow-2xl">
        {contacts.map((contact) => (
          <DockItemDesktop key={contact.id} contact={contact} mouseY={mouseY} />
        ))}
      </div>
    </motion.div>
  )
}
