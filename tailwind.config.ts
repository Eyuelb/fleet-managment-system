import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],

  theme: {
    extend: {
      fontSize: {
        xs: "12px",
        sm: "13px",
        md: "16px",
        lg: "19px",
        xl: "24px",
      },
      colors: {
        primary: {
          '50': '#f6faf3',
          '100': '#e9f5e3',
          '200': '#d3eac8',
          '300': '#afd89d',
          '400': '#82bd69',
          '500': '#61a146',
          '600': '#4c8435',
          '700': '#3d692c',
          '800': '#345427',
          '900': '#2b4522',
          '950': '#13250e',
        },
        secondary: {},
      },
      container: {
        padding: '1rem',
        screens: {
          xs: '412px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      screens: {
        xs: '412px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
export default config
