import CoverArt from "./CoverArt.jsx";
import AuthorSeal from "./AuthorSeal.jsx";

export default function ArticlePage({ article, onBack }) {
  if (!article) return null;
  return (
    <article className="wrap" style={{ padding: "32px 20px 60px", maxWidth: 760, margin: "0 auto" }}>
      <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: 24, fontSize: 13 }}>
        ← Back
      </button>
      <span className="eyebrow">{article.category}</span>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15, margin: "10px 0 14px" }}>
        {article.title}
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--mono)", fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
        <AuthorSeal name={article.author} size={30} />
        {article.author} · {new Date(article.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
      </div>
      <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 28, border: "1px solid var(--rule)" }}>
        {article.thumbnail ? (
          <img src={article.thumbnail} alt="" style={{ width: "100%", display: "block" }} />
        ) : (
          <CoverArt seed={article.id} category={article.category} size={760} />
        )}
      </div>
      {article.body.split("\n\n").map((para, i) => (
        <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text)", marginBottom: 20 }}>
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
