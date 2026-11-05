/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0b1b4a",
        ink: "#0b1b4a",
        brand: {
          yellow: "#ffc400",
          blue: "#2563eb",
          bluelight: "#3b82f6",
          navlink: "#2563eb",
        },
        herobg: "#f3f6fb",
        muted: "#5a6478",
        muted2: "#6b7488",
        soft: "#f7f9fc",
        softblue: "#f5f8fc",
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
