import { useEffect, useRef, useState } from "react";
import CoverArt from "./CoverArt.jsx";
import AuthorSeal from "./AuthorSeal.jsx";

export default function HeroCarousel({ articles, onOpen }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const slides = articles.slice(0, 5);

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const current = slides[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: 0,
        border: "1px solid var(--rule)",
        borderRadius: 4,
        overflow: "hidden",
        marginTop: 24,
        background: "var(--paper-raised)",
      }}
      className="hero-carousel"
    >
      <button
        onClick={() => onOpen(current)}
        style={{
          background: "none",
          border: "none",
          textAlign: "left",
          padding: "32px 34px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <span className="eyebrow">{current.category}</span>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 3.4vw, 38px)", lineHeight: 1.15, margin: 0 }}>
          {current.title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{current.excerpt}</p>
        <span style={{ fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--mono)", display: "flex", alignItems: "center", gap: 8 }}>
          <AuthorSeal name={current.author} size={22} />
          {current.author} · {new Date(current.date).toLocaleDateString()}
        </span>
      </button>

      <div style={{ position: "relative", minHeight: 260, borderLeft: "1px solid var(--rule)" }}>
        <CoverArt seed={current.id} />
      </div>

      {slides.length > 1 && (
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: 8,
            justifyContent: "center",
            padding: "10px 0",
            borderTop: "1px solid var(--rule)",
          }}
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                background: i === index ? "var(--oxblood)" : "var(--rule)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
