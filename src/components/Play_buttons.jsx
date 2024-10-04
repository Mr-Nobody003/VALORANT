import React from 'react'

const Play_buttons = () => {
  return (
    <>
        <div className='flex flex-row justify-evenly space-x-6 w-[550px] self-center items-center'>
            <div className='flex h-[32px]  text-slate-400 items-center justify-center text-[11px] w-36 backdrop-blur-md backdrop-brightness-75'>
                PRACTICE
            </div>
            <div className=' bg-red-500 text-white items-center justify-center font-bold text-2xl flex h-[50px] w-48'>
                START
            </div>
            <div className='flex h-[32px] w-36 text-slate-400 items-center justify-center text-[11px] backdrop-blur-md backdrop-brightness-75'>
                LEAVE PARTY
            </div>
        </div>
    </>
  )
}

export default Play_buttons