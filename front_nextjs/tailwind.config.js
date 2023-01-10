/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'back2': "url('/images/back2.svg')",
        'alssu_theme': "url('/images/home.svg')",
        'card_template': "url('/images/card_template.svg')",
        'fox': "url('/images/fox.svg')",
        'tiger': "url('/images/tiger.svg')",
        'rabbit': "url('/images/rabbit.svg')",
        'gam': "url('/images/gam.svg')",
      },
    },
    fontFamily: {
      alssu: ["alssu"],
    }
  },
  plugins: [],
};
