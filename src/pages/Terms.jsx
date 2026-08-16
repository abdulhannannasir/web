function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 26 }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 8 }}>{title}</h2>
      <div style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--text)" }}>{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <div className="wrap" style={{ padding: "40px 20px 60px", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 6 }}>Terms of Service</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28 }}>Last updated: {new Date().toLocaleDateString()}</p>

      <Section title="1. Acceptance of terms">
        By accessing or using Legal Perspective (the "Site"), you agree to be bound by these Terms of Service. If
        you do not agree, please do not use the Site.
      </Section>

      <Section title="2. Not legal advice">
        Content published on the Site is provided for general informational purposes only and does not constitute
        legal advice. Reading or interacting with the Site does not create a lawyer-client relationship between you
        and Legal Perspective, its contributors, or any affiliated individual. Always consult a qualified lawyer
        licensed in your jurisdiction for advice on a specific matter.
      </Section>

      <Section title="3. Submissions">
        If you submit an article, comment, or other material through the Site (including via "Write for Us"), you
        represent that it is your own original work and that you have the right to submit it. By submitting, you
        grant Legal Perspective a non-exclusive, royalty-free license to publish, edit, and distribute the
        submission on the Site. Editorial review does not guarantee publication.
      </Section>

      <Section title="4. Sponsored content">
        Certain content on the Site is paid for by third parties and is always clearly labeled as sponsored or
        paid content. Sponsored content reflects the views of the sponsor, not the independent editorial position
        of Legal Perspective.
      </Section>

      <Section title="5. Intellectual property">
        Unless otherwise noted, all editorial content on the Site is the property of Legal Perspective or its
        contributors and may not be reproduced without permission.
      </Section>

      <Section title="6. Limitation of liability">
        The Site and its content are provided "as is" without warranties of any kind. Legal Perspective is not
        liable for any loss or damage arising from reliance on content published on the Site, to the fullest
        extent permitted by applicable law.
      </Section>

      <Section title="7. Changes to these terms">
        These Terms may be updated from time to time. Continued use of the Site after changes are posted
        constitutes acceptance of the revised Terms.
      </Section>

      <Section title="8. Contact">
        Questions about these Terms can be sent through our Contact page.
      </Section>
    </div>
  );
}
