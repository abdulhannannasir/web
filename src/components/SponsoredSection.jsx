export default function SponsoredSection({ items }) {
  const active = items.filter((s) => s.active);
  if (active.length === 0) return null;

  return (
    <section style={{ margin: "36px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "var(--gold-soft)",
            color: "var(--gold)",
            border: "1px solid var(--gold)",
            padding: "3px 8px",
            borderRadius: 3,
          }}
        >
          Sponsored
        </span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Paid placements — not editorial content</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {active.map((s) => (
          <a
            key={s.id}
            href={s.link || "#"}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: "block",
              border: "1px solid var(--gold)",
              borderRadius: 4,
              padding: 16,
              background: "var(--paper-raised)",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--gold)", marginBottom: 6 }}>
              {s.firmName}
            </div>
            <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{s.blurb}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
