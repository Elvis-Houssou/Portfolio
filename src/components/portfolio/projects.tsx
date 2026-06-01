"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectProps } from "@/props"
import { projects } from "@/data/moks"


function ProjectModal({ project, onClose }: { project: ProjectProps; onClose: () => void }) {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const hasImages = project.images && project.images.length > 0

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl border border-border shadow-2xl"
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>

          {/* Image / Video Gallery */}
          {hasImages && (
            <div className="relative w-full aspect-video bg-secondary rounded-t-2xl overflow-hidden">
              <img
                src={project.images[imageIndex]}
                alt={`${project.title} - aperçu ${imageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + project.images.length) % project.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-background/80 backdrop-blur hover:bg-background transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % project.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-background/80 backdrop-blur hover:bg-background transition-colors"
                    aria-label="Image suivante"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === imageIndex ? "bg-primary" : "bg-white/50"}`}
                        aria-label={`Image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* No image placeholder */}
          {!hasImages && (
            <div className="w-full aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-secondary rounded-t-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold text-primary">
                    {project.title.charAt(0)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Aperçu non disponible</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold text-foreground leading-tight">
                {project.title}
              </h2>
              <div className="flex gap-2 flex-shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Voir le site
                  </a>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Long description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {project.longDescription}
            </p>

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                  Points clés
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null)

  return (
    <section id="projects" className="w-full py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2 text-sm tracking-wide uppercase">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Mes projets récents
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Découvrez une sélection de mes projets les plus significatifs,
            démontrant mes compétences en développement web et data engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`Voir les détails du projet ${project.title}`}
              onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Click hint */}
              <p className="text-xs text-muted-foreground/60 group-hover:text-primary/60 transition-colors">
                Cliquer pour voir les détails →
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="rounded-full">
            <a
              href="https://github.com/Elvis-Houssou"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2" size={18} />
              Voir plus sur GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
