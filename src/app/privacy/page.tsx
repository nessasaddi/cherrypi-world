export const metadata = {
  title: "Privacy Policy — Cherry Pi Creative Studio",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-cherry font-body font-medium mb-10">
          Legal
        </p>
        <h1 className="font-heading text-3xl md:text-[44px] font-bold leading-[1.1] tracking-tight mb-12">
          Privacy Policy
        </h1>

        <div className="space-y-10 text-foreground-muted text-[15px] leading-relaxed font-body font-light">
          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Information We Collect</h2>
            <p className="text-balance">
              Cherry Pi Creative Studio collects only the information you
              voluntarily provide — such as your name, email address, and project
              details when you reach out through our contact channels. We do not
              use tracking cookies or third-party analytics scripts.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">How We Use Your Information</h2>
            <p className="text-balance">
              Any information you provide is used solely to respond to your
              inquiry, scope potential projects, and communicate about our
              services. We never sell, share, or distribute your personal
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Cookies &amp; Tracking</h2>
            <p className="text-balance">
              This website does not use cookies for tracking purposes. No
              third-party advertising or remarketing scripts are loaded on this
              site.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Third-Party Services</h2>
            <p className="text-balance">
              Our site may contain links to external platforms such as LinkedIn
              and Instagram. These platforms operate under their own privacy
              policies, which we encourage you to review.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Contact</h2>
            <p className="text-balance">
              If you have questions about this policy, reach out at{" "}
              <a href="mailto:hello@cherrypi.studio" className="text-cherry hover:text-foreground transition-colors duration-300">
                hello@cherrypi.studio
              </a>.
            </p>
          </div>

          <p className="text-foreground-faint text-sm pt-8">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </main>
  );
}
