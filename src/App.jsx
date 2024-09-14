import react ,{ useState } from 'react'
import Mainmenu from './components/Mainmenu'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class=" h-screen content-center">
        <div class=" self-center">
          <Mainmenu/>

        
        </div>
      </div>

    </>
  )
}

export default App






// <div class="flex flex-row pt-4 font-mono font-bold">
//         <div class="flex ">
          
//           {/* <div>
//             <div class="flex flex-row ">
//             <span class="text-white text-center content-center text-2xl ">&#8226;</span>
//             <a href="" class="text-red-600 text-6xl hover:text-red-500 font"> PLAY</a>
//             </div>
//           </div>
//            */}
          
          
          
          
//           <ul class="space-y-5 mx-8">
//             <li class="flex flex-row space-x-2"><span class="text-white text-center content-center text-2xl ">&#8226;</span><a href="" class="text-red-600 text-6xl hover:text-red-500 font"> PLAY</a> </li>
//             <li><a href="" class="text-white text-2xl ">&#8226; CAREER</a> </li>
//             <li><a href="" class="text-white text-2xl">&#8226; BATTLEPASS</a> </li>
//             <li><a href="" class="text-white text-2xl">&#8226; COLLECTION</a> </li>
//             <li><a href="" class="text-white text-2xl">&#8226; AGENTS</a> </li>
//             <li><a href="" class="text-white  text-2xl">&#8226; STORE</a> </li>
            
//           </ul>
//         </div>
//         <div class="text-white">
          
//         </div>
//       </div>

