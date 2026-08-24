/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#1B432C',
          dark: '#112A1C',
          emerald: '#2D6A4F',
          sage: '#52B788',
          'sage-light': '#E8F3EC',
          gold: '#C99753',
          'gold-light': '#FBF6EF',
        },
        pearl: '#F7FAF8',
        pine: '#0F2418',
        slate: '#4A6354',
        sageMuted: '#849C8D',
        safe: '#2D6A4F',
        caution: '#D97706',
        exceeded: '#C53030',
      },
    },
  },
  plugins: [],
};
