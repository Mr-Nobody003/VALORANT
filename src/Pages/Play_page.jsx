import React, { useState } from 'react';
import Play_type from '../components/Play_type';
import Play_party from '../components/Play_party';
import Play_card from '../components/Play_card';
import Play_info from '../components/Play_info';
import Play_buttons from '../components/Play_buttons';
import Play_custom from '../components/Play_custom';

const Play_page = () => {
  // Lift state up to Play_page so both Play_type and Play_info can use it
  const [activeType, setActiveType] = useState('UNRATED');  // Default play type

  return (
    <>
      <img src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/pages_bgc/Play_bgc.png" alt="" class="absolute -z-10 h-full w-full" />

      <div class="text-white pt-20 pb-4 pr-32 pl-32 flex flex-col ">
        {/* Pass activeType and setActiveType as props */}
        <Play_type activeType={activeType} setActiveType={setActiveType} />
        <Play_party />
        {/* Conditionally render components */}
        {activeType === 'CUSTOM GAME' ? (<Play_custom />) : (<Play_card />)}
        <Play_info activeType={activeType} />
        <Play_buttons />
      </div>
    </>
  );
};

export default Play_page;
