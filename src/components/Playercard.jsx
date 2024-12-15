import React from 'react'

const Playercard = () => {
  return (
    <div>
      <div class="flex items-center justify-center min-h-screen bg-gray-90 ml-[90px] -mt-[14px]">
  <div class="relative group">
    {/* <!-- Player Card --> */}
    <div class="w-64 h-96 bg-red-600 relative overflow-hidden rounded-lg ">
      {/* <!-- Black X Design --> */}
      <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-black -rotate-45 origin-top-left"></div>
      <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-black -rotate-45 origin-bottom-right"></div>
      <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-black rotate-45 origin-top-right"></div>
      <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-black rotate-45 origin-bottom-left"></div>

      {/* <!-- Text --> */}
      <div class="absolute bottom-8 left-0 w-full text-center">
        <div class="bg-yellow-300 text-black font-semibold py-1">MrXYZ</div>
        <div class="text-gray-200 text-sm">Super Shy</div>
      </div>
    </div>

    {/* <!-- Reflection Effect --> */}
    <div class="absolute top-[90px] left-0 w-full opacity-10 scale-y-[-1]">
      <div class="w-64 h-96 bg-red-600 relative overflow-hidden rounded-lg shadow-lg border-2 border-gray-700">
        {/* <!-- Black X Design --> */}
        <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-black -rotate-45 origin-top-left"></div>
        <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-black -rotate-45 origin-bottom-right"></div>
        <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-black rotate-45 origin-top-right"></div>
        <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-black rotate-45 origin-bottom-left"></div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Playercard
