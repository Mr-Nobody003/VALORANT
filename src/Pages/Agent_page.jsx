import React from 'react'
import Agent_box from '../components/Agent_box'
const Agent_page = (Agent_name) => {
  return (
    <>
      <div class="bg-gradient-to-br from-pink-800 via-purple-700 to-indigo-800 w-full pt-28 items-center justify-center ">
        <div class="text-white justify-center items-center w-full flex">
          <div class="text-2sm text-white">Agents</div>
        </div>
        <div class="flex p-2 items-center justify-center resize-none outline-none scroll-smooth scrollbar-thin scrollbar-webkit">
          <div class="grid grid-cols-4 gap-4 pt-4 ">
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
            <Agent_box />
          </div>
        </div>
      </div>
    </>
  )
}

export default Agent_page
