import React, { useState, useEffect } from "react";
//import { Analytics } from "@vercel/analytics/react"
import Main_page from "./Pages/Main_page";
import Play_page from "./Pages/Play_page";
import Premieer_page from "./Pages/Premieer_page";
import Collection_page from "./Pages/Collection_page";
import Agent_page from "./Pages/Agent_page";
import Battlepass_page from "./Pages/Battlepass_page";
import Career_page from "./Pages/Career_page";
import Store_page from "./Pages/Store_page";
import Nav from "./components/Nav";
import Valo_start from "./assets/Valo_start.png";

function App() {
  const [currentPage, setCurrentPage] = useState("Main_page");
  const [showStartPage, setShowStartPage] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the start img
  useEffect(() => {
    const img = new Image();
    img.src = Valo_start; // Set the image source to preload

    img.onload = () => {
      setImageLoaded(true); // Set imageLoaded to true when the image is loaded
    };

    return () => {
      setImageLoaded(false); // Cleanup on unmount
    };
  }, []);

  // Hide the Start img page after 1 second if the image has loaded
  useEffect(() => {
    if (!showStartPage || !imageLoaded) return; // Only set timeout if the image is loaded

    const timer = setTimeout(() => {
      setShowStartPage(false);
    }, 1599); // 1.6 second delay after image is loaded

    return () => clearTimeout(timer);
  }, [showStartPage, imageLoaded]);

  const showBackButton = [
    "Play_page",
    "Premieer_page",
    "Collection_page",
    "Battlepass_page",
    "Agent_page",
    "Store_page",
    "Career_page",
  ].includes(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStartClick = () => {
    setShowStartPage(false);
  };

  return (
    <>
      {showStartPage ? (
        // Start page content
        <div
          className="w-screen h-screen overflow-hidden cursor-pointer"
          onClick={handleStartClick}
        >
          {/*start image added */}
          <img className="object-fill" src={Valo_start} alt="Start" />
        </div>
      ) : (
        <>
          <Nav
            onPageChange={handlePageChange}
            showBackButton={showBackButton}
            current_Page={currentPage}
          />
          {currentPage === "Main_page" && (
            <Main_page onPageChange={handlePageChange} />
          )}
          {currentPage === "Play_page" && <Play_page />}
          {currentPage === "Premieer_page" && <Premieer_page />}
          {currentPage === "Collection_page" && <Collection_page />}
          {currentPage === "Career_page" && <Career_page />}
          {currentPage === "Agent_page" && <Agent_page />}
          {currentPage === "Battlepass_page" && <Battlepass_page />}
          {currentPage === "Store_page" && <Store_page />}
        </>
      )}
    </>
  );
}

export default App;
