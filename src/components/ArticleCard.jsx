import CoverArt from "./CoverArt.jsx";
import Byline from "./Byline.jsx";
import Badge from "./Badge.jsx";
import useReveal from "../hooks/useReveal.js";

export default function ArticleCard({ article, onOpen, onAuthor, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(article)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(article);
        }
      }}
      className={`lp-card lp-reveal${visible ? " lp-in" : ""}`}
      style={{
        textAlign: "left",
        background: "var(--paper-raised)",
        border: "1px solid var(--rule)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        cursor: "pointer",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="lp-card-art" style={{ aspectRatio: "16 / 10" }}>
        {article.thumbnail ? (
          <img src={article.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <CoverArt seed={article.id} category={article.category} />
        )}
      </div>
      <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <Badge>{article.category}</Badge>
        <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 18, lineHeight: 1.28, margin: 0, color: "var(--ink)" }}>
          {article.title}
        </h3>
        <p style={{ fontSize: 13.5, color: "var(--text-muted)", margin: 0, lineHeight: 1.55 }}>
          {article.excerpt.length > 100 ? article.excerpt.slice(0, 100) + "…" : article.excerpt}
        </p>
        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          <Byline author={article.author} date={article.date} onAuthor={onAuthor} sealSize={18} fontSize={11} />
        </div>
      </div>
    </div>
  );
}
