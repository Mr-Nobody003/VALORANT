import React ,{ useState } from 'react'
import Mainmenu from '../components/Mainmenu'
import Info from '../components/Info'
import Friend_list from '../components/Friend_list'
import Home_vid from "../assets/video/Homescreen.mp4";
const Main_page = ({ onPageChange }) =>  {
  // const [count, setCount] = useState(0)
 //  const [showLogoPage, setShowLogoPage] = useState(true);
  return (
      <>
        <video
        preload="auto"
        src={Home_vid}
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
      />
        <div class="justify-between">
          <div class="absolute left-0 top-1/3 ">
            <Mainmenu  onPageChange={onPageChange}/>
          </div>
          <div>
            <div class="absolute right-20">
              <Info/>
            </div>
            <div class="absolute right-0 mt-8">
              <Friend_list/>
            </div>
          </div>
        </div>
        
      </>
  )
}

export default Main_page




