import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        //header-bg color
        "header-color": "#53558F",
        "button-color": "#D8BFF6",
        //포스트페이지에 list color
        "postpage-listcolor": "#9B9DCC",
        //로그인페이지 bg color
        "loginpage-color": "#F4F1FF",
        //font
        "font-color": "#333560",
        //map에 숫자 bg color
        "mapcircle-color": "#8085F2",
      },
    },
  },
  plugins: [],
};
export default config;
