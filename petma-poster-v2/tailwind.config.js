/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui"), require("preline/plugin")],
  darkMode: ["class", ".figma-dark"],
};
