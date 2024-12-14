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
const Weaponshotgun = [
    {
        name: "CLASSIC",
        image: classic,
    },
    {
        name: "STINGER",
        image: stinger,
    },
    {
        name: "BULLDOG",
        image: bulldog,
    },
    {
        name: "MARSHAL",
        image: marshal,
    },
    {
        name: "SHORTY",
        image: shorty,
    },
    {
        name: "SPECTRE",
        image: spectre,
    },
    {
        name: "GUARDIAN",
        image: guardian,
    },
    {
        name: "OUTLAW",
        image: outlaw,
    },
    {
        name: "FRENZY",
        image: frenzy,
    },
    {
        name: "BUCKY",
        image: bucky,
    },
    {
        name: "PHANTOM",
        image: phantom,
    },
    
    {
        name: "OPERATOR",
        image: operator,
    },
    {
        name: "GHOST",
        image: ghost,
    },
    {
        name: "JUDGE",
        image: judge,
    },
    {
        name: "VANDAL",
        image: vandal,
    },
    {
        name: "ARES",
        image: ares,
    },
    {
        name: "SHERIFF",
        image: sheriff,
    },
    {
        name: "MELEE",
        image: melee,
    },




    {
        name: "ODIN",
        image: odin,
    },



]
const Weapons = () => {
    return (
        <div>
            <div className="bg-gradient-to-br from-pink-800 via-purple-700 to-indigo-800 overflow-hidden h-screen w-full pt-28 items-center justify-center">
                <div className="text-white justify-center items-center w-full flex">
                    <div className="text-2sm text-white">COLLECTION</div>
                </div>
                {<div className="flex p-2 items-center justify-center w-full">
                    <div className="grid grid-cols-4 gap-4 h-[500px] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit">
                        {Weaponshotgun.map((shotgun, index) => (
                            <Weapon_box
                                key={index}
                                name={shotgun.name}
                                image={shotgun.image}


                            />
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )

}

export default Weapons
