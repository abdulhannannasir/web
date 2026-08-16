// Clean, crisp generative cover art — deterministic per article, tinted by
// category. Sharp overlapping forms and a solid gradient field, not a
// blurred/grainy texture, so it reads as a considered editorial pattern
// rather than a placeholder.

function seedFromString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Category-tinted two-color moods drawn from the editorial accent palette.
const CATEGORY_PALETTES = {
  "Commentary & Analysis": ["#800020", "#5c0017"],
  "Laws & Judgments": ["#1c352d", "#2f4d42"],
  "News & Events": ["#c07d2b", "#800020"],
  "Law FAQs & Guides": ["#1c352d", "#c07d2b"],
  "Industry Updates": ["#5c0017", "#1c352d"],
  "International & Comparative": ["#c07d2b", "#1c352d"],
};
const FALLBACK_PALETTE = ["#800020", "#1c352d"];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mixColor(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export default function CoverArt({ seed = "article", category = "", size = 320, className = "" }) {
  const n = seedFromString(String(seed));
  const rand = mulberry32(n);
  const [colorA, colorB] = CATEGORY_PALETTES[category] || FALLBACK_PALETTE;
  const uid = `ca-${String(seed).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}-${n % 9973}`;

  const cx = size / 2;
  const cy = size / 2;

  // 2-3 crisp, cleanly overlapping arcs/circles — no blur, defined edges.
  const shapeCount = 2 + (n % 2);
  const shapes = Array.from({ length: shapeCount }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = size * (0.05 + rand() * 0.28);
    return {
      key: i,
      cx: cx + dist * Math.cos(angle),
      cy: cy + dist * Math.sin(angle),
      r: size * (0.22 + rand() * 0.24),
      opacity: 0.5 + i * 0.18,
    };
  });

  // fine concentric ring texture for editorial polish, kept crisp (no blur)
  const ringCount = 3;
  const rings = Array.from({ length: ringCount }, (_, i) => ({
    key: i,
    r: size * (0.16 + i * 0.09),
  }));

  const markAngle = rand() * 360;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      className={className}
      role="img"
      aria-label="Article mark"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={mixColor(colorA, colorB, 0.1)} />
          <stop offset="100%" stopColor={mixColor(colorA, colorB, 0.9)} />
        </linearGradient>
      </defs>

      <rect width={size} height={size} fill={`url(#${uid}-bg)`} />

      {shapes.map((s) => (
        <circle key={s.key} cx={s.cx} cy={s.cy} r={s.r} fill="#FDFBF7" opacity={s.opacity * 0.14} />
      ))}

      <g opacity={0.5}>
        {rings.map((r) => (
          <circle key={r.key} cx={cx} cy={cy} r={r.r} fill="none" stroke="#FDFBF7" strokeWidth={1} opacity={0.35} />
        ))}
      </g>

      {/* embossed corner mark — small, tasteful */}
      <g transform={`translate(${size * 0.87}, ${size * 0.87}) rotate(${markAngle})`} opacity={0.9}>
        <circle r={size * 0.038} fill="none" stroke="#FDFBF7" strokeWidth={size * 0.006} opacity={0.85} />
        <circle r={size * 0.014} fill="#FDFBF7" opacity={0.85} />
      </g>

      <rect width={size} height={size} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
    </svg>
  );
}
