import React, { useState } from "react";
import Agent_box from "../components/Agent_box";
import Agent_modal from "../components/Agent_modal";
import { useAgents } from "../hooks/useAgents";
import { Loader2 } from "lucide-react";

const Agent_page = () => {
  const { data: agents, isLoading, isError } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState(null);

  if (isLoading) {
    return (
      <div className="bg-[#0f1923] h-screen w-full flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#0f1923] h-screen w-full flex items-center justify-center text-white font-Roboto">
        Error loading agents. Please check your connection.
      </div>
    );
  }

  return (
    <div className="bg-[#0f1923] min-h-screen w-full pt-28 pb-12 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="text-white w-full mb-10">
        <h1 className="text-4xl md:text-6xl font-Oswald font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Agents
        </h1>
        <p className="text-gray-400 mt-2 font-Roboto max-w-2xl">
          Meet the roster of radiant and non-radiant agents, each equipped with their own unique set of abilities.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {agents?.map((agent) => (
          <Agent_box
            key={agent.uuid}
            agent={agent}
            onClick={() => setSelectedAgent(agent)}
          />
        ))}
      </div>

      {/* Modal */}
      <Agent_modal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </div>
  );
};

export default Agent_page;
