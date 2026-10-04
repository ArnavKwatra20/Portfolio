import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#141110",
        cacao: "#221D1A",
        parchment: "#F2EFE9",
        taupe: "#8E857F",
        rust: "#B66D4D",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        editorial: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [],
};

export default config;