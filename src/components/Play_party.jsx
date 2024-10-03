import React, { useState } from 'react';

const PlayParty = () => {
  // State to track toggle (locked/unlocked)
  const [isLocked, setIsLocked] = useState(true);

  // Toggle the state on click
  const handleToggle = () => {
    setIsLocked(!isLocked);
  };

  return (
    <>
      <div className="flex justify-center pt-10 items-center space-x-6">

        {/* Closed/Open Party Section */}
        <div className="flex items-center justify-end space-x-5 w-[215px] backdrop-blur-md backdrop-brightness-150 p-4 ">
          {/* Status Text */}
          <div className={`text-white text-xs pr-8 ${isLocked ? 'text-gray-300' : 'text-teal-300'}`}>{isLocked ? 'CLOSED PARTY' : 'OPEN PARTY'}</div>

          {/* Toggle Button */}
          <div
            className={`flex w-12 h-[7px] rounded-full cursor-pointer relative items-center transition-colors duration-300 
            ${isLocked ? 'bg-gray-300' : 'bg-teal-300'}`}
            onClick={handleToggle}
          >
            {/* Toggle Circle */}
            <div
              className={`absolute z-10 w-7 h-7 bg-slate-300 rounded-full top-[-10px] left-[1px] transition-transform duration-300 
              ${isLocked ? 'translate-x-[-10px]' : 'translate-x-[35px]'}`}
            >
              {/* Conditional SVG (Lock or Unlock) */}
              <div className="flex justify-center items-center h-full">
                {isLocked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e8eaed">
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#4DB6AC">
                    <path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-gray-600"></div>

        {/* Party Code Section */}
        <div className="flex items-center justify-center text-white text-xs backdrop-blur-md backdrop-brightness-150 p-4 w-[150px]">PARTY CODE</div>

      </div>
    </>
  );
};

export default PlayParty;
