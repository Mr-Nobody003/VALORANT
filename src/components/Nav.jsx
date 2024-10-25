import React, { useState } from "react";
import Back_button from "./Back_button";
import Options from './Options';
import Game_icon from "../assets/games-valorant-icon-512x512-kqz6q7jw.png";
import Settings from "../assets/settings.svg";

const Nav = ({ onPageChange, showBackButton, current_Page }) => {
  const [ShowOptions, setShowOptions] = useState(false);

  const getButtonText = () => {
    switch (current_Page) {
      case "Play_page":
        return "LOBBY";
      case "Premieer_page":
        return "PREMIERE";
      case "Agent_page":
        return "AGENTS";
      case "Store_page":
        return "STORE";
      case "Collection_page":
        return "COLLECTION";
      case "Career_page":
        return "CAREER";
      case "Battlepass_page":
        return "BATTLEPASS";
      default:
        return " .";
    }
  };

  return (
    <>
      <div className="flex flex-row text-white justify-between fixed w-full">
        <div className="flex text-white">
          {showBackButton ? (
            <Back_button
              onClick={() => onPageChange("Main_page")}
              text={getButtonText()}
            />
          ) : (
            <>
              <div className="icon">
                <img
                  src={Game_icon}
                  alt="game icon"
                  width="50"
                  height="50"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-300 text-3xl font-Oswald font-bold">
                  COLLISION
                </span>
                <span className="text-slate-300 text-sm">Episode 9//ACT II</span>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row absolute top-0 right-0">
          {/* points */}
          <div className="flex pr-10">points
            
          </div>
          {/* settings */}
          <div className="flex">
            <div onClick={() => setShowOptions(true)} className="cursor-pointer">
              <img src={Settings} alt="settings" height="30" width="30" />
            </div>
          </div>
        </div>
      </div>
      {ShowOptions && <Options setShowOptions={setShowOptions} />}
    </>
  );
};

export default Nav;
