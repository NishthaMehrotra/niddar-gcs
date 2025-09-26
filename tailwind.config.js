/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 10s linear infinite", // slow spin
      },
    },
  },
  plugins: [],
};
