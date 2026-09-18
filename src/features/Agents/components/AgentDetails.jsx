import React, { useState, useEffect } from "react";

const AgentDetails = ({ selectedAgent, agents, setSelectedAgent }) => {
  const [activeAbility, setActiveAbility] = useState(null);

  useEffect(() => {
    if (selectedAgent && selectedAgent.abilities?.length > 0) {
      setActiveAbility(selectedAgent.abilities[0]);
    }
  }, [selectedAgent]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden animate-in fade-in duration-300 mt-0 relative">
      {/* Background Shape Highlight */}
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
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
  );
};

export default AgentDetails;
