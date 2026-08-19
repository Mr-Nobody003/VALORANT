import React, { useState, useEffect } from 'react';

const ScaleWrapper = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1440, height: 810 });

  // 1440x810 is the perfect baseline. 
  // It minimizes shrinkage on 1366x768 laptops (only 5% shrink, barely noticeable)
  // while scaling up beautifully on 1080p and 4K displays.
  const DESIGN_WIDTH = 1440;
  const DESIGN_HEIGHT = 810;

  useEffect(() => {
    const handleResize = () => {
      const isPort = window.innerWidth < window.innerHeight;
      setIsPortrait(isPort);

      const availableWidth = isPort ? window.innerHeight : window.innerWidth;
      const availableHeight = isPort ? window.innerWidth : window.innerHeight;

      // Calculate the scale needed to fit the container
      const scaleX = availableWidth / DESIGN_WIDTH;
      const scaleY = availableHeight / DESIGN_HEIGHT;
      const newScale = Math.min(scaleX, scaleY);
      
      setScale(newScale);

      // Expand the canvas dimensions to fill the screen (eliminates black bars)
      setDimensions({
        width: availableWidth / newScale,
        height: availableHeight / newScale,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <div 
        className="shrink-0"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `scale(${scale}) ${isPortrait ? 'rotate(-90deg)' : ''}`,
          transformOrigin: 'center center',
          position: 'relative'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaleWrapper;
