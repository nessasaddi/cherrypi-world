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
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Who We Are</h2>
            <p className="text-balance">
              Cherry Pi Creative Studio (DBA of Dvnci Digital LLC) is a
              California-based creative technology studio. This policy explains
              how we collect, use, and protect your information when you visit
              cherrypi.world or interact with the Cherry Pi terminal.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Information We Collect</h2>
            <p className="text-balance mb-3">
              We collect only what you voluntarily provide:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Your name and email address when you use the terminal chat</li>
              <li>Messages you send through the terminal conversation</li>
              <li>Project details and inquiry information you choose to share</li>
            </ul>
            <p className="text-balance mt-3">
              We do not collect IP addresses for tracking, use cookies, or run
              third-party analytics or advertising scripts.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">AI-Powered Terminal</h2>
            <p className="text-balance mb-3">
              The terminal chat on this site is powered by a third-party AI
              language model. When you send a message through the terminal:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Your messages are sent to Anthropic (the AI provider) for processing and response generation</li>
              <li>Anthropic does not use API inputs to train its models</li>
              <li>Conversations are not stored by the AI provider beyond the active session</li>
              <li>Your name, email, and full conversation transcript are sent to Cherry Pi as a project inquiry when the conversation concludes</li>
            </ul>
            <p className="text-balance mt-3">
              Do not share sensitive personal information (financial data,
              passwords, government IDs) through the terminal. It is designed
              for project inquiries only.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">How We Store Your Data</h2>
            <p className="text-balance mb-3">
              When a terminal conversation concludes, your inquiry is stored in two places:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Email notification delivered to Cherry Pi for review and follow-up</li>
              <li>A private internal database used to manage and respond to project inquiries</li>
            </ul>
            <p className="text-balance mt-3">
              Your browser may also store your active conversation locally
              (using localStorage) so it persists if you refresh the page. This
              data stays on your device and is cleared when you start a new
              conversation.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">How We Use Your Information</h2>
            <p className="text-balance">
              Information you provide is used solely to respond to your inquiry,
              scope potential projects, and communicate with you about our
              services. We never sell, rent, share, or distribute your personal
              information to third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Data Retention</h2>
            <p className="text-balance">
              We retain inquiry data for as long as necessary to respond to your
              request and manage our business relationship. You may request
              deletion of your data at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Your Rights</h2>
            <p className="text-balance mb-3">
              Under the California Consumer Privacy Act (CCPA) and other
              applicable laws, you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Know what personal information we have collected about you</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of the sale of your personal information (we do not sell personal data)</li>
              <li>Non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="text-balance mt-3">
              To exercise any of these rights, contact us at the email below.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Third-Party Services</h2>
            <p className="text-balance">
              This site uses Anthropic&apos;s API for terminal chat responses,
              and Vercel for hosting. These providers process data under their
              own privacy policies and terms of service. Our site may also
              contain links to external platforms such as LinkedIn and
              Instagram, which operate under their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Security</h2>
            <p className="text-balance">
              We use industry-standard security measures to protect your data,
              including encrypted connections (HTTPS), secure API key
              management, and access-controlled internal systems. However, no
              method of electronic transmission or storage is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Changes to This Policy</h2>
            <p className="text-balance">
              We may update this policy to reflect changes in our practices or
              legal requirements. The &quot;last updated&quot; date below will
              be revised accordingly.
            </p>
          </div>

          <div>
            <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Contact</h2>
            <p className="text-balance">
              If you have questions about this policy or want to exercise your
              data rights, reach out at{" "}
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
