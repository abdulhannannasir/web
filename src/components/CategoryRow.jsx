import ArticleCard from "./ArticleCard.jsx";
import Byline from "./Byline.jsx";
import useReveal from "../hooks/useReveal.js";

function TextLink({ article, onOpen, onAuthor }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(article)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(article);
        }
      }}
      className="lp-textlink"
      style={{ cursor: "pointer" }}
    >
      <span className="eyebrow" style={{ fontSize: 10 }}>{article.category}</span>
      <h4
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 600,
          fontSize: 15.5,
          lineHeight: 1.35,
          margin: "6px 0 9px",
          color: "var(--ink)",
          transition: "color var(--dur-fast) var(--ease)",
        }}
      >
        {article.title}
      </h4>
      <Byline author={article.author} date={article.date} onAuthor={onAuthor} sealSize={14} fontSize={10.5} />
    </div>
  );
}

export default function CategoryRow({ category, articles, onOpen, onAuthor, onSeeAll, limit = 4 }) {
  const [headRef, headVisible] = useReveal();
  if (articles.length === 0) return null;

  const [primary, ...rest] = articles;
  const secondaryLimit = limit === Infinity ? rest.length : Math.max(0, limit - 1);
  const secondary = rest.slice(0, secondaryLimit);

  return (
    <section>
      <div ref={headRef} className={`section-head lp-reveal${headVisible ? " lp-in" : ""}`}>
        <h2>{category}</h2>
        {onSeeAll && (
          <a href="#category" className="see-all" onClick={(e) => { e.preventDefault(); onSeeAll(category); }}>
            See all →
          </a>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: secondary.length ? "1.3fr 1fr" : "1fr",
          gap: 28,
          alignItems: "start",
        }}
        className="lp-catrow-grid"
      >
        <ArticleCard article={primary} onOpen={onOpen} onAuthor={onAuthor} />
        {secondary.length > 0 && (
          <div>
            {secondary.map((a) => (
              <TextLink key={a.id} article={a} onOpen={onOpen} onAuthor={onAuthor} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .lp-catrow-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
