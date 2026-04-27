export const REEL_PALETTE = [
  { bg: 'linear-gradient(160deg, #2b1d1a 0%, #EF5541 100%)', tag: 'PRODUCT_LAUNCH', caption: 'wknd drop · v.03', brand: 'PRISM', accent: '#EF5541' },
  { bg: 'linear-gradient(180deg, #1a2030 0%, #AEBEFF 110%)', tag: 'FOUNDER_STORY', caption: 'behind the build', brand: 'MERIDIAN', accent: '#AEBEFF' },
  { bg: 'linear-gradient(200deg, #1f2410 0%, #D0DD57 110%)', tag: 'UGC_REPLY', caption: 'what users said', brand: 'FLUX', accent: '#D0DD57' },
  { bg: 'linear-gradient(170deg, #2a1714 0%, #EDA599 110%)', tag: 'PRODUCT_DEMO', caption: '30-sec walk-thru', brand: 'SLATE', accent: '#EDA599' },
  { bg: 'linear-gradient(190deg, #1a1a1a 0%, #EF5541 100%)', tag: 'TESTIMONIAL', caption: 'what made it click', brand: 'CREST', accent: '#EF5541' },
  { bg: 'linear-gradient(210deg, #181f2c 0%, #AEBEFF 110%)', tag: 'BTS', caption: 'shot on set · 04.18', brand: 'ARC', accent: '#AEBEFF' },
  { bg: 'linear-gradient(150deg, #232a14 0%, #D0DD57 110%)', tag: 'AD_VARIANT_07', caption: 'test cell · winner', brand: 'ATLAS', accent: '#D0DD57' },
] as const;

export const SITES = [
  { name: 'Prism Brand', url: 'prismbrand.com', brand: 'PRISM', headline: 'Cannabis as ritual.', sub: 'Direct-to-shelf brand system + e-comm for a regional cannabis house.', bg: 'linear-gradient(140deg, #2a1a18 0%, #EF5541 110%)', accent: '#EF5541', tag: 'BRAND · WEB · CRM', year: '2026' },
  { name: 'Meridian Objects', url: 'meridian-objects.co', brand: 'MERIDIAN', headline: 'Objects, charted.', sub: 'Catalog and storytelling site for an independent collectibles label.', bg: 'linear-gradient(160deg, #1a2030 0%, #AEBEFF 110%)', accent: '#AEBEFF', tag: 'WEB · CONTENT-OS', year: '2025' },
  { name: 'Flux Brand', url: 'fluxbrand.io', brand: 'FLUX', headline: 'Built for the next batch.', sub: 'Wholesale + retail face for a vertically integrated cannabis brand.', bg: 'linear-gradient(180deg, #1f2410 0%, #D0DD57 120%)', accent: '#D0DD57', tag: 'BRAND · SOCIAL', year: '2025' },
  { name: 'Slate Studio', url: 'slate.studio', brand: 'SLATE', headline: 'A studio in software.', sub: 'Identity, web, CRM and operations for a creative production house.', bg: 'linear-gradient(170deg, #2a1714 0%, #EDA599 110%)', accent: '#EDA599', tag: 'DATA · WEB · CRM', year: '2025' },
];

export const EVENTS = [
  { t: 'T+00:00', c: 'DETECT', text: 'fatigue_cpm signal · cell_03', color: '#EF5541' },
  { t: 'T+00:04', c: 'BRIEF',  text: 'haruspex · 5 net-new angles', color: '#AEBEFF' },
  { t: 'T+00:18', c: 'GEN',    text: 'imago · 24 creatives staged', color: '#D0DD57' },
  { t: 'T+00:22', c: 'QA',     text: 'augur · 24/24 pass · brand-safe', color: '#D0DD57' },
  { t: 'T+00:24', c: 'PUSH',   text: 'meta-ads · 6 campaigns · live', color: '#EF5541' },
  { t: 'T+24:00', c: 'REPORT', text: 'vigil · cpa -34% · ctr +1.8x', color: '#EDA599' },
];

export const MARQUEE_ITEMS = [
  'LESS PROMPT-WRANGLING',
  'MORE SHIPPING',
  'ON-BRAND BY DEFAULT',
  "AGENTS DON'T SLEEP",
  'AUTOPILOT FOR FOUNDERS',
];

export const DROP_TARGET_MS = new Date('2027-05-05T16:00:00Z').getTime();
export const DROP_TOTAL_MS = 1000 * 60 * 60 * 24 * 60;
