import React, { useState, useEffect, useContext } from 'react';
import { useMaps } from '../hooks/useMaps';
import { PlayerContext } from '../context/PlayerContext';

const Play_custom = () => {
    const { equippedCard, equippedTitle, showLevel, equippedBorder } = useContext(PlayerContext);
    const { data: maps = [] } = useMaps();
    const [selectedMap, setSelectedMap] = useState(null);
    
    // New states
    const [currentTeam, setCurrentTeam] = useState('DEFENDERS');
    const [isMapDropdownOpen, setIsMapDropdownOpen] = useState(false);
    const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);
    
    const servers = ['Mumbai', 'Manali', 'Singapore', 'Sydney', 'Tokyo'];
    const [selectedServer, setSelectedServer] = useState(servers[0]);

    useEffect(() => {
        if (maps.length > 0 && !selectedMap) {
            const defaultMap = maps.find(m => m.displayName === 'Haven') || maps[0];
            setSelectedMap(defaultMap);
        }
    }, [maps, selectedMap]);

    const PlayerSlot = () => (
        <div className="h-12 bg-black/60 flex items-center px-2 gap-3 border-l-2 border-white mb-2">
            {equippedCard && (
                <img src={equippedCard.smallArt} alt="player card" className="h-10 w-10 object-cover" />
            )}
            <div className="flex flex-col flex-1">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                    PLAYER_NAME
                    {showLevel && equippedBorder && (
                        <div className="relative w-4 h-4 flex items-center justify-center ml-1">
                            <img src={equippedBorder.levelNumberAppearance} alt="Level" className="absolute w-5 h-5 object-contain" />
                            <span className="text-[6px] font-bold z-10 text-white mt-[1px]">{999}</span>
                        </div>
                    )}
                </span>
                <span className="text-[10px] text-white/70">{equippedTitle ? (equippedTitle.titleText || equippedTitle.displayName) : "Ready"}</span>
            </div>
            <div className="flex flex-col items-end justify-center">
                <span className="text-[14px] text-white/50">🔊</span>
                <span className="text-[9px] text-white/50 font-bold">13ms</span>
            </div>
        </div>
    );

    const EmptySlot = ({ onClick }) => (
        <div onClick={onClick} className="h-10 mb-2 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white transition-colors cursor-pointer border-b border-white/10 group">
            <span className="text-xl font-light group-hover:hidden">⌄</span>
            <span className="text-xs font-bold tracking-wider hidden group-hover:block">JOIN</span>
        </div>
    );

    const renderSlots = (teamName, maxSlots) => {
        const isCurrentTeam = currentTeam === teamName;
        const slots = [];
        
        for (let i = 0; i < maxSlots; i++) {
            if (isCurrentTeam && i === 0) {
                slots.push(<PlayerSlot key="player" />);
            } else {
                slots.push(<EmptySlot key={`empty-${i}`} onClick={() => setCurrentTeam(teamName)} />);
            }
        }
        return slots;
    };

    const getTeamBorder = (teamName) => {
        if (currentTeam === teamName) {
            if (teamName === 'ATTACKERS') return 'border-[#ff4655]/50';
            if (teamName === 'DEFENDERS') return 'border-[#46e6d8]/50';
            if (teamName === 'OBSERVERS') return 'border-white/50';
        }
        return 'border-white/10';
    }

    return (
        <div className="h-[450px] w-full mt-3 flex flex-col gap-4 text-white">
            {/* Top section: Map Banner & Settings */}
            <div className="flex gap-4 h-[100px]">
                {/* Map Banner */}
                <div className="flex-1 bg-black/40 border border-white/20 relative overflow-hidden">
                    {selectedMap && (
                        <img 
                            src={selectedMap.listViewIcon || selectedMap.splash} 
                            alt={selectedMap.displayName} 
                            className="w-full h-full object-cover opacity-80"
                        />
                    )}
                </div>

                {/* Settings dropdowns */}
                <div className="flex-[2] flex gap-4">
                    <div className="flex-1 flex flex-col gap-2 justify-center">
                        {/* Map Dropdown */}
                        <div className="relative" onMouseLeave={() => setIsMapDropdownOpen(false)}>
                            <div 
                                onClick={() => setIsMapDropdownOpen(!isMapDropdownOpen)}
                                className="bg-white/5 border border-white/20 h-10 flex items-center justify-between px-4 text-sm hover:bg-white/10 cursor-pointer transition-colors"
                            >
                                <span>MAP: {selectedMap?.displayName || "Loading..."}</span>
                                <span className="text-xs">▼</span>
                            </div>
                            {isMapDropdownOpen && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-[#1a2128] border border-white/20 z-50 max-h-48 overflow-y-auto shadow-lg custom-scrollbar">
                                    {maps.map(m => (
                                        <div 
                                            key={m.uuid} 
                                            onClick={() => {
                                                setSelectedMap(m);
                                                setIsMapDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm"
                                        >
                                            {m.displayName}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Server Dropdown */}
                        <div className="relative" onMouseLeave={() => setIsServerDropdownOpen(false)}>
                            <div 
                                onClick={() => setIsServerDropdownOpen(!isServerDropdownOpen)}
                                className="bg-white/5 border border-white/20 h-10 flex items-center justify-between px-4 text-sm hover:bg-white/10 cursor-pointer transition-colors"
                            >
                                <span>SERVER: {selectedServer}</span>
                                <span className="text-xs">▼</span>
                            </div>
                            {isServerDropdownOpen && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-[#1a2128] border border-white/20 z-50 shadow-lg">
                                    {servers.map(s => (
                                        <div 
                                            key={s} 
                                            onClick={() => {
                                                setSelectedServer(s);
                                                setIsServerDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm"
                                        >
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-2 justify-center">
                        <div className="bg-white/5 border border-white/20 h-10 flex items-center justify-between px-4 text-sm hover:bg-white/10 cursor-pointer transition-colors">
                            <span>MODE: Standard</span>
                            <span className="text-xs">▼</span>
                        </div>
                        <div className="bg-white/5 border border-white/20 h-10 flex items-center justify-center px-4 text-sm hover:bg-white/10 cursor-pointer transition-colors">
                            <span>OPTIONS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section: Teams */}
            <div className="flex-1 flex gap-2">
                {/* Attackers */}
                <div className={`flex-1 bg-[#ff4655]/20 border ${getTeamBorder('ATTACKERS')} flex flex-col transition-colors`}>
                    <div className="bg-[#ff4655] text-white text-center py-2 text-sm font-semibold tracking-widest mb-2">
                        ATTACKERS
                    </div>
                    <div className="flex-1 flex flex-col px-2 overflow-y-auto">
                        {renderSlots('ATTACKERS', 5)}
                    </div>
                </div>

                {/* Defenders */}
                <div className={`flex-1 bg-[#46e6d8]/20 border ${getTeamBorder('DEFENDERS')} flex flex-col transition-colors`}>
                    <div className="bg-[#46e6d8] text-[#0f1923] text-center py-2 text-sm font-semibold tracking-widest mb-2">
                        DEFENDERS
                    </div>
                    <div className="flex-1 flex flex-col px-2 overflow-y-auto">
                        {renderSlots('DEFENDERS', 5)}
                    </div>
                </div>

                {/* Observers */}
                <div className={`flex-1 bg-white/5 border ${getTeamBorder('OBSERVERS')} flex flex-col transition-colors`}>
                    <div className="bg-white/20 text-white text-center py-2 text-sm font-semibold tracking-widest mb-2">
                        OBSERVERS
                    </div>
                    <div className="flex-1 flex flex-col px-2 overflow-y-auto">
                        {renderSlots('OBSERVERS', 3)}
                    </div>
                </div>
            </div>
            
            {/* Invite and Autobalance buttons */}
            <div className="flex justify-end gap-4 mt-2 h-10 pr-2 pb-2">
                <button className="px-8 bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm">
                    INVITE
                </button>
                <button className="px-8 bg-white/5 text-white/50 font-medium hover:bg-white/10 transition-colors text-sm border border-white/10">
                    AUTOBALANCE
                </button>
            </div>
        </div>
    )
}

export default Play_custom
