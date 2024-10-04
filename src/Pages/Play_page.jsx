import React from 'react'
import Play_type from '../components/Play_type';
import Play_party from '../components/Play_party';
import Play_card from '../components/Play_card';
import Play_info from '../components/Play_info';
import Play_buttons from '../components/Play_buttons';

const Play_page = ({ onBack }) => {
  return (
    <div class="text-white bg-cyan-950 h-screen pt-20 pr-32 pl-32 flex flex-col">
      <Play_type />

      <Play_party />

      <Play_card />

      <Play_info />

      <Play_buttons />

      <div class="start_button">

      </div>

    </div>
  );
};

export default Play_page
