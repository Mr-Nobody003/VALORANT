import react ,{ useState } from 'react'
import Main_page from './Main_page'
import Play_page from './Play_page';
function App() {
  const [currentPage, setCurrentPage] = useState('Main_page');
  const [showLogoPage, setShowLogoPage] = useState(true);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBackToMainMenu = () => {
    setCurrentPage('Main_page');
  };
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
      {currentPage === 'Main_page' && <Main_page onPageChange={handlePageChange} />}
      {currentPage === 'Play_page' && <Play_page onBack={handleBackToMainMenu} />}
       </>
      )}
    </>
  );
}

export default App




