import React, { useRef } from "react";
import { useMapScene } from "./hooks/useMapScene";
import MapViewer_bgc from "../../assets/pages_bgc/Play_bgc.png";

const MapViewerPage = ({ onBack }) => {
  const mountRef = useRef(null);
  
  const { gameState, setGameState, loadingProgress, loadingText, isMobile } = useMapScene(mountRef, onBack);

  const handleStartGame = () => {
    if (gameState !== "CONTROLS") return;
    setGameState("PLAYING");
    if (isMobile) {
      if (mountRef.current) mountRef.current.isMobileLocked = true;
      try {
        document.documentElement.requestFullscreen?.().then(() => {
          window.screen?.orientation?.lock?.("landscape").catch(console.warn);
        }).catch(console.warn);
      } catch (e) { console.warn(e); }
    } else {
      mountRef.current?.querySelector("canvas")?.requestPointerLock();
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black touch-none">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {gameState === "PLAYING" && isMobile && (
        <div 
          id="mobile-ui" 
          className="absolute inset-0 z-10 touch-none pointer-events-auto select-none"
          style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="absolute bottom-12 left-12 z-20 flex flex-col items-center gap-2 pointer-events-auto">
            <div id="btn-w" role="button" className="flex items-center justify-center w-16 h-16 bg-white/20 active:bg-white/50 rounded-md border border-white/50 text-white font-bold text-xl touch-manipulation select-none" style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}>W</div>
            <div className="flex gap-2">
              <div id="btn-a" role="button" className="flex items-center justify-center w-16 h-16 bg-white/20 active:bg-white/50 rounded-md border border-white/50 text-white font-bold text-xl touch-manipulation select-none" style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}>A</div>
              <div id="btn-s" role="button" className="flex items-center justify-center w-16 h-16 bg-white/20 active:bg-white/50 rounded-md border border-white/50 text-white font-bold text-xl touch-manipulation select-none" style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}>S</div>
              <div id="btn-d" role="button" className="flex items-center justify-center w-16 h-16 bg-white/20 active:bg-white/50 rounded-md border border-white/50 text-white font-bold text-xl touch-manipulation select-none" style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}>D</div>
            </div>
          </div>
          <div className="absolute bottom-12 right-12 z-20 flex flex-col gap-4 pointer-events-auto">
            <div id="btn-jump" role="button" className="w-20 h-14 bg-red-500/50 active:bg-red-500 rounded-full border border-red-500 text-white font-bold flex items-center justify-center backdrop-blur-md text-xs touch-manipulation select-none" style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}>JUMP</div>
            <div id="btn-crouch" role="button" className="w-20 h-14 bg-white/20 active:bg-white/50 rounded-full border border-white/50 text-white font-bold flex items-center justify-center backdrop-blur-md text-xs touch-manipulation select-none" style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}>CROUCH</div>
          </div>
          <div
            id="btn-exit"
            role="button"
            className="absolute top-8 right-8 z-20 px-4 py-2 border border-white/20 bg-black/50 text-white text-xs font-bold pointer-events-auto flex items-center justify-center select-none"
            style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
            onClick={(e) => { e.stopPropagation(); onBack?.(); }}
          >
            EXIT
          </div>
        </div>
      )}

      {gameState !== "PLAYING" && (
        <div
          className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-10"
          style={{
            backgroundImage: `url(${MapViewer_bgc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="flex flex-col items-center p-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-sm shadow-2xl">
            <h1 className="text-white text-5xl font-extrabold tracking-widest mb-2 font-[Oswald]">HAVEN</h1>
            <p className="text-red-500 font-bold tracking-widest text-sm mb-12">ATTACKER</p>

            {gameState === "LOADING" && (
              <div className="flex flex-col items-center w-64">
                <div className="text-white/70 mb-3 tracking-widest text-xs uppercase font-bold text-center">
                  {loadingText}
                </div>
                <div className="w-full h-1 bg-white/20 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="text-white/50 mt-2 text-[10px] tracking-wider">{loadingProgress}%</div>
              </div>
            )}

            {gameState === "CONTROLS" && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 text-xs tracking-widest font-bold">
                  <div className="text-right text-white/50">W A S D</div><div className="text-white">MOVE</div>
                  <div className="text-right text-white/50">SPACE</div><div className="text-white">JUMP</div>
                  <div className="text-right text-white/50">CTRL / C</div><div className="text-white">CROUCH</div>
                  <div className="text-right text-white/50">SCROLL</div><div className="text-white">SPEED</div>
                </div>
                <div
                  className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold tracking-widest cursor-pointer transition-colors text-sm mb-4 active:scale-95 shadow-lg"
                  onClick={handleStartGame}
                >
                  CLICK TO ENGAGE
                </div>
                <div
                  className="px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold tracking-widest cursor-pointer transition-all text-xs"
                  onClick={(e) => { e.stopPropagation(); onBack?.(); }}
                >
                  EXIT TO LOBBY
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapViewerPage;
