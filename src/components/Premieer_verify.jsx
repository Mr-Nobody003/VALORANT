import React from 'react'
import Premieer_logo from '../assets/premieer_logo.png'
import Graph from '../assets/pages_bgc/Premieer_graph.png'
const Premieer_verify = () => {
  return (
    <>
        {/* eligibility */}
      <div class="flex border-solid border-2 border-slate-950  backdrop-blur-sm  flex-col relative p-2 h-[36rem]">
        <div class=" flex flex-row  justify-between items-center">
          {/* logo */}
          <img src={Premieer_logo} alt="logo" class="flex h-14 w-14" />
          <div class="flex text-[#ba905c] text-[3rem] font-Audiowide font-[800]">PREMIER</div>
        </div>
        <div class=" text-white font-Roboto font-normal justify-center"><div class='flex items-center justify-center'>ELIGIBILITY</div></div>
        <div class="text-gray-400">You need to verify your account in order to</div>
        <div class="border-b-2 border-yellow-700 text-gray-400 pb-14" >participate in the PREMIER experience.</div>
        <div class=" verify-button pt-48 p-7 cursor-pointer"><div class=" bg-white text-black flex h-16 w-56 justify-center items-center border-solid border-2 border-slate-400  font-Roboto font-semibold">VERIFY</div></div>
        <img src={Graph} alt="graph" className='flex bg-transparent w-80 h-[300px] absolute bottom-0 left-0 -z-10'/>
      </div>
    </>
  )
}

export default Premieer_verify
