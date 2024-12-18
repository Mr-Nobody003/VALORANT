import React from "react";

const Weapon_box = ({ image, name }) => {
  return (
    <div className="group relative flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/5 rounded-sm p-[5px] border border-slate-300  hover:border-teal-400 hover:bg-gradient-to-t from-teal-400 from-[-40px] via-transparent to-transparent  hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden">
      {/* side corner div */}
      <div className="absolute top-[-25px] left-[-25px] w-[45px] h-[45px] rotate-45 backdrop-blur-[2px] group-hover:bg-teal-400 bg-white/10 "></div>
      {/* Weapon Image */}
      <img
        src={image}
        alt={name}
        className="w-[250px] h-[70px] object-contain mb-[2px]"
      />
      {/* Weapon Name */}
      <h3 className="text-slate-400 text-sm group-hover:text-white font-Roboto">
        {name}
      </h3>
    </div>
  );
};

export default Weapon_box;
