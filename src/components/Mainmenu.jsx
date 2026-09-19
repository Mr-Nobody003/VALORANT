import React from "react";

const Mainmenu = ({ onPageChange }) => {
  return (
    <>
      <div className="flex flex-row pt-4 scale-y-125 font-Valorant tracking-widest">
        <div className="flex ">
          <div className="space-y-1 mx-8">
            <div className="flex flex-row space-x-2 group h-20 justify-start items-center mr-20 hover:cursor-pointer">
              <div className="flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-400 group-hover:scale-125 inline-block">
                  <path d="M12 2L22 12L12 22L2 12Z" />
                </svg>
              </div>
              <a onClick={() => onPageChange("Play_page")} className="text-red-600 text-6xl group-hover:text-green-400">PLAY</a>
            </div>
            
            <div className="flex flex-row space-x-2 group h-10 justify-start items-center mr-24 hover:cursor-pointer">
              <div className="flex items-center justify-center mb-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-400 group-hover:scale-125 inline-block">
                  <path d="M12 2L22 12L12 22L2 12Z" />
                </svg>
              </div>
              <a onClick={() => onPageChange("Premieer_page")} className="text-white text-3xl group-hover:text-green-400">PREMIER</a>
            </div>

            <div className="flex flex-row space-x-2 group h-10 justify-start items-center mr-28 hover:cursor-pointer">
              <div className="flex items-center justify-center mb-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-400 group-hover:scale-125 inline-block">
                  <path d="M12 2L22 12L12 22L2 12Z" />
                </svg>
              </div>
              <a onClick={() => onPageChange("Career_page")} className="text-white text-3xl group-hover:text-green-400">CAREER</a>
            </div>

            <div className="flex flex-row space-x-2 group h-10 justify-start items-center mr-12 hover:cursor-pointer">
              <div className="flex items-center justify-center mb-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-400 group-hover:scale-125 inline-block">
                  <path d="M12 2L22 12L12 22L2 12Z" />
                </svg>
              </div>
              <a onClick={() => onPageChange("Battlepass_page")} className="text-white text-3xl group-hover:text-green-400">BATTLEPASS</a>
            </div>

            <div className="flex flex-row space-x-2 group h-10 justify-start items-center mr-12 hover:cursor-pointer">
              <div className="flex items-center justify-center mb-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-400 group-hover:scale-125 inline-block">
                  <path d="M12 2L22 12L12 22L2 12Z" />
                </svg>
              </div>
              <a onClick={() => onPageChange("Collection_page")} className="text-white text-3xl group-hover:text-green-400">COLLECTION</a>
            </div>

            <div className="flex flex-row space-x-2 group h-10 justify-start items-center mr-28 hover:cursor-pointer">
              <div className="flex items-center justify-center mb-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-400 group-hover:scale-125 inline-block">
                  <path d="M12 2L22 12L12 22L2 12Z" />
                </svg>
              </div>
              <a onClick={() => onPageChange("Agent_page")} className="text-white text-3xl group-hover:text-green-400">AGENTS</a>
            </div>

            <div className="flex flex-row space-x-2 group h-10 justify-start items-center mr-32 hover:cursor-pointer">
              <div className="flex items-center justify-center mb-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-400 group-hover:scale-125 inline-block">
                  <path d="M12 2L22 12L12 22L2 12Z" />
                </svg>
              </div>
              <a onClick={() => onPageChange("Store_page")} className="text-white text-3xl group-hover:text-green-400">STORE</a>
            </div>
          </div>
        </div>
        <div className="text-white"></div>
      </div>
    </>
  );
};

export default Mainmenu;
