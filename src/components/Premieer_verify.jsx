import React from 'react'
import Premieer_logo from '../assets/premieer_logo.png'
import Graph from '../assets/pages_bgc/Premieer_graph.png'
import Button_verify from './Button_verify'
const Premieer_verify = () => {
  return (
    <>
      {/* eligibility */}
      <div className="flex border-solid border-2 border-slate-950  backdrop-blur-sm  flex-col relative p-2 h-[36rem]">
        <div className=" flex flex-row  justify-between items-center">
          {/* logo */}
          <img src={Premieer_logo} alt="logo" className="flex h-14 w-14" />
          <div className="flex text-[#ba905c] text-[3rem] font-Audiowide font-[800]">PREMIER</div>
        </div>
        <div className=" text-white font-Roboto font-normal justify-center"><div className='flex items-center justify-center'>ELIGIBILITY</div></div>
        <div className="text-gray-400">You need to verify your account in order to</div>
        <div className="border-b-2 border-yellow-700 text-gray-400 pb-14" >participate in the PREMIER experience.</div>

        {/* verify button */}
        <div className="flex pt-48 items-center justify-center"><Button_verify /></div>
        {/* graph mountain img */}
        <img src={Graph} alt="graph" className='flex bg-transparent w-80 h-[300px] absolute bottom-0 left-0 -z-10' />
      </div>
    </>
  )
}

export default Premieer_verify
