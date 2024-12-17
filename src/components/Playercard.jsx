import React from "react";
import DoomBringer from "../assets/player_cards/DoomBringer_Card.png";
import HomeAgain from "../assets/player_cards/HomeAgain_viper_Card.png";

const Playercard = () => {
  return (
    <div className="mt-12 flex-col">
      <div className="mt-6 flex  justify-center text-white text-2sm font-Roboto">
        PLAYER CARD
      </div>
      {/* playercard */}
      <div className="flex justify-center m-0 p-0 overflow-hidden relative">
        <img
          src={HomeAgain}
          alt="Playercard"
          className="object-contain w-[250px] h-[450px] p-[5px] "
        />
        {/* player name */}
        <div className="flex absolute w-[185px] bg-yellow-300 bottom-[100px] justify-center  text-sm">PLAYER_NAME</div>

      </div>
    </div>
  );
};

export default Playercard;
