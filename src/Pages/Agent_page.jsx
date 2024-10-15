import React from "react";
import Agent_box from "../components/Agent_box";

// Importing agent icons
import brimstone from "../assets/agents_icon/brimstone.png";
import viper from "../assets/agents_icon/viper.png";
import omen from "../assets/agents_icon/omen.png";
import jett from "../assets/agents_icon/jett.png";
import phoenix from "../assets/agents_icon/phoenix.png";
import sage from "../assets/agents_icon/sage.png";
import sova from "../assets/agents_icon/sova.png";
import reyna from "../assets/agents_icon/reyna.png";
import raze from "../assets/agents_icon/raze.png";
import breach from "../assets/agents_icon/breach.png";
import killjoy from "../assets/agents_icon/killjoy.png";
import cypher from "../assets/agents_icon/cypher.png";
import skye from "../assets/agents_icon/skye.png";
import yoru from "../assets/agents_icon/yoru.png";
import astra from "../assets/agents_icon/astra.png";
import kayo from "../assets/agents_icon/kayo.png";
import chamber from "../assets/agents_icon/chamber.png";
import neon from "../assets/agents_icon/neon.png";
import fade from "../assets/agents_icon/fade.png";
import harbor from "../assets/agents_icon/harbor.png";
import deadlock from "../assets/agents_icon/deadlock.png";
import clove from "../assets/agents_icon/clove.png";
import iso from "../assets/agents_icon/iso.png";
import vyse from "../assets/agents_icon/vyse.png";
import gekko from "../assets/agents_icon/gekko.png";

// Importing agent type icons
import controller from "../assets/agent_type/controller.png";
import duelist from "../assets/agent_type/duelist.png";
import sentinel from "../assets/agent_type/sentinel.png";
import initiator from "../assets/agent_type/initiator.png";

const agents = [
  {
    name: "BRIMSTONE",
    image: brimstone,
    type: "CONTROLLER",
    typeimg: controller,
  },
  {
    name: "VIPER",
    image: viper,
    type: "CONTROLLER",
    typeimg: controller,
  },
  {
    name: "OMEN",
    image: omen,
    type: "CONTROLLER",
    typeimg: controller,
  },
  { name: "JETT", image: jett, type: "DUELIST", typeimg: duelist },
  {
    name: "PHOENIX",
    image: phoenix,
    type: "DUELIST",
    typeimg: duelist,
  },
  { name: "SAGE", image: sage, type: "SENTINEL", typeimg: sentinel },
  { name: "SOVA", image: sova, type: "INITIATOR", typeimg: initiator },
  { name: "REYNA", image: reyna, type: "DUELIST", typeimg: duelist },
  { name: "RAZE", image: raze, type: "DUELIST", typeimg: duelist },
  {
    name: "BREACH",
    image: breach,
    type: "INITIATOR",
    typeimg: initiator,
  },
  {
    name: "KILLJOY",
    image: killjoy,
    type: "SENTINEL",
    typeimg: sentinel,
  },
  {
    name: "CYPHER",
    image: cypher,
    type: "SENTINEL",
    typeimg: sentinel,
  },
  { name: "SKYE", image: skye, type: "INITIATOR", typeimg: initiator },
  { name: "YORU", image: yoru, type: "DUELIST", typeimg: duelist },
  {
    name: "ASTRA",
    image: astra,
    type: "CONTROLLER",
    typeimg: controller,
  },
  { name: "KAY/O", image: kayo, type: "INITIATOR", typeimg: initiator },
  {
    name: "CHAMBER",
    image: chamber,
    type: "SENTINEL",
    typeimg: sentinel,
  },
  { name: "NEON", image: neon, type: "DUELIST", typeimg: duelist },
  { name: "FADE", image: fade, type: "INITIATOR", typeimg: initiator },
  {
    name: "HARBOR",
    image: harbor,
    type: "CONTROLLER",
    typeimg: controller,
  },
  {
    name: "DEADLOCK",
    image: deadlock,
    type: "SENTINEL",
    typeimg: sentinel,
  },
  {
    name: "CLOVE",
    image: clove,
    type: "CONTROLLER",
    typeimg: controller,
  },
  { name: "ISO", image: iso, type: "DUELIST", typeimg: duelist },
  { name: "VYSE", image: vyse, type: "SENTINAL", typeimg: sentinel },
  {
    name: "GEKKO",
    image: gekko,
    type: "INITIATOR",
    typeimg: initiator,
  },
];
const Agent_page = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-pink-800 via-purple-700 to-indigo-800 overflow-hidden h-screen w-full pt-28 items-center justify-center">
        <div className="text-white justify-center items-center w-full flex">
          <div className="text-2sm text-white">Agents</div>
        </div>
        <div className="flex p-2 items-center justify-center w-full">
          <div className="grid grid-cols-4 gap-4 h-[500px] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit">
            {agents.map((agent, index) => (
              <Agent_box
                key={index}
                name={agent.name}
                image={agent.image}
                type={agent.type}
                typeimg={agent.typeimg}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Agent_page;
