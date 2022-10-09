/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f87171",
          secondary: "#f9fafb",
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