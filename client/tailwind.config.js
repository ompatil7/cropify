import keepPreset from "keep-react/preset";
/** @type {import('tailwindcss').Config} */
// import { forms } from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      colors: {
        brightBackground: "#FDF8EE",
        brightGreen: "#539165",
        lightText: "#959595",
      },
    },
  },
  plugins: [],
};
