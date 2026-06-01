'use client'

import { useState } from 'react'
import { MapPin, Briefcase, GraduationCap, CheckCircle2, ChevronDown, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { TimelineItemProps } from '@/props'
import { timelineItems } from '@/data/moks'

function TimelineCard({ item, index, isLeft }: { item: TimelineItemProps, index: number, isLeft: boolean }) {
  const isEducation = item.type === 'education'
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} w-full`}
    >
      {/* Card */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
        <div 
          className={`group p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
            isEducation 
              ? 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-200/50 hover:border-blue-400/50' 
              : 'bg-gradient-to-br from-primary/5 to-orange-500/5 border-primary/20 hover:border-primary/50'
          }`}
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isEducation 
                ? 'bg-gradient-to-br from-blue-500 to-indigo-500' 
                : 'bg-gradient-to-br from-primary to-orange-500'
            }`}>
              {isEducation ? (
                <GraduationCap size={20} className="text-white" />
              ) : (
                <Briefcase size={20} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              {/* Desktop: title + period inline */}
              <div className="hidden md:flex items-start justify-between gap-2">
                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
                  {item.title}
                </h4>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                  isEducation
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {item.period}
                </span>
              </div>

              {/* Mobile: title alone, period below as a small pill */}
              <h4 className="md:hidden font-bold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
                {item.title}
              </h4>
              <span className={`md:hidden inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                isEducation
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'bg-primary/10 text-primary'
              }`}>
                {item.period}
              </span>

              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin size={10} className={isEducation ? 'text-blue-500' : 'text-primary'} />
                {item.subtitle} - {item.location}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-3">
            {Array.isArray(item.description) ? (
              item.description.slice(0, 2).map((desc, i) => (
                <div key={i} className="flex gap-2">
                  <CheckCircle2 size={12} className={`mt-0.5 flex-shrink-0 ${isEducation ? 'text-blue-500' : 'text-primary'}`} />
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {desc}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Technologies or Link */}
          {item.technologies && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
              {item.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium"
                >
                  {tech}
                </span>
              ))}
              {item.technologies.length > 4 && (
                <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px]">
                  +{item.technologies.length - 4}
                </span>
              )}
            </div>
          )}
          
          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
            >
              Voir le projet <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>

      {/* Center dot - visible on md+ */}
      <div className={`hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10`}>
        <div className={`w-4 h-4 rounded-full border-4 border-background shadow-lg ${
          isEducation ? 'bg-blue-500' : 'bg-primary'
        }`} />
      </div>
    </motion.div>
  )
}

export function Experience() {
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll ? timelineItems : timelineItems.slice(0, 3)
  const hasMore = timelineItems.length > 3

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2 text-sm tracking-wide uppercase">
            Parcours
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Expérience & Formation
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Un parcours professionnel en constante evolution
          </p>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-muted-foreground">Formation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Experience</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line - visible on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-primary to-transparent" />
          
          {/* Mobile line - left side */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-primary to-transparent" />

          {/* Timeline items */}
          <div className="space-y-6 md:space-y-8">
            <AnimatePresence mode="wait">
              {visibleItems.map((item, index) => {
                // Alternate: education on left (even index), experience on right (odd index)
                const isLeft = item.type === 'education'
                
                return (
                  <motion.div
                    key={`${item.type}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative pl-10 md:pl-0"
                  >
                    {/* Mobile dot */}
                    <div className={`md:hidden absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 border-background ${
                      item.type === 'education' ? 'bg-blue-500' : 'bg-primary'
                    }`} />
                    
                    <TimelineCard item={item} index={index} isLeft={isLeft} />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* See more button */}
          {hasMore && (
            <motion.div 
              className="flex justify-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <span className="text-sm font-medium text-foreground">
                  {showAll ? 'Voir moins' : `Voir plus (${timelineItems.length - 3} autres)`}
                </span>
                <motion.div
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} className="text-primary" />
                </motion.div>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
