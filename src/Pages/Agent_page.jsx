import React from 'react'
import Agent_box from '../components/Agent_box'

const agents = [
  { name: 'BRIMSTONE', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/brimstone.png', type: 'CONTROLLER', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/controller.png' },
  { name: 'VIPER', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/viper.png', type: 'CONTROLLER', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/controller.png' },
  { name: 'OMEN', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/omen.png', type: 'CONTROLLER', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/controller.png' },
  { name: 'JETT', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/jett.png', type: 'DUELIST', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/duelist.png' },
  { name: 'PHOENIX', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/phoenix.png', type: 'DUELIST', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/duelist.png' },
  { name: 'SAGE', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/sage.png', type: 'SENTINEL', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/sentinel.png' },
  { name: 'SOVA', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/sova.png', type: 'INITIATOR', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/initiator.png' },
  { name: 'REYNA', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/reyna.png', type: 'DUELIST', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/duelist.png' },
  { name: 'RAZE', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/raze.png', type: 'DUELIST', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/duelist.png' },
  { name: 'BREACH', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/breach.png', type: 'INITIATOR', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/initiator.png' },
  { name: 'KILLJOY', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/killjoy.png', type: 'SENTINEL', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/sentinel.png' },
  { name: 'CYPHER', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/cypher.png', type: 'SENTINEL', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/sentinel.png' },
  { name: 'SKYE', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/skye.png', type: 'INITIATOR', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/initiator.png' },
  { name: 'YORU', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/yoru.png', type: 'DUELIST', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/duelist.png' },
  { name: 'ASTRA', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/astra.png', type: 'CONTROLLER', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/controller.png' },
  { name: 'KAY/O', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/kayo.png', type: 'INITIATOR', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/initiator.png' },
  { name: 'CHAMBER', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/chamber.png', type: 'SENTINEL', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/sentinel.png' },
  { name: 'NEON', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/neon.png', type: 'DUELIST', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/duelist.png' },
  { name: 'FADE', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/fade.png', type: 'INITIATOR', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/initiator.png' },
  { name: 'HARBOR', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/harbor.png', type: 'CONTROLLER', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/controller.png' },
  { name: 'DEADLOCK', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/deadlock.png', type: 'SENTINEL', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/sentinel.png' },
  { name: 'CLOVE', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/clove.png', type: 'CONTROLLER', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/controller.png' },
  { name: 'ISO', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/iso.png', type: 'DUELIST', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/duelist.png' },
  { name: 'VYSE', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/vyse.png', type: 'SENTINAL', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/sentinel.png' },
  { name: 'GEKKO', image: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/agents_icon/gekko.png', type: 'INITIATOR', typeimg: 'https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/initiator.png' },
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
