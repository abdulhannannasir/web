import { useEffect, useState } from "react";
import CoverArt from "./CoverArt.jsx";
import Byline from "./Byline.jsx";
import Badge from "./Badge.jsx";
import readingTime from "../utils/readingTime.js";

export default function HeroCarousel({ articles, onOpen, onAuthor }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [entering, setEntering] = useState(false);
  const slides = articles.slice(0, 5);

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  useEffect(() => {
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 30);
    return () => clearTimeout(t);
  }, [index]);

  if (slides.length === 0) return null;
  const current = slides[index];
  const mins = readingTime(current.body || current.excerpt || "");

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ marginTop: 8 }}
      className="hero-carousel"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 0,
          border: "1px solid var(--rule)",
          borderRadius: 16,
          overflow: "hidden",
          background: "var(--paper-raised)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          key={current.id}
          role="button"
          tabIndex={0}
          onClick={() => onOpen(current)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen(current);
            }
          }}
          style={{
            textAlign: "left",
            padding: "40px 42px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
            cursor: "pointer",
            opacity: entering ? 0 : 1,
            transform: entering ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 550ms var(--ease), transform 550ms var(--ease)",
          }}
        >
          <Badge>{current.category}</Badge>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.8vw, 46px)",
              lineHeight: 1.08,
              margin: 0,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}
          >
            {current.title}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 16.5, lineHeight: 1.65, margin: 0, maxWidth: 480 }}>
            {current.excerpt}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Byline author={current.author} date={current.date} onAuthor={onAuthor} sealSize={30} fontSize={13} />
            <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--text-muted)" }}>· {mins} min read</span>
          </div>
        </div>

        <div
          key={`${current.id}-art`}
          style={{
            position: "relative",
            minHeight: 300,
            opacity: entering ? 0 : 1,
            transition: "opacity 650ms var(--ease)",
          }}
        >
          {current.thumbnail ? (
            <img src={current.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <CoverArt seed={current.id} category={current.category} />
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", padding: "16px 0 4px" }}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Show story ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 24 : 8,
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
