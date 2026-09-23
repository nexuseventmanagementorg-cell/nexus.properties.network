// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        background: "#050505",
        surface: "#0B0B0B",
        accent: "#2DD4BF",
        text: "#FFFFFF"
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px"
      },
      boxShadow: {
        glow: "0 0 10px rgba(45,212,191,0.7)"
      }
    }
  },
  plugins: []
};
