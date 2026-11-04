/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#030541",
        ink: "#0b1b4a",
        brand: {
          yellow: "#ffd60a",
          blue: "#002496",
          bluelight: "#3993d5",
          navlink: "#0f42b3",
        },
        herobg: "#eef1fb",
        muted: "#606d9a",
        muted2: "#5a6478",
        soft: "#f7f9fc",
        softblue: "#eaf6ff",
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
