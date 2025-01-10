import React from "react";
import Weapons from "../components/Weapons";
import Playercard from "../components/Playercard";
import Sprays from "../components/Sprays";
import Play_bgc from "../assets/pages_bgc/Play_bgc.png";

const Collection_page = () => {
  return (
    <>
      {/* Background Image */}
      <img
        src={Play_bgc}
        alt="background"
        className="absolute -z-10 h-full w-full"
      />

      {/* Main Content */}
      <div className="flex">
        {/* Weapons Section */}
        <Weapons />

        {/* Right Section */}
        <div className="relative flex flex-col ml-10 p-0">
          <div className="flex">
            <Playercard />
          </div> */}

          /* <div className=" flex absolute p-0 m-0 bottom-[40px]">
            <Sprays />
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection_page;
