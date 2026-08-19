import React, { useContext, useState, useEffect } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { useCompetitiveTiers } from '../hooks/useCompetitiveTiers'
import GentleBreeze from "../assets/player_cards/GentleBreeze_Card.png";

const Play_card = ({ activeType }) => {
    const { equippedCard, equippedTitle, showLevel, equippedBorder } = useContext(PlayerContext);
    const [rankIcon, setRankIcon] = useState(null);
    const { data: tiersData } = useCompetitiveTiers();

    useEffect(() => {
        if (tiersData) {
            const latestEpisode = tiersData[tiersData.length - 1];
            if (latestEpisode && latestEpisode.tiers) {
                // Find Radiant tier or fallback to index 24
                const radiantTier = latestEpisode.tiers.find(t => t.tierName === "RADIANT") || latestEpisode.tiers[24];
                if (radiantTier && radiantTier.largeIcon) {
                    setRankIcon(radiantTier.largeIcon);
                }
            }
        }
    }, [tiersData]);

    return (
        <div className='h-[450px] w-full flex justify-center'>
            <div className='flex flex-row justify-center gap-12 items-center h-full w-full'>
                
                <div className='border border-white/20 h-[300px] w-[140px] flex justify-center items-center text-white/50 hover:bg-white/5 cursor-pointer'>
                    <span className="text-2xl font-light">+</span>
                </div>
                <div className='border border-white/20 h-[300px] w-[140px] flex justify-center items-center text-white/50 hover:bg-white/5 cursor-pointer'>
                    <span className="text-2xl font-light">+</span>
                </div>
                
                {/* Player's Card (Center) */}
                <div className="w-[268px] h-[640px] relative scale-[0.65] origin-center flex-shrink-0" id="card-preview">
                    
                    {/* Level */}
                    {showLevel && equippedBorder && (
                        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
                            <img src={equippedBorder.levelNumberAppearance} alt="Level Border" className="w-[80px] h-[80px] object-contain drop-shadow-xl" />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[14px] font-bold mt-[2px]">
                                999
                            </span>
                        </div>
                    )}

                    <h2 className="absolute bottom-[214px] left-1/2 -translate-x-1/2 z-20 font-medium text-[16px] text-black">
                        PLAYER_NAME
                    </h2>

                    <h3 className="absolute bottom-[193px] w-full left-1/2 -translate-x-1/2 z-20 font-normal text-center text-[11px] text-gray-100">
                        {equippedTitle ? (equippedTitle.titleText || equippedTitle.displayName) : "Hard Carry"}
                    </h3>

                    {/* Only show rank icon if activeType is COMPETITIVE and rankIcon is fetched */}
                    {activeType === "COMPETITIVE" && rankIcon && (
                        <img
                            src={rankIcon}
                            width={60}
                            height={60}
                            alt="tier icon"
                            className="object-contain absolute bottom-[44px] left-1/2 -translate-x-1/2 z-40"
                        />
                    )}

                    <img
                        src="/card_border.png"
                        width={268}
                        height={640}
                        alt="card border"
                        className="absolute top-0 left-[1px] w-full h-full object-contain z-10 pointer-events-none"
                    />

                    <div className="relative h-full w-full">
                        <img
                            src={equippedCard ? equippedCard.largeArt : GentleBreeze}
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

                <div className='border border-white/20 h-[300px] w-[140px] flex justify-center items-center text-white/50 hover:bg-white/5 cursor-pointer'>
                    <span className="text-2xl font-light">+</span>
                </div>
                <div className='border border-white/20 h-[300px] w-[140px] flex justify-center items-center text-white/50 hover:bg-white/5 cursor-pointer'>
                    <span className="text-2xl font-light">+</span>
                </div>

            </div>
        </div>
    )
}

export default Play_card