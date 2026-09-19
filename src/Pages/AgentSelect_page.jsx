import React, { useState, useRef, useEffect } from "react";
import { useAgents } from "../hooks/useAgents";
import { useAgentModel } from "../hooks/useAgentModel";
import { Loader2 } from "lucide-react";

const AgentSelect_page = ({ onPageChange }) => {
  const { data, isLoading, isError } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [lockedIn, setLockedIn] = useState(false);
  const canvasRef = useRef(null);

  // Default to a specific agent (e.g. Sova) if none selected
  const activeAgent = selectedAgent || (data?.agents?.find(a => a.displayName.toLowerCase() === 'sova') || data?.agents?.[0]);

  // Use the 3D model hook
  useAgentModel(canvasRef, activeAgent?.displayName);

  useEffect(() => {
    // Prevent default Sova from being null initially
    if (data?.agents && !selectedAgent) {
      const defaultAgent = data.agents.find(a => a.displayName.toLowerCase() === 'sova') || data.agents[0];
      setSelectedAgent(defaultAgent);
    }
  }, [data, selectedAgent]);

  useEffect(() => {
    const agentMenuAudio = new Audio(`${import.meta.env.BASE_URL}agentmenu.mp3`);
    agentMenuAudio.volume = 0.5;
    agentMenuAudio.loop = true;
    agentMenuAudio.play().catch(e => console.log("Agent menu audio play failed:", e));

    return () => {
      agentMenuAudio.pause();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#0f1923] h-full w-full flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-[#0f1923] h-full w-full flex items-center justify-center text-white font-Roboto">
        Error loading agents. Please check your connection.
      </div>
    );
  }

  const { agents } = data;

  const handleLockIn = () => {
    if (selectedAgent) {
      setLockedIn(true);
      // Transition to Map Viewer screen after a delay
      setTimeout(() => {
        if (onPageChange) onPageChange("MapViewer_page");
      }, 500);
    }
  };

  return (
    <div 
      className="w-full h-full bg-[#0f1923] flex relative overflow-hidden text-white font-Roboto"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}agentselect-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* 3D Canvas Container */}
      <div className="absolute inset-0 z-0" ref={canvasRef}></div>

      {/* Main Overlay UI */}
      <div className="relative z-10 w-full h-full flex justify-between p-8 pointer-events-none">
        
        {/* Left Side: Map Info & Agent Grid */}
        <div className="flex flex-col w-[400px] h-full pointer-events-auto">
          {/* Top Left: Map Info */}
          <div className="flex flex-col space-y-1 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 clip-path-hex flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}icons8-valorant-192.png`} alt="logo" className="w-6 h-6 opacity-80" />
              </div>
              <h1 className="text-4xl font-bold italic uppercase tracking-wider text-white">Haven</h1>
            </div>
            <div className="text-[11px] font-bold tracking-widest text-[#ece8e1]/70">STANDARD</div>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-4 gap-2 pr-4 overflow-y-auto custom-scrollbar">
            {agents.map((agent) => (
              <div
                key={agent.uuid}
                onClick={() => !lockedIn && setSelectedAgent(agent)}
                className={`relative cursor-pointer group border-2 ${
                  selectedAgent?.uuid === agent.uuid ? "border-white" : "border-transparent"
                } ${lockedIn ? "opacity-50 cursor-not-allowed" : "hover:border-white/50"} transition-all duration-200 aspect-square overflow-hidden bg-gradient-to-b from-[#1c252e] to-[#2b3541]`}
              >
                {/* Role Icon Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <img src={agent.role?.displayIcon} alt={agent.role?.displayName} className="w-3/4 h-3/4 object-contain" />
                </div>
                {/* Agent Icon */}
                <img
                  src={agent.displayIconSmall || agent.displayIcon}
                  alt={agent.displayName}
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Agent Details */}
        {activeAgent && (
          <div className="w-[350px] flex flex-col items-end text-right pointer-events-auto">
            <div className="text-[#ece8e1]/70 font-bold tracking-[0.2em] text-sm uppercase mb-1">
              {activeAgent.role?.displayName}
            </div>
            <h2 className="text-6xl font-bold italic uppercase tracking-wider text-[#ece8e1] mb-6">
              {activeAgent.displayName}
            </h2>
            
            <div className="w-full flex justify-end mb-4">
               {/* Abilities simple display for now */}
               <div className="flex space-x-4">
                  {activeAgent.abilities?.map((ability, idx) => (
                    <div key={idx} className="w-12 h-12 bg-black/40 border border-white/20 p-2 flex items-center justify-center rounded">
                      <img src={ability.displayIcon} alt={ability.displayName} className="w-full h-full object-contain" />
                    </div>
                  ))}
               </div>
            </div>

            <p className="text-sm text-[#ece8e1]/80 leading-relaxed max-w-[300px]">
              {activeAgent.description}
            </p>
          </div>
        )}

      </div>

      {/* Bottom Center: Lock In UI */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-20">
         <button 
           onClick={handleLockIn}
           disabled={!selectedAgent || lockedIn}
           className={`px-12 py-3 text-lg font-bold uppercase tracking-wider transition-colors border ${
             lockedIn ? 'bg-[#ff4655]/50 border-transparent text-white/50 cursor-not-allowed' : 
             selectedAgent ? 'bg-[#ff4655] hover:bg-[#ff5865] border-transparent text-white' : 
             'bg-transparent border-white/20 text-white/50 cursor-not-allowed'
           }`}
         >
           {lockedIn ? 'LOCKED IN' : 'LOCK IN'}
         </button>
      </div>

      {/* Bottom Right status */}
      <div className="absolute bottom-8 right-8 text-white/50 font-bold tracking-widest text-sm pointer-events-none z-10">
        ENEMY TEAM {lockedIn ? "LOCKED IN" : "PICKING..."}
      </div>

    </div>
  );
};

export default AgentSelect_page;
