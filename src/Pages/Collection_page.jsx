import React, { useState } from "react";
import Weapons from "../components/Weapons";
import Playercard from "../components/Playercard";
import Sprays from "../components/Sprays";
import Play_bgc from "../assets/pages_bgc/Play_bgc.png";
import PlayerCardSelection from "./PlayerCardSelection";
import WeaponSelection from "./WeaponSelection";
import SpraySelection from "./SpraySelection";

const Collection_page = () => {
  const [isSelectingCard, setIsSelectingCard] = useState(false);
  const [selectedWeaponForSkin, setSelectedWeaponForSkin] = useState(null); // { name, defaultImage }
  const [selectedSprayQuadrant, setSelectedSprayQuadrant] = useState(null); // 'Top', 'Right', 'Bottom', 'Left'

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={Play_bgc}
        alt="background"
        className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
      />

      {isSelectingCard ? (
          <PlayerCardSelection onBack={() => setIsSelectingCard(false)} />
      ) : selectedWeaponForSkin ? (
          <WeaponSelection weapon={selectedWeaponForSkin} onBack={() => setSelectedWeaponForSkin(null)} />
      ) : selectedSprayQuadrant ? (
          <SpraySelection quadrant={selectedSprayQuadrant} onBack={() => setSelectedSprayQuadrant(null)} />
      ) : (
          <div className="flex flex-col xl:flex-row h-full w-full justify-center px-4 xl:px-8 py-8 xl:py-0">
            {/* Weapons Section */}
            <div className="flex justify-center w-full xl:w-auto overflow-y-auto xl:overflow-visible h-full xl:h-auto pb-20 xl:pb-0">
              <Weapons onWeaponClick={(weapon) => setSelectedWeaponForSkin(weapon)} />
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center xl:ml-10 mt-8 xl:mt-0 gap-[40px] xl:gap-0 relative">
              <div onClick={() => setIsSelectingCard(true)} className="cursor-pointer">
                  <Playercard />
              </div>
              
              <div className="flex xl:absolute xl:bottom-[40px]">
                <Sprays onQuadrantClick={(quadrant) => setSelectedSprayQuadrant(quadrant)} />
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default Collection_page;
