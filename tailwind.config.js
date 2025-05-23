/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // daisyui: {
  //   themes: ["light", "night"],
  // },
  plugins: [require("daisyui")],
  darkMode: "selector",
  theme: {
    extend: {},
    colors: {
      brand: {
        DEFAULT: "#ebc034",
        light: "#242322",
        body: "#fff0e5",
        white: "#ffffff",
        reject: "#f75134",
        accept: "#25e31b",
        shimmer: "#e8ebe9",
        message: "#3480eb",
        sendMessage: "#349beb",
      },
      text: {
        DEFAULT: "#000000",
        light: "#7a7a79",
        error: "#e60b21",
        input: "#ffe2a8",
      },
    },
  },
};
