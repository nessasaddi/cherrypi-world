import type { Metadata } from "next";
import { Syne, Outfit, Space_Grotesk, DM_Sans, JetBrains_Mono, Fraunces, Caveat } from "next/font/google";
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

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
});

const SITE_URL = "https://cherrypi.world";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cherry Pi — Autonomous Brand Infrastructure. One Operator.",
  description:
    "Autonomous brand infrastructure, built and run by one operator. Strategy, design, AI content pipelines, and full-stack web — engineered like software. California, est. 2023.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cherry Pi",
    title: "Cherry Pi — Autonomous Brand Infrastructure. One Operator.",
    description:
      "Strategy, design, autonomous content pipelines, custom AI tooling, and full-stack web — built and run by one operator. Not an agency. A brand operator.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cherry Pi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherry Pi — Autonomous Brand Infrastructure. One Operator.",
    description:
      "Strategy, design, autonomous content pipelines, custom AI tooling, and full-stack web — built and run by one operator. Not an agency. A brand operator.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
        className={`${fraunces.variable} ${caveat.variable} ${syne.variable} ${outfit.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cherry Pi",
            url: SITE_URL,
            logo: `${SITE_URL}/logos/cherry-pi-logo.png`,
            description: "Cherry Pi builds and runs autonomous brand infrastructure — strategy, design, AI content pipelines, custom AI tooling, and full-stack web. One operator. Full stack. Not an agency. A brand operator.",
            founder: { "@type": "Person", name: "Vanessa Saddi" },
            foundingDate: "2023",
            areaServed: "Worldwide",
            address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
            contactPoint: { "@type": "ContactPoint", email: "hello@cherrypi.world", contactType: "customer service" },
            sameAs: [
              "https://www.linkedin.com/company/cherrypi",
              "https://www.instagram.com/ch3rry.p1",
            ],
            knowsAbout: ["autonomous brand infrastructure", "AI brand operator", "content pipeline automation", "brand identity", "full-stack web development", "custom AI tooling", "brand operator for startups"],
          })}}
        />
      </body>
    </html>
  );
}
