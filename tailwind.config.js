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
  plugins: [
    function ({addUtilities}){
      const newUtilities ={
        ".scrollbar-thin" : {
           scrollbarwidth : "thin",
           scrollbarcolour : "rgb(31 29 29) white"
        },
        ".scrollbar-webkit" : {
          "&::-webkit-scrollbar" : {
            width: "8px"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor : "rgb(31 41 55)",
            borderRadius : "20px",
            border : "1px solid white"
          }
        }
      }
      addUtilities(newUtilities,["responsive","hover"])
    }
  ],
}

