import React from 'react';

const Agent_box = ({ agent, onClick }) => {
  const { displayName, displayIcon, role, background } = agent;

  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col justify-end w-full aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105 duration-300 border border-white/10 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-pink-500/20"
    >
      {/* Background shape */}
      {background && (
        <img 
          src={background} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-300 mix-blend-screen"
        />
      )}

      {/* Agent Image */}
      <img 
        src={agent.fullPortraitV2 || agent.fullPortrait || displayIcon} 
        alt={displayName} 
        className="absolute bottom-0 w-[120%] -left-[10%] h-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
      />

      {/* Glassmorphism Name & Role Banner */}
      <div className="relative z-10 w-full p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl font-Oswald font-bold tracking-widest uppercase">{displayName}</h2>
          {role?.displayIcon && (
            <img src={role.displayIcon} alt={role.displayName} className="w-6 h-6 opacity-80" title={role.displayName} />
          )}
        </div>
        <p className="text-white/60 text-sm font-Roboto font-medium uppercase tracking-wider">{role?.displayName}</p>
      </div>
    </div>
  )
}

export default Agent_box;
