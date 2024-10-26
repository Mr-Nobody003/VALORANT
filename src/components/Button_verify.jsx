import React from "react";

const Button_verify = () => {
  return (
    <>
      <div>
        <div class="relative flex justify-center items-center text-lg font-medium font-Oswald h-[52px] border-t-[2px] border-b-[2px] border-gray-600">
          <span class="absolute left-0 top-0 h-[18px] w-[2px] bg-gray-600"></span>
          <span class="absolute right-0 top-0 h-[18px] w-[2px] bg-gray-600"></span>
          <span class="absolute left-0 bottom-0 h-[18px] w-[2px] bg-gray-600"></span>
          <span class="absolute right-0 bottom-0 h-[18px] w-[2px] bg-gray-600"></span>
          <button type="button"><div className="flex justify-center items-center h-[48px] w-[200px] bg-slate-100  border-yellow-300 border-[1px]">VERIFY</div></button>
        </div>
      </div>
    </>
  );
};

export default Button_verify;
