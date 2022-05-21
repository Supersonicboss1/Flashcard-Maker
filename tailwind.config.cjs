const forms = require("@tailwindcss/forms");

const config = {
  mode: 'jit',
  darkMode: 'class',
  content: ["./src/**/*.{html,js,svelte,ts}"],


  plugins: [forms],
};

module.exports = config;
