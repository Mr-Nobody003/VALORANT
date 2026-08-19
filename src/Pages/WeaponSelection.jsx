import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlayerContext } from '../context/PlayerContext';
import { Search } from 'lucide-react';
import Back_button from '../components/Back_button';

const fetchWeapons = async () => {
    const response = await fetch('https://valorant-api.com/v1/weapons');
    if (!response.ok) throw new Error('Failed to fetch weapons');
    return response.json();
};

const fetchThemes = async () => {
    const response = await fetch('https://valorant-api.com/v1/themes');
    if (!response.ok) throw new Error('Failed to fetch themes');
    return response.json();
};

const fetchBuddies = async () => {
    const response = await fetch('https://valorant-api.com/v1/buddies');
    if (!response.ok) throw new Error('Failed to fetch buddies');
    return response.json();
};

const WeaponSelection = ({ weapon, onBack }) => {
    const { equippedWeapons, setEquippedWeapons, equippedBuddies, setEquippedBuddies } = useContext(PlayerContext);
    
    const [activeTab, setActiveTab] = useState('Skins'); // 'Skins' | 'Buddies'
    const [searchQuery, setSearchQuery] = useState('');
    const [previewSkin, setPreviewSkin] = useState(null);
    const [previewBuddy, setPreviewBuddy] = useState(null);

    const { data: weaponsData, isLoading: weaponsLoading, error: weaponsError } = useQuery({
        queryKey: ['weapons'],
        queryFn: fetchWeapons
    });

    const { data: themesData, isLoading: themesLoading } = useQuery({
        queryKey: ['themes'],
        queryFn: fetchThemes
    });

    const { data: buddiesData, isLoading: buddiesLoading } = useQuery({
        queryKey: ['buddies'],
        queryFn: fetchBuddies
    });

    useEffect(() => {
        // Init preview skin
        const equipped = equippedWeapons[weapon.name];
        if (equipped) {
            setPreviewSkin(equipped);
        } else {
            // Default weapon
            setPreviewSkin({
                uuid: 'default',
                displayName: "Standard " + weapon.name,
                displayIcon: weapon.defaultImage,
                isDefault: true
            });
        }
        
        // Init preview buddy
        const buddy = equippedBuddies[weapon.name];
        if (buddy) {
            setPreviewBuddy(buddy);
        } else {
            setPreviewBuddy({
                uuid: 'none',
                displayName: "No Buddy Equipped",
                displayIcon: null, // we can use a transparent/default icon or nothing
                isDefault: true
            });
        }
    }, [weapon.name, equippedWeapons, equippedBuddies, weapon.defaultImage]);

    const handleEquip = () => {
        if (previewSkin) {
            if (previewSkin.isDefault) {
                // Remove from equippedWeapons to revert to default
                setEquippedWeapons(prev => {
                    const next = { ...prev };
                    delete next[weapon.name];
                    return next;
                });
            } else {
                setEquippedWeapons(prev => ({
                    ...prev,
                    [weapon.name]: previewSkin
                }));
            }
            onBack();
        }
    };

    const handleEquipBuddy = () => {
        if (previewBuddy) {
            if (previewBuddy.uuid === 'none') {
                setEquippedBuddies(prev => {
                    const next = { ...prev };
                    delete next[weapon.name];
                    return next;
                });
            } else {
                setEquippedBuddies(prev => ({
                    ...prev,
                    [weapon.name]: previewBuddy
                }));
            }
            onBack();
        }
    };

    if (weaponsLoading || themesLoading || buddiesLoading) {
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 text-teal-400 font-Oswald text-2xl tracking-widest">
                LOADING...
            </div>
        );
    }
    
    if (weaponsError) return <div>Error loading data</div>;

    // Find the specific weapon from API data
    const apiWeapon = weaponsData?.data?.find(w => w.displayName.toUpperCase() === weapon.name.toUpperCase());
    
    // Extract skins
    let skins = [];
    if (apiWeapon && apiWeapon.skins) {
        skins = apiWeapon.skins.filter(skin => skin.displayIcon || skin.chromas?.[0]?.displayIcon); // Filter out skins without icons (e.g. randomizer)
    }

    // Default skin option
    const defaultSkinOption = {
        uuid: 'default',
        displayName: "Standard " + weapon.name,
        displayIcon: weapon.defaultImage,
        isDefault: true
    };

    // Combine default and API skins
    const allSkins = [defaultSkinOption, ...skins];
    const filteredSkins = allSkins.filter(s => s.displayName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Extract buddies
    const allBuddies = [
        {
            uuid: 'none',
            displayName: "No Buddy Equipped",
            displayIcon: null,
            isDefault: true
        },
        ...(buddiesData?.data?.filter(b => !b.isHiddenIfNotOwned && b.displayIcon) || [])
    ];
    const filteredBuddies = allBuddies.filter(b => b.displayName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Find wallpaper for the preview skin or buddy
    let backgroundImageUrl = null;
    if (activeTab === 'Skins' && previewSkin && !previewSkin.isDefault) {
        if (previewSkin.wallpaper) {
            backgroundImageUrl = previewSkin.wallpaper;
        } else if (previewSkin.themeUuid && themesData) {
            const theme = themesData.data.find(t => t.uuid === previewSkin.themeUuid);
            if (theme) {
                backgroundImageUrl = theme.displayIcon || theme.storeFeaturedImage;
            }
        }
    } else if (activeTab === 'Buddies' && previewBuddy && !previewBuddy.isDefault) {
        if (previewBuddy.themeUuid && themesData) {
            const theme = themesData.data.find(t => t.uuid === previewBuddy.themeUuid);
            if (theme) {
                backgroundImageUrl = theme.displayIcon || theme.storeFeaturedImage;
            }
        }
    }

    return (
        <div className="absolute inset-0 w-full h-full flex">
            {/* Dynamic Wallpaper Background */}
            {backgroundImageUrl ? (
                <div className="absolute inset-0 w-full h-full -z-10 bg-[#0f1923]">
                    <img 
                        src={backgroundImageUrl} 
                        alt="Skin Wallpaper" 
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="absolute inset-0 w-full h-full -z-10 bg-[#0f1923]"></div>
            )}

            {/* Left Sidebar */}
            <div className="absolute left-0 top-[70px] w-[350px] lg:w-[400px] h-[calc(100vh-70px)] flex flex-col bg-slate-900/30 border-r border-slate-700/30 px-4 pt-4 z-20 backdrop-blur-sm">
                
                {/* Tabs */}
                <div className="flex border-b border-slate-600/50 mb-6">
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
                <div className="relative mb-6">
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
                <div className="flex-1 overflow-y-auto pb-20 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/70 [&::-webkit-scrollbar-track]:bg-transparent">
                    {activeTab === 'Skins' ? (
                        <div className="grid grid-cols-2 gap-3">
                            {filteredSkins.map((skin) => (
                                <div 
                                    key={skin.uuid}
                                    onClick={() => setPreviewSkin(skin)}
                                    className={`
                                        relative flex items-center justify-center h-24 bg-slate-800/40 
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
                                        relative flex items-center justify-center h-24 bg-slate-800/40 
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

            {/* Center Content */}
            <div className="w-full lg:w-[calc(100%-400px)] ml-auto h-full flex flex-col items-center pt-[120px] relative z-10">
                
                <h1 className="text-3xl text-white font-Oswald tracking-widest mb-16 uppercase font-bold text-center px-4 max-w-[800px]">
                    {activeTab === 'Skins' 
                        ? (previewSkin ? previewSkin.displayName : 'SELECT A SKIN')
                        : (previewBuddy ? previewBuddy.displayName : 'SELECT A BUDDY')
                    }
                </h1>

                {/* Preview Weapon Area */}
                <div className="flex flex-col items-center justify-center m-0 p-0 relative w-full max-w-[1000px] h-[300px] px-8">
                    {/* Weapon Image */}
                    {previewSkin && (
                        <img
                            src={previewSkin.displayIcon || previewSkin.chromas?.[0]?.displayIcon}
                            alt="Weapon Preview"
                            className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500 relative z-10"
                        />
                    )}

                    {/* Buddy Image (floating near the gun) */}
                    {previewBuddy && previewBuddy.displayIcon && (
                        <div className="absolute left-[40%] bottom-0 w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none hover:scale-110 transition-transform duration-300">
                            <img
                                src={previewBuddy.displayIcon}
                                alt="Buddy Preview"
                                className="w-full h-full object-contain filter drop-shadow-xl"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-16 flex gap-4">
                    {activeTab === 'Skins' ? (
                        <button 
                            onClick={handleEquip}
                            disabled={!previewSkin || equippedWeapons[weapon.name]?.uuid === previewSkin?.uuid || (previewSkin.isDefault && !equippedWeapons[weapon.name])}
                            className={`
                                font-Oswald px-12 py-3 text-xl tracking-widest border border-slate-500
                                transition-all duration-300
                                ${(!previewSkin || equippedWeapons[weapon.name]?.uuid === previewSkin?.uuid || (previewSkin.isDefault && !equippedWeapons[weapon.name]))
                                    ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' 
                                    : 'bg-[#1a212d] text-white hover:bg-slate-700 hover:border-teal-400'
                                }
                            `}
                        >
                            EQUIP SKIN
                        </button>
                    ) : (
                        <button 
                            onClick={handleEquipBuddy}
                            disabled={!previewBuddy || equippedBuddies[weapon.name]?.uuid === previewBuddy?.uuid || (previewBuddy.isDefault && !equippedBuddies[weapon.name])}
                            className={`
                                font-Oswald px-12 py-3 text-xl tracking-widest border border-slate-500
                                transition-all duration-300
                                ${(!previewBuddy || equippedBuddies[weapon.name]?.uuid === previewBuddy?.uuid || (previewBuddy.isDefault && !equippedBuddies[weapon.name]))
                                    ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' 
                                    : 'bg-[#1a212d] text-white hover:bg-slate-700 hover:border-teal-400'
                                }
                            `}
                        >
                            EQUIP BUDDY
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeaponSelection;
