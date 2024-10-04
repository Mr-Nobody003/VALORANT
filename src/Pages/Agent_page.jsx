import React from 'react'
import Agent_box from '../components/Agent_box'

const agents = [
  { name: 'BRIMSTONE', image: 'https://static.valorantstats.xyz/agent-headshots/brimstone-headshot.png', type: 'CONTROLLER', typeimg: 'src/assets/controller.png' },
  { name: 'VIPER', image: 'https://static.valorantstats.xyz/agent-headshots/viper-headshot.png', type: 'CONTROLLER', typeimg: 'src/assets/controller.png' },
  { name: 'OMEN', image: 'https://static.valorantstats.xyz/agent-headshots/omen-headshot.png', type: 'CONTROLLER', typeimg: 'src/assets/controller.png' },
  { name: 'JETT', image: 'https://static.valorantstats.xyz/agent-headshots/jett-headshot.png', type: 'DUELIST', typeimg: 'src/assets/duelist.png' },
  { name: 'PHIONIX', image: 'https://static.valorantstats.xyz/agent-headshots/phoenix-headshot.png', type: 'DUELIST', typeimg: 'src/assets/duelist.png' },
  { name: 'SAGE', image: 'https://static.valorantstats.xyz/agent-headshots/sage-headshot.png', type: 'SENTINEL', typeimg: 'src/assets/sentinel.png' },
  { name: 'SOVA', image: 'https://static.valorantstats.xyz/agent-headshots/sova-headshot.png', type: 'INITIATOR', typeimg: 'src/assets/initiator.png' },
  { name: 'REYNA', image: 'https://static.valorantstats.xyz/agent-headshots/reyna-headshot.png', type: 'DUELIST', typeimg: 'src/assets/duelist.png' },
  { name: 'RAZE', image: 'https://static.valorantstats.xyz/agent-headshots/raze-headshot.png', type: 'DUELIST', typeimg: 'src/assets/duelist.png' },
  { name: 'BREACH', image: 'https://static.valorantstats.xyz/agent-headshots/breach-headshot.png', type: 'INITIATOR', typeimg: 'src/assets/initiator.png' },
  { name: 'KILLJOY', image: 'https://static.valorantstats.xyz/agent-headshots/killjoy-headshot.png', type: 'SENTINEL', typeimg: 'src/assets/sentinel.png' },
  { name: 'CYPHER', image: 'https://static.valorantstats.xyz/agent-headshots/cypher-headshot.png', type: 'SENTINEL', typeimg: 'src/assets/sentinel.png' },
  { name: 'SKYE', image: 'https://static.valorantstats.xyz/agent-headshots/skye-headshot.png', type: 'INITIATOR', typeimg: 'src/assets/initiator.png' },
  { name: 'YORU', image: 'https://static.valorantstats.xyz/agent-headshots/yoru-headshot.png', type: 'DUELIST', typeimg: 'src/assets/duelist.png' },
  { name: 'ASTRA', image: 'https://static.valorantstats.xyz/agent-headshots/astra-headshot.png', type: 'CONTROLLER', typeimg: 'src/assets/controller.png' },
  { name: 'KAY/O', image: 'https://static.valorantstats.xyz/agent-headshots/kayo-headshot.png', type: 'INITIATOR', typeimg: 'src/assets/initiator.png' },
  { name: 'CHAMBER', image: 'https://static.valorantstats.xyz/agent-headshots/chamber-headshot.png', type: 'SENTINEL', typeimg: 'src/assets/sentinel.png' },
  { name: 'NEON', image: 'https://static.valorantstats.xyz/agent-headshots/neon-headshot.png', type: 'DUELIST', typeimg: 'src/assets/duelist.png' },
  { name: 'FADE', image: 'https://static.valorantstats.xyz/agent-headshots/fade-headshot.png', type: 'INITIATOR', typeimg: 'src/assets/initiator.png' },
  { name: 'HARBOR', image: 'https://static.valorantstats.xyz/agent-headshots/harbor-headshot.png', type: 'CONTROLLER', typeimg: 'src/assets/controller.png' },
  { name: 'DEADLOCK', image: 'https://static.valorantstats.xyz/agent-headshots/deadlock-headshot.png', type: 'SENTINEL', typeimg: 'src/assets/sentinel.png' },
  { name: 'CLOVE', image: 'https://static.valorantstats.xyz/agent-headshots/clove-headshot.png', type: 'CONTROLLER', typeimg: 'src/assets/controller.png' },
  { name: 'ISO', image: 'https://static.valorantstats.xyz/agent-headshots/iso-headshot.png', type: 'DUELIST', typeimg: 'src/assets/duelist.png' },
  { name: 'VYSE', image: 'https://static.valorantstats.xyz/agent-headshots/vyse-headshot.png', type: 'SENTINAL', typeimg: 'src/assets/sentinel.png' },
  { name: 'GEKKO', image: 'https://static.valorantstats.xyz/agent-headshots/gekko-headshot.png', type: 'INITIATOR', typeimg: 'src/assets/initiator.png' },
];


const Agent_page = (Agent_name) => {
  return (
    <>
      <div class="bg-gradient-to-br  from-pink-800 via-purple-700 to-indigo-800 overflow-hidden h-screen w-full pt-28 items-center justify-center ">
        <div class="text-white justify-center items-center w-full flex">
          <div class="text-2sm text-white">Agents</div>
        </div>
        <div class="flex p-2 items-center justify-center w-full">
          <div class=" grid grid-cols-4 gap-4  h-[500px] overflow-scroll  overflow-x-hidden scrollbar-thin scrollbar-webkit">
            {agents.map((agent, index) => (
              <Agent_box key={index} name={agent.name} image={agent.image} type={agent.type} typeimg={agent.typeimg} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Agent_page
