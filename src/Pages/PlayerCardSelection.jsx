import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlayerContext } from '../context/PlayerContext';
import { Search } from 'lucide-react';
import GentleBreeze from "../assets/player_cards/GentleBreeze_Card.png";
import Back_button from "../components/Back_button";

const fetchPlayerCards = async () => {
  const res = await fetch('https://valorant-api.com/v1/playercards');
  const data = await res.json();
  return data.data;
};

const fetchPlayerTitles = async () => {
  const res = await fetch('https://valorant-api.com/v1/playertitles');
  const data = await res.json();
  return data.data;
};

const fetchLevelBorders = async () => {
  const res = await fetch('https://valorant-api.com/v1/levelborders');
  const data = await res.json();
  return data.data;
};

const PlayerCardSelection = ({ onBack }) => {
  const { equippedCard, setEquippedCard, equippedTitle, setEquippedTitle, equippedBorder, setEquippedBorder, showLevel } = useContext(PlayerContext);
  
  const [activeTab, setActiveTab] = useState('BANNERS'); // 'BANNERS', 'LEVEL BORDERS'
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: cards, isLoading: cardsLoading } = useQuery({ queryKey: ['playerCards'], queryFn: fetchPlayerCards });
  const { data: titles, isLoading: titlesLoading } = useQuery({ queryKey: ['playerTitles'], queryFn: fetchPlayerTitles });
  const { data: borders, isLoading: bordersLoading } = useQuery({ queryKey: ['levelBorders'], queryFn: fetchLevelBorders });

  // Local preview state
  const [previewCard, setPreviewCard] = useState(equippedCard);
  const [previewTitle, setPreviewTitle] = useState(equippedTitle);
  const [previewBorder, setPreviewBorder] = useState(equippedBorder);

  // Initialize preview when equipped changes (e.g. initial load) or apply defaults if null
  useEffect(() => {
    if(!previewCard) {
        if(equippedCard) setPreviewCard(equippedCard);
        else if (cards) {
            const defaultCard = cards.find(c => c.displayName.toLowerCase() === 'gentle breeze');
            if (defaultCard) setPreviewCard(defaultCard);
        }
    }
    if(!previewTitle) {
        if(equippedTitle) setPreviewTitle(equippedTitle);
        else if (titles) {
            const defaultTitle = titles.find(t => t.titleText?.toLowerCase() === 'super shy' || t.displayName?.toLowerCase() === 'super shy');
            if (defaultTitle) setPreviewTitle(defaultTitle);
        }
    }
    if(!previewBorder) {
        if(equippedBorder) setPreviewBorder(equippedBorder);
        else if (borders) {
            // Find max level border
            const maxBorder = [...borders].sort((a, b) => (b.startingLevel || 0) - (a.startingLevel || 0))[0];
            if (maxBorder) setPreviewBorder(maxBorder);
        }
    }
  }, [equippedCard, equippedTitle, equippedBorder, cards, titles, borders, previewCard, previewTitle, previewBorder]);

  const handleEquip = () => {
    setEquippedCard(previewCard);
    setEquippedTitle(previewTitle);
    setEquippedBorder(previewBorder);
    onBack();
  };

  const renderGrid = () => {
    if (activeTab === 'BANNERS') {
      if (cardsLoading) return <div className="text-white text-center mt-10">Loading Cards...</div>;
      const filtered = cards?.filter(c => c.displayName.toLowerCase().includes(searchQuery.toLowerCase())) || [];
      return (
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-2 overflow-y-auto pr-2 pb-20 [@media(max-height:700px)]:pb-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/70 [&::-webkit-scrollbar-track]:bg-transparent">
          {filtered.map(card => (
            <div key={card.uuid} onClick={() => setPreviewCard(card)} className={`cursor-pointer p-1 ${previewCard?.uuid === card.uuid ? 'bg-teal-400' : 'bg-transparent hover:bg-slate-500/50'} transition-colors`}>
              <img src={card.smallArt} alt={card.displayName} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === 'LEVEL BORDERS') {
      if (bordersLoading) return <div className="text-white text-center mt-10">Loading Borders...</div>;
      const filtered = borders?.filter(b => b.displayName.toLowerCase().includes(searchQuery.toLowerCase())) || [];
      return (
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-2 overflow-y-auto pr-2 pb-20 [@media(max-height:700px)]:pb-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/70 [&::-webkit-scrollbar-track]:bg-transparent">
          {filtered.map(border => (
            <div key={border.uuid} onClick={() => setPreviewBorder(border)} className={`cursor-pointer flex items-center justify-center p-2 border-2 ${previewBorder?.uuid === border.uuid ? 'border-teal-400' : 'border-transparent hover:border-slate-500'} bg-slate-800/50`}>
              <img src={border.levelNumberAppearance} alt={border.displayName} className="w-16 h-16 [@media(max-height:700px)]:w-12 [@media(max-height:700px)]:h-12 object-contain" />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full flex pt-[70px]">
        
        {/* Left Sidebar */}
        <div className="absolute left-0 top-[70px] w-[350px] lg:w-[400px] h-[calc(100vh-70px)] flex flex-col bg-slate-900/30 border-r border-slate-700/30 px-4 pt-4 z-20 backdrop-blur-sm">
            {/* Search */}
            <div className="relative mb-6 [@media(max-height:700px)]:mb-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/40 border border-slate-600/50 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-teal-400"
                />
            </div>
            {/* Grid */}
            {renderGrid()}
        </div>

        {/* Center Content */}
        <div className="w-full h-full flex flex-col items-center pt-8 relative z-10">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-500/30 mb-8">
                {['BANNERS', 'LEVEL BORDERS'].map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-xs font-semibold tracking-[0.2em] ${activeTab === tab ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            
            <h1 className="text-3xl text-white font-Oswald tracking-widest mb-10 uppercase font-bold">
                {previewCard ? previewCard.displayName : 'SELECT A CARD'}
            </h1>

            {/* Preview Card Area (matching Play_card layout exactly) */}
            <div className="w-[268px] h-[640px] relative scale-[0.65] origin-top flex-shrink-0" id="card-preview">
                
                {/* Level Border */}
                {showLevel && previewBorder && (
                    <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
                        <img src={previewBorder.levelNumberAppearance} alt="Level Border" className="w-[80px] h-[80px] object-contain drop-shadow-xl" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[14px] font-bold mt-[2px]">
                            999
                        </span>
                    </div>
                )}

                <h2 className="absolute bottom-[214px] left-1/2 -translate-x-1/2 z-20 font-medium text-[16px] text-black">
                    PLAYER_NAME
                </h2>

                <h3 className="absolute bottom-[193px] w-full left-1/2 -translate-x-1/2 z-20 font-normal text-center text-[11px] text-gray-100">
                    {previewTitle ? (previewTitle.titleText || previewTitle.displayName) : "Super Shy"}
                </h3>

                <img
                    src="/card_border.png"
                    width={268}
                    height={640}
                    alt="card border"
                    className="absolute top-0 left-[1px] w-full h-full object-contain z-10 pointer-events-none"
                />

                <div className="relative h-full w-full">
                    <img
                        src={previewCard ? previewCard.largeArt : GentleBreeze}
                        width={268}
                        height={640}
                        alt="card image"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        style={{
                            clipPath: "polygon(50% 94%, 100% 76%, 100% 0, 0 0, 0 76%)"
                        }}
                    />
                </div>
            </div>
            
            {/* Equip Button (positioned below the scaled card) */}
            <button 
                onClick={handleEquip}
                className="mt-[-200px] w-[200px] py-3 bg-slate-900/90 border border-slate-500 hover:border-teal-400 hover:bg-slate-800 text-white tracking-widest font-semibold transition-colors text-sm z-50"
            >
                EQUIP CARD
            </button>

            {/* Equip Titles Dropdown at bottom right */}
            <div className="absolute bottom-12 right-12 flex flex-col items-start gap-1 z-20">
                <select 
                    className="bg-slate-900/80 border border-slate-600 text-white text-xs py-3 px-4 focus:outline-none focus:border-teal-400 w-[200px] appearance-none uppercase tracking-widest cursor-pointer"
                    value={previewTitle?.uuid || ''}
                    onChange={(e) => {
                        const t = titles?.find(t => t.uuid === e.target.value);
                        if(t) setPreviewTitle(t);
                    }}
                >
                    <option value="" disabled>EQUIP TITLES</option>
                    {titlesLoading ? <option>Loading...</option> : (
                        titles?.map(title => (
                            <option key={title.uuid} value={title.uuid}>
                                {title.titleText || title.displayName}
                            </option>
                        ))
                    )}
                </select>
                {/* Custom arrow to mimic a button drop */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    ▼
                </div>
            </div>
        </div>
    </div>
  );
};

export default PlayerCardSelection;
