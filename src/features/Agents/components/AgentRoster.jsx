import React, { useRef } from "react";
import Agent_box from "../../../components/Agent_box";

const AgentRoster = ({ agents, latestAgent, setSelectedAgent, scrollProgress, setScrollProgress }) => {
  const gridContainerRef = useRef(null);

  const handleScroll = () => {
    if (gridContainerRef.current) {
      const { scrollTop } = gridContainerRef.current;
      const progress = Math.min(scrollTop / 300, 1);
      setScrollProgress(progress);
    }
  };

  return (
    <div className="flex-1 w-full h-full relative min-h-0 overflow-hidden animate-in fade-in duration-500">
      {/* Background Typography */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center opacity-10 overflow-hidden pointer-events-none mix-blend-overlay transition-all duration-300"
        style={{ opacity: 0.1 * (1 - scrollProgress) }}
      >
        <img
          src={latestAgent.background}
          alt="latestagent_background"
          className="w-full h-full object-cover scale-[1.5] md:scale-[1.8] lg:scale-[2.2] opacity-80"
        />
      </div>

      {/* Central Portrait */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100 z-10"
        style={{
          opacity: 1 - scrollProgress,
          transform: `translateY(-${scrollProgress * 50}px)`,
        }}
      >
        <div className="absolute left-4 md:left-10 lg:left-20 top-[15%] md:top-[25%] lg:top-1/3 -translate-y-1/2 text-left z-20">
          <p className="text-white font-Roboto font-bold text-xs md:text-sm lg:text-base flex items-center gap-2 tracking-[0.2em] mb-1">
            <span className="w-2 h-2 bg-red-500 rotate-45 inline-block"></span>{" "}
            NEW AGENT
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-Oswald font-black text-white uppercase tracking-widest leading-none drop-shadow-2xl">
            {latestAgent?.displayName}
          </h1>
        </div>

        <img
          src={
            latestAgent.fullPortraitV2 ||
            latestAgent.fullPortrait ||
            latestAgent.displayIcon
          }
          alt={latestAgent.displayName}
          className="absolute bottom-0 h-[60%] sm:h-[75%] md:h-[90%] lg:h-[100%] w-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
        />
      </div>

      {/* Scrollable Grid Overlapping */}
      <div
        className="absolute inset-0 overflow-y-auto scrollbar-hidden pt-[40vh] md:pt-[50vh] lg:pt-[60vh] pb-12 pointer-events-auto z-20"
        onScroll={handleScroll}
        ref={gridContainerRef}
      >
        <div className="w-full bg-gradient-to-b from-transparent via-black/80 to-[#0f1923] pt-12 md:pt-20 px-2 md:px-8 min-h-[60vh]">
          {/* Header Divider */}
          <div className="w-full flex flex-col items-center mb-6 md:mb-8 relative">
            <div className="w-full h-[1px] bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
            <h3 className="text-white font-Oswald uppercase tracking-[0.2em] md:tracking-[0.3em] text-lg md:text-xl font-bold bg-[#0f1923] px-4 md:px-6 relative z-10">
              Agents
            </h3>
          </div>

          <div className="w-full flex justify-between items-end mb-4 px-2">
            <div className="flex gap-4 border-b border-white/20 pb-2 flex-1">
              <span className="text-white/40 text-[10px] md:text-xs font-Roboto tracking-widest uppercase cursor-pointer hover:text-white">
                Show Unowned Only ◇
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
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
  );
};

export default AgentRoster;
