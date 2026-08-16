import { CATEGORIES } from "../data/seedData.js";

export default function Footer({ onNavigate, onCategory }) {
  return (
    <footer style={{ background: "var(--forest)", color: "var(--paper)", marginTop: 60 }}>
      <div
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 32,
          padding: "44px 20px 28px",
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 22, marginBottom: 10 }}>
            Legal Perspective
          </div>
          <p style={{ fontSize: 13.5, color: "#d4ddd8", lineHeight: 1.6, maxWidth: 320 }}>
            Legal analysis and commentary for Pakistan and beyond — corporate, constitutional,
            technology, and regulatory law, written by practitioners.
          </p>
        </div>

        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8fa89a", marginBottom: 12 }}>
            CATEGORIES
          </div>
          {CATEGORIES.slice(0, 4).map((cat) => (
            <a
              key={cat}
              href="#category"
              onClick={(e) => { e.preventDefault(); onCategory(cat); }}
              style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}
            >
              {cat}
            </a>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8fa89a", marginBottom: 12 }}>
            RESOURCES
          </div>
          <a href="#write" onClick={(e) => { e.preventDefault(); onNavigate("write"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}>
            Write for Us
          </a>
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}>
            News Wire
          </a>
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}>
            Legislative Updates
          </a>
        </div>

        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8fa89a", marginBottom: 12 }}>
            COMPANY
          </div>
          <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("about"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}>
            About
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}>
            Contact
          </a>
          <a href="#write" onClick={(e) => { e.preventDefault(); onNavigate("write"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}>
            Submit an article
          </a>
          <a href="#advertise" onClick={(e) => { e.preventDefault(); onNavigate("advertise"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8", marginBottom: 8 }}>
            Advertise
          </a>
          <a href="#admin" onClick={(e) => { e.preventDefault(); onNavigate("admin"); }} style={{ display: "block", fontSize: 13.5, color: "#d4ddd8" }}>
            Admin Portal
          </a>
        </div>
      </div>
      <div
        className="wrap"
        style={{
          borderTop: "1px solid #2d4a3f",
          padding: "16px 20px",
          fontSize: 12,
          color: "#8fa89a",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>© {new Date().getFullYear()} Legal Perspective. All rights reserved.</span>
        <span style={{ display: "flex", gap: 16 }}>
          <a href="#terms" onClick={(e) => { e.preventDefault(); onNavigate("terms"); }} style={{ color: "#8fa89a" }}>
            Terms
          </a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); onNavigate("privacy"); }} style={{ color: "#8fa89a" }}>
            Privacy
          </a>
        </span>
      </div>
    </footer>
  );
}
