import react ,{ useState } from 'react'
import Mainmenu from '../components/Mainmenu'
import Nav from '../components/Nav'
import Info from '../components/Info'
import Friend_list from '../components/Friend_list'
// import './App.css'

const Main_page = ({ onPageChange }) =>  {
  // const [count, setCount] = useState(0)
 //  const [showLogoPage, setShowLogoPage] = useState(true);
  return (
    <>
      <div class=" h-screen">
        <div class="justify-between">
          <Nav/>
        </div>
        <div class="justify-between">
          <div class="absolute left-0 top-1/3 ">
            <Mainmenu  onPageChange={onPageChange}/>
          </div>
          <div>
            <div class="absolute right-20">
              <Info/>
            </div>
            <div class="absolute right-0">
              <Friend_list/>
            </div>
          </div>
        </div>
        
      </div>

    </>
  )
}

export default Main_page




