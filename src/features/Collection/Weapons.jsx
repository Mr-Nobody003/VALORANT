import React, { useContext, useMemo } from "react";
import Weapon_box from "./Weapon_box";
import { PlayerContext } from "../../context/PlayerContext";
import { useWeapons } from "../../hooks/useWeapons";

// Importing weapon images
import knife from "../../assets/weapon/melee/melee.png";
import classic from "../../assets/weapon/sidearms/classic.png";
import shorty from "../../assets/weapon/sidearms/shorty.png";
import ghost from "../../assets/weapon/sidearms/ghost.png";
import frenzy from "../../assets/weapon/sidearms/frenzy.png";
import sheriff from "../../assets/weapon/sidearms/sheriff.png";
import stinger from "../../assets/weapon/smgs/stinger.png";
import spectre from "../../assets/weapon/smgs/spectre.png";
import bucky from "../../assets/weapon/shotguns/bucky.png";
import judge from "../../assets/weapon/shotguns/judge.png";
import bulldog from "../../assets/weapon/rifles/bulldog.png";
import guardian from "../../assets/weapon/rifles/guardian.png";
import phantom from "../../assets/weapon/rifles/phantom.png";
import vandel from "../../assets/weapon/rifles/vandal.png";
import marshal from "../../assets/weapon/snipers/marshal.png";
import operator from "../../assets/weapon/snipers/operator.png";
import outlaw from "../../assets/weapon/snipers/outlaw.png";
import ares from "../../assets/weapon/machine guns/ares.png";
import odin from "../../assets/weapon/machine guns/odin.png";

const localWeaponImages = {
    "CLASSIC": classic,
    "SHORTY": shorty,
    "FRENZY": frenzy,
    "GHOST": ghost,
    "SHERIFF": sheriff,
    "STINGER": stinger,
    "SPECTRE": spectre,
    "BUCKY": bucky,
    "JUDGE": judge,
    "BULLDOG": bulldog,
    "GUARDIAN": guardian,
    "PHANTOM": phantom,
    "VANDAL": vandel,
    "MELEE": knife,
    "MARSHAL": marshal,
    "OUTLAW": outlaw,
    "OPERATOR": operator,
    "ARES": ares,
    "ODIN": odin
};

const Weapons = ({ onWeaponClick }) => {
    const { equippedWeapons } = useContext(PlayerContext);
    const { data: weapons, isLoading } = useWeapons();

    const categorizedWeapons = useMemo(() => {
        if (!weapons) return {};
        
        // Ensure weapons is an array
        const weaponArray = Array.isArray(weapons) ? weapons : weapons.data;
        if (!Array.isArray(weaponArray)) return {};

        const groups = {
            SIDEARMS: [],
            SMGS: [],
            SHOTGUNS: [],
            RIFELS: [], 
            MELLE: [],
            SNIPERS: [],
            MACHINE_GUNS: []
        };

        weaponArray.forEach(w => {
            if (w.category === "EEquippableCategory::Sidearm") groups.SIDEARMS.push(w);
            else if (w.category === "EEquippableCategory::SMG") groups.SMGS.push(w);
            else if (w.category === "EEquippableCategory::Shotgun") groups.SHOTGUNS.push(w);
            else if (w.category === "EEquippableCategory::Rifle") groups.RIFELS.push(w);
            else if (w.category === "EEquippableCategory::Melee") groups.MELLE.push(w);
            else if (w.category === "EEquippableCategory::Sniper") groups.SNIPERS.push(w);
            else if (w.category === "EEquippableCategory::Heavy") groups.MACHINE_GUNS.push(w);
        });

        return groups;
    }, [weapons]);

    if (isLoading) {
        return <div className="text-white text-2xl font-Oswald flex items-center justify-center w-full h-full">LOADING WEAPONS...</div>;
    }

    const renderWeaponList = (category) => {
        const list = categorizedWeapons[category] || [];
        return list.map((weapon, index) => {
            const upperName = weapon.displayName.toUpperCase();
            const equippedSkin = equippedWeapons[upperName]; // Properly mapping to cookie names
            const defaultImage = localWeaponImages[upperName] || weapon.displayIcon; // Fallback to API base skin if no local image
            
            const displayImage = equippedSkin ? equippedSkin.displayIcon || equippedSkin.chromas?.[0]?.displayIcon || defaultImage : defaultImage;
            
            return (
                <Weapon_box 
                    key={weapon.uuid} 
                    name={upperName} 
                    image={displayImage} 
                    onClick={() => onWeaponClick({ name: upperName, defaultImage: defaultImage })}
                />
            );
        });
    };

    return (
        <div className="flex flex-wrap xl:flex-nowrap justify-between w-full h-auto xl:h-[70%] mt-4 xl:mt-[45px] gap-4 xl:gap-8">
            {/* Column 1: SIDEARMS */}
            <div className="flex flex-col rounded-md p-[5px] items-center">
                <div className="text-white p-[2px] text-lg mt-5 font-Oswald">SIDEARMS</div>
                <div className="flex flex-col gap-[16px]">
                    {renderWeaponList('SIDEARMS')}
                </div>
            </div>

            {/* Column 2: SMGS and SHOTGUNS */}
            <div className="flex flex-col rounded-md p-[5px]">
                <div className="flex flex-col items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">SMGS</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('SMGS')}
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">SHOTGUNS</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('SHOTGUNS')}
                    </div>
                </div>
            </div>

            {/* Column 3: RIFLES and MELEE */}
            <div className="flex flex-col rounded-md p-[5px]">
                <div className="flex flex-col items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">RIFLES</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('RIFELS')}
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">MELEE</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('MELLE')}
                    </div>
                </div>
            </div>

            {/* Column 4: SNIPERS and MACHINE GUNS */}
            <div className="flex flex-col rounded-md p-[5px]">
                <div className="flex flex-col items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">SNIPER RIFLES</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('SNIPERS')}
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">MACHINE GUNS</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('MACHINE_GUNS')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weapons;
