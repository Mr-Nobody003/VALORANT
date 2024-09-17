import React from 'react'

const Nav = () => {
  return (
    <>
     <div class="flex flex-row text-white justify-between">
        <div class=" flex text-white">
          <div class="logo">
          <img src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/main/src/assets/games-valorant-icon-512x512-kqz6q7jw.png" alt="" srcset="" width="50" height="50"/>
          </div>
          <div class="flex flex-col">
          <span class="text-slate-300 text-3xl font-Oswald  font-bold">COLLISION</span>
          <span class="text-slate-300 text-sm">Episode 9//ACT II</span>
          </div>
       </div>
       <div class="Timer ">
        Timer
       </div>
       <div class="Points + settings flex flex-row">
        <div class="flex pr-10">points</div>
        <div class="flex">
          <a href="">
          <img src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/5338af39dff99ce7890dc36430f5946cc3be0bfb/src/assets/settings.svg" alt="settings" height="30" width="30" />
          </a>
        </div>
       </div>

     </div>
      
    </>
  )
}

export default Nav
