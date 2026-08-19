import React, { useState, useRef, useEffect } from "react";
import Agent_box from "../components/Agent_box";
import { useAgents } from "../hooks/useAgents";
import { Loader2, ArrowLeft } from "lucide-react";

const Agent_page = ({ selectedAgent, setSelectedAgent }) => {
  const { data, isLoading, isError } = useAgents();

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

  const { agents, latestAgent } = data;
  const activeAgent = selectedAgent || latestAgent;

  const backgroundGradient = activeAgent?.backgroundGradientColors
    ? `linear-gradient(135deg, #${activeAgent.backgroundGradientColors[0]}, #${activeAgent.backgroundGradientColors[1]}, #${activeAgent.backgroundGradientColors[2]}, #${activeAgent.backgroundGradientColors[3]})`
    : "#e51010ff";

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col pt-24 bg-[#0f1923]">
      {/* Background Gradient (Fades in based on scroll in View 1, fully visible in View 2) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: backgroundGradient,
          opacity: selectedAgent ? 1 : scrollProgress,
        }}
      ></div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 transition-opacity duration-700"></div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col px-6 md:px-12 lg:px-24 pb-4">
        {/* Removed internal Top Bar since Nav handles back routing */}

        {!selectedAgent ? (
          // VIEW 1: Roster View (Central Portrait + Bottom Grid)
          <div className="flex-1 w-full h-full relative min-h-0 overflow-hidden animate-in fade-in duration-500">
            {/* View 1 Background Typography */}
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

            {/* Central Portrait (Fades out and moves up when scrolling grid) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100 z-10"
              style={{
                opacity: 1 - scrollProgress,
                transform: `translateY(-${scrollProgress * 50}px)`,
              }}
            >
              {/* Left Side Info Panel */}
              <div className="absolute left-4 md:left-10 lg:left-20 top-[15%] md:top-[25%] lg:top-1/3 -translate-y-1/2 text-left z-20">
                <p className="text-white font-Roboto font-bold text-xs md:text-sm lg:text-base flex items-center gap-2 tracking-[0.2em] mb-1">
                  <span className="w-2 h-2 bg-red-500 rotate-45 inline-block"></span>{" "}
                  NEW AGENT
                </p>
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-Oswald font-black text-white uppercase tracking-widest leading-none drop-shadow-2xl">
                  {latestAgent?.displayName}
                </h1>
              </div>

              {/* Character Full Portrait */}
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
                {/* AGENTS Header Divider */}
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

                {/* Grid */}
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
        ) : (
          // VIEW 2: Detail View (Matching App layout)
          <div className="flex-1 flex flex-col h-full overflow-hidden animate-in fade-in duration-300 mt-0 relative">
            {/* View 2 Background Shape Highlight */}
            {selectedAgent.background && (
              <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden mix-blend-screen">
                <img
                  src={selectedAgent.background}
                  alt=""
                  className="w-full h-full object-contain -ml-[40%] scale-[2.5] md:scale-[2.0] lg:scale-[1.8] opacity-80 opacity-80"
                />
              </div>
            )}

            {/* Main Content Container */}
            <div className="flex-1 relative flex flex-col md:flex-row min-h-0 w-full overflow-hidden">
              {/* Center: Large Portrait */}
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pb-4">
                <img
                  src={
                    selectedAgent.fullPortraitV2 ||
                    selectedAgent.fullPortrait ||
                    selectedAgent.displayIcon
                  }
                  alt={selectedAgent.displayName}
                  className="h-[80%] md:h-[95%] lg:h-[110%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-500"
                />
              </div>

              {/* Right: Floating Info */}
              <div className="absolute right-0 top-0 w-full md:w-[400px] lg:w-[450px] xl:w-[500px] h-full p-6 md:p-10 z-20 overflow-y-auto scrollbar-hidden flex flex-col justify-start pt-24">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/90 font-Roboto uppercase tracking-[0.2em] font-bold text-sm md:text-base">
                    {selectedAgent.role?.displayName}
                  </span>
                </div>

                <h2 className="text-6xl md:text-8xl lg:text-9xl font-Oswald font-black text-[#ece8e1] uppercase tracking-widest mb-8 leading-none drop-shadow-lg">
                  {selectedAgent.displayName}
                </h2>

                {/* Abilities Table */}
                <div className="mb-6 w-full max-w-[400px]">
                  <div className="flex w-full border border-white/30 bg-white/5 backdrop-blur-md">
                    <div
                      onClick={() =>
                        setActiveAbility({
                          isRole: true,
                          displayName: "Role",
                          description: selectedAgent.description,
                        })
                      }
                      className={`flex-1 flex flex-col items-center justify-center border-r border-white/30 p-2 md:p-3 cursor-pointer transition-colors ${activeAbility?.isRole ? "bg-white/20" : "hover:bg-white/10"}`}
                    >
                      <span className="text-white/60 text-[10px] md:text-xs uppercase font-Roboto tracking-widest mb-2">
                        INFO
                      </span>
                      <img
                        src={selectedAgent.role?.displayIcon}
                        className="w-5 h-5 md:w-6 md:h-6 opacity-80"
                        alt="Role"
                      />
                    </div>
                    {selectedAgent.abilities
                      ?.filter((a) => a.slot !== "Passive")
                      .map((ability, idx) => {
                        // Map slots to standard keys
                        let keyLabel = ability.slot;
                        if (ability.slot === "Ability1") keyLabel = "Q";
                        if (ability.slot === "Ability2") keyLabel = "E";
                        if (ability.slot === "Grenade") keyLabel = "C";
                        if (ability.slot === "Ultimate") keyLabel = "X";

                        return (
                          <div
                            key={idx}
                            onClick={() => setActiveAbility(ability)}
                            className={`flex-1 flex flex-col items-center justify-center border-r last:border-r-0 border-white/30 p-2 md:p-3 cursor-pointer transition-colors ${activeAbility?.displayName === ability.displayName ? "bg-white/20" : "hover:bg-white/10"}`}
                          >
                            <span className="text-white/60 text-[10px] md:text-xs uppercase font-Roboto tracking-widest mb-2">
                              {keyLabel}
                            </span>
                            {ability.displayIcon ? (
                              <img
                                src={ability.displayIcon}
                                alt={ability.displayName}
                                className="w-5 h-5 md:w-6 md:h-6 opacity-80"
                              />
                            ) : (
                              <div className="w-5 h-5 md:w-6 md:h-6"></div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Active Ability / Info Description */}
                <div className="min-h-[150px] animate-in fade-in duration-300 max-w-[450px]">
                  <p className="text-white/90 font-Roboto text-sm md:text-[15px] leading-relaxed mb-6 drop-shadow-md">
                    {activeAbility?.isRole
                      ? selectedAgent.description
                      : activeAbility?.description}
                  </p>

                  {activeAbility?.isRole ? (
                    <div className="mt-4 border-t border-white/20 pt-4">
                      <strong className="text-white font-Oswald uppercase tracking-widest text-xl md:text-2xl block mb-2 drop-shadow-md">
                        {selectedAgent.role?.displayName}
                      </strong>
                      <p className="text-white/70 font-Roboto text-xs md:text-sm leading-relaxed drop-shadow-md">
                        {selectedAgent.role?.description}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 border-t border-white/20 pt-4 flex justify-between items-center">
                      <strong className="text-white font-Oswald uppercase tracking-widest text-xl md:text-2xl block drop-shadow-md">
                        {activeAbility?.displayName}
                      </strong>
                      <span className="text-white/50 font-Roboto text-xs tracking-widest uppercase">
                        {activeAbility?.slot}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Carousel */}
            <div className="w-full relative shrink-0 pt-6 pb-4 px-4 md:px-12 lg:px-24 z-20">
              {/* Horizontal Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
              {/* Diamond Center Marker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>

              <div
                className="flex items-center gap-1 md:gap-2 overflow-x-auto overflow-y-hidden scrollbar-hidden animate-in slide-in-from-bottom-8 fade-in duration-500 w-full justify-start md:justify-center"
                onWheel={(e) => {
                  if (e.deltaY !== 0) {
                    e.currentTarget.scrollLeft += e.deltaY;
                  }
                }}
              >
                {agents.map((agent) => (
                  <div
                    key={agent.uuid}
                    onClick={() => setSelectedAgent(agent)}
                    className={`relative flex-shrink-0 w-16 h-10 md:w-20 md:h-12 border cursor-pointer transition-all hover:scale-105 ${selectedAgent.uuid === agent.uuid ? "border-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10" : "border-white/20 hover:border-white/50"} bg-black/40 overflow-hidden backdrop-blur-sm`}
                  >
                    <img
                      src={agent.displayIcon}
                      alt={agent.displayName}
                      className={`w-full h-full object-contain object-center scale-[1.2] pt-1 transition-opacity ${selectedAgent.uuid === agent.uuid ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agent_page;
