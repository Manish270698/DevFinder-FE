/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // daisyui: {
  //   themes: ["light", "night"],
  // },
  plugins: [],
  darkMode: "selector",
  theme: {
    extend: {},
    colors: {
      brand: {
        DEFAULT: "#ebc034",
        light: "#242322",
        body: "#fff0e5",
        white: "#ffffff",
      },
      text: {
        DEFAULT: "#000000",
        light: "#8dbbf7",
        error: "#e60b21",
        input: "#ffe2a8",
      },
    },
  },
};
