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
          Last updated: April 2026
        </p>

        {/* Sections */}
        <div className="space-y-12 font-body font-light" style={{ color: "var(--color-foreground-muted)", fontSize: "0.9375rem", lineHeight: 1.75 }}>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Who we are
            </h2>
            <p>
              Cherry Pi Creative Studio is the DBA of Dvnci Digital LLC, a California-based creative technology studio.
              This policy explains how we collect, use, and protect your information when you visit cherrypi.world
              or interact with the Cherry Pi chat.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              What we collect
            </h2>
            <p className="mb-4">We collect only what you voluntarily provide through the chat interface:</p>
            <ul className="space-y-2 pl-5 list-disc">
              <li><strong className="text-foreground font-medium">Name</strong> — entered in the intake form before the conversation begins</li>
              <li><strong className="text-foreground font-medium">Email address</strong> — entered in the intake form</li>
              <li><strong className="text-foreground font-medium">Conversation messages</strong> — everything you type during the chat session</li>
            </ul>
            <p className="mt-4">
              We do not use cookies, run analytics scripts, collect IP addresses for tracking,
              or serve third-party advertising of any kind.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              How the chat works
            </h2>
            <p className="mb-4">
              The Cherry Pi chat is powered by a third-party AI language model. When you send a message:
            </p>
            <ul className="space-y-2 pl-5 list-disc">
              <li>Your name, email, and message history are sent to <strong className="text-foreground font-medium">Anthropic</strong> (the AI provider) to generate a response</li>
              <li>Anthropic does not use API inputs to train its models</li>
              <li>Messages are not retained by Anthropic beyond the active request</li>
            </ul>
            <p className="mt-4">
              Please do not share sensitive personal information — financial data, passwords,
              or government IDs — through the chat. It is designed for project inquiries only.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Where your data goes
            </h2>
            <p className="mb-4">
              Your conversation is stored locally on your device (via <code className="text-foreground bg-surface px-1.5 py-0.5 rounded text-[13px]">localStorage</code>) for up to 7 days,
              so it persists if you refresh the page. This data stays on your device and is cleared when you start a new conversation.
            </p>
            <p className="mb-4">
              When a conversation concludes — specifically when Cherry Pi offers to send your inquiry to Vanessa and you confirm — the following is triggered automatically:
            </p>
            <ul className="space-y-2 pl-5 list-disc">
              <li>An <strong className="text-foreground font-medium">email notification</strong> containing your name, email, and full conversation transcript is sent to Vanessa for review and follow-up</li>
              <li>A <strong className="text-foreground font-medium">private internal record</strong> is created in our project management database (name, email, and a summary of the transcript)</li>
            </ul>
            <p className="mt-4">
              This only happens when the conversation is explicitly closed and handed off — not on every message you send.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              How we use your information
            </h2>
            <p>
              Information you provide is used solely to respond to your inquiry, scope potential
              projects, and communicate with you about our services. We never sell, rent, share,
              or distribute your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Data retention
            </h2>
            <p>
              We retain inquiry records for as long as necessary to respond to your request and
              manage any ongoing business relationship. You may request deletion of your data
              at any time by contacting us at the email below.
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
              <li><strong className="text-foreground font-medium">Anthropic</strong> — processes chat messages to generate AI responses</li>
              <li><strong className="text-foreground font-medium">Vercel</strong> — hosts the site and handles serverless function execution</li>
              <li><strong className="text-foreground font-medium">Gmail (Google)</strong> — delivers inquiry notification emails to Vanessa</li>
            </ul>
            <p className="mt-4">
              Each of these providers operates under its own privacy policy and terms of service.
              This site may also contain links to external platforms such as LinkedIn, which operate
              under their own policies.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-foreground mb-3" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Security
            </h2>
            <p>
              All data in transit is encrypted via HTTPS. API keys and credentials are managed through
              secure environment variables and are never exposed to the browser. No sensitive credentials
              are stored client-side.
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
