import { useState } from "react";
import { CATEGORIES } from "../data/seedData.js";

export default function Header({ onNavigate, onCategory, isAdmin }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header style={{ borderBottom: "1px solid var(--rule)", background: "var(--paper-raised)" }}>
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
          <a href="#write" onClick={(e) => { e.preventDefault(); onNavigate("write"); }}>
            WRITE FOR US
          </a>
          <a href="#admin" onClick={(e) => { e.preventDefault(); onNavigate("admin"); }}>
            {isAdmin ? "ADMIN DASHBOARD" : "ADMIN PORTAL"}
          </a>
        </nav>
      </div>

      {/* Main nav */}
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px" }}
      >
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
          style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 30, letterSpacing: "0.01em", color: "var(--ink)" }}
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
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                background: "var(--paper-raised)",
                border: "1px solid var(--rule)",
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                minWidth: 240,
                zIndex: 20,
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
                  }}
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
