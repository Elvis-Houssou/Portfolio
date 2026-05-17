export interface ProjectProps {
  title: string
  description: string
  longDescription: string
  technologies: string[]
  link: string | null
  github: string | null
  featured: boolean
  images: string[]
  highlights: string[]
}

export interface TimelineItemProps {
  type: 'experience' | 'education'
  title: string
  subtitle: string
  location: string
  period: string
  description: string | string[]
  technologies?: string[]
  link?: string
}