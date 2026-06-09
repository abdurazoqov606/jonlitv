import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { audio } from "./AudioEngine";
import { Shield, Sparkles, Send, Award, Heart, Radio, Flame, ExternalLink } from "lucide-react";

export default function FounderCard() {
  const [imageSrc, setImageSrc] = useState(
    "https://raw.githubusercontent.com/abdurazoqov606/Asoschi-rasmi/main/IMG_20260516_212343_323.webp"
  );
  const [isHovered, setIsHovered] = useState(false);
  const [likesCount, setLikesCount] = useState(1348);
  const [hasLiked, setHasLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback chain in case main branch differs or github connection fails
  const handleImageError = () => {
    if (imageSrc.includes("/main/")) {
      setImageSrc(
        "https://raw.githubusercontent.com/abdurazoqov606/Asoschi-rasmi/master/IMG_20260516_212343_323.webp"
      );
    } else {
      // Fallback elegant styled placeholder
      setImageSrc("");
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
      // Play wet sound on like
      audio.playDropChime();
    } else {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
      audio.playBubblePop();
    }
  };

  return (
    <>
      <div 
        className="relative bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:border-purple-500/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating live Founder Badge */}
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Flame className="w-2.5 h-2.5 animate-pulse text-amber-300 fill-amber-300" />
          Loyihadosh & Tashabbuskor
        </div>

        <div className="flex items-center gap-4 mt-1">
          {/* Avatar Area - Perfectly circular, centered ("dumaloq to'g'ri joylashtirib") */}
          <div className="relative flex-shrink-0">
            {/* Spinning background neon ring glow */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 animate-spin [animation-duration:12s] opacity-80 blur-[2px]" style={{ margin: "-2px" }} />
            
            {/* Inner frame */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-900 bg-zinc-950 flex items-center justify-center">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Founder Abdurazakov"
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-110"
                />
              ) : (
                /* Fallback Letter Avatar if network is complete offline */
                <span className="text-xl font-bold bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-transparent font-display">
                  AR
                </span>
              )}
            </div>

            {/* Glowing online micro indicator */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-zinc-900 rounded-full ring-2 ring-green-400/20 animate-pulse" />
          </div>

          {/* Title and stats layout */}
          <div className="flex-grow">
            <div className="flex items-center gap-1">
              <h3 className="font-display font-medium text-base text-zinc-100 tracking-tight leading-tight hover:text-purple-400 transition-colors">
                Abdurazakov
              </h3>
              <Shield className="w-4 h-4 text-purple-400 fill-current" />
            </div>
            
            <p className="text-xs font-mono text-purple-300 mt-0.5 tracking-wider uppercase">
              Asoschi & Ishlab Chiquvchi
            </p>

            <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> Online TV Center
              </span>
            </div>
          </div>
        </div>

        {/* Short motivational text about his portal vision */}
        <p className="text-xs text-zinc-400 leading-relaxed mt-4 bg-zinc-950/40 p-3 rounded-lg border border-white/5">
          "Biz milliy va xalqaro Jonli TV translyatsiyalarini barcha foydalanuvchilarimizga eng oliy sifatda bepul va shinam taqdim etishni maqsad qildik."
        </p>

        {/* Interactive Stats Panel with hearts and links */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
              hasLiked
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "bg-white/3 hover:bg-white/8 text-zinc-300 border border-transparent"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hasLiked ? "text-pink-500 fill-pink-500" : "text-zinc-400"}`} />
            {likesCount}
          </button>

          <button
            onClick={() => {
              audio.playDropChime();
              setIsModalOpen(true);
            }}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border border-purple-500/10 hover:border-purple-500/30 text-purple-200 shadow-md flex items-center gap-1 transition-all duration-200"
          >
            <Sparkles className="w-3 h-3 text-purple-400 animate-bounce" />
            Batafsil maʻlumot
          </button>
        </div>
      </div>

      {/* Modal Dialog revealing deeper founder stats + milestones */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#05050b]/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#141420] to-[#0d0d14] border border-white/10 rounded-2xl p-6 shadow-2xl z-55 text-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display font-bold text-lg text-white">Loyihadosh Portfeli</h4>
                  <p className="text-xs font-mono text-purple-400">Abdurazakov & Premium Jonli TV</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              </div>

              {/* Large Centered Circular Image block */}
              <div className="flex flex-col items-center mt-6">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-cyan-400 to-indigo-500 blur-[4px]" style={{ margin: "-2px" }} />
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-900 bg-zinc-950">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt="Founder photo reference"
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 font-display text-4xl text-purple-200">
                        AR
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-purple-600 text-[10px] uppercase font-mono px-2 py-0.5 rounded-md border border-white/10 font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    FOUNDER
                  </div>
                </div>

                <h5 className="font-display font-bold text-xl text-white mt-4">Abdurazakov</h5>
                <p className="text-xs font-mono text-zinc-400">Web Architect & Platform Engineer</p>
              </div>

              {/* Milestones / Details list */}
              <div className="mt-6 space-y-3 bg-white/2 border border-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Loyiha Nomi:</span>
                  <span className="font-semibold text-purple-300 tracking-wider">Jonli TV Premium</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Litsenziya:</span>
                  <span className="font-semibold text-emerald-400 font-mono text-[10px]">VERIFIED SECURE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Loyihalashtirilgan yil:</span>
                  <span className="font-semibold text-zinc-200 font-mono">2026</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Kanal oqimlari ulanishi:</span>
                  <span className="font-semibold text-cyan-400 font-mono">Famelack API Enabled</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://github.com/abdurazoqov606"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => audio.playBubblePop()}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-medium border border-white/5 hover:border-white/10 flex items-center justify-center gap-2 transition-colors"
                >
                  GitHub Sahifasi
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    audio.playDropChime();
                    setLikesCount((prev) => prev + 5);
                    setIsModalOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  +5 Omad tilash
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
