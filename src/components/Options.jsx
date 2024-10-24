import React from 'react';
import Close_icon from './Close_icon'; // Ensure this is imported if you have a separate close icon component.

const Options = ({ setShowOptions }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
        <div className="bg-gray-700 bg-opacity-[20%]  w-[400px] h-96 rounded-lg relative">
          {/* Close button */}
          <div
            className="absolute top-2 right-2 text-white cursor-pointer"
            onClick={() => setShowOptions(false)}
          >
            <Close_icon />
          </div>
          <div className=" flex flex-col text-white pt-20 justify-center items-center">
            {/* Options content*/}
            {/* player support */}
            <div className='flex items-center border border-slate-600 p-4 px-[32px] bg-slate-100 bg-opacity-[80%]'><div className='font-Oswald font-medium text-xl'>PLAYER SUPPORT</div></div>
            <div></div>
            {/* arrow */}
            <div></div>
            <div></div>
            {/* exit button */}
            <a href=" "><div className='flex items-center border border-slate-600 p-4 px-[80px] bg-red-400 bg-opacity-[80%] cursor-pointer hover:bg-red-600'><div className='font-Oswald font-medium text-xl'>EXIT</div></div></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Options;
