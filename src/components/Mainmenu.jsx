import React from 'react'

const Mainmenu = ({ onPageChange }) => {
  return (
    <>
     
      <div class="flex flex-row pt-4 scale-y-125 font-bold font-Roboto">
        <div class="flex ">
          
          <div class="space-y-1 mx-8">
            <div class="flex flex-row  space-x-2 group h-20 mr-20 hover:cursor-pointer"><span class="text-white text-center content-center text-sm transition group-hover:rotate-180 group-hover:text-green-400 -mt-4 group-hover:text-lg">◆</span><a onClick={() => onPageChange('Play_page')} class="text-red-600 text-6xl  group-hover:text-green-400"> PLAY</a> </div>
            <div class="flex flex-row  space-x-2 group h-10 mr-24 hover:cursor-pointer"><span class="text-white text-center content-center text-sm transition group-hover:rotate-180 group-hover:text-green-400 -mt-2 group-hover:text-lg">◆</span><a onClick={() => onPageChange('Premieer_page')}class="text-white  text-3xl group-hover:text-green-400 "> PREMIER</a> </div>
            <div class="flex flex-row  space-x-2 group h-10 mr-28 hover:cursor-pointer"><span class="text-white text-center content-center text-sm transition group-hover:rotate-180 group-hover:text-green-400 -mt-2 group-hover:text-lg">◆</span><a class="text-white  text-3xl group-hover:text-green-400 "> CAREER</a> </div>
            <div class="flex flex-row  space-x-2 group h-10 mr-12 hover:cursor-pointer"><span class="text-white text-center content-center text-sm transition group-hover:rotate-180 group-hover:text-green-400 -mt-2 group-hover:text-lg">◆</span><a class="text-white  text-3xl group-hover:text-green-400 "> BATTLEPASS</a> </div>
            <div class="flex flex-row  space-x-2 group h-10 mr-12 hover:cursor-pointer"><span class="text-white text-center content-center text-sm transition group-hover:rotate-180 group-hover:text-green-400 -mt-2 group-hover:text-lg">◆</span><a class="text-white  text-3xl group-hover:text-green-400 "> COLLECTION</a> </div>
            <div class="flex flex-row space-x-2  group h-10 mr-28 hover:cursor-pointer"><span class="text-white text-center content-center text-sm transition group-hover:rotate-180 group-hover:text-green-400 -mt-2 group-hover:text-lg">◆</span><a class="text-white text-3xl  group-hover:text-green-400 "> AGENTS</a> </div>
            <div class="flex flex-row space-x-2 group h-10 mr-32  hover:cursor-pointer"><span class="text-white text-center content-center text-sm transition group-hover:rotate-180 group-hover:text-green-400 -mt-2 group-hover:text-lg">◆</span><a class="text-white text-3xl  group-hover:text-green-400 "> STORE</a> </div>
            
          </div>
        </div>
        <div class="text-white">
          
        </div>
      </div>

    </>
  )
}

export default Mainmenu