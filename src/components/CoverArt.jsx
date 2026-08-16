// Signature visual: a luminous, grain-textured gradient mark, deterministic
// per article and tinted by category — evoking ink and gold pressed into
// paper, not a stock photo or a flat badge.

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

// Category-tinted palettes — each a two-color mood drawn from the same
// ink/wax/gold universe, so every category reads as part of one family
// while remaining visually distinct.
const CATEGORY_PALETTES = {
  "Commentary & Analysis": ["#8B2332", "#4A1F3D"],
  "Laws & Judgments": ["#14202E", "#1F5A56"],
  "News & Events": ["#B8935A", "#8B2332"],
  "Law FAQs & Guides": ["#1F5A56", "#B8935A"],
  "Industry Updates": ["#4A1F3D", "#14202E"],
  "International & Comparative": ["#B8935A", "#1F5A56"],
};
const FALLBACK_PALETTE = ["#8B2332", "#14202E"];

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

  // 3 soft blobs, positioned and sized deterministically from the seed.
  const blobs = Array.from({ length: 3 }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = size * (0.08 + rand() * 0.22);
    return {
      key: i,
      cx: cx + dist * Math.cos(angle),
      cy: cy + dist * Math.sin(angle),
      r: size * (0.32 + rand() * 0.26),
      t: i / 2,
      opacity: 0.55 + rand() * 0.3,
    };
  });

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
          <stop offset="0%" stopColor={mixColor(colorA, colorB, 0.15)} />
          <stop offset="100%" stopColor={mixColor(colorA, colorB, 0.85)} />
        </linearGradient>
        <filter id={`${uid}-blur`}>
          <feGaussianBlur stdDeviation={size * 0.09} />
        </filter>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={n % 100} stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
        </filter>
      </defs>

      <rect width={size} height={size} fill={`url(#${uid}-bg)`} />

      <g filter={`url(#${uid}-blur)`}>
        {blobs.map((b) => (
          <circle key={b.key} cx={b.cx} cy={b.cy} r={b.r} fill={mixColor(colorA, colorB, b.t)} opacity={b.opacity} />
        ))}
      </g>

      {/* fine grain texture, evokes pressed paper rather than flat digital gradient */}
      <rect width={size} height={size} filter={`url(#${uid}-grain)`} opacity={0.5} />

      {/* embossed corner mark — small, tasteful, not a giant central monogram */}
      <g transform={`translate(${size * 0.86}, ${size * 0.86}) rotate(${markAngle})`} opacity={0.85}>
        <circle r={size * 0.045} fill="none" stroke="#F7F4EE" strokeWidth={size * 0.006} opacity={0.9} />
        <circle r={size * 0.018} fill="#F7F4EE" opacity={0.9} />
      </g>

      <rect width={size} height={size} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
    </svg>
  );
}
