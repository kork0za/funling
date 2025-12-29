/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        skyink: {
          50: "#F3FBFF",
          100: "#E7F7FF",
          200: "#CDEEFF",
          300: "#A6E2FF",
          400: "#6CD1FF",
          500: "#32B9F5",
          600: "#1696D3",
          700: "#0F74A6",
          800: "#0D5E86",
          900: "#0B4A6A",
        },
        mint: {
          50: "#F0FFFB",
          100: "#D9FFF5",
          200: "#B3FFE9",
          300: "#7FF7D8",
          400: "#3FECC1",
          500: "#16D6A8",
          600: "#0EAF8A",
          700: "#0C8B6E",
          800: "#0A6E58",
          900: "#085A48",
        },
      },
      boxShadow: {
        skeu: "0 18px 45px rgba(10, 80, 120, 0.18), inset 0 1px 0 rgba(255,255,255,0.7)",
        skeuSoft: "0 12px 30px rgba(10, 80, 120, 0.14), inset 0 1px 0 rgba(255,255,255,0.75)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
