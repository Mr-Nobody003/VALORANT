import React, { useState, useEffect } from "react";
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
  const [scale, setScale] = useState(1);

  // Dynamically calculate scale to fit smaller screens
  useEffect(() => {
    const handleResize = () => {
      // 1400px is the safe width for this fixed layout
      const baseWidth = 1400;
      const currentWidth = window.innerWidth;
      if (currentWidth < baseWidth) {
        setScale(currentWidth / baseWidth);
      } else {
        setScale(1);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <img src={Play_bgc} className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover opacity-50" />
      {/* <video src={Contract} autoPlay muted loop className="absolute -z-10 -mt-[40px] object-fill w-full transform scale-105  opacity-[39%]" /> */}
      <video
        preload="auto"
        src={Contract}
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-screen h-screen object-cover -z-10 opacity-[49%]"
      />

      {/* Main Responsive Wrapper */}
      <div className="w-full h-screen flex justify-center overflow-hidden">
        
        {/* Scaled Canvas */}
        <div 
          className="text-white pt-20 pb-4 flex flex-col w-[1400px] shrink-0 origin-top transition-transform duration-75"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Pass content array, activeType, and setActiveType as props */}
          <Content
            activeType={activeType}
            setActiveType={setActiveType}
            content={playTypes}
          />
          <Play_party />

          {activeType === "CUSTOM GAME" ? <Play_custom /> : <Play_card activeType={activeType} />}

          <Play_info activeType={activeType} />
          <Play_buttons />
        </div>
      </div>
    </>
  );
};

export default Play_page;
