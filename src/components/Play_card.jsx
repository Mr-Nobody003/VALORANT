import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Play_card = () => {
    const { equippedCard, equippedTitle, showLevel, equippedBorder } = useContext(PlayerContext);

    return (
        <div className='h-[450px] '>
            <div className='flex flex-row justify-evenly items-baseline pt-4'>
                <div className='backdrop-blur-md backdrop-brightness-150 h-[300px] w-[120px] pt-4'>

                </div >
                <div className='backdrop-blur-md backdrop-brightness-150 h-[300px] w-[120px] pt-4'>

                </div>
                {/* Player's Card (Center) */}
                <div className='backdrop-blur-md backdrop-brightness-150 h-[300px] w-[120px] relative flex flex-col items-center border border-slate-500/50 hover:border-teal-400'>
                    {equippedCard ? (
                        <img src={equippedCard.largeArt} className="absolute top-0 left-0 w-full h-full object-cover -z-10" />
                    ) : null}
                    
                    {/* Border & Level */}
                    {showLevel && equippedBorder && (
                        <div className="absolute -top-[10px] left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
                            <img src={equippedBorder.levelNumberAppearance} alt="Level Border" className="w-[50px] h-[50px] object-contain drop-shadow-lg" />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[7px] font-bold mt-[1px]">
                                235
                            </span>
                        </div>
                    )}

                    {/* Name & Title */}
                    <div className="absolute bottom-16 w-[110px] bg-yellow-100 flex justify-center py-[2px] text-black font-semibold text-[10px] shadow-xl">
                        PLAYER_NAME
                    </div>
                    <div className="absolute bottom-11 w-[110px] bg-black/60 text-white flex justify-center py-[2px] text-[8px]">
                        {equippedTitle ? (equippedTitle.titleText || equippedTitle.displayName) : "Super Shy"}
                    </div>
                </div>
                <div className='backdrop-blur-md backdrop-brightness-150 h-[300px] w-[120px] pt-4'>

                </div>
                <div className='backdrop-blur-md backdrop-brightness-150 h-[300px] w-[120px] pt-4'>

                </div>
            </div>
        </div>
    )
}

export default Play_card