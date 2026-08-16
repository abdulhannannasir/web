function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 26 }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 8 }}>{title}</h2>
      <div style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--text)" }}>{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="wrap" style={{ padding: "40px 20px 60px", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 6 }}>Privacy Policy</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28 }}>Last updated: {new Date().toLocaleDateString()}</p>

      <Section title="1. What we collect">
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>Email address, if you subscribe to our newsletter</li>
          <li>Name, email, and message content, if you use the Contact form</li>
          <li>Name, email, and article content (and optional file attachment), if you submit via Write for Us</li>
          <li>Basic technical data (browser type, general location) collected automatically by hosting infrastructure</li>
        </ul>
      </Section>

      <Section title="2. How we use it">
        We use this information to operate the Site: to send newsletter updates you've opted into, to respond to
        messages, and to review and publish article submissions. We do not sell your personal information.
      </Section>

      <Section title="3. Where it's stored">
        Data is stored with our infrastructure provider (Supabase). Reasonable technical safeguards are used, but
        no online service can guarantee absolute security.
      </Section>

      <Section title="4. Your choices">
        You can unsubscribe from the newsletter at any time via the link in any newsletter email, or by contacting
        us directly. You can request that we delete your submission or contact-form data by reaching out through
        the Contact page.
      </Section>

      <Section title="5. Cookies">
        The Site does not use third-party advertising or tracking cookies. Any analytics used are limited to
        aggregate, non-identifying usage statistics.
      </Section>

      <Section title="6. Changes to this policy">
        This policy may be updated from time to time; the "Last updated" date above will reflect the most recent
        revision.
      </Section>

      <Section title="7. Contact">
        For any privacy-related request, please use our Contact page.
      </Section>
    </div>
  );
}
