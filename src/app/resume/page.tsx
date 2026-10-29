import type { Metadata } from 'next';
import Script from 'next/script';
import Nav from '@/components/resume/Nav';
import Hero from '@/components/resume/Hero';
import Fit from '@/components/resume/Fit';
import Work from '@/components/resume/Work';
import Tools from '@/components/resume/Tools';
import Experience from '@/components/resume/Experience';
import Contact from '@/components/resume/Contact';
import { person } from '@/data/resume';

const SITE_URL = 'https://cherrypi.world';
const TITLE = 'Vanessa Saddi: Front End Engineer, Marketing. Designer first, engineer by necessity.';
const DESC =
  'Resume of Vanessa Saddi: designer-engineer with five live production sites, Next.js and React, headless content systems, internal tooling and AI-assisted workflows. Built for the Anthropic Brand Web team.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/resume' },
  openGraph: {
    type: 'profile',
    url: `${SITE_URL}/resume`,
    siteName: 'Cherry Pi',
    title: TITLE,
    description: DESC,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Vanessa Saddi' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og-image.png'] },
};

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main className="with-rail">
        <Hero />
        <Fit />
        <Work />
        <Tools />
        <Experience />
        <Contact />
      </main>
      <Script
        id="json-ld-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: person.name,
          url: `${SITE_URL}/resume`,
          image: `${SITE_URL}/portrait-vsaddi.jpg`,
          jobTitle: 'Designer and Front End Engineer',
          worksFor: { '@type': 'Organization', name: 'Cherry Pi Creative Studio', url: SITE_URL },
          email: `mailto:${person.email}`,
          address: { '@type': 'PostalAddress', addressLocality: 'Los Angeles', addressRegion: 'CA', addressCountry: 'US' },
          sameAs: person.links.filter((l) => l.href.startsWith('https://github') || l.href.includes('linkedin')).map((l) => l.href),
          knowsAbout: ['Next.js', 'React', 'TypeScript', 'CSS', 'design systems', 'headless CMS', 'brand identity', 'art direction', 'AI-assisted development', 'Claude Code'],
        }) }}
      />
    </>
  );
}
