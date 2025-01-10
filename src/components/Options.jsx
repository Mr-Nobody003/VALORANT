import React, { useState } from "react";
import Close_icon from "./Close_icon";
import About from "./About";

const Options = ({ setShowOptions }) => {
  const [showAbout, setShowAbout] = useState(false);

  const handleAboutClick = () => {
    setShowAbout(true); // Open About modal
  };

  return (
    <>
      {/* Options Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
        <div className="bg-gray-800 bg-opacity-90 w-[400px] h-96 rounded-lg relative shadow-lg">
          {/* Close Button */}
          <div
            className="absolute top-3 right-3 text-white cursor-pointer"
            onClick={() => setShowOptions(false)}
          >
            <Close_icon />
          </div>

          {/* Options */}
          <div className="flex flex-col text-white pt-20 justify-center items-center space-y-4">
            <div className="flex items-center justify-center border border-slate-600 py-2 w-[300px] bg-slate-400 bg-opacity-90 rounded-md cursor-pointer hover:bg-slate-600 transition duration-200">
              <div className="font-Oswald font-medium text-lg">PLAYER SUPPORT</div>
            </div>

            <div
              className="flex items-center justify-center border border-slate-600 py-2 w-[300px] bg-slate-400 bg-opacity-90 rounded-md cursor-pointer hover:bg-slate-600 transition duration-200"
              onClick={handleAboutClick}
            >
              <div className="font-Oswald font-medium text-lg">ABOUT</div>
            </div>

            <div className="flex items-center justify-center border border-slate-600 py-2 w-[300px] bg-slate-400 bg-opacity-90 rounded-md cursor-pointer hover:bg-slate-600 transition duration-200">
              <div className="font-Oswald font-medium text-lg">LEAVE MATCH</div>
            </div>

            {/* EXIT Button */}
            <a href=" " className="">
              <div className="flex items-center justify-center border border-slate-600 py-2 w-[300px] bg-red-400 bg-opacity-80 rounded-md cursor-pointer hover:bg-red-700 transition duration-200">
                <div className="font-Oswald font-medium text-lg">
                  EXIT TO DESKTOP
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Render About Modal */}
      {showAbout && (
        <About setShowAbout={setShowAbout} setShowOptions={setShowOptions} />
      )}
    </>
  );
};

export default Options;
