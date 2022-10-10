/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#090A27",
        darkSecondary: "#1E2B47",
        darkAccent: "#475569",
        darkNeutral: "#cbd5e1",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#37cdbe",
          secondary: "#64748b",
          accent: "#37cdbe",
          neutral: "#f9fafb",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
}