import React from 'react'

const Premieer_verify = () => {
  return (
    <>

      <div class="eligibility text-yellow-600 border-solid border-2 border-slate-950  backdrop-blur-sm flex flex-col justify-center items-center">
        <div class=" flex flex-row  justify-center self-center items-center pl-">
          <img src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/premieer_logo.png" alt="" class=" h-14 w-14 flex justify-center items-center" />
          <div class="text-3xl font-serif font-medium  text-yellow-700">PREMIER</div>
        </div>

        <div class=" text-white font-Roboto font-normal">ELIGIBILITY</div>
        <div class="text-gray-400">You need to verify your account in order to</div>
        <div class="border-b-2 border-yellow-700 text-gray-400 pb-14" >participate in the PREMIER experience.</div>

        <div class=" verify-button pt-48 p-7"><div class=" bg-white text-black flex h-16 w-56 justify-center items-center border-solid border-2 border-slate-400  font-Roboto font-semibold">VERIFY</div></div>
      </div>
    </>
  )
}

export default Premieer_verify
