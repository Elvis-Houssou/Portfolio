'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, MessageCircle, Copy, Check, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const contacts = [
  {
    id: 'email',
    label: 'Email',
    value: 'houssouelvis@gmail.com',
    href: 'mailto:houssouelvis@gmail.com',
    icon: Mail,
    action: 'copy' as const,
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-500/8 hover:bg-orange-500/14',
    border: 'hover:border-orange-500/40',
    text: 'text-orange-500',
  },
  {
    id: 'phone',
    label: 'Téléphone',
    value: '+225 05 54 98 79 43',
    href: 'tel:+2250554987943',
    icon: Phone,
    action: 'link' as const,
    color: 'from-emerald-500 to-green-400',
    bg: 'bg-emerald-500/8 hover:bg-emerald-500/14',
    border: 'hover:border-emerald-500/40',
    text: 'text-emerald-500',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+225 05 54 98 79 43',
    href: 'https://wa.me/2250554987943',
    icon: MessageCircle,
    action: 'open' as const,
    color: 'from-teal-400 to-green-500',
    bg: 'bg-teal-500/8 hover:bg-teal-500/14',
    border: 'hover:border-teal-500/40',
    text: 'text-teal-500',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'elvis-houssou',
    href: 'https://www.linkedin.com/in/elvis-houssou-228056231/',
    icon: Linkedin,
    action: 'open' as const,
    color: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-500/8 hover:bg-blue-500/14',
    border: 'hover:border-blue-500/40',
    text: 'text-blue-500',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'Elvis-Houssou',
    href: 'https://github.com/Elvis-Houssou',
    icon: Github,
    action: 'open' as const,
    color: 'from-zinc-600 to-zinc-400',
    bg: 'bg-zinc-500/8 hover:bg-zinc-500/14',
    border: 'hover:border-zinc-500/40',
    text: 'text-zinc-400',
  },
]

function ContactRow({ contact, index }: { contact: typeof contacts[0]; index: number }) {
  const [copied, setCopied] = useState(false)
  const Icon = contact.icon
  const isOpen = contact.action === 'open'
  const isCopy = contact.action === 'copy'

  const handleClick = async (e: React.MouseEvent) => {
    if (isCopy) {
      e.preventDefault()
      await navigator.clipboard.writeText(contact.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.a
      href={contact.href}
      target={isOpen ? '_blank' : undefined}
      rel={isOpen ? 'noopener noreferrer' : undefined}
      onClick={isCopy ? handleClick : undefined}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      whileHover={{ x: 4 }}
      className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-border/50 ${contact.bg} ${contact.border} transition-all duration-300 cursor-pointer`}
    >
      {/* Icon */}
      <motion.div
        layoutId={`dock-item-${contact.id}`}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${contact.color} shadow-sm`}
      >
        <Icon size={18} className="text-white" />
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold uppercase tracking-widest ${contact.text} mb-0.5`}>
          {contact.label}
        </p>
        <p className="text-sm text-foreground/80 truncate font-medium">
          {contact.value}
        </p>
      </div>

      {/* Action indicator */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isCopy ? (
          copied
            ? <Check size={15} className="text-emerald-500" />
            : <Copy size={15} className="text-muted-foreground" />
        ) : (
          <ArrowUpRight size={15} className="text-muted-foreground" />
        )}
      </div>
    </motion.a>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="w-full relative overflow-hidden border-t border-border/40">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-5xl px-4 pt-16 pb-10 md:pb-2">

        {/* Top: logo + tagline left, contacts right */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-6 mb-12">
          {/* Right — Contact list */}
          {contacts.map((contact, index) => (
            <ContactRow key={contact.id} contact={contact} index={index} />
          ))}
        </div>

        {/* Bottom divider */}
        <div className="flex items-center justify-center md:justify-between gap-3 mb-12 md:mb-0">
          {/* Left — Identity */}
          <div className="flex flex-col justify-start md:justify-between gap-6">
            <div className='hidden md:flex'>
              <a href="#hero" className="inline-flex items-center gap-3 group mb-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300">
                  <Image
                    src="/images/elvis-dev-logo.png"
                    alt="Elvis Dev Logo"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm leading-tight">Elvis Houssou</p>
                  <p className="text-xs text-muted-foreground">Software & Data Engineer</p>
                </div>
              </a>
            </div>

          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Elvis Houssou. Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  )
}
