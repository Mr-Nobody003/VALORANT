import React from 'react';
import Weapons from '../components/Weapons';
import Sprays from '../components/Sprays';
import Playercard from '../components/Playercard';

import Play_bgc from "../assets/pages_bgc/Play_bgc.png";

const Collection_page = () => {
  return (
    <>
      <img src={Play_bgc} alt="" class="absolute -z-10 h-full w-full" />
      <div className='flex flex-row'>
        <Weapons />
        <div className='flex flex-col'>
          <Playercard />
          <Sprays />
        </div>
      </div>
    </>
  )
}

export default Collection_page
