/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'sans': ['ROBOTO', 'Arial', 'sans-serif'],
      'serif': ['ROBOTOBOLD', 'Georgia', 'serif'],
      'mono': ['ROBOTOLIGHT', 'Menlo', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}

