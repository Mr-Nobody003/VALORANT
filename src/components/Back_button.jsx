import React from 'react';

const Back_button = ({ onClick, text }) => {
  return (
    <div className="flex flex-row pl-6 pr-4 h-full justify-center items-center">
      <div onClick={onClick} className="group flex flex-row justify-center items-center text-white font-bold hover:cursor-pointer relative">
        {/* arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="35px" className="fill-current text-white group-hover:text-teal-300 transition-colors"><path d="M400-80 0-480l400-400 61 61.67L122.67-480 461-141.67 400-80Z" /></svg>
        {/* center diamond */}
        <div className="absolute left-[13px] top-[46%] flex transform rotate-45 h-[5px] w-[5px] text-white bg-white group-hover:bg-teal-400 transition-colors"></div>
        <div className="flex justify-center items-center ml-[-4px] text-[11px] group-hover:text-teal-300 transition-colors tracking-widest mt-1">BACK</div>
      </div>
      <div className="flex text-[11px] px-3 text-white/50 tracking-widest mt-1"> {`//`} </div>
      <div className="flex text-[14px] text-white font-bold tracking-widest mt-1"> {text}</div>
    </div>
  );
};

export default Back_button;
