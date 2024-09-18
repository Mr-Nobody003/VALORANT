import React from 'react'
import Nav from '../components/Nav';
// import Card from './Card';
import Back_button from '../components/Back_button';

const Play_page = ({ onBack }) => {
    return (
      <div class="h-screen">
        <div class="justify-between">
          <Nav />
        </div>
        <div class="flex flex-col items-center justify-center h-auto">
          <Back_button onClick={onBack} text="Back to Main Menu" />
        </div>

      </div>
    );
  };

export default Play_page
