import React from "react";
import DoomBringer from "../assets/player_cards/DoomBringer_Card.png";
import HomeAgain from "../assets/player_cards/HomeAgain_viper_Card.png";
import GentleBreeze from "../assets/player_cards/GentleBreeze_Card.png";

const Playercard = () => {
  return (
    <div className="mt-12 flex-col cursor-pointer">
      <div className="mt-6 flex  justify-center text-white text-lg font-Oswald">
        PLAYER CARDS
      </div>
      {/* playercard */}
      <div className="flex justify-center m-0 p-0 overflow-hidden relative">
        <img
          src={GentleBreeze}
          alt="Playercard"
          className="object-fill w-[200px] h-[450px] p-[5px] filter brightness-100"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0) , rgba(0, 0, 0, 1) 50%)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0) 10px, rgba(0, 0, 0, ) 50%)",
          }}
        />
        {/* Gradient Overlay for Blending */}
        {/* <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black/90 to-transparent"></div> */}
        {/* player name */}
        <div className="flex absolute bottom-[150px] w-[190px] bg-yellow-100  justify-center  text-[12px] shadow-xl shadow-black/50 ">
          PLAYER_NAME
        </div>
        {/* player title */}
        <div className="flex absolute bottom-[135px] w-[190px] text-[10px] text-white justify-center bg-black/40">
          player title
        </div>
        {/* blur */}
        {/* <div className="flex absolute bottom-[10px] backdrop-blur-sm  w-[190px] h-[125px] "></div> */}
      </div>
    </div>
  );
};

export default Playercard;
