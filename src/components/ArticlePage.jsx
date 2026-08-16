import CoverArt from "./CoverArt.jsx";
import Byline from "./Byline.jsx";
import Badge from "./Badge.jsx";
import readingTime from "../utils/readingTime.js";

export default function ArticlePage({ article, onBack, onAuthor }) {
  if (!article) return null;
  const mins = readingTime(article.body);
  return (
    <article className="wrap" style={{ padding: "32px 20px 60px", maxWidth: 760, margin: "0 auto" }}>
      <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: 24, fontSize: 13 }}>
        ← Back
      </button>
      <Badge>{article.category}</Badge>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: "14px 0 16px", color: "var(--ink)" }}>
        {article.title}
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
        <Byline author={article.author} date={article.date} onAuthor={onAuthor} sealSize={30} fontSize={13} />
        <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--text-muted)" }}>· {mins} min read</span>
      </div>
      <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 30, border: "1px solid var(--rule)" }}>
        {article.thumbnail ? (
          <img src={article.thumbnail} alt="" style={{ width: "100%", display: "block" }} />
        ) : (
          <CoverArt seed={article.id} category={article.category} size={760} />
        )}
      </div>
      {article.body.split("\n\n").map((para, i) => (
        <p key={i} style={{ fontFamily: "var(--serif)", fontSize: 18.5, lineHeight: 1.75, color: "var(--text)", marginBottom: 22 }}>
          {para}
        </p>
      ))}
      {article.sources && article.sources.length > 0 && (
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Sources</div>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {article.sources.map((s, i) => (
              <li key={i} style={{ fontSize: 13.5, marginBottom: 6 }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--seal)" }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
