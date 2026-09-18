import React from 'react';
import { Search } from 'lucide-react';

const WeaponGrid = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  filteredSkins,
  filteredBuddies,
  previewSkin,
  setPreviewSkin,
  previewBuddy,
  setPreviewBuddy
}) => {
  return (
    <div className="absolute left-0 top-[70px] w-[350px] lg:w-[400px] h-[calc(100vh-1px)] flex flex-col bg-slate-900/30 border-r border-slate-700/30 px-4 pt-4 z-20 backdrop-blur-sm">
      {/* Tabs */}
      <div className="flex border-b border-slate-600/50 mb-6 [@media(max-height:700px)]:mb-1">
        <button
          onClick={() => setActiveTab('Skins')}
          className={`flex-1 py-2 font-Oswald tracking-widest text-lg transition-colors ${activeTab === 'Skins' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          SKINS
        </button>
        <button
          onClick={() => setActiveTab('Buddies')}
          className={`flex-1 py-2 font-Oswald tracking-widest text-lg transition-colors ${activeTab === 'Buddies' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          BUDDIES
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 [@media(max-height:700px)]:mb-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder={activeTab === 'Skins' ? "Search Skins" : "Search Buddies"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/40 border border-slate-600/50 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-teal-400"
        />
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto pb-20 [@media(max-height:700px)]:pb-2 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/70 [&::-webkit-scrollbar-track]:bg-transparent">
        {activeTab === 'Skins' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredSkins.map((skin) => (
              <div
                key={skin.uuid}
                onClick={() => setPreviewSkin(skin)}
                className={`
                  relative flex items-center justify-center h-24 [@media(max-height:700px)]:h-16 bg-slate-800/40 
                  border cursor-pointer transition-all duration-200 p-2
                  ${previewSkin?.uuid === skin.uuid ? 'border-teal-400 bg-teal-900/20' : 'border-slate-600/50 hover:border-slate-400'}
                `}
              >
                <img
                  src={skin.displayIcon || skin.chromas?.[0]?.displayIcon}
                  alt={skin.displayName}
                  className="max-w-full max-h-full object-contain filter drop-shadow-md"
                />
                {previewSkin?.uuid === skin.uuid && (
                  <div className="absolute inset-0 border-2 border-teal-400 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredBuddies.map((buddy) => (
              <div
                key={buddy.uuid}
                onClick={() => setPreviewBuddy(buddy)}
                className={`
                  relative flex items-center justify-center h-24 [@media(max-height:700px)]:h-16 bg-slate-800/40 
                  border cursor-pointer transition-all duration-200 p-2
                  ${previewBuddy?.uuid === buddy.uuid ? 'border-teal-400 bg-teal-900/20' : 'border-slate-600/50 hover:border-slate-400'}
                `}
              >
                {buddy.displayIcon ? (
                  <img
                    src={buddy.displayIcon}
                    alt={buddy.displayName}
                    className="max-w-full max-h-full object-contain filter drop-shadow-md"
                  />
                ) : (
                  <div className="text-slate-500 font-Oswald text-sm">NONE</div>
                )}
                {previewBuddy?.uuid === buddy.uuid && (
                  <div className="absolute inset-0 border-2 border-teal-400 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaponGrid;
