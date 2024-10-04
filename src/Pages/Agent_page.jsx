import React from 'react'
import Agent_box from '../components/Agent_box'

const agents = [
  { name: 'BRIMSTONE', image: 'https://static.valorantstats.xyz/agent-headshots/brimstone-headshot.png', type: 'CONTROLLER', typeimg: 'src/assets/controller.png' },
  { name: 'VIPER', image: 'https://static.valorantstats.xyz/agent-headshots/viper-headshot.png', type: '', typeimg: '' },
  { name: 'OMEN', image: 'https://static.valorantstats.xyz/agent-headshots/omen-headshot.png' },
  { name: 'JETT', image: 'https://static.valorantstats.xyz/agent-headshots/jett-headshot.png' },
  { name: 'PHIONIX', image: 'https://static.valorantstats.xyz/agent-headshots/phoenix-headshot.png' },
  { name: 'SAGE', image: 'https://static.valorantstats.xyz/agent-headshots/sage-headshot.png', type: 'SENTINEL', typeimg: 'src/assets/sentinel.png' },
  { name: 'SOVA', image: 'https://static.valorantstats.xyz/agent-headshots/sova-headshot.png' },
  { name: 'REYNA', image: 'https://static.valorantstats.xyz/agent-headshots/reyna-headshot.png' },
  { name: 'RAZE', image: 'https://static.valorantstats.xyz/agent-headshots/raze-headshot.png' },
  { name: 'BREACH', image: 'https://static.valorantstats.xyz/agent-headshots/breach-headshot.png' },
  { name: 'Killjoy', image: 'https://static.valorantstats.xyz/agent-headshots/killjoy-headshot.png' },
  { name: 'Cypher', image: 'https://static.valorantstats.xyz/agent-headshots/cypher-headshot.png' },
  { name: 'Skye', image: 'https://static.valorantstats.xyz/agent-headshots/skye-headshot.png' },
  { name: 'Yoru', image: 'https://static.valorantstats.xyz/agent-headshots/yoru-headshot.png' },
  { name: 'Astra', image: 'https://static.valorantstats.xyz/agent-headshots/astra-headshot.png' },
  { name: 'KAY/O', image: 'https://static.valorantstats.xyz/agent-headshots/kayo-headshot.png' },
  { name: 'Chamber', image: 'https://static.valorantstats.xyz/agent-headshots/chamber-headshot.png' },
  { name: 'Neon', image: 'https://static.valorantstats.xyz/agent-headshots/neon-headshot.png' },
  { name: 'Fade', image: 'https://static.valorantstats.xyz/agent-headshots/fade-headshot.png' },
  { name: 'Harbor', image: 'https://static.valorantstats.xyz/agent-headshots/harbor-headshot.png' },
  { name: 'Deadlock', image: 'https://static.valorantstats.xyz/agent-headshots/deadlock-headshot.png' },
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
