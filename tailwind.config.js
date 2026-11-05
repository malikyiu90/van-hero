/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // vanhero.online scheme: navy + yellow + royal blue + white
        navy: "#0b1f4a",
        ink: "#0b1f4a",
        brand: {
          yellow: "#ffd60a",
          blue: "#0a2a8f",      // royal blue (How It Works cards, accents)
          bluelight: "#1e52c8",
          navlink: "#0b1f4a",   // nav links are navy on the live site
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
