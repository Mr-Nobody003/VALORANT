import React, { useContext } from "react";
import Weapon_box from "./Weapon_box";
import { PlayerContext } from "../context/PlayerContext";

// Importing weapon images
import knife from "../assets/weapon/melee/melee.png";

import classic from "../assets/weapon/sidearms/classic.png";
import shorty from "../assets/weapon/sidearms/shorty.png";
import ghost from "../assets/weapon/sidearms/ghost.png";
import frenzy from "../assets/weapon/sidearms/frenzy.png";
import sheriff from "../assets/weapon/sidearms/sheriff.png";

import stinger from "../assets/weapon/smgs/stinger.png";
import spectre from "../assets/weapon/smgs/spectre.png";

import bucky from "../assets/weapon/shotguns/bucky.png";
import judge from "../assets/weapon/shotguns/judge.png";

import bulldog from "../assets/weapon/rifles/bulldog.png";
import guardian from "../assets/weapon/rifles/guardian.png";
import phantom from "../assets/weapon/rifles/phantom.png";
import vandel from "../assets/weapon/rifles/vandal.png";

import marshal from "../assets/weapon/snipers/marshal.png";
import operator from "../assets/weapon/snipers/operator.png";
import outlaw from "../assets/weapon/snipers/outlaw.png";

import ares from "../assets/weapon/machine guns/ares.png";
import odin from "../assets/weapon/machine guns/odin.png";

const weaponsData = {
    SIDEARMS: [
        { name: "CLASSIC", image: classic },
        { name: "SHORTY", image: shorty },
        { name: "FRENZY", image: frenzy },
        { name: "GHOST", image: ghost },
        { name: "SHERIFF", image: sheriff },
    ],
    SMGS: [
        { name: "STINGER", image: stinger },
        { name: "SPECTRE", image: spectre },
    ],
    SHOTGUNS: [
        { name: "BUCKY", image: bucky },
        { name: "JUDGE", image: judge },
    ],
    RIFELS: [
        { name: "BULLDOG", image: bulldog },
        { name: "GUARDIAN", image: guardian },
        { name: "PHANTOM", image: phantom },
        { name: "VANDAL", image: vandel },
    ],
    MELLE: [{ name: "MELEE", image: knife }], // Changed KNIFE to MELEE to match API
    SNIPERS: [
        { name: "MARSHAL", image: marshal },
        { name: "OUTLAW", image: outlaw },
        { name: "OPERATOR", image: operator },
    ],
    MACHINE_GUNS: [
        { name: "ARES", image: ares },
        { name: "ODIN", image: odin },
    ],
    // Add more categories as needed...
};

const Weapons = ({ onWeaponClick }) => {
    const { equippedWeapons } = useContext(PlayerContext);

    const renderWeaponList = (category) => {
        return weaponsData[category].map((weapon, index) => {
            const equippedSkin = equippedWeapons[weapon.name];
            const displayImage = equippedSkin ? equippedSkin.displayIcon || equippedSkin.chromas?.[0]?.displayIcon || weapon.image : weapon.image;
            return (
                <Weapon_box 
                    key={index} 
                    name={weapon.name} 
                    image={displayImage} 
                    onClick={() => onWeaponClick({ name: weapon.name, defaultImage: weapon.image })}
                />
            );
        });
    };

    return (
        <div className="flex flex-wrap xl:flex-nowrap justify-center h-auto xl:h-[70%] mt-4 xl:mt-[45px] gap-6 xl:gap-2">
            {/* sidearms */}
            <div className="flex flex-col rounded-md p-[5px]  items-center">
                <div className="text-white p-[2px] text-lg mt-5 font-Oswald">SIDEARMS</div>
                <div className="flex flex-col gap-[16px]">
                    {renderWeaponList('SIDEARMS')}
                </div>
            </div>
            {/* smgs and shot guns */}
            <div className="flex flex-col rounded-md  p-[5px] ">
                {/* SMGS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">SMGS</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('SMGS')}
                    </div>
                </div>
                {/* SHOTGUNS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">
                        SHOTGUNS
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('SHOTGUNS')}
                    </div>
                </div>
            </div>
            {/* rifeles and melle */}
            <div className="flex flex-col rounded-md  p-[5px] ">
                {/* RIFELS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">RIFLES</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('RIFELS')}
                    </div>
                </div>
                {/* MELLE */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">
                        MELEE
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('MELLE')}
                    </div>
                </div>
            </div>
            {/* sniper rifels and machine guns */}
            <div className="flex flex-col rounded-md  p-[5px] ">
                {/*SNIPER  RIFELS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">SNIPER RIFLES</div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('SNIPERS')}
                    </div>
                </div>
                {/* MACHINE GUNS*/}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">
                        MACHINE GUNS
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        {renderWeaponList('MACHINE_GUNS')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weapons;
