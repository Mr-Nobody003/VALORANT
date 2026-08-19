import React, { useState } from "react";
import Back_button from "./Back_button";
import Options from './Options';
import Game_icon from "../assets/games-valorant-icon-512x512-kqz6q7jw.png";
import Settings from "../assets/settings.svg";
import { Home, Ticket, User, Medal, Briefcase, ShoppingCart, ChevronsUp, AlertCircle, Sparkles } from 'lucide-react';

const Nav = ({ onPageChange, onBack, showBackButton, current_Page }) => {
  const [ShowOptions, setShowOptions] = useState(false);

  const getButtonText = () => {
    switch (current_Page) {
      case "Play_page": return "LOBBY";
      case "Premieer_page": return "PREMIERE";
      case "Agent_page": return "AGENTS";
      case "Store_page": return "STORE";
      case "Collection_page": return "COLLECTION";
      case "Career_page": return "CAREER";
      case "Battlepass_page": return "BATTLEPASS";
      default: return " .";
    }
  };

  const vpIcon = "https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png";
  const rpIcon = "https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png";
  const kcIcon = "https://media.valorant-api.com/currencies/85ca954a-41f2-ce94-9b45-8ca3dd39a00d/displayicon.png";

  return (
    <>
      <div className="flex flex-row text-white w-full h-[70px] bg-transparent font-Oswald items-center justify-center fixed top-0 left-0 z-50">
        
        {/* LEFT SECTION */}
        <div className="absolute left-0 flex items-center h-full">
          {showBackButton ? (
             <Back_button
               onClick={() => (onBack ? onBack() : onPageChange("Main_page"))}
               text={getButtonText()}
             />
          ) : (
            <div className="flex items-center pl-6 h-full gap-4 hover:bg-white/5 cursor-pointer pr-6 transition-colors" onClick={() => onPageChange("Main_page")}>
              <img src={Game_icon} alt="game icon" width="35" height="35" className="opacity-90" />
              <div className="flex flex-col justify-center">
                <span className="text-slate-100 text-xl font-bold tracking-widest leading-none">
                  COLLISION
                </span>
                <span className="text-slate-400 text-[10px] tracking-widest mt-1">EPISODE 9 // ACT II</span>
              </div>
            </div>
          )}
        </div>

        {/* CENTER SECTION */}
        {current_Page !== "Main_page" && (
          <div className="relative flex items-center h-full px-2">
            
            {/* Trapezium Border SVG */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
               <polygon points="0,0 100,0 97,100 3,100" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Left Nav Icons */}
            <div className="flex items-center gap-6 pr-8 pl-6 relative z-10">
              <Home onClick={() => onPageChange("Main_page")} className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Ticket onClick={() => onPageChange("Battlepass_page")} className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <User onClick={() => onPageChange("Agent_page")} className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Medal onClick={() => onPageChange("Career_page")} className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
            </div>

            {/* PLAY BUTTON (Trapezium) */}
            <div 
              onClick={() => onPageChange("Play_page")} 
              className="flex items-center justify-center bg-[#ff4655] hover:bg-[#ff5865] h-full w-[160px] cursor-pointer group transition-colors relative z-10"
              style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}
            >
              <span className="text-3xl font-black font-Oswald tracking-widest text-white mt-1 group-hover:scale-105 transition-transform">PLAY</span>
            </div>

            {/* Right Nav Icons */}
            <div className="flex items-center gap-6 pl-8 pr-6 relative z-10">
              <Sparkles className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Briefcase onClick={() => onPageChange("Collection_page")} className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <ShoppingCart onClick={() => onPageChange("Store_page")} className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <ChevronsUp className="w-[18px] h-[18px] text-slate-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="absolute right-0 flex items-center h-full pr-8">
          <div className="flex items-center h-full gap-5 text-[13px] font-Roboto text-slate-300">
            
            {/* Alert Icon */}
            <div className="cursor-pointer text-[#eeb350] hover:text-[#ffd685] transition-colors">
              <AlertCircle className="w-5 h-5" />
            </div>

            {/* 4/4 block */}
            <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
              <div className="grid grid-cols-2 gap-[2px] transform rotate-45 w-3.5 h-3.5">
                 <div className="bg-slate-400 group-hover:bg-white transition-colors"></div>
                 <div className="bg-slate-400 group-hover:bg-white transition-colors"></div>
                 <div className="bg-slate-400 group-hover:bg-white transition-colors"></div>
                 <div className="bg-slate-400 group-hover:bg-white transition-colors"></div>
              </div>
              <span className="font-bold tracking-widest mt-0.5">4/4</span>
            </div>

            {/* currencies */}
            <div className="flex items-center gap-5 font-bold font-Oswald tracking-wider">
              <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <img src={vpIcon} alt="VP" className="w-4 h-4 opacity-90 group-hover:opacity-100" />
                <span className="mt-[2px] text-pink-500 text-[70%]">99999</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <img src={rpIcon} alt="RP" className="w-4 h-4 opacity-90 group-hover:opacity-100" />
                <span className="mt-[2px] text-pink-500 text-[70%]">99999</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <img src={kcIcon} alt="KC" className="w-4 h-4 opacity-90 group-hover:opacity-100" />
                <span className="mt-[2px] text-pink-500 text-[70%]">99999</span>
              </div>
            </div>

            {/* settings gear */}
            <div onClick={() => setShowOptions(true)} className="cursor-pointer ml-4 group p-2 hover:bg-white/10 rounded">
               <img src={Settings} alt="settings" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            
          </div>
        </div>

      </div>
      {ShowOptions && <Options setShowOptions={setShowOptions} />}
    </>
  );
};

export default Nav;
