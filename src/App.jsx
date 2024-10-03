import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main_page from './Pages/Main_page';
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

  const showBackButton =
    currentPage === 'Play_page' ||
    currentPage === 'Premieer_page' ||
    currentPage === 'Collection_page' ||
    currentPage === 'Battlepass_page' ||
    currentPage === 'Agent_page' ||
    currentPage === 'Store_page' ||
    currentPage === 'Career_page';

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogoClick = () => {
    setShowLogoPage(false);
  };

  return (
    <Router basename="/VALORANT"> {/* Set basename here */}
      {showLogoPage ? (
        // Logo page content
        <div
          className="w-screen h-screen overflow-hidden cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            className="object-fill"
            src="https://raw.githubusercontent.com/Mr-Nobody003/VALORANT/main/src/assets/valo_START.png"
            alt="Logo"
          />
        </div>
      ) : (
        <>
          <Nav
            onPageChange={handlePageChange}
            showBackButton={showBackButton}
            current_Page={currentPage}
          />
          <Routes>
            <Route path="/" element={<Main_page onPageChange={handlePageChange} />} />
            <Route path="/play" element={<Play_page />} />
            <Route path="/premieer" element={<Premieer_page />} />
            <Route path="/collection" element={<Collection_page />} />
            <Route path="/career" element={<Career_page />} />
            <Route path="/agent" element={<Agent_page />} />
            <Route path="/battlepass" element={<Battlepass_page />} />
            <Route path="/store" element={<Store_page />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
