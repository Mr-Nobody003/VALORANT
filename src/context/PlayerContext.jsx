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

    const [equippedWeapons, setEquippedWeapons] = useState(() => {
        const saved = localStorage.getItem('equippedWeapons');
        return saved ? JSON.parse(saved) : {};
    });

    const [equippedSprays, setEquippedSprays] = useState(() => {
        const saved = localStorage.getItem('equippedSprays');
        return saved ? JSON.parse(saved) : { Top: null, Right: null, Bottom: null, Left: null };
    });

    const [equippedBuddies, setEquippedBuddies] = useState(() => {
        const saved = localStorage.getItem('equippedBuddies');
        return saved ? JSON.parse(saved) : {};
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

    useEffect(() => {
        localStorage.setItem('equippedWeapons', JSON.stringify(equippedWeapons));
    }, [equippedWeapons]);

    useEffect(() => {
        localStorage.setItem('equippedSprays', JSON.stringify(equippedSprays));
    }, [equippedSprays]);

    useEffect(() => {
        localStorage.setItem('equippedBuddies', JSON.stringify(equippedBuddies));
    }, [equippedBuddies]);

    return (
        <PlayerContext.Provider value={{
            equippedCard, setEquippedCard,
            equippedTitle, setEquippedTitle,
            equippedBorder, setEquippedBorder,
            showLevel, setShowLevel,
            equippedWeapons, setEquippedWeapons,
            equippedSprays, setEquippedSprays,
            equippedBuddies, setEquippedBuddies
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
