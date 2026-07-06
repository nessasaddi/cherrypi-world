import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Cherry Pi",
  description: "How Cherry Pi collects, uses, and protects your information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <div className="px-6 py-5 border-b border-black/[0.05]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 transition-colors duration-200"
          style={{ color: "var(--color-foreground-faint)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back to cherrypi.world
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        {/* Label */}
        <p
          className="font-body font-medium uppercase mb-6"
          style={{ fontSize: "0.7rem", letterSpacing: "0.22em", color: "var(--color-cherry)" }}
        >
          Legal
        </p>

        {/* Title */}
        <h1
          className="font-heading font-semibold text-foreground mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          Privacy Policy
        </h1>
        <p className="font-body font-light mb-16" style={{ color: "var(--color-foreground-muted)", fontSize: "0.9rem" }}>
          Last updated: July 2026
        </p>

        {/* Sections */}
        <div className="space-y-12 font-body font-light" style={{ color: "var(--color-foreground-muted)", fontSize: "0.9375rem", lineHeight: 1.75 }}>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Who we are
            </h2>
            <p>
              Cherry Pi Creative Studio is the DBA of Dvnci Digital LLC, a California-based creative studio.
              This policy explains how we collect, use, and protect your information when you visit cherrypi.world.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              What we collect
            </h2>
            <ul className="space-y-2 pl-5 list-disc">
              <li><strong className="text-foreground font-medium">Usage analytics</strong> — we use Google Analytics to understand how visitors use the site (pages viewed, approximate location, device type). This may involve cookies set by Google.</li>
              <li><strong className="text-foreground font-medium">Email address</strong> — only if you subscribe to our newsletter. The signup form submits directly to Substack; we do not store your email on this site.</li>
            </ul>
            <p className="mt-4">
              We do not serve third-party advertising, and we never sell, rent, share, or distribute
              your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              How we use your information
            </h2>
            <p>
              Analytics data is used solely to understand site performance and improve the experience.
              If you email us or subscribe to the newsletter, your information is used only to respond
              to your inquiry or deliver the newsletter.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Your rights
            </h2>
            <p className="mb-4">Under the CCPA and other applicable laws, you have the right to:</p>
            <ul className="space-y-2 pl-5 list-disc">
              <li>Know what personal information we have collected about you</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of the sale of your personal information — we do not sell personal data</li>
              <li>Non-discrimination for exercising your privacy rights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Third-party services
            </h2>
            <ul className="space-y-2 pl-5 list-disc">
              <li><strong className="text-foreground font-medium">Vercel</strong> — hosts the site</li>
              <li><strong className="text-foreground font-medium">Google Analytics</strong> — site usage analytics</li>
              <li><strong className="text-foreground font-medium">Substack</strong> — handles newsletter signups and delivery</li>
            </ul>
            <p className="mt-4">
              Each of these providers operates under its own privacy policy and terms of service.
              This site may also contain links to external platforms such as LinkedIn and GitHub, which operate
              under their own policies.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Security
            </h2>
            <p>
              All data in transit is encrypted via HTTPS. No sensitive credentials are stored client-side.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Changes to this policy
            </h2>
            <p>
              We may update this policy to reflect changes in our practices or applicable law.
              The date at the top of this page will be updated when changes are made.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Contact
            </h2>
            <p>
              Questions about this policy or requests to exercise your data rights:{" "}
              <a
                href="mailto:hello@cherrypi.world"
                className="font-medium transition-colors duration-200"
                style={{ color: "var(--color-cherry)" }}
              >
                hello@cherrypi.world
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
