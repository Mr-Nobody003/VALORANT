import React from 'react';

const Back_button = ({ onClick, text }) => {
  return (
    <div class="flex flex-row p-4 ">
    <div onClick={onClick} class=" flex flex-row justify-center text-white group font-bold hover:cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" class="fill-current text-white group-hover:text-teal-300"><path d="M400-80 0-480l400-400 61 61.67L122.67-480 461-141.67 400-80Z"/></svg> 
      <p class="text-lg group-hover:text-teal-300">BACK</p>
      
    </div>
    <p class="text-lg pl-2 text-white"> // </p>
    <p class="text-lg pl-2 text-white"> {text}</p>
    
    </div>
  );
};

export default Back_button;
