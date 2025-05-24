import React from "react";
import Close_icon from "./Close_icon";

const About = ({ setShowAbout, setShowOptions }) => {
  const handleClose = () => {
    setShowAbout(false); // Close About modal
    setShowOptions(true); // Reopen Options modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-black w-[90%] md:w-[600px] h-[80%] md:h-[600px] rounded-lg relative shadow-lg p-6 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-webkit">
        {/* Close Button */}
        <div
          className="absolute top-3 right-3 text-white cursor-pointer"
          onClick={handleClose}
        >
          <Close_icon />
        </div>

        {/* About Content */}
        <div className="flex flex-col text-white  items-center space-y-4 ">
          <div className="font-Oswald font-medium text-lg">
            <span className="text-3xl">ABOUT</span>
          </div>

          {/* About Information */}
          <div className=" text-base leading-relaxed space-y-4 font-mono ">
            <p>
              This website was made by a group of students as a learning
              project. We have taken the design from the original game{" "}
              <a
                className="text-red-500 font-Oswald font-bold text-xl text-decoration-line: underline"
                href="https://playvalorant.com/en-gb/"
              >
                VALORANT
              </a>
              .
            </p>
            <p>
              We have tried to make the website as close to the original game as
              possible, but some designs were pretty hard to replicate.
            </p>
            <p>
              Some parts of the game are not implemented in the website due to
              the fact that we arn't using any routes to render the pages, as
              each page are already loaded in the browser during the initial
              loading of the website and are just hidden and shown when
              needed(using conditionals)
            </p>
            <p>
              The art and all the assets used in the website are not owned by us
              and are the property of the original creators of the game.
            </p>
            <p>
              We have acquired the assets from the internet and have used them
              for educational purposes only.
            </p>
          </div>

          <div className=" border-white border-[1px] w-[100%]" />

          {/* Asset Content */}
          <div className="font-Oswald font-medium text-lg">
            <span className="text-3xl">ASSETS</span>
          </div>

          {/* Assets Information */}
          <div className=" flex flex-col items-center justify-center text-base leading-relaxed space-y-2 font-mono ">
            <a
              className="flex text-red-500 font-Oswald font-bold text-lg text-decoration-line: underline"
              href="https://playvalorant.com/en-gb/"
            >
              VALORANT
            </a>
            <a
              className="flex text-red-500 font-Oswald font-bold text-lg text-decoration-line: underline"
              href="https://valorant.fandom.com/wiki/VALORANT_Wiki"
            >
              valorant.fandom.com
            </a>
            <a
              className="flex text-red-500 font-Oswald font-bold text-lg text-decoration-line: underline"
              target="_blank"
              href="https://icons8.com"
            >
              Valorant icon by Icons8
            </a>
          </div>

          {/* {contributors} */}
          <div className="font-Oswald font-medium text-lg">
            <span className="text-3xl">Contributors</span>
          </div>

          <div className="flex flex-col justify-between items-end text-base leading-relaxed space-y-6 font-mono ">
            {/* 1st row */}
            <div className="flex flex-row justify-between space-x-[150px]">
              <a
                href="https://github.com/Mr-Nobody003"
                className="relative group"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/152724498?v=4"
                  alt=""
                  className="flex h-[100px] w-[100px] rounded-full"
                />
                <div
                  class="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100"
                >
                  Mr-Nobody003
                </div>
              </a>

              <a
                href="https://github.com/SUbhenduCODEBUZZZZZZ"
                className="relative group"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/170307156?v=4"
                  alt=""
                  className="flex h-[100px] w-[100px] rounded-full"
                />
                <div
                  class="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100"
                >
                  SUbhenduCODEBUZZZZZZ
                </div>
              </a>
            </div>
            {/* 2nd row */}
            <div className="flex flex-row justify-between space-x-[150px]">
              <a
                href="https://github.com/WilliamHails"
                className="relative group"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/153358752?v=4"
                  alt=""
                  className="flex h-[100px] w-[100px] rounded-full"
                />
                <div
                  class="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100"
                >
                  WilliamHails
                </div>
              </a>
              <a href="https://github.com/Maxxy71" className="relative group">
                <img
                  src="https://avatars.githubusercontent.com/u/153356897?v=4"
                  alt=""
                  className="flex h-[100px] w-[100px] rounded-full"
                />
                <div
                  class="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100"
                >
                  Maxxy71
                </div>
              </a>
            </div>

            <div></div>
          </div>

          <div className=" border-white border-[1px] w-[100%]" />

          <div className="font-Oswald font-medium text-lg">
            <a
              href="https://github.com/Mr-Nobody003/VALORANT"
              className="text-3xl text-red-500 hover:text-blue-300 inline-flex items-center gap-2"
            >
              GitHub Repo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
          <div className=" border-white border-[1px] w-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default About;
