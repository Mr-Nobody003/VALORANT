import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlayerContext } from '../context/PlayerContext';
import Back_button from '../components/Back_button';
import { Search } from 'lucide-react';

const fetchSprays = async () => {
    const response = await fetch('https://valorant-api.com/v1/sprays');
    if (!response.ok) throw new Error('Failed to fetch sprays');
    return response.json();
};



const fetchFlex = async () => {
    const response = await fetch('https://valorant-api.com/v1/flex');
    if (!response.ok) throw new Error('Failed to fetch flex');
    return response.json();
};

const SpraySelection = ({ quadrant, onBack }) => {
    const { equippedSprays, setEquippedSprays } = useContext(PlayerContext);
    
    // We can just use the spray slot to equip flex as well, or you might want a separate state for flex
    // Let's assume the user just wants the flex tab visible for now. If they want to equip flex to a quadrant, we save it in equippedSprays
    const [activeTab, setActiveTab] = useState('Sprays'); // 'Sprays' | 'Flex'
    const [searchQuery, setSearchQuery] = useState('');
    
    const [previewSpray, setPreviewSpray] = useState(() => equippedSprays[quadrant] || null);

    const { data: spraysData, isLoading: spraysLoading, error: spraysError } = useQuery({
        queryKey: ['sprays'],
        queryFn: fetchSprays
    });

    const { data: flexData, isLoading: flexLoading, error: flexError } = useQuery({
        queryKey: ['flex'],
        queryFn: fetchFlex
    });

    const handleEquipSpray = () => {
        if (previewSpray) {
            setEquippedSprays(prev => ({
                ...prev,
                [quadrant]: previewSpray
            }));
            onBack();
        }
    };

    if (spraysLoading || flexLoading) {
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 text-teal-400 font-Oswald text-2xl tracking-widest">
                LOADING...
            </div>
        );
    }
    
    if (spraysError || flexError) return <div>Error loading data</div>;

    // Filter Sprays
    const allSprays = (spraysData?.data || []).filter(s => !s.isNullSpray && s.displayIcon);
    const filteredSprays = allSprays.filter(s => s.displayName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter Flex
    const allFlex = flexData?.data || [];
    const filteredFlex = allFlex.filter(f => f.displayName.toLowerCase().includes(searchQuery.toLowerCase()));

    const getPreviewUrl = (item) => {
        if (!item) return null;
        return item.animationGif || item.fullTransparentIcon || item.displayIcon;
    };

    return (
        <div className="absolute inset-0 w-full h-full flex bg-[#0f1923] z-40">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full opacity-30 bg-cover bg-center pointer-events-none" style={{ backgroundImage: 'url(https://media.valorant-api.com/themes/5b09613d-470c-74f4-a69a-028474b703a6/displayicon.png)' }}></div>

            {/* Left Sidebar */}
            <div className="absolute left-0 top-[70px] w-[350px] lg:w-[400px] h-[calc(100vh-1px)] flex flex-col bg-slate-900/30 border-r border-slate-700/30 px-4 pt-4 z-20 backdrop-blur-sm">
            
            {/* Tabs */}
            <div className="flex border-b border-slate-600/50 mb-6 [@media(max-height:600px)]:mb-1 overflow-x-auto">
                {['Sprays', 'Flex'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 font-Oswald tracking-widest text-sm lg:text-lg transition-colors ${activeTab === tab ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>
                
                {/* Search */}
            <div className="relative mb-6 [@media(max-height:700px)]:mb-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                    type="text" 
                        placeholder={`Search ${activeTab}`} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900/40 border border-slate-600/50 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-teal-400"
                    />
                </div>
                
                {/* Grid */}
            <div className="flex-1 overflow-y-auto pb-20 [@media(max-height:700px)]:pb-2 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/70 [&::-webkit-scrollbar-track]:bg-transparent">
                {activeTab === 'Sprays' && (
                    <div className="grid grid-cols-3 gap-3">
                        {filteredSprays.map((spray) => (
                            <div 
                                key={spray.uuid}
                                onClick={() => setPreviewSpray(spray)}
                                className={`
                                    relative flex items-center justify-center h-24 [@media(max-height:700px)]:h-16 bg-slate-800/40 
                                        border cursor-pointer transition-all duration-200 p-2
                                        ${previewSpray?.uuid === spray.uuid ? 'border-teal-400 bg-teal-900/20' : 'border-slate-600/50 hover:border-slate-400'}
                                    `}
                                >
                                    <img 
                                        src={spray.displayIcon} 
                                        alt={spray.displayName} 
                                        className="max-w-full max-h-full object-contain filter drop-shadow-md" 
                                    />
                                    {previewSpray?.uuid === spray.uuid && (
                                        <div className="absolute inset-0 border-2 border-teal-400 pointer-events-none"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                {activeTab === 'Flex' && (
                    <div className="grid grid-cols-3 gap-3">
                        {filteredFlex.map((f) => (
                            <div 
                                key={f.uuid}
                                onClick={() => setPreviewSpray(f)}
                                className={`
                                    relative flex items-center justify-center h-24 [@media(max-height:700px)]:h-16 bg-slate-800/40 
                                        border cursor-pointer transition-all duration-200 p-2
                                        ${previewSpray?.uuid === f.uuid ? 'border-teal-400 bg-teal-900/20' : 'border-slate-600/50 hover:border-slate-400'}
                                    `}
                                >
                                    <img 
                                        src={f.displayIcon} 
                                        alt={f.displayName} 
                                        className="max-w-full max-h-full object-contain filter drop-shadow-md" 
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Center Content */}
            <div className="w-full lg:w-[calc(100%-400px)] ml-auto h-full flex flex-col items-center pt-[120px] relative z-10">
                <h2 className="text-xl text-teal-400 font-Oswald tracking-widest mb-2 uppercase font-bold text-center">
                    EQUIPPING TO: {quadrant.toUpperCase()}
                </h2>
                
                <h1 className="text-3xl text-white font-Oswald tracking-widest mb-16 uppercase font-bold text-center px-4 max-w-[800px]">
                    {previewSpray ? previewSpray.displayName : `SELECT A ${activeTab.toUpperCase()}`}
                </h1>

                {/* Preview Area */}
                <div className="flex flex-col items-center justify-center m-0 p-0 relative w-full max-w-[500px] h-[350px] px-8 bg-slate-800/20 rounded-xl border border-slate-700/50 shadow-2xl backdrop-blur-sm">
                    {previewSpray && (
                        <img
                            src={getPreviewUrl(previewSpray)}
                            alt="Preview"
                            className="w-full h-full object-contain filter drop-shadow-2xl"
                        />
                    )}
                </div>

                <div className="mt-16 flex gap-4">
                    <button 
                        onClick={handleEquipSpray}
                        disabled={!previewSpray || equippedSprays[quadrant]?.uuid === previewSpray?.uuid}
                        className={`
                            font-Oswald px-12 py-3 text-xl tracking-widest border border-slate-500
                            transition-all duration-300
                            ${!previewSpray || equippedSprays[quadrant]?.uuid === previewSpray?.uuid
                                ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' 
                                : 'bg-[#1a212d] text-white hover:bg-slate-700 hover:border-teal-400'
                            }
                        `}
                    >
                        EQUIP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpraySelection;
