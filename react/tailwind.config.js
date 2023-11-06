/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ["Nunito", "sans-serif"],
      'serif': ['ui-serif', 'Georgia']
    },
    extend: {
      colors: {
        main: "#111926",
        second: "#F9FAFC",
        third: "#E7B7E9",
        forth: "#E6E7EB",
        fifth: "#FFD960",
        "selected-item": "#343A46",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
