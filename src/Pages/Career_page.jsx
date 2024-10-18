import React from "react";
import Carieer_rank from "../components/Carieer_rank";
import Play_bgc from "../assets/pages_bgc/Play_bgc.png";
const Career_page = () => {
  return (
    <>
      <img src={Play_bgc} alt="" class="absolute -z-10 h-full w-full" />
      <div class="text-white pt-20 pb-4 pr-32 pl-32 flex flex-col ">
        <Carieer_rank  />
      </div>
    </>
  );
};

export default Career_page;
