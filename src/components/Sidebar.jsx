import { COUNTRIES } from "../data/seedData.js";
import NewsletterSignup from "./NewsletterSignup.jsx";
import useReveal from "../hooks/useReveal.js";

const panelStyle = {
  border: "1px solid var(--rule)",
  borderRadius: 12,
  background: "var(--paper-raised)",
  padding: 18,
  marginBottom: 20,
  boxShadow: "var(--shadow-sm)",
};

function WirePanel({ title, dataByCountry, variant }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`lp-reveal${visible ? " lp-in" : ""}`} style={panelStyle}>
      <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 16.5, marginBottom: 14 }}>{title}</div>
      {COUNTRIES.map((country) => {
        const items = dataByCountry[country] || [];
        if (items.length === 0) return null;
        return (
          <div key={country} style={{ marginBottom: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              {country}
            </div>
            {items.slice(0, 3).map((item) =>
              variant === "wire" ? (
                <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>
                  <span className="lp-pulse-dot" style={{ marginTop: 6 }} />
                  <span>{item.headline}</span>
                </div>
              ) : (
                <div
                  key={item.id}
                  style={{
                    borderLeft: "2px solid var(--forest)",
                    paddingLeft: 10,
                    fontSize: 13,
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}
                >
                  {item.headline}
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Sidebar({ trending, onOpen, newsWire, legislative, onSubscribe }) {
  const [ref, visible] = useReveal();
  return (
    <aside className="sidebar" style={{ position: "sticky", top: 92, alignSelf: "start" }}>
      <NewsletterSignup onSubscribe={onSubscribe} />
      <div ref={ref} className={`lp-reveal${visible ? " lp-in" : ""}`} style={panelStyle}>
        <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 16.5, marginBottom: 12 }}>Trending</div>
        {trending.map((a, i) => (
          <button
            key={a.id}
            onClick={() => onOpen(a)}
            style={{
              display: "flex",
              gap: 12,
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              padding: "10px 0",
              borderBottom: i < trending.length - 1 ? "1px solid var(--rule)" : "none",
              transition: "padding-left var(--dur-fast) var(--ease)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "4px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
          >
            <span style={{ fontFamily: "var(--serif)", fontWeight: 800, color: "var(--gold)", fontSize: 19, lineHeight: 1.2 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 14, lineHeight: 1.4, color: "var(--ink)" }}>{a.title}</span>
          </button>
        ))}
      </div>

      <WirePanel title="News Wire" dataByCountry={newsWire} variant="wire" />
      <WirePanel title="Legislative Updates" dataByCountry={legislative} variant="legislative" />

      <style>{`
        @media (max-width: 900px) {
          .sidebar { position: static !important; }
        }
      `}</style>
    </aside>
  );
}
