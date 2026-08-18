import React, { useState, useRef, useEffect } from "react";
import Agent_box from "../components/Agent_box";
import { useAgents } from "../hooks/useAgents";
import { Loader2, ArrowLeft } from "lucide-react";

const Agent_page = () => {
  const { data, isLoading, isError } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  // State for View 1 scroll fading
  const [scrollProgress, setScrollProgress] = useState(0);
  const gridContainerRef = useRef(null);

  // State for View 2 abilities
  const [activeAbility, setActiveAbility] = useState(null);

  useEffect(() => {
    // Select first ability when agent changes in View 2
    if (selectedAgent && selectedAgent.abilities?.length > 0) {
      setActiveAbility(selectedAgent.abilities[0]);
    }
  }, [selectedAgent]);

  const handleScroll = () => {
    if (gridContainerRef.current) {
      const { scrollTop } = gridContainerRef.current;
      // Fade out completely after 300px of scrolling
      const progress = Math.min(scrollTop / 300, 1);
      setScrollProgress(progress);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#0f1923] h-screen w-full flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-[#0f1923] h-screen w-full flex items-center justify-center text-white font-Roboto">
        Error loading agents. Please check your connection.
      </div>
    );
  }

  const { agents, latestAgent } = data;
  const activeAgent = selectedAgent || latestAgent;
  
  const backgroundGradient = activeAgent?.backgroundGradientColors 
    ? `linear-gradient(135deg, #${activeAgent.backgroundGradientColors[0]}, #${activeAgent.backgroundGradientColors[1]}, #${activeAgent.backgroundGradientColors[2]}, #${activeAgent.backgroundGradientColors[3]})`
    : '#0f1923';

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col pt-24 bg-[#0f1923]">
      
      {/* Background Gradient (Fades in based on scroll in View 1, fully visible in View 2) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ 
          background: backgroundGradient,
          opacity: selectedAgent ? 1 : scrollProgress 
        }}
      ></div>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 transition-opacity duration-700"></div>
      
      {/* Huge Background Text/Shape (Hidden in View 1 when scrolling) */}
      {activeAgent && (
        <div 
          className="absolute inset-0 z-0 flex items-center justify-center opacity-10 overflow-hidden pointer-events-none mix-blend-overlay transition-all duration-300"
          style={{ opacity: selectedAgent ? 0.1 : 0.1 * (1 - scrollProgress) }}
        >
          {activeAgent.background ? (
            <img src={activeAgent.background} alt="" className="w-full h-full object-cover scale-150 animate-pulse-slow" />
          ) : (
            <h1 className="text-[20vw] font-Oswald font-black uppercase whitespace-nowrap">
              {activeAgent.displayName}
            </h1>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col px-6 md:px-12 lg:px-24 pb-4">
        
        {/* Top Bar / Navigation for Detail View */}
        <div className="flex items-center gap-4 shrink-0 absolute top-4 left-6 z-50">
          {selectedAgent && (
            <button 
              onClick={() => {
                setSelectedAgent(null);
                setScrollProgress(0); // Reset scroll on back
              }}
              className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors uppercase font-Roboto font-bold tracking-widest text-sm border border-white/20 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md pointer-events-auto shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Roster
            </button>
          )}
        </div>

        {!selectedAgent ? (
          // VIEW 1: Roster View (Central Portrait + Bottom Grid)
          <div className="flex-1 w-full h-full relative min-h-0 overflow-hidden animate-in fade-in duration-500">
            
            {/* Central Portrait (Fades out and moves up when scrolling grid) */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100"
              style={{ 
                opacity: 1 - scrollProgress,
                transform: `translateY(-${scrollProgress * 50}px)` 
              }}
            >
              {/* Left Side Info Panel */}
              <div className="absolute left-4 md:left-10 lg:left-20 top-[15%] md:top-[25%] lg:top-1/3 -translate-y-1/2 text-left z-20">
                <p className="text-white font-Roboto font-bold text-xs md:text-sm lg:text-base flex items-center gap-2 tracking-[0.2em] mb-1">
                  <span className="w-2 h-2 bg-pink-500 rotate-45 inline-block"></span> NEW AGENT
                </p>
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-Oswald font-black text-white uppercase tracking-widest leading-none drop-shadow-2xl">
                  {latestAgent?.displayName}
                </h1>
              </div>

              {/* Character Full Portrait */}
              <img 
                src={latestAgent.fullPortraitV2 || latestAgent.fullPortrait || latestAgent.displayIcon} 
                alt={latestAgent.displayName} 
                className="absolute bottom-0 h-[60%] sm:h-[75%] md:h-[90%] lg:h-[100%] w-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
              />
            </div>

            {/* Scrollable Grid Overlapping */}
            <div 
              className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-webkit pt-[40vh] md:pt-[50vh] lg:pt-[60vh] pb-12 pointer-events-auto"
              onScroll={handleScroll}
              ref={gridContainerRef}
            >
              <div className="w-full bg-gradient-to-b from-transparent via-black/80 to-[#0f1923] pt-12 md:pt-20 px-2 md:px-8 min-h-[60vh]">
                
                {/* AGENTS Header Divider */}
                <div className="w-full flex flex-col items-center mb-6 md:mb-8 relative">
                   <div className="w-full h-[1px] bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                   <h3 className="text-white font-Oswald uppercase tracking-[0.2em] md:tracking-[0.3em] text-lg md:text-xl font-bold bg-[#0f1923] px-4 md:px-6 relative z-10">Agents</h3>
                </div>
                
                <div className="w-full flex justify-between items-end mb-4 px-2">
                   <div className="flex gap-4 border-b border-white/20 pb-2 flex-1">
                     <span className="text-white/40 text-[10px] md:text-xs font-Roboto tracking-widest uppercase cursor-pointer hover:text-white">Show Unowned Only ◇</span>
                   </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                  {agents.map((agent) => (
                    <Agent_box
                      key={agent.uuid}
                      agent={agent}
                      onClick={() => setSelectedAgent(agent)}
                      isSelected={false}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          // VIEW 2: Detail View
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden animate-in fade-in duration-300 mt-12 md:mt-8">
            {/* Top Section: Portrait & Details */}
            <div className="flex-1 flex flex-col md:flex-row relative min-h-0">
              
              {/* Left/Center: Large Portrait */}
              <div className="flex-1 relative flex items-center justify-center min-h-[30vh] md:min-h-0 pointer-events-none mb-4 md:mb-0">
                <img 
                  src={selectedAgent.fullPortraitV2 || selectedAgent.fullPortrait || selectedAgent.displayIcon} 
                  alt={selectedAgent.displayName} 
                  className="absolute bottom-0 h-[80%] sm:h-[90%] md:h-[105%] lg:h-[115%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 animate-in slide-in-from-bottom-10 fade-in duration-500"
                />
              </div>

              {/* Right: Info Box */}
              <div className="w-full md:w-[400px] lg:w-[450px] xl:w-[550px] bg-black/50 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 lg:p-10 rounded-sm overflow-y-auto scrollbar-thin scrollbar-webkit z-20 animate-in slide-in-from-right-8 fade-in duration-500 shadow-2xl h-full flex flex-col">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-pink-400 font-Roboto uppercase tracking-widest font-bold text-xs md:text-sm">{selectedAgent.role?.displayName}</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-Oswald font-bold text-[#ece8e1] uppercase tracking-widest mb-4 md:mb-6 leading-none">
                  {selectedAgent.displayName}
                </h2>
                
                <p className="text-white/80 font-Roboto text-xs sm:text-sm md:text-[15px] leading-relaxed mb-4 md:mb-6 flex-shrink-0">
                  {selectedAgent.description}
                </p>

                <div className="space-y-4 md:space-y-6 flex-1">
                  {/* Abilities Header */}
                  <div className="flex items-center gap-1 border-b border-white/20 pb-2">
                     <span className="text-white/60 bg-white/10 px-2 md:px-3 py-1 text-[10px] md:text-xs font-Roboto tracking-widest uppercase rounded-sm flex-1 text-center font-bold">Special Abilities</span>
                  </div>
                  
                  {/* Abilities Interactive Row */}
                  <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
                     {selectedAgent.abilities?.map((ability, idx) => (
                       <div 
                         key={idx} 
                         onClick={() => setActiveAbility(ability)}
                         className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border cursor-pointer transition-colors group ${activeAbility?.displayName === ability.displayName ? 'border-pink-500 bg-pink-500/20' : 'border-white/20 bg-black/60 hover:bg-white/20'}`}
                       >
                         {ability.displayIcon ? (
                           <img 
                            src={ability.displayIcon} 
                            alt={ability.displayName} 
                            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-opacity ${activeAbility?.displayName === ability.displayName ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} 
                           />
                         ) : (
                           <span className="text-white/30 text-[8px] md:text-[10px] font-bold uppercase truncate px-1">{ability.slot}</span>
                         )}
                       </div>
                     ))}
                  </div>

                  {/* Active Ability Info */}
                  {activeAbility && (
                    <div className="bg-black/40 border border-white/10 p-3 md:p-4 rounded-sm min-h-[100px] md:min-h-[120px] animate-in fade-in duration-300">
                      <h4 className="text-pink-400 font-Oswald uppercase tracking-widest text-lg md:text-xl mb-1 md:mb-2 flex items-center justify-between">
                        {activeAbility.displayName}
                        <span className="text-white/30 text-[10px] md:text-xs font-Roboto">{activeAbility.slot}</span>
                      </h4>
                      <p className="text-white/80 font-Roboto text-xs md:text-sm leading-relaxed">
                        {activeAbility.description}
                      </p>
                    </div>
                  )}

                  <div className="text-white/70 font-Roboto text-[11px] md:text-[13px] leading-relaxed border-t border-white/10 pt-4 md:pt-6 mt-4 md:mt-6 pb-2">
                     <strong className="text-white uppercase tracking-widest block mb-1 md:mb-2 text-base md:text-lg font-Oswald">{selectedAgent.role?.displayName}</strong>
                     {selectedAgent.role?.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Carousel */}
            <div className="h-[90px] shrink-0 border-t border-white/10 flex items-center gap-1 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-webkit pt-3 pb-2 animate-in slide-in-from-bottom-8 fade-in duration-500 px-1 mt-2">
              {agents.map(agent => (
                <div 
                  key={agent.uuid}
                  onClick={() => setSelectedAgent(agent)}
                  className={`relative flex-shrink-0 w-16 h-16 border cursor-pointer transition-all hover:scale-105 ${selectedAgent.uuid === agent.uuid ? 'border-pink-500 scale-105 shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10' : 'border-white/20 hover:border-white/50'} bg-[#0f1923] overflow-hidden`}
                >
                  <img src={agent.displayIcon} alt={agent.displayName} className={`w-full h-full object-cover transition-opacity ${selectedAgent.uuid === agent.uuid ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agent_page;
