const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

const config = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,svelte,ts}"],


  plugins: [forms, typography],
};

module.exports = config;
