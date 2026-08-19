import React, { createContext, useState, useEffect } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    // Load initial state from localStorage if available
    const [equippedCard, setEquippedCard] = useState(() => {
        const saved = localStorage.getItem('equippedCard');
        return saved ? JSON.parse(saved) : null;
    });

    const [equippedTitle, setEquippedTitle] = useState(() => {
        const saved = localStorage.getItem('equippedTitle');
        return saved ? JSON.parse(saved) : null;
    });

    const [equippedBorder, setEquippedBorder] = useState(() => {
        const saved = localStorage.getItem('equippedBorder');
        return saved ? JSON.parse(saved) : null;
    });

    const [showLevel, setShowLevel] = useState(() => {
        const saved = localStorage.getItem('showLevel');
        return saved ? JSON.parse(saved) : true;
    });

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('equippedCard', JSON.stringify(equippedCard));
    }, [equippedCard]);

    useEffect(() => {
        localStorage.setItem('equippedTitle', JSON.stringify(equippedTitle));
    }, [equippedTitle]);

    useEffect(() => {
        localStorage.setItem('equippedBorder', JSON.stringify(equippedBorder));
    }, [equippedBorder]);

    useEffect(() => {
        localStorage.setItem('showLevel', JSON.stringify(showLevel));
    }, [showLevel]);

    return (
        <PlayerContext.Provider value={{
            equippedCard, setEquippedCard,
            equippedTitle, setEquippedTitle,
            equippedBorder, setEquippedBorder,
            showLevel, setShowLevel
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
