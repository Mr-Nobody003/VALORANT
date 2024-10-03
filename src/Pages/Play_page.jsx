import React from 'react'
import Play_type from '../components/Play_type';
import Play_party from '../components/Play_party';
// import Card from './Card';

const Play_page = ({ onBack }) => {
  return (
    <div class="text-white bg-cyan-950 h-screen pt-20 pr-32 pl-32 flex flex-col">
        <Play_type />
        
         <Play_party />

      <div class="player_card">

      </div>

      <div class="start_button">

      </div>

    </div>
  );
};

export default Play_page
