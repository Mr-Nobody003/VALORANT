import React, { useState } from "react";
import Premieer_scheduler from "../components/Premieer_scheduler";
import Premieer_mid from "../components/Premieer_mid";
import Premieer_verify from "../components/Premieer_verify";
import Content from "../components/Content";
import Premieer_bgc from "../assets/pages_bgc/Premieer_bgc.png";
const Premieer_page = ({ onBack }) => {
  const [activeType, setActiveType] = useState("HUB");

  const type = ["HUB"];

  return (
    <>
      <img
        src={Premieer_bgc}
        alt="premieer bgc"
        className="absolute -z-10 h-screen w-full"
      />

      <div className="content pt-11 items-center">
        <Content
          activeType={activeType}
          setActiveType={setActiveType}
          content={type}
        />
      </div>

      <div className="flex flex-row justify-between pt-20 p-2 items-center">
        <Premieer_scheduler />
        <Premieer_mid />
        <Premieer_verify />
      </div>
    </>
  );
};

export default Premieer_page;
