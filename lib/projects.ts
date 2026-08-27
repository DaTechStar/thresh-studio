// ============================================================
// THRESH STUDIO — PROJECT DATA
// Single source of truth used by SelectedWork, /work, and /work/[slug]
// ============================================================

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  image: string; // hero / primary image
  vimeoId?: string; // optional vimeo video id
  accentColor: string; // tailwind oklch or hex used on case study page

  // Case study content
  description: string;
  services: string[];
  deliverables: string[];
  challenge: string;
  approach: string;
  outcome: string;
  stats: ProjectStat[];
  gallery: string[]; // supplementary images
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "lumina-edge",
    title: "Lumina Edge",
    tagline: "Redefining the product launch moment.",
    category: "Product Video",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2560&auto=format&fit=crop",
    vimeoId: "1128800824",
    accentColor: "#7DF9FF",

    description:
      "Lumina Edge came to us with a problem: a groundbreaking laptop, but no visual language to match its ambition. We built a full cinematic product video from scratch — concept to color grade — that transformed a spec sheet into a desire machine.",

    services: ["Concept Development", "3D Animation", "Cinematography", "Colour Grading", "Sound Design"],
    deliverables: ["60-sec Hero Film", "15-sec Social Cuts", "Product Stills", "Motion Reel"],

    challenge:
      "The client had a technically superior product, but their visual identity was sterile and corporate. The challenge was to create a brand film that felt premium, emotional, and aspirational without losing the engineering story.",

    approach:
      "We anchored every shot to a single creative idea: light as precision. Each frame was lit to emphasise the machined edges of the device, while the narrative arc moved from raw material to finished product. Subtle tactile sound design made the experience immersive even on mute.",

    outcome:
      "The film premiered at a global launch event and was distributed across paid social channels, generating 2.4 million views in its first week. It became the brand's highest-performing asset to date.",

    stats: [
      { label: "Views in Week 1", value: "2.4M" },
      { label: "Engagement Rate", value: "+320%" },
      { label: "Conversion Lift", value: "18%" },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=2560&auto=format&fit=crop",
    ],
  },

  {
    id: 2,
    slug: "aether-os",
    title: "Aether OS",
    tagline: "An operating system that feels alive.",
    category: "Cinematic Campaign",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop",
    vimeoId: "1207032028",
    accentColor: "#00D3DA",

    description:
      "Aether OS needed a campaign that communicated AI-native computing to an audience that had never seen its category before. We created a three-part cinematic series that positioned Aether not as software, but as a living collaborator.",

    services: ["Campaign Strategy", "Cinematic Direction", "Motion Graphics", "VFX Compositing", "Music Supervision"],
    deliverables: ["3-Part Film Series", "Brand Manifesto Film", "Teaser Trailers", "OOH Visuals"],

    challenge:
      "How do you visualise an operating system? The product is invisible by nature. We needed a campaign that made Aether feel tangible, intuitive, and emotionally resonant for early adopters and enterprise buyers simultaneously.",

    approach:
      "We cast the OS as a character — not a tool. Each film in the trilogy followed a different user whose creative or professional life was transformed by Aether. The visual language borrowed from arthouse cinema: shallow depth of field, natural light, minimal UI overlays. The product appeared in-world, not in demos.",

    outcome:
      "The trilogy earned 9 million organic impressions across YouTube and LinkedIn within 30 days of launch, and Aether's waitlist grew by 600% during the campaign period.",

    stats: [
      { label: "Organic Impressions", value: "9M" },
      { label: "Waitlist Growth", value: "+600%" },
      { label: "Press Features", value: "47" },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=2560&auto=format&fit=crop",
    ],
  },

  {
    id: 3,
    slug: "chronos-watch",
    title: "Chronos Watch",
    tagline: "Time, rendered in three dimensions.",
    category: "3D Product Motion",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2560&auto=format&fit=crop",
    vimeoId: "1149602611",
    accentColor: "#00A9AE",

    description:
      "Chronos approached us to create a full 3D product reveal for their debut mechanical watch. Every detail — from the sweeping seconds hand to the intricate movement — needed to be rendered with photographic accuracy and cinematic gravity.",

    services: ["3D Modelling & Rigging", "Photorealistic Rendering", "Camera Animation", "Colour Grading", "Post Production"],
    deliverables: ["60-sec Product Reveal", "Looping Social Clips", "Static 3D Renders", "Press Kit Imagery"],

    challenge:
      "Traditional product photography could not capture the watch's micro-engineering — the interplay of light on chamfered edges, the rhythmic pulse of the escapement, the depth of stacked sapphire crystal. We needed 3D to go where cameras cannot.",

    approach:
      "We modelled the watch from engineering CAD files at millimetre accuracy, then built a fully virtual studio with multiple light rigs. The reveal sequence started at the molecular level — zooming out from the balance wheel through the movement, case, and finally to the full watch in a hero setting.",

    outcome:
      "The film was used as the hero asset for the Chronos launch campaign, featured in Hodinkee and Revolution magazine, and served as the primary tool for investor presentations.",

    stats: [
      { label: "Polygon Count", value: "12M+" },
      { label: "Render Hours", value: "2,400" },
      { label: "Media Features", value: "23" },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2560&auto=format&fit=crop",
    ],
  },

  {
    id: 4,
    slug: "nexus-drive",
    title: "Nexus Drive",
    tagline: "Born from velocity. Built for obsessives.",
    category: "Brand Showreel",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2560&auto=format&fit=crop",
    vimeoId: "1121463132",

    accentColor: "#008084",

    description:
      "Nexus Drive makes pro-grade audio gear for creators who refuse to compromise. Their brand showreel needed to embody that same refusal — every frame earning its place, every cut calculated, the whole piece a testament to obsessive craft.",

    services: ["Brand Strategy", "Showreel Direction", "Live Action Production", "Motion Graphics", "Audio Mix"],
    deliverables: ["2-min Brand Showreel", "30-sec Cut", "Social Edits", "Behind-the-Scenes Package"],

    challenge:
      "Nexus Drive operated in a saturated category where every competitor used the same visual playbook: dark rooms, red gels, slow motion. We needed a showreel that broke the category convention without breaking the brand's credibility.",

    approach:
      "We stripped back. No gratuitous slow motion. No artificial drama. The showreel was built around real users in real spaces — studios, live venues, production suites — intercut with macro product shots so precise they felt medical. The restraint became the statement.",

    outcome:
      "The showreel anchored a complete rebrand launch, drove a 42% increase in direct-to-consumer sales in Q1 2026, and earned Nexus Drive a feature in Mixmag's annual gear review.",

    stats: [
      { label: "D2C Sales Lift", value: "+42%" },
      { label: "Brand Recall", value: "+61%" },
      { label: "Shoot Days", value: "8" },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2560&auto=format&fit=crop",
    ],
  },

  {
    id: 5,
    slug: "horizon-ui",
    title: "Horizon UI",
    tagline: "Interfaces that think before you do.",
    category: "Interface Design",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop",
    accentColor: "#005A5D",

    description:
      "Horizon UI is a next-generation SaaS analytics platform. They engaged Thresh to redesign their interface from the ground up — creating a design language that could handle extreme data density without sacrificing the clarity and elegance their users demanded.",

    services: ["UX Strategy", "Visual Design", "Design System", "Interaction Prototyping", "Motion Design"],
    deliverables: ["Full UI Redesign", "Component Library", "Design Tokens", "Interaction Specs", "Onboarding Flow"],

    challenge:
      "Enterprise analytics tools have historically chosen function over form. Horizon's users — data scientists and C-suite — needed the same depth, but refused to tolerate the visual noise. The challenge was to architect an interface that was simultaneously powerful and serene.",

    approach:
      "We built the design system from a single constraint: every element must earn its place. We developed a three-tier information hierarchy — ambient, active, and focused — with animation states tied to user intent. The result was a UI that felt like it was reading the user's mind.",

    outcome:
      "Post-launch user research showed a 55% reduction in time-to-insight for new users, a 40% drop in support tickets, and an NPS improvement of 34 points. Horizon secured their Series B six weeks after launch.",

    stats: [
      { label: "Time-to-Insight Reduction", value: "55%" },
      { label: "NPS Improvement", value: "+34pts" },
      { label: "Support Ticket Drop", value: "40%" },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2560&auto=format&fit=crop",
    ],
  },

  {
    id: 6,
    slug: "echo-audio",
    title: "Echo Audio",
    tagline: "Sound you can see. Space you can feel.",
    category: "Product Launch",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2560&auto=format&fit=crop",
    accentColor: "#003739",

    description:
      "Echo Audio launched their spatial audio headphones into a category dominated by legacy giants. We created a full launch campaign — from manifesto film to retail experience — that positioned Echo as the first true challenger brand in premium audio.",

    services: ["Launch Strategy", "Film Production", "Spatial Audio Design", "Retail Experience Design", "Digital Campaign"],
    deliverables: ["Launch Manifesto Film", "Retail Activation", "Digital Campaign Suite", "Packaging Design"],

    challenge:
      "Echo's headphones objectively outperformed products at twice the price point. The challenge was not the product — it was the perception. We needed to dismantle the assumed hierarchy of the category and give Echo permission to play at the top table.",

    approach:
      "The campaign idea was simple: make people hear with their eyes. Every visual — film, print, OOH — was designed to communicate spatial audio conceptually. We used physical environments that seemed to vibrate with implied sound, and recruited audiophiles as the authentic voice of the brand.",

    outcome:
      "Echo sold out its first production run within 48 hours of launch. The manifesto film generated 1.8 million YouTube views organically and earned coverage in The Verge, What Hi-Fi, and Billboard.",

    stats: [
      { label: "Sold Out In", value: "48hrs" },
      { label: "Organic Views", value: "1.8M" },
      { label: "Press Features", value: "31" },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2560&auto=format&fit=crop",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(currentSlug: string): Project | undefined {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return undefined;
  return projects[(idx + 1) % projects.length];
}
