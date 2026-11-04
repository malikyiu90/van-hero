export default function Logo({ tone = "light", className = "" }) {
  // tone "light" = on a light background (VAN navy); "dark" = on a dark background (VAN white)
  const van = tone === "dark" ? "#ffffff" : "#0b1b4a";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid place-items-center w-10 h-10 rounded-[10px] bg-brand-yellow shadow-sm">
        <span className="font-body font-black text-navy text-[1.15rem] leading-none tracking-tight">VH</span>
      </span>
      <span className="font-body font-black uppercase text-[1.4rem] leading-none tracking-[-0.01em]">
        <span style={{ color: van }}>VAN</span>
        <span className="text-brand-yellow">HERO</span>
      </span>
    </span>
  );
}
