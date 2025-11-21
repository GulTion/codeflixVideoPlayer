/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          black: 'rgb(var(--color-black) / <alpha-value>)',
          dark: 'rgb(var(--color-dark) / <alpha-value>)',
          gray: 'rgb(var(--color-gray) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          text: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}

