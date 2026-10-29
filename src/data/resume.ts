// Resume content. Edit here, never in the components.
// Every claim below is checked against a live site, a repo, or a dated file.

export const person = {
  name: "Vanessa Saddi",
  role: "Front End Engineer, Marketing",
  headline: ["Designer first.", "Engineer by necessity."],
  summary:
    "Thirteen years of client-facing craft, three years shipping production web, and a daily practice of building with Claude in the loop. I design the system, write the code, and run the tooling that keeps it moving. Five live properties, one operator.",
  location: "Los Angeles, California · travels to the office as needed",
  email: "nessasaddi@gmail.com",
  links: [
    { label: "cherrypi.world", href: "https://cherrypi.world" },
    { label: "github.com/nessasaddi", href: "https://github.com/nessasaddi" },
    { label: "linkedin", href: "https://www.linkedin.com/company/cherrypi" },
  ],
  target: {
    company: "Anthropic",
    team: "Brand Web",
    title: "Front End Engineer, Marketing",
    href: "https://job-boards.greenhouse.io/anthropic/jobs/5386971008",
  },
};

export type FitItem = {
  ask: string;
  tag: "core" | "preferred";
  proof: string;
  evidence?: string[];
};

export const fit: FitItem[] = [
  {
    tag: "core",
    ask: "Modern frameworks like Next.js and React, comfortable working inside a design system.",
    proof:
      "Five production sites live today. Next.js 15 and 16 with React 19 and Tailwind v4 where the site earns it (swiitchglobal.com, this page); plain HTML, CSS and JS where that was the right size (alpinevapor.com, housemoney.com landing pages, timothyvanessa.com). Every brand ships with a written kit the code reads first: tokens, type with PostScript names, logo rules, page furniture.",
    evidence: ["Next.js 15/16", "React 19", "Tailwind v4", "TypeScript", "Vercel"],
  },
  {
    tag: "core",
    ask: "CSS for complex layouts, animations and interactions.",
    proof:
      "This page: fluid clamp() type scale, 12-column panel grid, gradient wordmark through a CSS mask, film grain overlay, reduced-motion fallbacks. Swiitch: 21+ age gate, auto-scrolling gallery carousel, native share sheet on photo tiles. House Money: mobile sticky CTA bar that appears once the hero leaves the viewport. Alpine: nav that flips colour over dark and light sections, store locator with a map.",
  },
  {
    tag: "core",
    ask: "Headless CMS experience: content modeling, structured data, the publishing experience.",
    proof:
      "Swell headless commerce behind the Swiitch store: products modeled in Swell, storefront rendered in Next.js through swell-js, ten pods live. Typed content layers drive the rest: one artists file renders four /art/<slug> pages with the artists' exact words; one events data file renders events, past events and per-event galleries; a COA list renders the certificate library. Notion databases run operations as a CMS through MCP: three task boards and a client hub that a skill populates from a discovery call. Straight talk: no Sanity or Contentful in production yet.",
    evidence: ["Swell", "typed content files", "Notion via MCP", "Webflow embeds", "Apps Script + Sheets"],
  },
  {
    tag: "core",
    ask: "Partner with designers to turn static designs into interactive web experiences.",
    proof:
      "I am the designer and the engineer, so the handoff happens inside one head. Every site above started as my own art direction (brand decks, style locks, UI direction docs) and I carried it to code. When the design came from someone else, as with House Money's seven-page copy PDF and five comps, it became two A/B landing pages in a day, with a ?review=1 mode that outlines every block and labels where its copy came from.",
  },
  {
    tag: "core",
    ask: "Build internal tools that help teams author, manage and publish content at scale.",
    proof:
      "Eighteen custom Claude skills in daily use, among them a task manager that routes work to three Notion boards, a file organizer that enforces one brand folder standard, an Illustrator template builder that turns SVG plus a spec.json into editable catalogs, labels and decks, and brand-locked image pipelines. Shell and Python tools where they fit: a photo prep script that processed 274 event photos in about 17 minutes and prints the data block to paste, a batch content pipeline with a caption agent, scoring and Slack notify, and signup pipelines (site form to Apps Script to Sheet) on three sites.",
    evidence: ["Claude skills", "Python", "shell", "Apps Script", "Notion MCP"],
  },
  {
    tag: "core",
    ask: "Take defined scopes in migrations and site architecture projects.",
    proof:
      "Swiitch: migrated a static site to a Next.js and Swell store on the same repo, two Vercel projects watching two branches, a one-minute rollback by moving the domain, temporary redirects flipped to permanent after cutover, and a runbook written after a shared project broke production. October 2026: branched a minimal CBD-mode site for a payment-processor review with the full site parked and nothing deleted. Cherry Pi v4: removed 7,200 lines and three heavy dependencies.",
  },
  {
    tag: "core",
    ask: "Move quickly from concept to working prototype.",
    proof:
      "Wedding site: designed, built, RSVP pipeline wired to a spreadsheet and verified end to end, deployed to Vercel, in one session. Alpine Vapor: site planned September 17, live for The Network Show on September 23. House Money: two landing pages September 30, Webflow package October 1. Cherry Pi v4: spec July 4, approved and merged July 6.",
  },
  {
    tag: "core",
    ask: "Improve tooling and workflows, contribute to documentation and knowledge sharing.",
    proof:
      "Every repo ships a README written for the next person, including the three build failures that actually happened and their fixes. The studio runs on a CLAUDE.md workspace with a memory layer, a decision log and a brand folder standard that any session loads. A skills registry in Notion stays in sync with what is installed.",
  },
  {
    tag: "preferred",
    ask: "AI-assisted development workflows.",
    proof:
      "Claude Code is the daily editor. MCP servers for Notion, Higgsfield, Figma, Adobe and Google Workspace; eighteen custom skills; scheduled tasks; multi-agent review panels; a memory-backed workspace. Non-trivial work gets a written plan with a checkpoint per stage, and every claim is labeled verified or plausible before it ships.",
    evidence: ["Claude Code", "MCP", "skills", "scheduled tasks", "subagents"],
  },
  {
    tag: "preferred",
    ask: "Interest in generative or programmatic design.",
    proof:
      "Illustrator files generated from SVG and a spec file: a catalog rebuilt from a menu JSON, label batches, an eleven-artboard sales deck. A worksheet design system in ReportLab. Brand-locked Higgsfield generation with reusable prompt blocks and composite scripts, under one rule: brand art is placed exact, never regenerated.",
  },
  {
    tag: "preferred",
    ask: "Localization or internationalization systems.",
    proof: "Not yet. Closer to the typed content layers I build daily than it looks, and a defined scope I would take on gladly.",
  },
];

export type Project = {
  name: string;
  client: string;
  url: string;
  stack: string;
  year: string;
  body: string;
};

export const work: Project[] = [
  {
    name: "swiitchglobal.com",
    client: "Swiitch Global",
    url: "https://swiitchglobal.com",
    stack: "Next.js 15 · React 19 · Swell · Vercel",
    year: "2026",
    body: "Headless store and culture site: age gate, team lock middleware, events with a Google Sheets signup, photo galleries with native share, ComplexCon artist pages that plaque QR codes point at, and a certificate library. Two Vercel projects, one repo, branch per site.",
  },
  {
    name: "alpinevapor.com",
    client: "Alpine Vapor",
    url: "https://alpinevapor.com",
    stack: "HTML · CSS · JS · Vercel",
    year: "2026",
    body: "Brand site launched for a trade show in six days: chrome hero, flower drop, store locator with map, sorted signup list, nav that flips colour by section. Locked and unlocked by middleware as the team asked.",
  },
  {
    name: "housemoney.com/lp/membership",
    client: "House Money",
    url: "https://www.housemoney.com/lp/membership",
    stack: "Static site · Webflow embeds · Python build",
    year: "2026",
    body: "Two paid-traffic landing pages with A/B variants, UTM passthrough, mobile sticky bar and a review mode. Packaged for Webflow as thirteen embeds by a build script, under page-only rules so the developer's site stayed untouched.",
  },
  {
    name: "timothyvanessa.com",
    client: "Personal",
    url: "https://www.timothyvanessa.com",
    stack: "Single-file site · Apps Script · Sheets",
    year: "2026",
    body: "Wedding site with access code, countdown, RSVP form writing to a spreadsheet and a timed email signup. Built and verified end to end in one session.",
  },
  {
    name: "cherrypi.world",
    client: "Cherry Pi",
    url: "https://cherrypi.world",
    stack: "Next.js 16 · React 19 · Tailwind v4",
    year: "2023 to now",
    body: "The studio site, four versions in. v4 cut 7,200 lines and three heavy libraries. This resume is the current home page, with a print stylesheet so the page is also the PDF.",
  },
];

export const tools = [
  { name: "task-manager", what: "routes a task to the right Notion board from plain language" },
  { name: "illustrator-template", what: "SVG + spec.json to editable .ai catalogs, labels, decks" },
  { name: "file-organizer", what: "one brand folder standard, enforced across every project" },
  { name: "pipeline-ops", what: "brand pipeline build, edit and code prompts" },
  { name: "product-shots · higgsfield-studio", what: "brand-locked image generation with fidelity checks" },
  { name: "client-page-builder", what: "discovery call to Notion client page, hub tasks and client record" },
  { name: "worksheet-designer", what: "print-ready learning packs on a ReportLab design system" },
  { name: "compass · plan-my-week · council", what: "advisor, ledger and multi-agent review for the operator" },
  { name: "photo-prep.sh", what: "batch event photos, cap size, auto-brighten, print the data block" },
  { name: "alpine content pipeline", what: "queue, generate, caption agent, score, Slack notify" },
  { name: "signup pipelines", what: "site form to Apps Script to Google Sheet, three sites" },
  { name: "CLAUDE.md workspace", what: "memory, decision log, brand standard, loaded every session" },
];

export const experience = [
  {
    when: "2023 to now",
    role: "Founder, designer and engineer",
    where: "Cherry Pi Creative Studio (Dvnci Digital LLC), California",
    body: "Brand strategy, identity, production web and content systems for regulated consumer brands and small businesses. Retainer clients since March 2024.",
  },
  {
    when: "2026",
    role: "Brand operator, two multi-brand portfolios",
    where: "Alpine Vapor, Swiitch, House Money, Sherbinskis, Common Kings, Uncle Ed's, Boutiq",
    body: "Websites, catalogs, packaging, trade-show booths, email, decks and social, on task-based retainers where speed is the deliverable.",
  },
  {
    when: "2025 to 2026",
    role: "AI-native rebuild of the studio",
    where: "Claude Code, MCP, skills, pipelines",
    body: "Moved every workflow onto Claude Code: eighteen custom skills, MCP integrations, scheduled tasks and a memory-backed workspace that runs the studio.",
  },
  {
    when: "2016 to 2019",
    role: "Animation artist",
    where: "Emojam, All Def Studio, Los Angeles",
    body: "Startup production environment: animated content at pace, to brief.",
  },
  {
    when: "2015 to 2016",
    role: "Storyboard artist",
    where: "Val Hill, film",
    body: "Visual narrative and sequencing.",
  },
  {
    when: "2013 to 2014",
    role: "Graphic design intern",
    where: "Melody Ehsani",
    body: "Jewelry and fashion branding.",
  },
  {
    when: "2013 to now",
    role: "Tattoo artist, self-employed",
    where: "Collaborations: Melody Ehsani, Summer Walker, Thrasher Magazine, Musink, Diamond Supply Co., Nylon Magazine",
    body: "Thirteen years of client-facing craft. Where the eye was trained.",
  },
];

export const shecodes = {
  label: "SheCodes Hall of Fame graduate",
  href: "#certificates",
};

export type Education = {
  when: string;
  what: string;
  detail: string;
  certs?: { name: string; src: string }[];
};

export const education: Education[] = [
  {
    when: "2023",
    what: "SheCodes, front-end development",
    detail: "HTML, CSS, JavaScript, React, APIs. Six certificates, Hall of Fame graduate.",
    certs: [
      { name: "Basics", src: "/certificates/basics.png" },
      { name: "Basics Add-on", src: "/certificates/basics-add-on.png" },
      { name: "Plus", src: "/certificates/plus.png" },
      { name: "Plus Add-on", src: "/certificates/plus-add-on.png" },
      { name: "Responsive", src: "/certificates/responsive.png" },
      { name: "Responsive Add-on", src: "/certificates/responsive-add-on.png" },
    ],
  },
  { when: "ongoing", what: "Self-taught beyond that", detail: "Next.js, TypeScript, Python, agentic tooling, shipped on real client work" },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "web", items: ["Next.js 15/16", "React 19", "TypeScript", "Tailwind v4", "CSS", "HTML", "Vercel", "GitHub", "Swell", "Webflow", "Apps Script", "Python", "Node"] },
  { group: "design", items: ["Illustrator", "Photoshop", "Figma", "Canva", "brand systems", "art direction", "print production"] },
  { group: "ai", items: ["Claude Code", "MCP servers", "custom skills", "subagents", "Higgsfield", "Nano Banana Pro", "ElevenLabs"] },
  { group: "ops", items: ["Notion as OS", "Slack", "Google Workspace", "analytics (GA4, Search Console)", "SEO, JSON-LD, sitemaps"] },
];

export const straightTalk =
  "Not on this page: a Sanity or Contentful class CMS in production, localization systems, and a team larger than one. I have owned whole properties end to end for seven brands this year. Owning a defined scope inside a senior team is the step I want next.";
