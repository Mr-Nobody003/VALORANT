import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAgents } from "../../hooks/useAgents";
import AgentRoster from "./components/AgentRoster";
import AgentDetails from "./components/AgentDetails";

const AgentPage = ({ selectedAgent, setSelectedAgent }) => {
  const { data, isLoading, isError } = useAgents();
  const [scrollProgress, setScrollProgress] = useState(0);

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
      {/* Background Gradient */}
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
        {!selectedAgent ? (
          <AgentRoster 
            agents={agents} 
            latestAgent={latestAgent} 
            setSelectedAgent={setSelectedAgent}
            scrollProgress={scrollProgress}
            setScrollProgress={setScrollProgress}
          />
        ) : (
          <AgentDetails 
            selectedAgent={selectedAgent} 
            agents={agents} 
            setSelectedAgent={setSelectedAgent} 
          />
        )}
      </div>
    </div>
  );
};

export default AgentPage;
