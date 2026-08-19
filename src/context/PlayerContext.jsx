import React, { createContext, useState, useEffect } from 'react';
import defaultLoadout from '../defaultLoadout.json';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    // Helper to safely parse fallback values from our defaultLoadout
    const parseFallback = (key, fallback) => {
        try {
            if (defaultLoadout[key]) {
                return JSON.parse(defaultLoadout[key]);
            }
        } catch(e) {}
        return fallback;
    };
    // Load initial state from localStorage if available
    const [equippedCard, setEquippedCard] = useState(() => {
        const saved = localStorage.getItem('equippedCard');
        return saved ? JSON.parse(saved) : parseFallback('equippedCard', null);
    });

    const [equippedTitle, setEquippedTitle] = useState(() => {
        const saved = localStorage.getItem('equippedTitle');
        return saved ? JSON.parse(saved) : parseFallback('equippedTitle', null);
    });

    const [equippedBorder, setEquippedBorder] = useState(() => {
        const saved = localStorage.getItem('equippedBorder');
        return saved ? JSON.parse(saved) : parseFallback('equippedBorder', null);
    });

    const [showLevel, setShowLevel] = useState(() => {
        const saved = localStorage.getItem('showLevel');
        return saved ? JSON.parse(saved) : parseFallback('showLevel', true);
    });

    const [equippedWeapons, setEquippedWeapons] = useState(() => {
        const saved = localStorage.getItem('equippedWeapons');
        return saved ? JSON.parse(saved) : parseFallback('equippedWeapons', {});
    });

    const [equippedSprays, setEquippedSprays] = useState(() => {
        const saved = localStorage.getItem('equippedSprays');
        return saved ? JSON.parse(saved) : parseFallback('equippedSprays', { Top: null, Right: null, Bottom: null, Left: null });
    });

    const [equippedBuddies, setEquippedBuddies] = useState(() => {
        const saved = localStorage.getItem('equippedBuddies');
        return saved ? JSON.parse(saved) : parseFallback('equippedBuddies', {});
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
