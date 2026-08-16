import CoverArt from "./CoverArt.jsx";

export default function AuthorSeal({ name, size = 28 }) {
  return (
    <span
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid var(--rule)",
        flexShrink: 0,
      }}
      title={`${name}'s seal`}
    >
      <CoverArt seed={`author:${name}`} size={size} />
    </span>
  );
}
