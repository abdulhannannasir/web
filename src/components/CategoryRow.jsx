import ArticleCard from "./ArticleCard.jsx";

export default function CategoryRow({ category, articles, onOpen, onSeeAll }) {
  if (articles.length === 0) return null;
  return (
    <section>
      <div className="section-head">
        <h2>{category}</h2>
        <a href="#category" className="see-all" onClick={(e) => { e.preventDefault(); onSeeAll(category); }}>
          See all →
        </a>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 18,
        }}
      >
        {articles.slice(0, 4).map((a) => (
          <ArticleCard key={a.id} article={a} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
