import React, { useState } from 'react';
import Content from '../components/Content'; // Updated import
import Play_party from '../components/Play_party';
import Play_card from '../components/Play_card';
import Play_info from '../components/Play_info';
import Play_buttons from '../components/Play_buttons';
import Play_custom from '../components/Play_custom';

const Play_page = () => {
  const [activeType, setActiveType] = useState('UNRATED'); // Default play type
  
  // Play types array
  const playTypes = [
    'UNRATED', 'COMPETITIVE', 'SWIFTPLAY', 'SPIKE RUSH',
    'DEATHMATCH', 'ESCALATION', 'TEAM DEATHMATCH', 'PREMIER', 'CUSTOM GAME'
  ];

  return (
    <>
      <img src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/refs/heads/main/src/assets/pages_bgc/Play_bgc.png" alt="play bgc" className="absolute -z-10 h-full w-full" />

      <div className="text-white pt-20 pb-4 pr-32 pl-32 flex flex-col">
        {/* Pass content array, activeType, and setActiveType as props */}
        <Content activeType={activeType} setActiveType={setActiveType} content={playTypes} />
        <Play_party />

        {activeType === 'CUSTOM GAME' ? <Play_custom /> : <Play_card />}
        
        <Play_info activeType={activeType} />
        <Play_buttons />
      </div>
    </>
  );
};

export default Play_page;
