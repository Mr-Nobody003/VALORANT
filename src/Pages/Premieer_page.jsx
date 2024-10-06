import React from 'react'
import Premieer_scheduler from '../components/Premieer_scheduler';
import Premieer_mid from '../components/Premieer_mid';
import Premieer_verify from '../components/Premieer_verify';
// import Card from './Card';

const Premieer_page = ({ onBack }) => {
  return (
    <>
      <img src="/src/assets/pages_bgc/Premieer_bgc.png" alt="" class="absolute -z-10 h-screen w-full" />
      <div class="flex flex-row justify-between pt-32 p-10">
        <Premieer_scheduler />

        <Premieer_mid />

        <Premieer_verify />

      </div>
    </>
  );
};

export default Premieer_page
