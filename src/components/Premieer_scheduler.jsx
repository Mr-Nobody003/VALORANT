import React from 'react'
import Premieer_calender from '../assets/premieer_calender.png'
import Graph from '../assets/pages_bgc/Premieer_graph.png'
const Premieer_scheduler = () => {
  return (
    <>
      <div class="flex flex-col border-solid border-2 backdrop-blur-sm text-gray-500 w-80">
        {/* calender */}
        <div class="flex justify-center items-center pt-20"> <img src={Premieer_calender} alt="calender" class="h-32 w-32 flex justify-center items-center" /></div>
        <div class=" flex justify-center items-center ">Check which Schedule works best</div>
        <div class=" flex justify-center items-center ">for you and your team.</div>
        {/* verify button */}
        <button>
          <div class=" verify-button flex justify-center items-center cursor-pointer p-2">
            <div class=" bg-black text-gray-500 flex h-10 w-56 justify-center items-center border-solid border-2 border-slate-400  font-Roboto font-semibold hover:border-green-700 hover:text-white">VIEW ALL SCHEDULES</div>
          </div>
        </button>
        {/* graph img */}
        <div><img src={Graph} alt="" className='bg-transparent w-80 h-[200px]' /></div>
      </div>
    </>
  )
}

export default Premieer_scheduler
