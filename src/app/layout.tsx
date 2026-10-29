import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono, Fraunces, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-3S3Q93LXN0";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://cherrypi.world";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vanessa Saddi: Front End Engineer, Marketing. Designer first, engineer by necessity.",
  description:
    "Resume of Vanessa Saddi: designer-engineer with six live production sites, Next.js and React, headless content systems, internal tooling and AI-assisted workflows. Built for the Anthropic Brand Web team.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cherry Pi",
    title: "Vanessa Saddi: Front End Engineer, Marketing. Designer first, engineer by necessity.",
    description:
      "Resume of Vanessa Saddi: designer-engineer with six live production sites, Next.js and React, headless content systems, internal tooling and AI-assisted workflows. Built for the Anthropic Brand Web team.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cherry Pi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanessa Saddi: Front End Engineer, Marketing. Designer first, engineer by necessity.",
    description:
      "Resume of Vanessa Saddi: designer-engineer with six live production sites, Next.js and React, headless content systems, internal tooling and AI-assisted workflows. Built for the Anthropic Brand Web team.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* GA4 in <head> for Google Search Console ownership verification */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');` }} />
      </head>
      <body
        className={`${fraunces.variable} ${caveat.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Vanessa Saddi",
            url: SITE_URL,
            image: `${SITE_URL}/portrait-vsaddi.jpg`,
            jobTitle: "Designer and Front End Engineer",
            worksFor: { "@type": "Organization", name: "Cherry Pi Creative Studio", url: SITE_URL },
            email: "mailto:nessasaddi@gmail.com",
            address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA", addressCountry: "US" },
            sameAs: [
              "https://github.com/nessasaddi",
              "https://www.linkedin.com/company/cherrypi",
            ],
            knowsAbout: ["Next.js", "React", "TypeScript", "CSS", "design systems", "headless CMS", "brand identity", "art direction", "AI-assisted development", "Claude Code"],
          })}}
        />
      </body>
    </html>
  );
}
