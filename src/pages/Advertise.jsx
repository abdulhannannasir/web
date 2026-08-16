export default function Advertise({ onNavigate }) {
  return (
    <div className="wrap" style={{ padding: "40px 20px 60px", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 10 }}>Advertise with Legal Perspective</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 15.5, lineHeight: 1.7, marginBottom: 28 }}>
        Reach a legally literate audience of practitioners, in-house counsel, and law students through clearly
        labeled sponsored placements — never disguised as editorial content.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 18, background: "var(--paper-raised)" }}>
          <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Sponsored placement</div>
          <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
            A labeled card in the homepage Sponsored section — your firm name, a headline, a short blurb, and a link
            to your site.
          </p>
        </div>
        <div style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 18, background: "var(--paper-raised)" }}>
          <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Featured firm profile</div>
          <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
            A longer-form profile piece introducing your firm's practice areas and team, clearly marked as sponsored.
          </p>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 8 }}>Our standard</h2>
      <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--text)", marginBottom: 28 }}>
        All sponsored content is labeled "Sponsored" and visually separated from editorial coverage. We reserve the
        right to decline placements that misrepresent legal fact or conflict with our editorial independence.
      </p>

      <button className="btn btn-oxblood" onClick={() => onNavigate("contact")}>
        Get in touch about sponsorship
      </button>
    </div>
  );
}
