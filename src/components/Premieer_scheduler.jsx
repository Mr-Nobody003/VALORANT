import React from 'react'
import Agent_box from '../components/Agent_box'
import Premieer_calender from '../assets/premieer_calender.png'
const Premieer_scheduler = () => {
  return (
    <>
      <div class="schedule flex flex-col border-solid border-2 backdrop-blur-sm text-gray-500 pb-28 w-72">
        <div class="flex justify-center items-center pt-20"> <img src={Premieer_calender} alt="" class="h-52 w-52 flex justify-center items-center" /></div>
        <div class=" flex justify-center items-center  ">Check which Schedule works best</div>
        <div class=" flex justify-center items-center -">for you and your team.</div>
        <div class=" verify-button flex justify-center items-center mt-3"><div class=" bg-black text-gray-500 flex h-10 w-56 justify-center items-center border-solid border-2 border-slate-400  font-Roboto font-semibold">VIEW ALL SCHEDULES</div></div>
      </div>
    </>
  )
}

export default Premieer_scheduler
 