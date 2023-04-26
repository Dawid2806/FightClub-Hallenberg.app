/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        LogoDarkTheme: "url('/public/images/Logo.6.png')",
        LogoLightTheme: "url('/public/images/Logo.5.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
