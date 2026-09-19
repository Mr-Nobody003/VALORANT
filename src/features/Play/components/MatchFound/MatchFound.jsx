import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import './MatchFound.css';

const MatchFound = ({ onAnimationComplete }) => {
    const [phase, setPhase] = useState('countdown');
    const [count, setCount] = useState(5);
    const videoRef = useRef(null);

    const clockAudioRef = useRef(null);

    useEffect(() => {
        // Stop background music
        const bgAudio = document.getElementById('myAudio');
        if (bgAudio) {
            bgAudio.pause();
        }

        // Play Match Found Announcer Voice (or futuristic chime)
        const matchFoundAudio = new Audio('/announcer_voice/MATCH_FOUND.mp3');
        matchFoundAudio.volume = 0.8;
        
        clockAudioRef.current = new Audio('/clock sound.mp3');
        clockAudioRef.current.volume = 0.6;
        clockAudioRef.current.loop = true;
        
        matchFoundAudio.addEventListener('ended', () => {
             if (clockAudioRef.current) {
                 clockAudioRef.current.play().catch(e => console.log("Clock audio play failed:", e));
             }
        });

        matchFoundAudio.play().catch(e => console.log("Match found audio play failed:", e));
        
        return () => {
             if (clockAudioRef.current) {
                 clockAudioRef.current.pause();
                 clockAudioRef.current = null;
             }
        }
    }, []);

    useEffect(() => {
        if (phase === 'countdown') {
            const interval = setInterval(() => {
                setCount(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setPhase('video');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000); // 1 second intervals for 5.. 4.. 3..
            return () => {
                clearInterval(interval);
            };
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 'video' && videoRef.current) {
            if (clockAudioRef.current) {
                clockAudioRef.current.pause();
            }
            videoRef.current.play().catch(e => console.log("Video autoplay failed:", e));
        }
    }, [phase]);

    const handleVideoEnd = () => {
        if (onAnimationComplete) {
            onAnimationComplete();
        }
    };

    return createPortal(
        <div className="match-found-overlay">
            {/* Dark vignette background */}
            <div className={`match-found-bg ${phase}`}></div>

            {/* Countdown Phase */}
            {phase === 'countdown' && (
                <div className="new-match-found-container">
                    
                    {/* The Match Found Text and Glitch Blocks */}
                    <div className="match-reveal-container">
                        <div className="glitch-block left-block"></div>
                        <h1 className="match-title-text">MATCH FOUND</h1>
                        <div className="glitch-block right-block"></div>
                    </div>
                    
                    <div className="timer-section">
                        {/* Number */}
                        <div className="timer-number" key={count}>
                            {count}
                        </div>
                        
                        {/* Decorative Diamond & Chevrons */}
                        <div className="diamond-decorator">
                            <span className="chevron up">▲</span>
                            <span className="diamond">◇</span>
                            <span className="chevron down">▼</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Logo Animation Video Phase */}
            <video 
                ref={videoRef}
                className={`logo-animation-video ${phase === 'video' ? 'visible' : ''}`}
                src="/logo animation.mp4" 
                muted 
                playsInline
                onEnded={handleVideoEnd}
            />
        </div>,
        document.body
    );
};

export default MatchFound;
