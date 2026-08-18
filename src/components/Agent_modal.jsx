import React from 'react';
import { X } from 'lucide-react';

const Agent_modal = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-5xl max-h-full bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-pink-600 rounded-full text-white transition-colors border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Image */}
        <div className="relative w-full md:w-[45%] h-64 md:h-auto bg-gradient-to-b from-transparent to-pink-900/20 overflow-hidden flex items-center justify-center pt-8">
          {agent.background && (
            <img src={agent.background} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen" />
          )}
          <img 
            src={agent.fullPortraitV2 || agent.fullPortrait || agent.displayIcon} 
            alt={agent.displayName} 
            className="relative z-10 w-11/12 h-auto object-contain drop-shadow-2xl md:translate-y-12"
          />
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-[55%] p-6 md:p-10 overflow-y-auto max-h-[60vh] md:max-h-[85vh] scrollbar-thin scrollbar-webkit">
          <div className="flex items-center gap-3 mb-2">
            {agent.role?.displayIcon && (
              <img src={agent.role.displayIcon} alt={agent.role.displayName} className="w-8 h-8 opacity-80" />
            )}
            <span className="text-pink-500 font-Roboto uppercase tracking-widest font-bold">{agent.role?.displayName}</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-Oswald font-bold text-white uppercase tracking-widest mb-6 drop-shadow-lg">
            {agent.displayName}
          </h2>
          
          <p className="text-gray-300 font-Roboto text-lg leading-relaxed mb-10">
            {agent.description}
          </p>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-Oswald text-white uppercase tracking-wider border-b border-white/10 pb-2">Abilities</h3>
            <div className="grid grid-cols-1 gap-4">
              {agent.abilities?.map((ability, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 w-14 h-14 bg-black/60 rounded-lg flex items-center justify-center p-2 border border-white/10">
                    {ability.displayIcon ? (
                      <img src={ability.displayIcon} alt={ability.displayName} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-white/30 text-xs font-bold uppercase">{ability.slot}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-Roboto font-bold text-xl mb-1">{ability.displayName}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{ability.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent_modal;
