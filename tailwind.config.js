module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Noto Sans Mono"', 'monospace'],
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      transitionProperty: {
        'background-color': 'background-color',
        'background-border-color': 'background-color, border-color',
        'border-color': 'border-color',
      },
    },
  },
  variants: {
    extend: {
      padding: ['first'],
    },
  },
  plugins: [],
};
