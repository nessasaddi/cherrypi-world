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
  title: "Cherry Pi — Creative Studio. Built by Hand, Shipped Like Software.",
  description:
    "A one-person creative studio: brand strategy, design, and full-stack engineering under one roof. California, est. 2023.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cherry Pi",
    title: "Cherry Pi — Creative Studio. Built by Hand, Shipped Like Software.",
    description:
      "A one-person creative studio: brand strategy, design, and full-stack engineering under one roof. California, est. 2023.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cherry Pi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherry Pi — Creative Studio. Built by Hand, Shipped Like Software.",
    description:
      "A one-person creative studio: brand strategy, design, and full-stack engineering under one roof. California, est. 2023.",
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
            "@type": "Organization",
            name: "Cherry Pi",
            url: SITE_URL,
            logo: `${SITE_URL}/logos/cherry-pi-logo.png`,
            description: "Cherry Pi is a one-person creative studio — brand strategy, design, and full-stack engineering under one roof. Built by hand, shipped like software. California, est. 2023.",
            founder: { "@type": "Person", name: "Vanessa Saddi" },
            foundingDate: "2023",
            areaServed: "Worldwide",
            address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
            contactPoint: { "@type": "ContactPoint", email: "hello@cherrypi.world", contactType: "customer service" },
            sameAs: [
              "https://www.linkedin.com/company/cherrypi",
              "https://www.instagram.com/ch3rry.p1",
            ],
            knowsAbout: ["brand strategy", "brand identity", "art direction", "design systems", "full-stack web development", "creative studio"],
          })}}
        />
      </body>
    </html>
  );
}
