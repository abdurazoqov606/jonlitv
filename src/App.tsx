import { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import DropletCanvas from "./components/DropletCanvas";
import { audio } from "./components/AudioEngine";
import { Tv, Shield, Flame } from "lucide-react";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    "https://raw.githubusercontent.com/abdurazoqov606/Asoschi-rasmi/main/IMG_20260516_212343_323.webp"
  );

  // Auto fallback for the Github profile image in case of branch discrepancies
  const handleImageError = () => {
    if (imageSrc.includes("/main/")) {
      setImageSrc(
        "https://raw.githubusercontent.com/abdurazoqov606/Asoschi-rasmi/master/IMG_20260516_212343_323.webp"
      );
    } else {
      setImageSrc("");
    }
  };

  const handleEnterApp = () => {
    setHasEntered(true);
    // Silent trigger to authenticate synthesized audio channel
    audio.playNotificationChime();
  };

  if (!hasEntered) {
    return <WelcomeScreen onEnter={handleEnterApp} />;
  }

  return (
    <div className="relative min-h-screen bg-[#07070f] text-white flex flex-col font-sans overflow-hidden">
      
      {/* 1. Top Header: Jonli TV and Founder info block ("dumaloq toʻgʻri joylashtirilgan rasm") */}
      <header className="relative z-40 bg-[#080811] border-b border-white/5 shadow-xl h-[64px] flex items-center">
        <div className="w-full mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Tv className="w-5 h-5 text-white animate-pulse" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-purple-100 via-white to-zinc-300 bg-clip-text text-transparent">
                  JONLI TV
                </span>
                
                {/* Live breath bulb */}
                <span className="flex items-center gap-1 text-[9px] font-mono bg-red-950/40 text-red-400 border border-red-900/20 px-2 py-0.5 rounded-full select-none font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  JONLI
                </span>
              </div>
              <p className="text-[9px] font-mono text-cyan-400/80 tracking-widest uppercase">
                PREMIUM PORTAL
              </p>
            </div>
          </div>

          {/* Founder Profile Section - Circular, correctly aligned, glowing ("dumaloq to'g'ri joylashtirib") */}
          <div className="flex items-center gap-2.5 bg-zinc-900/50 border border-white/5 py-1 px-3.5 rounded-full shadow-inner">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-zinc-100 tracking-tight">Abdurazakov</span>
                <Shield className="w-3.5 h-3.5 text-purple-400 fill-current" />
              </div>
              <span className="text-[9px] font-mono text-purple-300 tracking-wider uppercase">Asoschi</span>
            </div>

            {/* Perfect circular profile picture with spin indicator */}
            <div className="relative flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 animate-spin [animation-duration:15s] opacity-70" style={{ margin: "-2px" }} />
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-900 bg-zinc-950 flex items-center justify-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Abdurazakov"
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                ) : (
                  <span className="text-xs font-bold text-purple-300 font-display">AR</span>
                )}
              </div>
              {/* Online indicator dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-zinc-900 rounded-full animate-pulse" />
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Body: Seamless high-fidelity Famelack Uzbek TV iframe with trimmed top menu header */}
      <main className="flex-1 w-full bg-black relative z-30 overflow-hidden h-[calc(100vh-64px)]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://famelack.com/tv/uz/"
            title="Famelack Live TV Uzbek Stream Portal"
            className="absolute top-[-56px] left-0 w-full h-[calc(100vh-64px+56px)] border-none select-none"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </div>
      </main>

    </div>
  );
}
