/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official VANHERO logo palette (same as vanhero.online)
        navy: "#040542",        // deep navy — "VAN" / primary text
        ink: "#040542",
        brand: {
          yellow: "#ffd41c",    // badge yellow
          blue: "#002497",      // royal blue — "HERO" / links / accents
          bluelight: "#012499",
          navlink: "#040542",   // nav links = deep navy
        },
        herobg: "#eef2ff",
        muted: "#606d9a",
        muted2: "#6b7488",
        soft: "#f7f9fc",
        softblue: "#eaf1ff",
        line: "#e6ebf3",
        whatsapp: "#25d366",
        dot: "#10b981",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "1160px",
      },
    },
  },
  plugins: [],
};
