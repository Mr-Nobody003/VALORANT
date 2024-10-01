import React from 'react'
import Premieer_scheduler from '../components/Premieer_scheduler';
import Premieer_mid from '../components/Premieer_mid';
import Premieer_verify from '../components/Premieer_verify';
// import Card from './Card';

const Premieer_page = ({ onBack }) => {
  return (
    <div class="bg-amber-400 pt-28 h-screen">
      <div class="flex flex-row justify-between p-10">
        <Premieer_scheduler />

        <Premieer_mid />

        <Premieer_verify />

      </div>
    </div>
  );
};

export default Premieer_page
