/* Official VANHERO logo (same as vanhero.online).
   Light = dark-text header version; dark = white/yellow footer version. */
export default function Logo({ tone = "light", className = "h-12 w-auto" }) {
  const src = tone === "dark" ? "/logo-footer.webp" : "/logo-header.webp";
  return (
    <img
      src={src}
      alt="Van Hero — powered by VMT Removals"
      className={className}
      style={{ objectFit: "contain" }}
      draggable="false"
    />
  );
}
