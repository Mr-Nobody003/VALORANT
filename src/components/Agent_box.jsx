import React from 'react';
import { Lock, Check, Unlock } from 'lucide-react';

const Agent_box = ({ agent, onClick, isSelected }) => {
  const { displayName, displayIcon, role } = agent;

  return (
    <div 
      onClick={onClick}
      className={`group relative flex flex-col justify-end w-full aspect-[16/9] overflow-hidden cursor-pointer transition-all duration-300 border ${isSelected ? 'border-white z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-white/10' : 'border-white/10 hover:border-white/40 bg-transparent hover:bg-white/5'}`}
    >
      {/* Role Logo Background (Highlights on Hover) */}
      {role?.displayIcon && (
        <img 
          src={role.displayIcon} 
          alt={role.displayName} 
          className="absolute inset-0 object-fill  p-4 md:p-6 opacity-10 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        />
      )}

      {/* Agent Face Image */}
      <img 
        src={displayIcon} 
        alt={displayName} 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] md:h-[95%] w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top Right: Mock Currency Price */}
      <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1.5 opacity-60">
        <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-Roboto uppercase tracking-widest text-white">
          <img src="https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png" alt="VP" className="w-2.5 h-2.5" />
          1,000
        </div>
        <span className="text-[8px] md:text-[10px] font-Roboto lowercase text-white/50 mx-0.5">or</span>
        <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-Roboto uppercase tracking-widest text-white">
          <img src="https://media.valorant-api.com/currencies/85ca954a-41f2-ce94-9b45-8ca3dd39a00d/displayicon.png" alt="KC" className="w-2.5 h-2.5" />
          8,000
        </div>
      </div>
      
      {/* Bottom Layout: Name and Lock Icon */}
      <div className="relative z-10 w-full p-2 md:p-3 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h2 className="text-white text-xl md:text-2xl font-Oswald font-bold tracking-widest uppercase leading-none drop-shadow-md">
          {displayName}
        </h2>
        <div className="text-white/60 mb-0.5">
          <Unlock className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}

export default Agent_box;
