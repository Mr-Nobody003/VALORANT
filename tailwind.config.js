/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald", 'sans-serif'],
        Roboto: ["Roboto" ,'sans-serif'],
        Audiowide:["Audiowide-Regular"],
      },
      width: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarwidth: "thin", //firefox
          scrollbarcolour: "white transparent"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "5px",
            height: "100%"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid white"
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent", // Transparent track background
          },
        }
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

