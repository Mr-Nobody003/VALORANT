import React from "react";

const Close_icon = () => {
  return (
    <>
      <div>
        {/* close icon  */}
        <div className="relative flex px-[15px] py-[20px] justify-center items-center group">
          {/* left top line */}
          <div className="absolute flex left-0 top-0 transform -rotate-45 h-[18px] w-[5px] text-white  bg-white group-hover:bg-teal-400"></div>
          {/* right top line */}
          <div className="absolute flex right-0 top-0 transform rotate-45 h-[18px] w-[5px] text-white bg-white group-hover:bg-teal-400"></div>
          {/* left bottom line */}
          <div className="absolute flex left-0 bottom-0 transform rotate-45 h-[18px] w-[5px] text-white bg-white group-hover:bg-teal-400"></div>
          {/* right bottom line */}
          <div className="absolute flex right-0 bottom-0 transform -rotate-45 h-[18px] w-[5px] text-white bg-white group-hover:bg-teal-400"></div>
          {/* center diamond */}
          <div className="absolute flex transform rotate-45 h-[5px] w-[5px] text-white bg-white group-hover:bg-teal-400"></div>
        </div>
      </div>
    </>
  );
};
export default Close_icon;
