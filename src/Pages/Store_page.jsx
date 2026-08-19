import React, { useState, useEffect } from 'react';
import Play_bgc from "../assets/pages_bgc/Play_bgc.png";

const Store_page = () => {
  const [bundles, setBundles] = useState([]);
  const [skins, setSkins] = useState([]);
  const [contentTiers, setContentTiers] = useState({});
  const [currentBundleIndex, setCurrentBundleIndex] = useState(0);
  const [currentOffers, setCurrentOffers] = useState([]);
  const [isOffersFading, setIsOffersFading] = useState(false);
  
  const [featuredTimer, setFeaturedTimer] = useState("14:02:03:10");
  const [offersTimer, setOffersTimer] = useState("05:03:09");

  // Timer logic
  useEffect(() => {
    let fTime = 14 * 24 * 3600 + 2 * 3600 + 3 * 60 + 10; // 14 days, 2 hours, 3 mins, 10 secs
    let oTime = 5 * 3600 + 3 * 60 + 9; // 5 hours, 3 mins, 9 secs

    const interval = setInterval(() => {
      fTime = fTime > 0 ? fTime - 1 : 0;
      oTime = oTime > 0 ? oTime - 1 : 0;

      const formatTime = (seconds, includeDays = false) => {
        const d = Math.floor(seconds / (24 * 3600));
        const h = Math.floor((seconds % (24 * 3600)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        
        if (includeDays) {
          return `${d.toString().padStart(2, '0')}:${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      };

      setFeaturedTimer(formatTime(fTime, true));
      setOffersTimer(formatTime(oTime, false));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch API data and cache it
  useEffect(() => {
    const fetchData = async () => {
      try {
        const CACHE_KEY = "valorant_store_data_v4";
        const CACHE_TIME_KEY = "valorant_store_data_time_v4";
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = new Date().getTime();
        
        let data = null;

        if (cacheTime && now - parseInt(cacheTime) < 1000 * 60 * 60 * 24) { // 24 hours cache
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            try {
              data = JSON.parse(cached);
            } catch (e) {
              data = null; // invalid cache
            }
          }
        }

        if (!data) {
          const [bundlesRes, skinsRes, tiersRes] = await Promise.all([
            fetch('https://valorant-api.com/v1/bundles'),
            fetch('https://valorant-api.com/v1/weapons/skins'),
            fetch('https://valorant-api.com/v1/contenttiers')
          ]);

          const bundlesData = await bundlesRes.json();
          const skinsData = await skinsRes.json();
          const tiersData = await tiersRes.json();

          // Only extract needed properties to prevent localStorage QuotaExceededError
          data = {
            bundles: bundlesData.data
              .filter(b => b.displayIcon)
              .map(b => ({
                uuid: b.uuid,
                displayName: b.displayName,
                displayIcon: b.displayIcon
              })), 
            skins: skinsData.data
              .filter(s => 
                s.displayIcon && 
                !s.displayName.includes("Standard") && 
                !s.displayName.includes("Random") &&
                s.contentTierUuid
              )
              .map(s => ({
                uuid: s.uuid,
                displayName: s.displayName,
                displayIcon: s.displayIcon,
                contentTierUuid: s.contentTierUuid
              })),
            tiers: tiersData.data.reduce((acc, tier) => {
              acc[tier.uuid] = {
                color: tier.color ? `#${tier.color.slice(0, 6)}` : '#888888',
                icon: tier.displayIcon
              };
              return acc;
            }, {})
          };

          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          localStorage.setItem(CACHE_TIME_KEY, now.toString());
        }

        setBundles(data.bundles);
        setSkins(data.skins);
        setContentTiers(data.tiers);

        // Pick initial 4 random offers
        if (data.skins.length >= 4) {
          const initialOffers = [];
          const usedIndices = new Set();
          while (initialOffers.length < 4) {
            const idx = Math.floor(Math.random() * data.skins.length);
            if (!usedIndices.has(idx)) {
              usedIndices.add(idx);
              initialOffers.push(data.skins[idx]);
            }
          }
          
          // Preload initial offers before displaying
          Promise.all(
            initialOffers.map(offer => new Promise(resolve => {
              const img = new Image();
              img.src = offer.displayIcon;
              img.onload = resolve;
              img.onerror = resolve;
            }))
          ).then(() => {
            setCurrentOffers(initialOffers);
          });
        }

      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchData();
  }, []);

  // Slideshow with preloading for bundles
  useEffect(() => {
    if (bundles.length === 0) return;
    
    let timeoutId;
    const showNextBundle = () => {
      const nextIndex = (currentBundleIndex + 1) % bundles.length;
      const nextBundle = bundles[nextIndex];
      
      const img = new Image();
      img.src = nextBundle.displayIcon;
      img.onload = () => {
        setCurrentBundleIndex(nextIndex);
      };
      img.onerror = () => {
        setCurrentBundleIndex(nextIndex); // Proceed even on error
      };
    };

    timeoutId = setTimeout(showNextBundle, 6000);
    return () => clearTimeout(timeoutId);
  }, [bundles, currentBundleIndex]);

  // Slideshow with preloading for bottom offers
  useEffect(() => {
    if (skins.length < 4) return;
    
    let timeoutId;
    
    const showNextOffers = () => {
      const nextOffers = [];
      const usedIndices = new Set();
      while (nextOffers.length < 4) {
        const idx = Math.floor(Math.random() * skins.length);
        if (!usedIndices.has(idx)) {
          usedIndices.add(idx);
          nextOffers.push(skins[idx]);
        }
      }
      
      // Preload all 4 images
      Promise.all(
        nextOffers.map(offer => new Promise(resolve => {
          const img = new Image();
          img.src = offer.displayIcon;
          img.onload = resolve;
          img.onerror = resolve;
        }))
      ).then(() => {
        setIsOffersFading(true); // Start fade out
        
        setTimeout(() => {
          setCurrentOffers(nextOffers);
          setIsOffersFading(false); // Fade back in
          
          timeoutId = setTimeout(showNextOffers, 8000); // Schedule next rotation
        }, 500); // 500ms fade duration
      });
    };

    // Initial timeout scheduling
    timeoutId = setTimeout(showNextOffers, 8000);
    
    return () => clearTimeout(timeoutId);
  }, [skins]);

  return (
    <div className="relative h-full w-full overflow-hidden text-white font-Oswald select-none">
      <img
        src={Play_bgc}
        alt="background"
        className="absolute top-0 left-0 -z-10 h-full w-full object-cover opacity-80"
      />

      {/* Main Content Area - adding padding to account for nav and borders */}
      <div className="flex flex-col h-full w-full px-6 xl:px-[12%] py-8 pt-28 gap-6 z-10">
        
        {/* Upper Bundle Section */}
        <div className="relative w-full h-[55%] overflow-hidden bg-black/40 border border-white/10 shadow-2xl backdrop-blur-sm">
            {bundles.map((bundle, index) => (
                <div 
                    key={bundle.uuid}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBundleIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img 
                        src={bundle.displayIcon} 
                        alt={bundle.displayName} 
                        className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent pointer-events-none"></div>

                    {/* Text content */}
                    <div className="absolute top-8 left-10 flex flex-col pointer-events-none z-20">
                        <div className="text-gray-400 tracking-[0.2em] text-xs xl:text-sm flex items-center gap-2 font-sans font-semibold mb-1">
                            FEATURED <span className="text-gray-600">|</span> <span className="text-teal-400">{featuredTimer}</span>
                        </div>
                        <h1 className="text-5xl xl:text-7xl font-bold uppercase tracking-wide leading-none text-white drop-shadow-lg">{bundle.displayName}</h1>
                        <h2 className="text-lg xl:text-xl tracking-[0.3em] text-gray-300 mt-2 uppercase font-light">COLLECTION</h2>
                    </div>

                    {/* Price box (blank price) */}
                    <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md px-6 py-3 flex items-center gap-3 border-b-2 border-teal-400 z-20">
                        <div className="flex items-center gap-2">
                            {/* VP Icon */}
                            <svg className="w-5 h-5 text-teal-300" viewBox="0 0 100 100" fill="currentColor">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
                                <path d="M35 30 L50 70 L65 30 L55 30 L50 45 L45 30 Z" />
                            </svg>
                            <span className="text-2xl font-semibold opacity-0 select-none">9999</span> {/* Invisible text to maintain box size */}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Lower Offers Section */}
        <div className="w-full h-[35%] flex flex-col relative">
            {/* Divider and Timer */}
            <div className="flex justify-center mb-3">
                <div className="text-gray-400 tracking-[0.2em] text-xs xl:text-sm flex items-center gap-2 font-sans font-semibold">
                    OFFERS <span className="text-gray-600">|</span> <span className="text-teal-400">{offersTimer}</span>
                </div>
            </div>

            <div className={`flex gap-4 w-full h-full transition-opacity duration-500 ease-in-out ${isOffersFading ? 'opacity-0' : 'opacity-100'}`}>
                {currentOffers.map((offer, index) => {
                    const tier = contentTiers[offer.contentTierUuid] || { color: '#888888', icon: null };
                    
                    return (
                        <div key={offer.uuid + index} className="flex-1 relative bg-gradient-to-b from-black/80 to-black/95 border-t-[3px] overflow-hidden group transition-all duration-300 hover:bg-black cursor-pointer shadow-lg" style={{ borderTopColor: tier.color }}>
                            
                            {/* Blurred background image zoomed to cover */}
                            <div className="absolute inset-0 z-0 overflow-hidden mix-blend-screen opacity-20 pointer-events-none transition-opacity duration-1000 group-hover:opacity-40">
                                <img src={offer.displayIcon} className="w-full h-full object-cover scale-[2.5] blur-2xl" alt="" />
                            </div>

                            {/* Background pattern/glow based on tier color */}
                            <div className="absolute inset-0 opacity-[0.2] pointer-events-none transition-opacity duration-1000 z-0" 
                                style={{
                                    background: `radial-gradient(circle at center, ${tier.color} 0%, transparent 70%)`
                                }}
                            ></div>

                            {/* Top Right: VP Icon, Price, Tier Icon */}
                            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded">
                                    <svg className="w-4 h-4 text-gray-300" viewBox="0 0 100 100" fill="currentColor">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
                                        <path d="M35 30 L50 70 L65 30 L55 30 L50 45 L45 30 Z" />
                                    </svg>
                                    <span className="text-md opacity-0 font-sans">1775</span> {/* Blank Price */}
                                </div>
                                {tier.icon && <img src={tier.icon} alt="Tier" className="w-6 h-6 object-contain drop-shadow-md" />}
                            </div>

                            {/* Center Image */}
                            <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-500 ease-out group-hover:scale-[1.15] z-10">
                                <img src={offer.displayIcon} alt={offer.displayName} className="max-w-full max-h-[70%] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                            </div>

                            {/* Bottom Left: Skin Name */}
                            <div className="absolute bottom-4 left-4 z-10 pr-4">
                                <div className="text-sm xl:text-lg uppercase tracking-wide text-gray-200 group-hover:text-white transition-colors drop-shadow-md leading-tight">
                                    {offer.displayName}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
}

export default Store_page;
