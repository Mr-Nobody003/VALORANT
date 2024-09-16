/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Oswald:["Oswald",'sans-serif'],
        Roboto:["Roboto"],
      },
    },
  },
  plugins: [],
}

