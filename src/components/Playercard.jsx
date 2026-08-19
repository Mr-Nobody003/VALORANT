import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import GentleBreeze from "../assets/player_cards/GentleBreeze_Card.png";

const Playercard = () => {
  const { equippedCard, equippedTitle, showLevel, equippedBorder } = useContext(PlayerContext);

  return (
    <div className="mt-[45px] flex-col cursor-pointer">
      <div className="mt-5 flex  justify-center text-white text-lg font-Oswald">
        PLAYER CARDS
      </div>
      {/* playercard */}
      <div className="flex justify-center m-0 p-0 relative">
        <img
          src={equippedCard ? equippedCard.largeArt : GentleBreeze}
          alt="Playercard"
          className="object-fill w-[200px] h-[450px] p-[5px] filter brightness-100"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0) , rgba(0, 0, 0, 1) 50%)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0) 10px, rgba(0, 0, 0, 1) 50%)",
          }}
        />
        {/* Gradient Overlay for Blending */}
        {/* <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black/90 to-transparent"></div> */}
        {/* player name */}
        <div className="flex absolute bottom-[150px] w-[190px] bg-yellow-100  justify-center  text-[12px] shadow-xl shadow-black/50 text-black font-semibold">
          PLAYER_NAME
        </div>
        {/* player title */}
        <div className="flex absolute bottom-[135px] w-[190px] text-[10px] text-white justify-center bg-black/40">
          {equippedTitle ? (equippedTitle.titleText || equippedTitle.displayName) : "Super Shy"}
        </div>
        {/* blur */}
        {/* <div className="flex absolute bottom-[10px] backdrop-blur-sm  w-[190px] h-[125px] "></div> */}
        
        {/* Level Border */}
        {showLevel && equippedBorder && (
            <div className="absolute -top-[15px] left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
                <img src={equippedBorder.levelNumberAppearance} alt="Level Border" className="w-[70px] h-[70px] object-contain drop-shadow-lg" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[10px] font-bold mt-[1px]">
                    999
                </span>
            </div>
        )}
      </div>
    </div>
  );
};

export default Playercard;
