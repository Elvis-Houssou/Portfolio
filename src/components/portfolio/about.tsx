import { User, MapPin, Calendar, Briefcase } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 px-4 lg:pl-28 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2 text-sm tracking-wide uppercase">
            À propos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Qui suis-je ?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Développeur Software & Data Engineer Junior passionné par la création de solutions digitales innovantes. 
              Diplômé de l&apos;Institut Français du Numérique (IFRAN) et formé à l&apos;École Multimédia de Paris, 
              je combine une solide expertise technique avec une approche créative du développement.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Mon expertise couvre le développement web full-stack avec des technologies modernes comme React, NextJS, 
              FastAPI et Laravel, ainsi que l&apos;ingénierie des données avec PostgreSQL, MySQL et AWS. 
              Je suis particulièrement intéressé par l&apos;optimisation des performances et la création d&apos;architectures évolutives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Toujours curieux et motivé, je cherche constamment à apprendre de nouvelles technologies 
              et à relever des défis techniques stimulants.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <User className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Nom</h3>
              <p className="text-muted-foreground text-sm">Elvis Houssou</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Localisation</h3>
              <p className="text-muted-foreground text-sm">Abidjan, Côte d&apos;Ivoire</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Date de naissance</h3>
              <p className="text-muted-foreground text-sm">02 Septembre 2000</p>
            </div>

            <div className="p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Statut</h3>
              <p className="text-muted-foreground text-sm">Disponible</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">2+</p>
            <p className="text-muted-foreground text-sm">Années d&apos;expérience</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</p>
            <p className="text-muted-foreground text-sm">Projets réalisés</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</p>
            <p className="text-muted-foreground text-sm">Technologies maîtrisées</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</p>
            <p className="text-muted-foreground text-sm">Satisfaction client</p>
          </div>
        </div>
      </div>
    </section>
  )
}
