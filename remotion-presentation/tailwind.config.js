/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "koska-blue": "#2B7DE9",
        "koska-dark": "#1a1a2e",
        "koska-light": "#f0f4ff",
        "koska-accent": "#4da6ff",
        "koska-navy": "#0d1b3e",
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', 'Meiryo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
