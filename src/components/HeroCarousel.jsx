import { useEffect, useState } from "react";
import CoverArt from "./CoverArt.jsx";
import AuthorSeal from "./AuthorSeal.jsx";

export default function HeroCarousel({ articles, onOpen }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [entering, setEntering] = useState(false);
  const slides = articles.slice(0, 5);

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  useEffect(() => {
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 30);
    return () => clearTimeout(t);
  }, [index]);

  if (slides.length === 0) return null;
  const current = slides[index];

  const goTo = (i) => setIndex(i);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: 0,
        border: "1px solid var(--rule)",
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 24,
        background: "var(--paper-raised)",
        boxShadow: "var(--shadow-md)",
      }}
      className="hero-carousel"
    >
      <button
        key={current.id}
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
          opacity: entering ? 0 : 1,
          transform: entering ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 500ms var(--ease), transform 500ms var(--ease)",
        }}
      >
        <span className="eyebrow">{current.category}</span>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 3.4vw, 40px)", lineHeight: 1.12, margin: 0, letterSpacing: "-0.01em" }}>
          {current.title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{current.excerpt}</p>
        <span style={{ fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--mono)", display: "flex", alignItems: "center", gap: 8 }}>
          <AuthorSeal name={current.author} size={22} />
          {current.author} · {new Date(current.date).toLocaleDateString()}
        </span>
      </button>

      <div
        key={`${current.id}-art`}
        style={{
          position: "relative",
          minHeight: 260,
          borderLeft: "1px solid var(--rule)",
          opacity: entering ? 0 : 1,
          transition: "opacity 600ms var(--ease)",
        }}
      >
        {current.thumbnail ? (
          <img src={current.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <CoverArt seed={current.id} category={current.category} />
        )}
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
              onClick={() => goTo(i)}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                padding: 0,
                background: i === index ? "var(--seal)" : "var(--rule)",
                transition: "width var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
