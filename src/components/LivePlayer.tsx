import { useState, useEffect } from "react";
import { audio } from "./AudioEngine";
import { Play, Volume2, ShieldCheck, Heart, Sparkles, Award, Radio, Tv, Maximize } from "lucide-react";

interface LivePlayerProps {
  channelUrl: string;
  channelName: string;
}

export default function LivePlayer({ channelUrl, channelName }: LivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewers, setViewers] = useState(1482);
  const [rating, setRating] = useState(4.8);
  const [isWider, setIsWider] = useState(false);
  const [emojis, setEmojis] = useState<{ id: number; char: string; style: any }[]>([]);

  // Simulate viewer counts moving naturally
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers((prev) => {
        const offset = Math.floor(Math.random() * 15) - 7;
        return prev + offset < 100 ? 100 : prev + offset;
      });
    }, 4000);
    return () => clearInterval(viewerInterval);
  }, []);

  const triggerEmote = (emoteChar: string) => {
    // Play splash chime
    audio.playBubblePop();

    // Spawn floating emoji animation
    const id = Date.now() + Math.random();
    const style = {
      left: `${Math.random() * 60 + 20}%`,
      bottom: "20px",
      fontSize: `${Math.random() * 14 + 18}px`,
    };

    setEmojis((prev) => [...prev, { id, char: emoteChar, style }]);

    // Remove emoji after animation expires
    setTimeout(() => {
      setEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 2500);
  };

  const toggleWideMode = () => {
    audio.playBubblePop();
    setIsWider((prev) => !prev);
  };

  return (
    <div className={`relative transition-all duration-500 ease-in-out ${isWider ? "w-full" : "w-full"}`}>
      
      {/* Dynamic LED Backlight Ambient Glow behind the TV */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-cyan-500/20 rounded-3xl blur-2xl opacity-80 pointer-events-none" />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Upper Screen Status Rail */}
        <div className="flex items-center justify-between bg-[#11111a] px-4 py-2.5 border-b border-white/5 text-xs">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="font-display font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-1.5">
              FAOL TELEKANAL:
              <span className="text-cyan-400 font-bold tracking-tight bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/20">
                {channelName}
              </span>
            </span>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-zinc-200 font-bold">{viewers.toLocaleString()}</span> tomoshabin
            </span>
            <span className="text-zinc-700">|</span>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">SIGNAL: STABLE 1080P</span>
          </div>
        </div>

        {/* Outer CRT/Screen Shell (The main streaming player viewport) */}
        <div className="relative aspect-video w-full bg-black select-none overflow-hidden group">
          
          {/* Famelack embedded live portal / player */}
          <iframe
            src={channelUrl}
            title="Premium Live Player Frame"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            className="w-full h-full border-b border-white/5 object-cover"
          />

          {/* Floaters Emojis Overlay */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {emojis.map((emoji) => (
              <span
                key={emoji.id}
                style={emoji.style}
                className="absolute text-violet-300 animate-[floatUp_2s_ease-out_forwards] drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              >
                {emoji.char}
              </span>
            ))}
          </div>

          {/* Quick Floating Sound overlay trigger */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            LIVE MULTI STREAM POWERED
          </div>
        </div>

        {/* Lower chassis / control dashboards */}
        <div className="bg-[#101017] p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5">
          
          {/* Reaction Buttons section */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-display font-medium mr-2 hidden sm:inline">Emojilar:</span>
            <button
              onClick={() => triggerEmote("❤️")}
              className="w-8 h-8 rounded-full bg-white/3 hover:bg-rose-500/20 hover:scale-110 active:scale-95 text-rose-400 flex items-center justify-center transition-all border border-white/5"
            >
              ❤️
            </button>
            <button
              onClick={() => triggerEmote("👏")}
              className="w-8 h-8 rounded-full bg-white/3 hover:bg-amber-500/20 hover:scale-110 active:scale-95 text-amber-400 flex items-center justify-center transition-all border border-white/5"
            >
              👏
            </button>
            <button
              onClick={() => triggerEmote("🔥")}
              className="w-8 h-8 rounded-full bg-white/3 hover:bg-orange-500/20 hover:scale-110 active:scale-95 text-orange-400 flex items-center justify-center transition-all border border-white/5"
            >
              🔥
            </button>
            <button
              onClick={() => triggerEmote("😮")}
              className="w-8 h-8 rounded-full bg-white/3 hover:bg-blue-500/20 hover:scale-110 active:scale-95 text-blue-400 flex items-center justify-center transition-all border border-white/5"
            >
              😮
            </button>
            <button
              onClick={() => triggerEmote("👑")}
              className="w-8 h-8 rounded-full bg-white/3 hover:bg-purple-500/20 hover:scale-110 active:scale-95 text-purple-400 flex items-center justify-center transition-all border border-white/5"
            >
              👑
            </button>
          </div>

          {/* Quick instructions / tips */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-zinc-500">
              Muammo boʻlsa ekranga bosing yoki sahifani yangilang
            </span>
            <button
              onClick={toggleWideMode}
              className="flex items-center gap-1 text-xs border border-white/5 hover:border-purple-500/40 bg-[#161622] hover:bg-purple-950/20 px-3.5 py-1.5 rounded-lg text-zinc-300 hover:text-white transition-colors"
            >
              <Maximize className="w-3.5 h-3.5 text-purple-400" />
              {isWider ? "Normal koʻrinish" : "Teatr rejimi"}
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-20px) scale(1.1);
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-160px) scale(0.8) rotate(${Math.random() * 40 - 20}deg);
            opacity: 0;
          }
        }
      `}} />
    </div>
  );
}
