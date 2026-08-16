import AuthorSeal from "./AuthorSeal.jsx";

export default function Byline({ author, date, onAuthor, sealSize = 18, fontSize = 11 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: sealSize < 20 ? 6 : 8, fontFamily: "var(--mono)", fontSize, color: "var(--ink-soft)" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAuthor(author);
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: sealSize < 20 ? 6 : 8,
          background: "none",
          border: "none",
          padding: 0,
          font: "inherit",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        <AuthorSeal name={author} size={sealSize} />
        <span className="byline-name">{author}</span>
      </button>
      {date && <span>· {new Date(date).toLocaleDateString()}</span>}
    </span>
  );
}
