import react ,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="flex flex-row pt-4 font-mono font-bold">
        <div class="flex felx-col ">
          <ul class="space-y-5 mx-8">
            <li><a href="" class="text-red-600 text-6xl hover:text-red-500 font"> <span class="text-white text-center text-xl">&#8226;</span>PLAY</a> </li>
            <li><a href="" class="text-white text-2xl ">&#8226; CAREER</a> </li>
            <li><a href="" class="text-white text-2xl">&#8226; BATTLEPASS</a> </li>
            <li><a href="" class="text-white text-2xl">&#8226; COLLECTION</a> </li>
            <li><a href="" class="text-white text-2xl">&#8226; AGENTS</a> </li>
            <li><a href="" class="text-white  text-2xl">&#8226; STORE</a> </li>
            
          </ul>
        </div>
        <div class="text-white">
          
        </div>
      </div>

    </>
  )
}

export default App
