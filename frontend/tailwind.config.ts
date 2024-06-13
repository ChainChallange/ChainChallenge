import type { Config } from "tailwindcss";

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
      },
    },
    colors: {
      'primary': '#6A0DAD',
      'backgroundColor': '#121418',
    },
  },
  plugins: [],
};
export default config;
