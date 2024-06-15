import type { Config } from "tailwindcss";
import daisyui from "daisyui"

//adiconar cores padrao do tailwind
//https://tailwindcss.com/docs/customizing-colors

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "background-home": "url('/image.webp')",
        "background-home-2": "url('/background2.webp')",
      },
      colors: {
        'primary': '#6A0DAD',
        'backgroundColor': '#121418',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),  
    daisyui,
  ],
};
export default config;
