/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        "varela-round": ['Varela Round', 'sans-serif']
      },
      colors: {
        "primary": "#0C2501",
        "secondary": "#C2EB2C",
        "darkprimary": "#181C14",
      }
    },
  },
  plugins: [],
}

