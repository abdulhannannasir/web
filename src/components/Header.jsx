import { useEffect, useState } from "react";
import { CATEGORIES } from "../data/seedData.js";

function NavLink({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="#"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "relative", paddingBottom: 2 }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: 0,
          right: hover ? 0 : "100%",
          bottom: -2,
          height: 1,
          background: "var(--seal)",
          transition: "right var(--dur-fast) var(--ease)",
        }}
      />
    </a>
  );
}

export default function Header({ onNavigate, onCategory, isAdmin }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        borderBottom: "1px solid var(--rule)",
        background: scrolled ? "rgba(247, 244, 238, 0.86)" : "var(--paper-raised)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "background var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)",
      }}
    >
      {/* Utility bar */}
      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.04em",
          color: "var(--text-muted)",
          padding: "8px 20px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <span>{today.toUpperCase()}</span>
        <nav style={{ display: "flex", gap: 18 }}>
          <NavLink onClick={(e) => { e.preventDefault(); onNavigate("write"); }}>WRITE FOR US</NavLink>
          <NavLink onClick={(e) => { e.preventDefault(); onNavigate("advertise"); }}>ADVERTISE</NavLink>
          <NavLink onClick={(e) => { e.preventDefault(); onNavigate("admin"); }}>
            {isAdmin ? "ADMIN DASHBOARD" : "ADMIN PORTAL"}
          </NavLink>
        </nav>
      </div>

      {/* Main nav */}
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}
      >
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
          style={{ fontFamily: "var(--serif)", fontWeight: 800, fontSize: 29, letterSpacing: "0.005em", color: "var(--ink)" }}
        >
          Legal Perspective
        </a>

        <div style={{ position: "relative" }}>
          <button
            className="btn btn-outline"
            onClick={() => setDropdownOpen((v) => !v)}
            style={{ fontSize: 13 }}
          >
            Categories ▾
          </button>
          {dropdownOpen && (
            <div
              className="lp-fade-in"
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                background: "var(--paper-raised)",
                border: "1px solid var(--rule)",
                borderRadius: 6,
                boxShadow: "var(--shadow-lg)",
                minWidth: 240,
                zIndex: 20,
                overflow: "hidden",
              }}
            >
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href="#category"
                  onClick={(e) => {
                    e.preventDefault();
                    onCategory(cat);
                    setDropdownOpen(false);
                  }}
                  style={{
                    display: "block",
                    padding: "10px 16px",
                    fontSize: 14,
                    borderBottom: "1px solid var(--rule)",
                    transition: "background var(--dur-fast) var(--ease), padding-left var(--dur-fast) var(--ease)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold-soft)"; e.currentTarget.style.paddingLeft = "20px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "16px"; }}
                >
                  {cat}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
