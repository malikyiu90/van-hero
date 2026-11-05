export default function Logo({ tone = "light", className = "h-12 w-auto" }) {
  // "VAN" is navy on light backgrounds, white on dark (footer); tagline dims on dark.
  const van = tone === "dark" ? "#FFFFFF" : "#0B1F4A";
  const sub = tone === "dark" ? "rgba(255,255,255,0.78)" : "#334155";
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Van Hero — powered by VMT Removals">
      {/* VH badge */}
      <rect x="25" y="20" width="180" height="180" rx="36" ry="36" fill="#FFD60A" stroke="#0B1F4A" strokeWidth="8" />
      {/* V */}
      <polygon points="46,54 65,54 77,106 89,54 108,54 77,152" fill="#0B1F4A" />
      {/* H */}
      <path d="M 118,54 L 140,54 L 140,90 L 160,90 L 160,54 L 182,54 L 182,136 L 160,136 L 160,106 L 140,106 L 140,136 L 118,136 Z" fill="#0B1F4A" />
      {/* wordmark */}
      <g transform="skewX(-11)">
        <text x="260" y="132" fontFamily="system-ui, -apple-system, 'Arial Black', 'Montserrat', 'Segoe UI Black', sans-serif" fontWeight="900" fontSize="78" letterSpacing="-1">
          <tspan fill={van}>VAN</tspan><tspan fill="#FFD60A">HERO</tspan>
        </text>
      </g>
      {/* tagline */}
      <text x="238" y="174" fontFamily="system-ui, -apple-system, 'Montserrat', 'Arial', sans-serif" fontWeight="800" fontSize="23" letterSpacing="3.4" fill={sub}>
        POWERED BY VMT REMOVALS
      </text>
    </svg>
  );
}
