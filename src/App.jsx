import React ,{ useState } from 'react'
import Main_page from './Pages/Main_page'
import Play_page from './Pages/Play_page';
import Premieer_page from './Pages/Premieer_page';
import Nav from './components/Nav';
function App() {
  const [currentPage, setCurrentPage] = useState('Main_page');
  const [showLogoPage, setShowLogoPage] = useState(true);

  const showBackButton = currentPage === 'Play_page' || currentPage === 'Premieer_page';

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
        <Nav onPageChange={handlePageChange} showBackButton={showBackButton}/>
      {currentPage === 'Main_page' && <Main_page onPageChange={handlePageChange} />}
      {currentPage === 'Play_page' && <Play_page  />}
      {currentPage === 'Premieer_page' && <Premieer_page />}
       </>
      )}
    </>
  );
}

export default App




