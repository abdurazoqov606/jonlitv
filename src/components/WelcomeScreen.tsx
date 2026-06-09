import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { audio } from "./AudioEngine";
import { Tv, Waves } from "lucide-react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);

  // Auto loading sequence that perfectly matches a 3-second automated transition
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2700; // 2.7s for progress, 300ms cushion to make exactly 3 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculated = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(calculated);

      if (calculated >= 100) {
        clearInterval(interval);
        // Play pristine drop sound automatically upon loading completion
        audio.playDropChime();
        
        // Complete overall 3.0s transition
        setTimeout(() => {
          onEnter();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onEnter]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070e] text-white overflow-hidden font-sans select-none">
      
      {/* Background soft pastel ambient glow nodes */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Interactive concentric water rings in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="absolute border border-purple-500/10 rounded-full w-[200px] h-[200px] animate-pulse" />
        <div className="absolute border border-cyan-500/5 rounded-full w-[400px] h-[400px] animate-ping [animation-duration:4s]" />
        <div className="absolute border border-purple-500/5 rounded-full w-[600px] h-[600px] animate-pulse [animation-duration:6s]" />
      </div>

      <div className="relative z-25 flex flex-col items-center max-w-lg w-full px-6 text-center">
        
        {/* Floating TV logo badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative mb-5"
        >
          {/* Main Morphing Water Droplet Icon Container */}
          <div className="relative w-36 h-36 bg-gradient-to-tr from-purple-600/40 via-cyan-500/30 to-violet-700/40 liquid-blob flex items-center justify-center box-glow-purple border border-white/10 backdrop-blur-md shadow-2xl">
            {/* Pulsing inner rings inside droplet */}
            <div className="absolute inset-2 bg-gradient-to-bl from-white/10 to-indigo-900/40 rounded-full animate-pulse flex items-center justify-center">
              <Tv className="w-14 h-14 text-purple-100 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
            </div>
            
            {/* Small decorative falling micro water droplets */}
            <span className="absolute -top-1 left-12 w-2 h-4 bg-cyan-400 rounded-full opacity-60 animate-bounce" />
            <span className="absolute right-4 bottom-5 w-3 h-3 bg-purple-300 rounded-full opacity-70 animate-ping" />
          </div>
        </motion.div>

        {/* Brand Name with sleek gold-tinged neon shine */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-200 via-cyan-100 to-indigo-100 bg-clip-text text-transparent">
            JONLI TV
          </h1>
          <p className="text-xs font-semibold tracking-widest text-cyan-400/80 uppercase mt-2">
            PREMIUM MEDIA PORTAL
          </p>
        </motion.div>

        {/* Interactive progress bar */}
        <div className="w-full mt-10 min-h-[90px] flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 1 }}
            className="w-full max-w-[280px]"
          >
            {/* Custom glowing progress bar */}
            <div className="h-[6px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Loader status percentage status */}
            <div className="flex justify-between items-center mt-3 text-xs font-mono text-zinc-400 tracking-wider">
              <span className="flex items-center gap-1">
                <Waves className="w-3 h-3 animate-spin text-purple-400" />
                Yuklanmoqda...
              </span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>
          </motion.div>
        </div>

        {/* Small Elegant Founder Card Badge at the bottom of loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 flex items-center gap-2 border border-white/5 bg-white/2 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest text-zinc-300"
        >
          <span>LOYIHA ASOSCHISI:</span>
          <span className="font-extrabold text-purple-300">ABDURAZAKOV</span>
        </motion.div>
      </div>

      {/* Decorative vertical lines representing clean fluid fall */}
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800/20 to-transparent" />
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800/20 to-transparent" />
    </div>
  );
}
