import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

// Fallback spray icon if none equipped (use a transparent placeholder or default spray icon if desired)
const defaultSprayIcon = "https://media.valorant-api.com/sprays/0a696669-4e78-0112-9c17-1f95be6737f0/displayicon.png"; // Valorant logo spray

const Sprays = ({ onQuadrantClick }) => {
  const { equippedSprays } = useContext(PlayerContext);

  const getSprayImage = (quadrant) => {
      const spray = equippedSprays[quadrant];
      if (spray) {
          return spray.animationGif || spray.displayIcon;
      }
      return null;
  };

  return (
    <div className="flex relative items-center justify-center bg-transparent p-0 m-0">
      <div className="flex relative z-10 h-[200px] w-[200px] rotate-45 rounded-[100%]">
        {/* TOP */}
        <div 
            onClick={() => onQuadrantClick && onQuadrantClick('Top')}
            className="flex absolute top-0 h-[100px] w-[100px] cursor-pointer rounded-tl-[100%] border-r-[1px] border-b border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-tl hover:border-0"
        >
          <div className="flex absolute top-0 p-0 bg-transparent items-center justify-center hover:scale-105 transition duration-300">
            {getSprayImage('Top') ? (
                <img
                    src={getSprayImage('Top')}
                    alt="Top"
                    className="w-16 h-16 object-contain -rotate-45 mt-[29px] ml-[22px]"
                />
            ) : (
                <div className="w-16 h-16 -rotate-45 mt-[29px] ml-[22px] flex items-center justify-center text-slate-500 font-Oswald text-xs">TOP</div>
            )}
          </div>
        </div>
        
        {/* RIGHT */}
        <div 
            onClick={() => onQuadrantClick && onQuadrantClick('Right')}
            className="flex absolute left-1/2 top-0 h-[100px] w-[100px] cursor-pointer rounded-tr-[100%] border-b-[1px] border-l border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-tr hover:border-0"
        >
          <div className="absolute top-0 p-0 bg-transparent flex items-center justify-center hover:scale-105 transition duration-300">
            {getSprayImage('Right') ? (
                <img
                    src={getSprayImage('Right')}
                    alt="Right"
                    className="w-14 h-14 object-contain -rotate-45 mt-[29px] ml-[13px]"
                />
            ) : (
                <div className="w-14 h-14 -rotate-45 mt-[29px] ml-[13px] flex items-center justify-center text-slate-500 font-Oswald text-xs">RIGHT</div>
            )}
          </div>
        </div>

        {/* LEFT */}
        <div 
            onClick={() => onQuadrantClick && onQuadrantClick('Left')}
            className="flex absolute bottom-0 h-[100px] w-[100px] cursor-pointer rounded-bl-[100%] border-t-[1px] border-r border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-bl hover:border-0"
        >
          <div className="absolute top-0 p-0 bg-transparent flex items-center justify-center hover:scale-105 transition duration-300">
            {getSprayImage('Left') ? (
                <img
                    src={getSprayImage('Left')}
                    alt="Left"
                    className="w-14 h-14 object-contain -rotate-45 mt-2 ml-6"
                />
            ) : (
                <div className="w-14 h-14 -rotate-45 mt-2 ml-6 flex items-center justify-center text-slate-500 font-Oswald text-xs">LEFT</div>
            )}
          </div>
        </div>

        {/* BOTTOM */}
        <div 
            onClick={() => onQuadrantClick && onQuadrantClick('Bottom')}
            className="flex absolute bottom-0 left-1/2 h-[100px] w-[100px] cursor-pointer rounded-br-[100%] border-l-[1px] border-t border-white from-teal-400 from-[10%] via-transparent via-[80%] to-transparent transition-transform duration-100 hover:scale-110 hover:border-teal-400 hover:bg-gradient-to-br hover:border-0"
        >
          <div className="absolute top-0 p-0 bg-transparent flex items-center justify-center hover:scale-105 transition duration-300">
            {getSprayImage('Bottom') ? (
                <img
                    src={getSprayImage('Bottom')}
                    alt="Bottom"
                    className="w-14 h-14 object-contain mt-2 ml-3 -rotate-45"
                />
            ) : (
                <div className="w-14 h-14 mt-2 ml-3 -rotate-45 flex items-center justify-center text-slate-500 font-Oswald text-xs">BOTTOM</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative center dots */}
      <div className="z-30 p-0 m-0 flex absolute h-[40px] w-[40px] rounded-full border-[1px] border-white bg-[#00223D]"></div>
      <div className="z-30 p-0 m-0 flex absolute h-[5px] w-[5px] rounded-full border-[1px] border-white bg-white"></div>
      
      {/* Outer borders */}
      <div className="p-0 m-0 flex absolute h-[120px] w-[120px] rounded-full border-[1px] border-slate-500 pointer-events-none"></div>
      <div className="p-0 m-0 flex absolute h-[170px] w-[170px] rounded-full border-[1px] border-slate-500 pointer-events-none"></div>
    </div>
  );
};

export default Sprays;
