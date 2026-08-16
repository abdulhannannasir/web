// Deterministic, seeded SVG "seal" cover art. Same article id always
// produces the same image — no image uploads or external calls needed.

function seedFromString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Mulberry32 PRNG — small, fast, deterministic from a 32-bit seed.
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

const PALETTES = [
  ["#7A2E2E", "#A9822F", "#1B2432"],
  ["#1B2432", "#A9822F", "#7A2E2E"],
  ["#3D4657", "#7A2E2E", "#A9822F"],
  ["#5E2222", "#1B2432", "#A9822F"],
];

export default function CoverArt({ seed = "article", size = 320, className = "" }) {
  const n = seedFromString(String(seed));
  const rand = mulberry32(n);
  const palette = PALETTES[n % PALETTES.length];
  const [bg, ring, mark] = palette;

  const spokes = 8 + Math.floor(rand() * 6); // 8–13
  const innerR = size * 0.22;
  const outerR = size * 0.34;
  const cx = size / 2;
  const cy = size / 2;

  const spokePoints = [];
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : outerR * 0.86;
    spokePoints.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }

  // A few deterministic accent shapes inside the seal to vary texture.
  const accents = Array.from({ length: 3 + Math.floor(rand() * 3) }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = rand() * innerR * 0.6;
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
      r: 2 + rand() * 4,
      key: i,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      className={className}
      role="img"
      aria-label="Article seal"
    >
      <rect width={size} height={size} fill={bg} />
      <polygon points={spokePoints.join(" ")} fill="none" stroke={ring} strokeWidth={2} opacity={0.55} />
      <circle cx={cx} cy={cy} r={outerR * 0.72} fill="none" stroke={ring} strokeWidth={1.5} opacity={0.7} />
      <circle cx={cx} cy={cy} r={innerR} fill={mark} opacity={0.9} />
      <circle cx={cx} cy={cy} r={innerR * 0.62} fill={bg} />
      {accents.map((a) => (
        <circle key={a.key} cx={a.x} cy={a.y} r={a.r} fill={ring} opacity={0.8} />
      ))}
      <text
        x={cx}
        y={cy + size * 0.005}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Source Serif 4, Georgia, serif"
        fontWeight="700"
        fontSize={size * 0.09}
        fill={bg}
      >
        LP
      </text>
    </svg>
  );
}
