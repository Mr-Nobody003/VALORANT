import React from "react";

const Weapon_box = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/5 hover:bg-slate-500 rounded-sm p-[5px] border border-slate-300  hover:scale-105 transition-transform duration-300 relative overflow-hidden">
    {/* side corner div */}
    <div className="absolute top-[-25px] left-[-25px] w-[50px] h-[50px] rotate-45 backdrop-blur-[2px] bg-white/10"></div>
    {/* Weapon Image */}
    <img
      src={image}
      alt={name}
      className="w-[250px] h-[70px] object-contain mb-[2px]"
    />
    {/* Weapon Name */}
    <h3 className="text-slate-400 text-sm font-Roboto">{name}</h3>
  </div>
  );
};

export default Weapon_box;
