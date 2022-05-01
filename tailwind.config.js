module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Noto Sans Mono"', 'monospace'],
        sans: ['Inter', '"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
