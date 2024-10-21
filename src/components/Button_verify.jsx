import React from "react";

const Button_verify = () => {
  return (
    <>
      <div>
        <button class="relative px-14 py-2 text-lg font-medium font-Oswald  bg-white border-t-[3px] border-b-[3px] border-gray-600">
          <span class="absolute left-0 top-0 h-[18px] w-[2px] bg-gray-600"></span>
          <span class="absolute right-0 top-0 h-[18px] w-[2px] bg-gray-600"></span>
          <span class="absolute left-0 bottom-0 h-[18px] w-[2px] bg-gray-600"></span>
          <span class="absolute right-0 bottom-0 h-[18px] w-[2px] bg-gray-600"></span>
          VERIFY
        </button>
      </div>
    </>
  );
};

export default Button_verify;
