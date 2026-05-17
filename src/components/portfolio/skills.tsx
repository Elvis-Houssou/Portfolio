'use client'

import { useState } from 'react'
import { Code2, Database, Hammer, Globe, ChevronRight } from 'lucide-react'
import { skills } from '@/data/moks'

const allSkills = Object.values(skills).flatMap(cat => cat.items.map(item => item.name))

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend")
  const currentCategory = Object.entries(skills).find(([key]) => key === activeCategory)?.[1]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2 text-sm tracking-wide uppercase">
            Compétences
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Mes compétences techniques
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Une expertise développée à travers des projets réels et des apprentissages continus
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(skills).map(([key, category]) => {
            const Icon = category.icon
            const isActive = activeCategory === key
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-card border border-border text-foreground hover:border-primary/50'
                }`}
              >
                <Icon size={18} />
                {category.title}
              </button>
            )
          })}
        </div>

        {/* Skills Grid Display */}
        {currentCategory && (
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-4">
              {currentCategory.items.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-default"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>
                    <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Technologies Cloud */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <h3 className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">
            Toutes les technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {allSkills.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
