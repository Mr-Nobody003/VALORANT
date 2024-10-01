import React, { useState } from 'react'
import Main_page from './Pages/Main_page'
import Play_page from './Pages/Play_page';
import Premieer_page from './Pages/Premieer_page';
import Collection_page from './Pages/Collection_page';
import Agent_page from './Pages/Agent_page';
import Battlepass_page from './Pages/Battlepass_page';
import Career_page from './Pages/Career_page';
import Store_page from './Pages/Store_page';
import Nav from './components/Nav';

function App() {
  const [currentPage, setCurrentPage] = useState('Main_page');
  const [showLogoPage, setShowLogoPage] = useState(true);

  const showBackButton = currentPage === 'Play_page' || currentPage === 'Premieer_page' || currentPage === 'Collection_page' || currentPage === 'Battlepass_page' || currentPage === 'Agent_page' || currentPage === 'Store_page' || currentPage === 'Career_page';

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleBackToMainMenu = () => {
  //   setCurrentPage('Main_page');
  // };
  const handleLogoClick = () => {
    setShowLogoPage(false);
  };

  return (
    <>
      {showLogoPage ? (
        // Logo page content
        <div
          className="w-screen h-screen overflow-hidden cursor-pointer"
          onClick={handleLogoClick}
        >
          <img class="object-fill" src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/main/src/assets/valo_START.png" alt="Logo" />
        </div>
      ) : (
        <>
          <Nav onPageChange={handlePageChange} showBackButton={showBackButton} current_Page={currentPage} />
          {currentPage === 'Main_page' && <Main_page onPageChange={handlePageChange} />}
          {currentPage === 'Play_page' && <Play_page />}
          {currentPage === 'Premieer_page' && <Premieer_page />}
          {currentPage === 'Collection_page' && <Collection_page />}
          {currentPage === 'Career_page' && <Career_page />}
          {currentPage === 'Agent_page' && <Agent_page />}
          {currentPage === 'Battlepass_page' && <Battlepass_page />}
          {currentPage === 'Store_page' && <Store_page />}
        </>
      )}
    </>
  );
}

export default App




