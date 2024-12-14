import React from 'react'
const Weapon_box = ({image,name}) =>{
  return (
    <div
      class="flex border-2 border-solid h-40 w-80 relative">
          <img src={image} alt={name} class="flex relative left-0 z-10"/> 
          <div class="name flex absolute bottom-0 left-0 text-white text-lg font-Oswald z-10">{name}</div>
    </div>
  )
}

export default Weapon_box