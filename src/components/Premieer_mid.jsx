import React from 'react'
import Premieer_logo from '../assets/premieer_logo.png'
const Premieer_mid = () => {
  return (
    <>
      <div class="flex flex-col justify-start items-center h-[30rem]">
        {/* logo */}
        <div class=""><img src={Premieer_logo} alt="logo" class="h-24 w-24 flex justify-center items-center" /></div>
        {/* sub text */}
        <div class="text-[#bb986f] text-4xl justify-center items-center">
          <div class="[600] text-[#bb986f] border-b-2 border-[#bb986f] flex flex-col justify-center items-center">
            <div>PREMIER</div>
            <div class="text-lg font-[600]">STAGE E9A2</div>
          </div>

         {/* procedures */}
          <div>
            <div class="flex flex-col space-y-8 text-white pt-4">
              {/* <!-- STEP 1 --> */}
              <div class="flex items-center space-x-2">
                {/* {diamond div} */}
                <div class="w-5 h-5 mr-5 border-[#d5ab78] border-solid border-t-2 border-l-2 border-b-2 border-r-[1px] transform rotate-45"></div>
                <div class="flex flex-col">
                  <span class="text-xs ">STEP 1</span>
                  <span class="text-3xl text-[#e1b782] font-[600] font-Oswald ">CREATE YOUR TEAM</span>
                </div>
              </div>

              {/* <!-- STEP 2 --> */}
              <div class="flex items-center space-x-2">
                {/* diamond div */}
                <div class="w-5 h-5 mr-5 border-[#d5ab78] border-solid border-t-2 border-l-2 border-b-2 border-r-[1px] transform rotate-45"></div>
                <div class="flex flex-col">
                  <span class="text-xs ">STEP 2</span>
                  <span class="text-3xl text-[#e1b782] font-[600] font-Oswald">SELECT YOUR ZONE</span>
                </div>
              </div>

              {/* <!-- STEP 3 --> */}
              <div class="flex items-center space-x-2">
                {/* diamond div */}
                <div class="w-5 h-5 mr-5 border-[#d5ab78] border-solid border-t-2 border-l-2 border-b-2 border-r-[1px] transform rotate-45"></div>
                <div class="flex flex-col">
                  <span class="text-xs ">STEP 3</span>
                  <span class="text-3xl text-[#e1b782] font-[600] font-Oswald">PLAY PREMIER GAME</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Premieer_mid
