import CoverArt from "./CoverArt.jsx";
import AuthorSeal from "./AuthorSeal.jsx";
import useReveal from "../hooks/useReveal.js";

export default function ArticleCard({ article, onOpen, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <button
      ref={ref}
      onClick={() => onOpen(article)}
      className={`lp-card lp-reveal${visible ? " lp-in" : ""}`}
      style={{
        textAlign: "left",
        background: "var(--paper-raised)",
        border: "1px solid var(--rule)",
        borderRadius: 6,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="lp-card-art" style={{ aspectRatio: "16 / 10" }}>
        <CoverArt seed={article.id} category={article.category} />
      </div>
      <div style={{ padding: "14px 16px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span className="eyebrow">{article.category}</span>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.3, margin: 0 }}>{article.title}</h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
          {article.excerpt.length > 100 ? article.excerpt.slice(0, 100) + "…" : article.excerpt}
        </p>
        <span style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)" }}>
          <AuthorSeal name={article.author} size={18} />
          {article.author} · {new Date(article.date).toLocaleDateString()}
        </span>
      </div>
    </button>
  );
}
