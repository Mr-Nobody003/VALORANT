import React from "react";
import Back_button from "./Back_button";
import Game_icon from "../assets/games-valorant-icon-512x512-kqz6q7jw.png";
import Settings from "../assets/settings.svg";
const Nav = ({ onPageChange, showBackButton, current_Page }) => {
  // Function to determine the button text based on the current page
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
    <div class="flex flex-row text-white justify-between scale-x-100 fixed w-full">
      <div class=" flex text-white ">
        {showBackButton ? (
          <Back_button
            onClick={() => onPageChange("Main_page")}
            text={getButtonText()}
          />
        ) : (
          <>
            <div class="icon">
              <img
                src={Game_icon}
                alt="game icon"
                srcset=""
                width="50"
                height="50"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-slate-300 text-3xl font-Oswald  font-bold">
                COLLISION
              </span>
              <span class="text-slate-300 text-sm">Episode 9//ACT II</span>
            </div>
          </>
        )}
      </div>
      <div class="Timer absolute top-0 left-1/2 "></div>
      <div class="Points + settings flex flex-row absolute top-0 right-0">
        <div class="flex pr-10">points</div>
        <div class="flex">
          <a href=" ">
            <img src={Settings} alt="settings" height="30" width="30" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nav;
