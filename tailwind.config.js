/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        tile_blue: "#5865f2",
        tile_green: "#0DD354",
        tile_pink: "#DB2777",
        tile_orange: "#FF9900",
      },
    },
  },
  plugins: [],
};
