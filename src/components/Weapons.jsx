import React from 'react'
import Weapon_box from './Weapon_box'
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
import vandal from "../assets/weapon/rifles/vandal.png";
import melee from "../assets/weapon/melee/melee.png";
import outlaw from "../assets/weapon/snipers/outlaw.png";
import operator from "../assets/weapon/snipers/operator.png";
import ares from "../assets/weapon/machine guns/ares.png";
import odin from "../assets/weapon/machine guns/odin.png";
import marshal from "../assets/weapon/snipers/marshal.png";

const sidearms = [
    {
        name: "CLASSIC",
        image: classic,
    },
    {
        name: "SHORTY",
        image: shorty,
    },
    {
        name: "FRENZY",
        image: frenzy,
    },
    {
        name: "GHOST",
        image: ghost,
    },
    {
        name: "SHERIFF",
        image: sheriff,
    },
];
const smgs = [
    {
        name: "STINGER",
        image: stinger,
    },
    {
        name: "SPECTRE",
        image: spectre,
    },
];
const knife = [
    {
        name: "MELEE",
        image: melee,
    },
];
const machinegun = [
    {
        name: "ARES",
        image: ares,
    },
    {
        name: "ODIN",
        image: odin,
    },
];
const sniper = [
    {
        name: "MARSHAL",
        image: marshal,
    },
    {
        name: "OUTLAW",
        image: outlaw,
    },
    {
        name: "OPERATOR",
        image: operator,
    },
];
const rifels = [
    {
        name: "BULLDOG",
        image: bulldog,
    },
    {
        name: "GUARDIAN",
        image: guardian,
    },
    {
        name: "PHANTOM",
        image: phantom,
    },
    {
        name: "VANDAL",
        image: vandal,
    },
];
const shotguns = [{
    name: "BUCKY",
    image: bucky,
},
{
    name: "JUDGE",
    image: judge,
},
];


const Weapons = () => {
    return (
        <div className='flex flex-row'>
            <div className="overflow-hidden pt-28 items-center justify-center">
                <div className="text-white justify-center items-center flex">
                    <div className="text-2sm text-white">SIDEARMS</div>
                </div>
                <div className="flex p-2 items-center justify-center">
                    <div className="grid grid-rows-4 gap-4  overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit">
                        {sidearms.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}


                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="overflow-hidden  items-center justify-center flex flex-col">
                <div className="text-white justify-center items-center flex">
                    <div className="text-2sm text-white">SMGS</div>
                </div>
                <div className="flex p-2 items-center justify-center">
                    <div className="grid grid-rows-1 gap-4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit">
                        {smgs.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}
                            />
                        ))}
                        <div className="text-white justify-center items-center flex">
                            <div className="text-2sm text-white">SHOTGUN</div>
                        </div>
                        {shotguns.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}


                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="overflow-hidden pt-28 items-center justify-center">
                <div className="text-white justify-center items-center flex">
                    <div className="text-2sm text-white">Rifels</div>
                </div>
                <div className="flex p-2 items-center justify-center">
                    <div className="grid grid-rows-1 gap-4  overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit">
                        {rifels.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}
                            />
                        ))}
                    </div>
                </div>
                <div className="text-white justify-center items-center flex">
                    <div className="text-2sm text-white">MELLE</div>
                </div>
                <div className="flex p-2 items-center justify-center">
                    <div className="grid grid-rows-1 gap-4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit">
                        {knife.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}


                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="overflow-hidden -mt[100px} items-center justify-center flex flex-col">
                <div className="text-white justify-center items-center flex">
                    <div className="text-2sm text-white">SMGS</div>
                </div>
                <div className="flex p-2 items-center justify-center">
                    <div className="grid grid-rows-1 gap-1 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit -pb-[200px]">
                        {sniper.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}


                            />
                        ))}
                        <div className="text-white justify-center items-center flex -pd-[50px]">
                            <div className="text-2sm text-white">SHOTGUN</div>
                        </div>
                        {machinegun.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>

    )

}

export default Weapons
