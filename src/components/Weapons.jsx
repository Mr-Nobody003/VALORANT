import React from "react";
import Weapon_box from "./Weapon_box";

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
    MELLE: [{ name: "KNIFE", image: knife }],
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

const Weapons = () => {
    return (
        <div class="flex h-[70%] mt-[45px]">
            {/* sidearms */}
            <div className="flex flex-col rounded-md p-[5px]  items-center">
                <div className="text-white p-[2px] text-lg mt-5 font-Oswald">SIDEARMS</div>
                <div className="flex flex-col gap-[16px]">
                    {weaponsData.SIDEARMS.map((weapon, index) => (
                        <Weapon_box key={index} name={weapon.name} image={weapon.image} />
                    ))}
                </div>
            </div>
            {/* smgs and shot guns */}
            <div className="flex flex-col rounded-md  p-[5px] ">
                {/* SMGS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">SMGS</div>
                    <div className="flex flex-col gap-[16px]">
                        {weaponsData.SMGS.map((weapon, index) => (
                            <Weapon_box key={index} name={weapon.name} image={weapon.image} />
                        ))}
                    </div>
                </div>
                {/* SHOTGUNS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">
                        SHOTGUNS
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        {weaponsData.SHOTGUNS.map((weapon, index) => (
                            <Weapon_box key={index} name={weapon.name} image={weapon.image} />
                        ))}
                    </div>
                </div>
            </div>
            {/* rifeles and melle */}
            <div className="flex flex-col rounded-md  p-[5px] ">
                {/* RIFELS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">RIFELS</div>
                    <div className="flex flex-col gap-[16px]">
                        {weaponsData.RIFELS.map((weapon, index) => (
                            <Weapon_box key={index} name={weapon.name} image={weapon.image} />
                        ))}
                    </div>
                </div>
                {/* MELLE */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">
                        MELLE
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        {weaponsData.MELLE.map((weapon, index) => (
                            <Weapon_box key={index} name={weapon.name} image={weapon.image} />
                        ))}
                    </div>
                </div>
            </div>
            {/* sniper rifels and machine guns */}
            <div className="flex flex-col rounded-md  p-[5px] ">
                {/*SNIPER  RIFELS */}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">SNIPER RIFELS</div>
                    <div className="flex flex-col gap-[16px]">
                        {weaponsData.SNIPERS.map((weapon, index) => (
                            <Weapon_box key={index} name={weapon.name} image={weapon.image} />
                        ))}
                    </div>
                </div>
                {/* MACHINE GUNS*/}
                <div className="flex flex-col  items-center">
                    <div className="flex text-white p-[2px] text-lg mt-5 font-Oswald">
                        MACHINE GUNS
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        {weaponsData.MACHINE_GUNS.map((weapon, index) => (
                            <Weapon_box key={index} name={weapon.name} image={weapon.image} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weapons;
