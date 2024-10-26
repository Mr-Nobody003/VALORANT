import React from 'react';

const Back_button = ({ onClick, text }) => {
  return (
    <div class="flex flex-row p-4 justify-center items-center -mt-2">
      <div onClick={onClick} class=" group flex flex-row justify-center text-white group font-bold hover:cursor-pointer relative">
        {/* arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="35px" class="fill-current text-white group-hover:text-teal-300"><path d="M400-80 0-480l400-400 61 61.67L122.67-480 461-141.67 400-80Z" /></svg>
        {/* center diamond */}
        <div className="absolute left-3 top-[43%] flex transform rotate-45 h-[5px] w-[5px] text-white bg-white group-hover:bg-teal-400"></div>
      <div class="flex justify-center items-center -ml-2 text-4xs group-hover:text-teal-300">BACK</div>
      </div>
      <div class="flex text-4xs pl-2 text-white"> // </div>
      <div class="flex text-4xs pl-2 text-white"> {text}</div>

    </div>
  );
};

export default Back_button;
