import React from 'react'

const Agent_box = ({ image, name, type,typeimg }) => {
  return (
    <>
      <div class="flex border-2 border-solid h-40 w-80 relative">
          <img src={image} alt={name} class="flex relative left-0 z-10"/>
          <img src={typeimg} alt={type} class="flex absolute left-[5rem]  object-cover h-[9.7rem] w-[12rem]  opacity-30"/>
          <div class="name flex absolute bottom-0 left-0 text-white text-lg font-Oswald z-10">{name}</div>
      </div> 
    </>
  )
}

export default Agent_box
