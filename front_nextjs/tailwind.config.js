/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rullbook': "url('/images/rullbook.svg')",
        'maximize': "url('/images/maximize.svg')",
        'back2': "url('/images/back2.svg')",
        'alssu_theme': "url('/images/home.svg')",
        'card_template': "url('/images/card_template.svg')",
        'fox': "url('/images/fox.svg')",
        'tiger': "url('/images/tiger.svg')",
        'rabbit': "url('/images/rabbit.svg')",
        'gam': "url('/images/gam.svg')",
		'battle': "url('/images/battle.svg')",
		'test': "url('/images/test.svg')",
		'2': "url('/images/rabbit_bg.svg')",
		'3': "url('/images/tiger_bg.svg')",
		'1': "url('/images/fox_bg.svg')",
      },
    },
    fontFamily: {
      alssu: ["alssu"],
    }
  },
  plugins: [],
};
