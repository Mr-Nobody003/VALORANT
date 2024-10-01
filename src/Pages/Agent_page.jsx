import React from 'react'
import Agent_box from '../components/Agent_box'

const agents = [
  { name: 'Brimstone', image: '' },
  { name: 'Viper', image: '' },
  { name: 'Omen', image: '' },
  { name: 'Jett', image: '' },
  { name: 'Phoenix', image: '' },
  { name: 'Sage', image: '' },
  { name: 'Sova', image: '' },
  { name: 'Reyna', image: '' },
  { name: 'Raze', image: '' },
  { name: 'Breach', image: '' },
  { name: 'Killjoy', image: '' },
  { name: 'Cypher', image: '' },
  { name: 'Skye', image: '' },
  { name: 'Yoru', image: '' },
  { name: 'Astra', image: '' },
  { name: 'KAY/O', image: '' },
  { name: 'Chamber', image: '' },
  { name: 'Neon', image: '' },
  { name: 'Fade', image: '' },
  { name: 'Harbor', image: '' },
  { name: 'Deadlock', image: '' },
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
            <Agent_box key={index} name={agent.name} image={agent.image} />
          ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Agent_page
