import React from 'react';
import { Check } from 'lucide-react';

const Agent_box = ({ agent, onClick, isSelected }) => {
  const { displayName, displayIcon, backgroundGradientColors, role } = agent;
  
  // Construct a linear gradient from the colors if available
  const gradient = backgroundGradientColors 
    ? `linear-gradient(135deg, #${backgroundGradientColors[0]}, #${backgroundGradientColors[1]}, #${backgroundGradientColors[2]}, #${backgroundGradientColors[3]})`
    : 'none';

  return (
    <div 
      onClick={onClick}
      className={`group relative flex flex-col justify-end w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden cursor-pointer transition-all hover:scale-[1.02] duration-300 border ${isSelected ? 'border-white scale-[1.02] z-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:border-white/30'} bg-black/40 backdrop-blur-sm`}
    >
      {/* Role Logo Background */}
      {role?.displayIcon && (
        <img 
          src={role.displayIcon} 
          alt={role.displayName} 
          className="absolute inset-0 w-full h-full object-contain p-2 md:p-4 opacity-5 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
        />
      )}

      {/* Agent Face Image */}
      <img 
        src={displayIcon} 
        alt={displayName} 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
      />

      {/* "Owned" label */}
      <div className="absolute top-2 right-2 text-white/70 text-[10px] font-Roboto uppercase font-bold tracking-wider z-10 shadow-sm">
        Owned
      </div>
      
      {/* Checkmark */}
      <div className="absolute bottom-10 right-2 z-10 text-white/60">
        <Check className="w-4 h-4" />
      </div>

      {/* Colored Name Banner */}
      <div 
        className="relative z-10 w-full py-1 px-3 border-t border-black/20"
        style={{ background: gradient }}
      >
        <h2 className="text-white text-sm md:text-base font-Oswald font-bold tracking-widest uppercase">{displayName}</h2>
      </div>
    </div>
  )
}

export default Agent_box;
