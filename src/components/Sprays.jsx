import React from 'react'
const Sprays = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="flex item-center font-Oswald text-white text-[23px]">SPRAYS</div>
      {/* <!-- Outer Circle --> */}
      <div class="relative w-[220px] h-[220px] rounded-full border-2 border-gray-500 opacity-75 ">

        {/* <!-- Diagonal Line 1 --> */}
        <div class="absolute top-0 left-1/2 w-px h-full bg-white transform -translate-x-1/2 rotate-45"></div>

        {/* <!-- Diagonal Line 2 --> */}
        <div class="absolute top-0 left-1/2 w-px h-full bg-white transform -translate-x-1/2 -rotate-45"></div>
        <div className="flex items-center justify-center bg-transperent">
          {/* <!-- Circle Container --> */}
          <div className="relative w-[210px] h-[210px] bg-transperent rounded-full flex items-center justify-center p-0 m-0">

            {/* <!-- Top Section --> */}
            <div className="absolute top-0 left-[75px]  p-0  bg-transperent flex items-center justify-center  hover:transperent hover:scale-150 transition duration-300 " >
              <img src={"https://static.wikia.nocookie.net/valorant/images/6/69/Too_Early_for_This_Spray.gif/"} alt="Top" className="w-16 h-16 object-fill "></img>
            </div>

            {/* <!-- Right Section --> */}
            <div className="absolute right-0 top-[75px]  p-0  bg-transperent flex items-center justify-center  hover:transperent hover:scale-150 transition duration-300">
              <img src={"https://static.wikia.nocookie.net/valorant/images/1/11/Wingman_Wiggle_Spray.gif/"} alt="Right" className="w-16 h-16 object-fill"></img>
            </div>

            {/* <!-- Bottom Section --> */}
            <div className="absolute bottom-0 left-[75px]   p-0  bg-transperent flex items-center justify-center  hover:transperent hover:scale-150 transition duration-300">
              <img src={"https://static.wikia.nocookie.net/valorant/images/2/24/Sentinel_Slide_Spray.gif/"} alt="Bottom" className="w-16 h-16 object-fill"></img>
            </div>

            {/* <!-- Left Section --> */}
            <div className="absolute left-0 top-[75px]  p-0  bg-transperent flex items-center justify-center  hover:transperent hover:scale-150 transition duration-300">
              <img src={"https://static.wikia.nocookie.net/valorant/images/b/b0/Bubble_Pop_Spray.gif"} alt="Left" className="w-16 h-16 object-fill"></img>
            </div>
            <div class="absolute top-1/2 left-1/2 w-14 h-14 rounded-full bg-gray-800 opacity-70 transform -translate-x-1/2 -translate-y-1/2 border"></div>
            <div class="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-gray-400 opacity-30 transform -translate-x-1/2 -translate-y-1/2  border-none"></div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Sprays
