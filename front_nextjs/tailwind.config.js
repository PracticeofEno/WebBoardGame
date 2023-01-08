/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        alssu_theme: "url('/images/home.svg')",
        card_template: "url('/images/card_template.svg')",
      },
    },
    fontFamily: {
      alssu: ["alssu"],
    },
  },
  plugins: [],
};
