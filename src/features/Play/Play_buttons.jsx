import React, { useState } from 'react'
import MatchFound from './components/MatchFound/MatchFound'

const Play_buttons = ({ onPageChange }) => {
  const [isMatchFound, setIsMatchFound] = useState(false);

  const handleStart = () => {
    setIsMatchFound(true);
  };

  const handleAnimationComplete = () => {
    setIsMatchFound(false);
    if (onPageChange) {
      onPageChange("AgentSelect_page");
    }
  };

  return (
    <>
        <div className='flex flex-row justify-evenly space-x-6 w-[550px] self-center items-center'>
            <div className='flex h-[32px]  text-slate-400 items-center justify-center text-[11px] w-36 backdrop-blur-md backdrop-brightness-75'>
                PRACTICE
            </div>
            <div onClick={handleStart} className=' bg-[#ff4655] hover:bg-[#ff5865] transition-colors text-white items-center justify-center font-bold text-2xl flex h-[50px] w-48 cursor-pointer'>
                START
            </div>
            <div className='flex h-[32px] w-36 text-slate-400 items-center justify-center text-[11px] backdrop-blur-md backdrop-brightness-75'>
                LEAVE PARTY
            </div>
        </div>
        {isMatchFound && <MatchFound onAnimationComplete={handleAnimationComplete} />}
    </>
  )
}

export default Play_buttons