import ArticleCard from "./ArticleCard.jsx";
import useReveal from "../hooks/useReveal.js";

export default function CategoryRow({ category, articles, onOpen, onAuthor, onSeeAll, limit = 4 }) {
  const [headRef, headVisible] = useReveal();
  if (articles.length === 0) return null;
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
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 18,
        }}
      >
        {articles.slice(0, limit).map((a, i) => (
          <ArticleCard key={a.id} article={a} onOpen={onOpen} onAuthor={onAuthor} delay={i * 70} />
        ))}
      </div>
    </section>
  );
}
