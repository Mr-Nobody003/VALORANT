import React from "react";
import S1 from "../assets/sprays/S1.png";
import S2 from "../assets/sprays/S2.png";
import S3 from "../assets/sprays/S3.png";
import S4 from "../assets/sprays/S4.png";

const Sprays = () => {
  return (
    <div class="flex relative  items-center justify-center bg-transparent p-0 m-0">
      <div class="flex relative z-10 h-[200px] w-[200px] rotate-45 rounded-[100%]">
        <div class="flex absolute top-0 h-[100px] w-[100px] cursor-pointer rounded-tl-[100%] border-r-[1px] border-b border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-tl hover:border-0">
          <div className="flex absolute top-0   p-0  bg-transperent  items-center justify-center  hover:transperent hover:scale-105 transition duration-300 ">
            <img
              src={
                "https://static.wikia.nocookie.net/valorant/images/6/69/Too_Early_for_This_Spray.gif/"
              }
              alt="Top"
              className="w-16 h-16 object-contain Text-white -rotate-45  mt-[29px] ml-[22px]"
            ></img>
          </div>
        </div>
        {/* TOP */}
        <div class="flex absolute left-1/2 top-0 h-[100px] w-[100px] cursor-pointer rounded-tr-[100%] border-b-[1px] border-l border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-tr hover:border-0">
          <div className="absolute top-0   p-0  bg-transperent flex items-center justify-center  hover:transperent hover:scale-105 transition duration-300 ">
            <img
              src={
                "https://static.wikia.nocookie.net/valorant/images/1/11/Wingman_Wiggle_Spray.gif/"
              }
              alt="Right"
              className="w-14 h-14 object-contain -rotate-45  mt-[29px] ml-[13px] "
            ></img>
          </div>
        </div>
        {/* Right */}
        <div class="flex absolute bottom-0 h-[100px] w-[100px] cursor-pointer rounded-bl-[100%] border-t-[1px] border-r border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-bl hover:border-0">
          <div className="absolute top-0  p-0  bg-transperent flex items-center justify-center  hover:transperent hover:scale-105 transition duration-300 ">
            <img
              src={
                "https://static.wikia.nocookie.net/valorant/images/b/b0/Bubble_Pop_Spray.gif"
              }
              alt="Left"
              className="w-14 h-14 object-contain -rotate-45 mt-2 ml-6"
            ></img>
          </div>
        </div>
        {/* LEft */}
        <div class="flex absolute bottom-0 left-1/2 h-[100px] w-[100px] cursor-pointer rounded-br-[100%] border-l-[1px] border-t border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-br hover:border-0">
          <div className="absolute top-0  p-0  bg-transperent flex items-center justify-center  hover:transperent hover:scale-105 transition duration-300 ">
            <img
              src="https://static.wikia.nocookie.net/valorant/images/b/b0/Bubble_Pop_Spray.gif"
              alt="Bottom"
              className="w-14 h-14 object-contain mt-2 ml-3 -rotate-45"
            ></img>
          </div>
        </div>
        {/* BOTTOM */}
      </div>
      <div class="z-30  p-0 m-0 flex absolute  h-[40px] w-[40px] rounded-full border-[1px] border-white bg-[#00223D]"></div>
      <div class="z-30  p-0 m-0 flex absolute  h-[5px] w-[5px] rounded-full border-[1px] border-white bg-white"></div>
      <div class="p-0 m-0 flex absolute h-[120px] w-[120px] rounded-full border-[1px] border-slate-500"></div>
      <div class=" p-0 m-0 flex absolute h-[170px] w-[170px] rounded-full border-[1px] border-slate-500"></div>
    </div>
  );
};

export default Sprays;
