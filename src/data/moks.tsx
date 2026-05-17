import { ProjectProps, TimelineItemProps } from "@/props";
import { Code2, Database, Globe, Hammer } from "lucide-react";

export const projects: ProjectProps[] = [
  {
    title: "EMETIS — Plateforme de réservation",
    description:
      "Plateforme web full-stack de réservation de résidences meublées en Côte d'Ivoire. Authentification, calendrier de disponibilité, paiement en ligne et espace propriétaire.",
    longDescription:
      "Développement d'une application web complète de type Airbnb pour le marché ivoirien. Le backend Laravel/Node.js gère l'authentification des utilisateurs, la logique de réservation avec vérification des disponibilités en temps réel, et l'intégration d'une API de paiement. Les fichiers et images sont hébergés sur Amazon S3, le cache de sessions est géré via Redis, et les données sont modélisées dans PostgreSQL (users, properties, bookings, availability). Le frontend React offre une interface de recherche par localisation et critères, ainsi qu'un espace propriétaire pour la gestion des annonces.",
    technologies: ["React", "Node.js", "Laravel", "API de Paiement", "PostgreSQL", "Amazon S3", "Redis"],
    link: "https://emetis.net/",
    github: null,
    featured: true,
    images: [
      "/images/emetis-home.jpg",
      "/images/emetis-search.jpg",
    ],
    highlights: [
      "Authentification sécurisée et gestion des rôles (hôte / voyageur)",
      "Système de réservation avec vérification des disponibilités en temps réel",
      "Intégration d'une API de paiement pour les transactions en ligne",
      "Stockage des médias sur Amazon S3 et cache de sessions via Redis",
      "Modélisation relationnelle PostgreSQL : users, properties, bookings, availability",
    ],
  },
  {
    title: "Les Pépinières",
    description:
      "Site web vitrine et catalogue pour un réseau de pépinières. Moteur de filtrage multicritères, rendu optimisé côté serveur et SEO soigné.",
    longDescription:
      "Développement d'un site web orienté front-end pour la présentation et l'exploration d'un catalogue horticole. Construit avec Next.js (SSR/SSG) pour des performances de rendu optimales et un bon référencement naturel. Le projet met en avant un moteur de filtrage multicritères côté client, des composants React réutilisables et une interface responsive soignée. Les données du catalogue sont gérées de manière statique ou via un CMS headless sans backend applicatif custom.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://www.lespepinieres.com/",
    github: null,
    featured: true,
    images: [
      "/images/pepinieres-home.jpeg",
      "/images/pepinieres-services.jpeg",
      "/images/pepinieres-mobile.jpeg",
    ],
    highlights: [
      "Rendu SSR/SSG avec Next.js pour des performances optimales",
      "Moteur de filtrage multicritères côté client",
      "Optimisation SEO et Core Web Vitals",
      "Composants React réutilisables en TypeScript",
      "Interface responsive et accessible sur mobile",
    ],
  },
  {
    title: "Possible Immobilier",
    description:
      "Site vitrine immobilier avec back-office CMS pour une agence opérant en Côte d'Ivoire et sur la Côte d'Azur. Gestion de catalogue, cartes interactives et SEO.",
    longDescription:
      "Développement d'un site web professionnel pour une agence immobilière de prestige. Le client peut gérer son catalogue de biens (ajout, modification, suppression) via un back-office CMS intégré sans intervention technique. Le site intègre une carte interactive (Google Maps ou équivalent) pour la géolocalisation des biens, un système de filtrage du catalogue, et une optimisation SEO ciblant le marché immobilier francophone. Projet front-end Next.js avec back-office, sans logique transactionnelle complexe.",
    technologies: ["React", "Next.js", "Tailwind CSS", "CMS"],
    link: "https://www.possible-immobilier.com/",
    github: null,
    featured: false,
    images: [],
    highlights: [
      "Back-office CMS pour la gestion autonome du catalogue de biens",
      "Intégration de cartes interactives pour la géolocalisation des propriétés",
      "Filtrage dynamique du catalogue de biens",
      "Optimisation SEO pour le marché immobilier francophone",
    ],
  },
  {
    title: "Portail APÉTS (ÉTS Montréal)",
    description:
      "Portail institutionnel pour l'association professorale de l'ÉTS Montréal. Gestion de documents officiels, publication d'actualités et espace membres avec rôles.",
    longDescription:
      "Conception et développement d'un portail web institutionnel pour l'association syndicale des professeurs de l'École de technologie supérieure de Montréal. L'application web CRUD (React + PHP + MySQL) centralise la mise à disposition de documents officiels (conventions collectives, guides PDF), la publication d'actualités et l'accès à un espace membres sécurisé avec gestion des rôles (admin / membre). Le projet a mis l'accent sur l'accessibilité web et le respect des standards institutionnels.",
    technologies: ["React", "PHP", "MySQL"],
    link: "https://www.apets.org/",
    github: null,
    featured: false,
    images: [],
    highlights: [
      "Application web CRUD avec gestion des rôles (admin / membre)",
      "Mise à disposition et gestion de documents PDF officiels",
      "Publication et gestion d'actualités syndicales",
      "Accessibilité web et conformité aux standards institutionnels",
    ],
  },
  {
    title: "Portail Africa Digitalizer",
    description:
      "Site corporate pour une agence internationale de transformation digitale. Présentation des services, gestion de leads et catalogue de solutions B2B multi-pays.",
    longDescription:
      "Développement du site web corporate d'Africa Digitalizer, agence opérant au Canada, en Côte d'Ivoire et au Bénin. Le site présente l'écosystème de solutions B2B de l'agence (développement web, Cloud, DevOps, IoT) et intègre un formulaire de collecte de leads et de demandes de devis. Projet front-end TypeScript / React sans backend transactionnel complexe, axé sur la communication de l'expertise de l'agence.",
    technologies: ["TypeScript", "React"],
    link: "https://africadigitalizer.com/",
    github: null,
    featured: false,
    images: [],
    highlights: [
      "Site corporate multi-pays (Canada, Côte d'Ivoire, Bénin)",
      "Catalogue de services et solutions B2B",
      "Formulaire de collecte de leads et de demandes de devis",
      "Interface performante en TypeScript / React",
    ],
  },
  {
    title: "BGBIN E-commerce",
    description:
      "Plateforme e-commerce full-stack complète : catalogue produits, panier, gestion des commandes, synchronisation des stocks via API REST et tableau de bord admin.",
    longDescription:
      "Développement d'une plateforme e-commerce complète pour BGBIN. Le backend Laravel expose des endpoints REST pour la synchronisation des stocks en temps réel entre le front et la base de données PostgreSQL. Le frontend React gère le catalogue produits, le panier et le tunnel d'achat. Un tableau de bord administrateur permet le suivi des commandes et des inventaires. Le schéma de données transactionnel (produits, commandes, stocks, mouvements) est le cœur du système. C'est le projet web le plus complet techniquement de ce portfolio.",
    technologies: ["React", "Laravel", "REST API", "PostgreSQL"],
    link: "https://www.bgbin.fr/",
    github: null,
    featured: true,
    images: [],
    highlights: [
      "Tunnel d'achat complet : catalogue, panier, commande",
      "Synchronisation des stocks en temps réel via API REST",
      "Tableau de bord admin : suivi des commandes et des inventaires",
      "Schéma transactionnel PostgreSQL : produits, commandes, stocks, mouvements",
      "Interface utilisateur responsive et intuitive",
    ],
  },
  {
    title: "Bigscreen Sondage",
    description:
      "Application de sondage avec backend Python/FastAPI, agrégations statistiques PostgreSQL et visualisation des résultats en temps réel.",
    longDescription:
      "Application web de collecte et d'analyse de retours utilisateurs pour la communauté Bigscreen. Le backend Python (FastAPI) expose des endpoints de soumission et d'agrégation des réponses. Les résultats sont calculés côté base de données (PostgreSQL) avec des requêtes d'agrégation (COUNT, AVG, GROUP BY) et visualisés en temps réel sur le frontend React. C'est le projet qui amorce le plus clairement un profil orienté data : pipeline request → aggregation → visualisation, backend Python, et export des données brutes pour analyse externe.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "React"],
    link: null,
    github: "https://github.com/Elvis-Houssou/Bigscreen_sondage",
    featured: true,
    images: [],
    highlights: [
      "Backend Python (FastAPI) avec endpoints de soumission et d'agrégation",
      "Requêtes d'agrégation statistique PostgreSQL (COUNT, AVG, GROUP BY)",
      "Visualisation des résultats en temps réel sur le frontend React",
      "Export des données brutes pour analyse approfondie",
      "Pipeline complet : collecte → agrégation → visualisation",
    ],
  },
  {
    title: "Architecture de Données",
    description:
      "Conception de schémas relationnels, pipelines ETL et optimisation de requêtes SQL pour des logiciels d'entreprise à fort volume. Déploiement sur AWS.",
    longDescription:
      "Projet d'ingénierie des données centré sur la conception et l'optimisation d'architectures pour des logiciels d'entreprise traitant de grands volumes de données. Le travail inclut la modélisation de schémas relationnels complexes (PostgreSQL, MySQL), la mise en place de pipelines ETL (extraction, transformation, chargement), l'intégration multi-systèmes via des APIs dédiées, et l'optimisation de requêtes SQL critiques ayant produit des gains de performance mesurables (x3). Infrastructure déployée sur AWS. C'est le projet le plus représentatif d'un profil ingénieur des données.",
    technologies: ["PostgreSQL", "MySQL", "Python", "AWS"],
    link: null,
    github: null,
    featured: false,
    images: [],
    highlights: [
      "Modélisation de schémas relationnels complexes (PostgreSQL, MySQL)",
      "Pipelines ETL : extraction, transformation et chargement de données massives",
      "Optimisation de requêtes SQL critiques — gains de performance x3",
      "Intégration multi-systèmes via APIs dédiées",
      "Infrastructure résiliente déployée sur AWS",
    ],
  },
];

export const skills = {
  frontend: {
    title: "Frontend",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "React", description: "Composants réutilisables et gestion d'état avancée" },
      { name: "Next.js", description: "SSR, SSG et optimisations de performance" },
      { name: "TypeScript", description: "Type-safety et code maintenable" },
      { name: "JavaScript", description: "Vanilla JS et patterns modernes" },
      { name: "TailwindCSS", description: "Design système et responsive design" },
    ],
  },
  backend: {
    title: "Backend",
    icon: Code2,
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "FastAPI", description: "APIs haute performance et asyncio" },
      { name: "Laravel", description: "Applications web full-stack" },
      { name: "Python", description: "Scripts, data processing et automation" },
      { name: "REST API", description: "Design d'API RESTful et GraphQL" },
      { name: "Node.js", description: "Runtime JavaScript côté serveur" },
    ],
  },
  data: {
    title: "Data & Bases de données",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "PostgreSQL", description: "SGBD relationnel avancé" },
      { name: "MySQL", description: "Optimisation et indexation" },
      { name: "SQL Server", description: "Requêtes complexes et stored procedures" },
      { name: "Redis", description: "Cache et data structures" },
      { name: "AWS", description: "Infrastructure cloud et services" },
    ],
  },
  tools: {
    title: "Outils & DevOps",
    icon: Hammer,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "Git", description: "Version control et collaboration" },
      { name: "VS Code", description: "Éditeur principal avec extensions" },
      { name: "Cursor", description: "Développement assisté par IA" },
      { name: "Docker", description: "Containerization et orchestration" },
      { name: "InDesign", description: "Design et prototypage graphique" },
    ],
  },
}

export const experiences = [
  {
    title: "Développeur Software Junior",
    company: "AFRICA DIGITALIZER",
    location: "Abidjan, Côte d'Ivoire",
    period: "Depuis Février 2025",
    description: [
      "Développement d'applications web d'entreprise avec des APIs REST en FastAPI et Laravel, organisées en architecture modulaire en couches (séparation des responsabilités, services, repositories)",
      "Modélisation et optimisation de bases de données relationnelles (PostgreSQL, SQL Server) : conception des schémas, indexation et réécriture de requêtes critiques pour améliorer les temps de réponse",
      "Mise en place d'intégrations inter-systèmes via APIs REST et utilisation de Redis pour la gestion du cache et des sessions applicatives",
    ],
    technologies: ["FastAPI", "Next.js", "Laravel", "Redis", "AWS", "MySQL", "PostgreSQL", "TypeScript", "Git"],
  },
  {
    title: "Développeur Web Junior",
    company: "ASNUMERIC SARL",
    location: "Abidjan, Côte d'Ivoire",
    period: "Mars 2024 – Janvier 2025",
    description: [
      "Développement et maintenance d'applications métiers sous Laravel : fonctionnalités CRUD, gestion des rôles utilisateurs et intégration d'APIs tierces",
      "Écriture de scripts pour l'import et l'export automatisé de données (fichiers CSV/Excel, flux d'APIs REST) à destination des applications métiers",
      "Modélisation de bases de données MySQL et gestion des sauvegardes sur AWS (S3, RDS)",
    ],
    technologies: ["Flutter", "Laravel", "MySQL", "REST API"],
  },
  {
    title: "Développeur Backend (Freelance)",
    company: "BGBIN",
    location: "Remote",
    period: "Septembre 2023 – Octobre 2023",
    description: [
      "Conception et développement du backend Laravel d'une plateforme e-commerce : catalogue produits, gestion des commandes et tableau de bord administrateur",
      "Implémentation de la synchronisation des stocks en temps réel via la consommation d'APIs REST tierces",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "REST API"],
    link: "https://www.bgbin.fr/",
  },
]

export const education = [
  {
    degree: "Bachelor — Développement Logiciel & Web",
    school: "IFRAN — Institut Français du Numérique",
    location: "Côte d'Ivoire",
    period: "Promotion 2022",
    description:
      "Formation de 3 ans couvrant le développement web (frontend et backend), les bases de données relationnelles, les algorithmes et les architectures logicielles.",
  },
]

export const timelineItems: TimelineItemProps[] = [
  {
    type: 'experience',
    title: experiences[0].title,
    subtitle: experiences[0].company,
    location: experiences[0].location,
    period: experiences[0].period,
    description: experiences[0].description,
    technologies: experiences[0].technologies,
  },
  {
    type: 'education',
    title: education[0].degree,
    subtitle: education[0].school,
    location: education[0].location,
    period: education[0].period,
    description: education[0].description,
  },
  {
    type: 'experience',
    title: experiences[1].title,
    subtitle: experiences[1].company,
    location: experiences[1].location,
    period: experiences[1].period,
    description: experiences[1].description,
    technologies: experiences[1].technologies,
  },
  {
    type: 'experience',
    title: experiences[2].title,
    subtitle: experiences[2].company,
    location: experiences[2].location,
    period: experiences[2].period,
    description: experiences[2].description,
    technologies: experiences[2].technologies,
    link: experiences[2].link,
  },
]


export const faqs = [
  {
    question: "Quel type de poste recherchez-vous ?",
    answer:
      "Je suis ouvert à des opportunités en tant que Développeur Full-Stack ou Data Engineer Junior, en CDI, CDD ou freelance. Je suis disponible pour du travail sur site à Abidjan ou en télétravail pour des projets internationaux.",
  },
  {
    question: "Quelles sont vos technologies principales ?",
    answer:
      "Je travaille principalement avec React, Next.js, TypeScript et Python pour le frontend et backend. Pour le data engineering, je maîtrise PostgreSQL, MySQL, FastAPI et AWS. Je m'adapte rapidement à de nouvelles technologies selon les besoins du projet.",
  },
  {
    question: "Êtes-vous disponible pour des projets freelance ?",
    answer:
      "Oui, je suis disponible pour des missions freelance en développement web et data engineering. Je peux intervenir sur des projets de création de sites, d'applications web, d'APIs ou d'architectures de données. Contactez-moi pour discuter de votre projet.",
  },
  {
    question: "Quels sont vos tarifs et délais ?",
    answer:
      "Les tarifs et délais dépendent de la complexité du projet. Je fournis toujours un devis détaillé après analyse de vos besoins. Pour un site vitrine simple, comptez 1-2 semaines. Pour une application plus complexe, les délais seront adaptés au cahier des charges.",
  },
  {
    question: "Travaillez-vous avec des clients internationaux ?",
    answer:
      "Absolument ! Je travaille en français (langue maternelle) et en anglais (niveau professionnel), ce qui me permet de collaborer avec des équipes et clients du monde entier. Le travail à distance ne pose aucun problème.",
  },
  {
    question: "Comment puis-je vous contacter ?",
    answer:
      "Vous pouvez me contacter par email à houssouelvis@gmail.com ou par téléphone au +225 0554987943. Vous pouvez également utiliser le formulaire de contact ci-dessous. Je réponds généralement sous 24 heures.",
  },
]