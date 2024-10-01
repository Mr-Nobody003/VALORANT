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
           scrollbarwidth : "thin", //firefox
           scrollbarcolour : "white transparent" 
        },
        ".scrollbar-webkit" : {
          "&::-webkit-scrollbar" : {
            width: "8px",
            height:"10px"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor : "white",
            borderRadius : "20px",
            border : "1px solid white"
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent", // Transparent track background
          },
        }
      }
      addUtilities(newUtilities,["responsive","hover"])
    }
  ],
}

