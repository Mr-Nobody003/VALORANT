import React from 'react';

const Play_type = ({ activeType, setActiveType }) => {
    const playTypes = [
        'UNRATED', 'COMPETITIVE', 'SWIFTPLAY', 'SPIKE RUSH',
        'DEATHMATCH', 'ESCALATION', 'TEAM DEATHMATCH', 'PREMIER', 'CUSTOM GAME'
    ];

    const handleTypeClick = (type) => {
        setActiveType(type);  // Update the active type
    };

    return (
        <>
            <div className="flex flex-row text-white text-[14px] pl-14 pr-14 justify-center items-center">
                {playTypes.map((type, index) => (
                    <div
                        key={index}
                        onClick={() => handleTypeClick(type)}
                        className={`border-b-2 -mb-[2px] items-center justify-center pl-5 pr-5 cursor-pointer
                        ${activeType === type ? 'border-teal-300 border-b-4 text-teal-300' : 'text-white'}`}
                    >
                        <div>{type}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Play_type;
