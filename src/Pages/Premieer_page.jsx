import React from 'react'
// import Card from './Card';

const Premieer_page = ({ onBack }) => {
  return (
    <div class="bg-amber-400 pt-28 h-screen">
      <div class="flex flex-row justify-between">

        <div class="schedule flex flex-col border-solid border-2 border-slate-950">
          <p>Check which Schedule works best</p>
          <p>for you and your team.</p>
          <a>View All Schedules</a>
        </div>


        <div class="steps flex flex-col justify-center items-center">
          <div class="text-yellow-700 text-4xl justify-center items-center">
            <div>PREMIER</div>
          </div>
          <div>
            <p>Step 1:</p>
            <p class="text-4xl text-yellow-600">Create Your Team</p>
            <p>Step 2:</p>
            <p class="text-4xl text-yellow-600">Select Your Zone</p>
            <p>Step 3:</p>
            <p class="text-4xl text-yellow-600">Play Premier Games</p>
          </div>
        </div>

        <div class="eligibility  border-solid border-2 border-slate-950 flex flex-col justify-center items-center">
          <p>Eligibility</p>
          <p>You need to verify your account in order to</p>
          <p>participate in the PREMIER experience.</p>
          <div class="verify-button"><button>Verify</button></div>
        </div>

      </div>
    </div>
  );
};

export default Premieer_page
