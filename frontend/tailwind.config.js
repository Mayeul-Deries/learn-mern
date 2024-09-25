/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  
  darkMode: "class",
  theme: {
    screens: {
      xs: "560px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    extend: {
      fontFamily: {
        body: ["Inter"],
      },
      colors: {
        text: "#010e05",
        background: "#f6fefa",
        primary: "#2efa83",
        secondary: "#f976d2",
        accent: "#1d875a",
      },
    },
  },
  fontSize: {
    sm: "0.750rem",
    base: "1rem",
    xl: "1.333rem",
    "2xl": "1.777rem",
    "3xl": "2.369rem",
    "4xl": "3.158rem",
    "5xl": "4.210rem",
  },
  fontFamily: {
    heading: "Trade Winds",
    body: "Trade Winds",
  },
  fontWeight: {
    normal: "400",
    bold: "700",
  },
  corePlugins: {
    preflight: false,
  },
  important: true,
  plugins: [],
}

