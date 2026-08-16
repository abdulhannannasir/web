import { COUNTRIES } from "../data/seedData.js";
import NewsletterSignup from "./NewsletterSignup.jsx";
import useReveal from "../hooks/useReveal.js";

const panelStyle = {
  border: "1px solid var(--rule)",
  borderRadius: 6,
  background: "var(--paper-raised)",
  padding: 16,
  marginBottom: 20,
  boxShadow: "var(--shadow-sm)",
};

function MiniPanel({ title, dataByCountry }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`lp-reveal${visible ? " lp-in" : ""}`} style={panelStyle}>
      <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{title}</div>
      {COUNTRIES.map((country) => {
        const items = dataByCountry[country] || [];
        if (items.length === 0) return null;
        return (
          <div key={country} style={{ marginBottom: 12 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>
              {country}
            </div>
            {items.slice(0, 3).map((item) => (
              <div key={item.id} style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 6 }}>
                {item.headline}
              </div>
            ))}
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
        <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Trending</div>
        {trending.map((a, i) => (
          <button
            key={a.id}
            onClick={() => onOpen(a)}
            style={{
              display: "flex",
              gap: 10,
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              padding: "8px 0",
              borderBottom: i < trending.length - 1 ? "1px solid var(--rule)" : "none",
              transition: "padding-left var(--dur-fast) var(--ease)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "4px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
          >
            <span style={{ fontFamily: "var(--serif)", fontWeight: 700, color: "var(--gold)", fontSize: 18 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 13.5, lineHeight: 1.4 }}>{a.title}</span>
          </button>
        ))}
      </div>

      <MiniPanel title="News Wire" dataByCountry={newsWire} />
      <MiniPanel title="Legislative Updates" dataByCountry={legislative} />

      <style>{`
        @media (max-width: 900px) {
          .sidebar { position: static !important; }
        }
      `}</style>
    </aside>
  );
}
