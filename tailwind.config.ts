import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          light: '#FAF6F0',
          DEFAULT: '#E8DED2',
          dark: '#D4C4B0',
        },
        terracotta: {
          light: '#E8B4A0',
          DEFAULT: '#D89580',
          dark: '#C67D66',
        },
        sage: {
          light: '#D4E4D4',
          DEFAULT: '#A8C8A8',
          dark: '#7FAC7F',
        },
        offwhite: '#FEFDFB',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        lora: ['Lora', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
