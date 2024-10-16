import { basename } from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "1px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        danger: "#dc3545",
      },
    },
  },
  darkMode: "class", // Menggunakan 'class' untuk dark mode
    plugins: [require("daisyui"), require("tailwind-scrollbar")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1CA0B5",
          secondary: "#25808A",
          accent: "#1affa0",
          neutral: "#F7F8F3",
          "base-100": "#243F39",
          "base-200": "#162723",
          info: "#00d5ff",
          success: "#1affa0",
          warning: "#ffd301",
          error: "#ff5d90",
        },
      },
    ],
    // darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    // styled: true, // include daisyUI colors and design decisions for all components
    // utils: true, // adds responsive and modifier utility classes
    // prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    // logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    // themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
