import React, { useState } from "react";
import Content from "../components/Content"; // Updated import
import Play_party from "../components/Play_party";
import Play_card from "../components/Play_card";
import Play_info from "../components/Play_info";
import Play_buttons from "../components/Play_buttons";
import Play_custom from "../components/Play_custom";
import Play_bgc from "../assets/pages_bgc/Play_bgc.png";
import Contract from "../assets/video/Contract Glitches.webm";

const Play_page = () => {
  const [activeType, setActiveType] = useState("UNRATED"); // Default play type

  // Play types array
  const playTypes = [
    "UNRATED",
    "COMPETITIVE",
    "SWIFTPLAY",
    "SPIKE RUSH",
    "DEATHMATCH",
    "ESCALATION",
    "TEAM DEATHMATCH",
    "PREMIER",
    "CUSTOM GAME",
  ];

  return (
    <>
      <img src={Play_bgc} className="absolute -z-10 h-full w-full bg-opacity-[50%]" />
      {/* <video src={Contract} autoPlay muted loop className="absolute -z-10 -mt-[40px] object-fill w-full transform scale-105  opacity-[39%]" /> */}
      <video
        preload="auto"
        src={Contract}
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-screen h-screen object-cover -z-10 opacity-[49%]"
      />

      <div className="text-white pt-20 pb-4 pr-32 pl-32 flex flex-col">
        {/* Pass content array, activeType, and setActiveType as props */}
        <Content
          activeType={activeType}
          setActiveType={setActiveType}
          content={playTypes}
        />
        <Play_party />

        {activeType === "CUSTOM GAME" ? <Play_custom /> : <Play_card />}

        <Play_info activeType={activeType} />
        <Play_buttons />
      </div>
    </>
  );
};

export default Play_page;
