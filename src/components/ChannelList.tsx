import React, { useState } from "react";
import { Channel } from "../types";
import { audio } from "./AudioEngine";
import { Heart, Search, Tv, Sparkles, Filter, Users, Radio } from "lucide-react";

interface ChannelListProps {
  onSelectChannel: (channel: Channel) => void;
  activeChannelId: string;
}

export default function ChannelList({ onSelectChannel, activeChannelId }: ChannelListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Full interactive list of Uzbek streams on Famelack
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "milliy_tv",
      name: "Milliy TV",
      category: "national",
      logoLetters: "M",
      logoBg: "from-purple-500 to-indigo-500",
      streamUrl: "https://famelack.com/tv/uz/",
      viewsCount: 2480,
      likesCount: 124,
      nowPlaying: "Milliy Serial: 'Ota Uy'",
      nextProgram: "Musiqiy Tanaffus",
      schedule: [
        { id: "m1", time: "15:00", title: "Milliy Serial: 'Ota Uy'", category: "Kino", duration: 60, isActive: true },
        { id: "m2", time: "16:00", title: "Musiqiy Tanaffus", category: "Musiqa", duration: 30 },
        { id: "m3", time: "16:30", title: "Yoshlar Tok-shousi", category: "Shou", duration: 45 },
        { id: "m4", time: "17:15", title: "Kechki Yangiliklar", category: "Yangiliklar", duration: 30 },
        { id: "m5", time: "17:45", title: "Badiiy Film: 'Qasoskorlar'", category: "Kino", duration: 120 }
      ]
    },
    {
      id: "yoshlar",
      name: "Yoshlar TV",
      category: "national",
      logoLetters: "Y",
      logoBg: "from-blue-500 to-cyan-500",
      streamUrl: "https://famelack.com/tv/uz/",
      viewsCount: 1982,
      likesCount: 98,
      nowPlaying: "Yoshlar Kelajagi - Tok Shou",
      nextProgram: "Multfilm soati",
      schedule: [
        { id: "y1", time: "15:00", title: "Yoshlar Kelajagi", category: "Tok Shou", duration: 60, isActive: true },
        { id: "y2", time: "16:00", title: "Multfilm Soati: 'Alpomish'", category: "Bolalar", duration: 60 },
        { id: "y3", time: "17:00", title: "Dunyo Bo'ylab Sayohat", category: "Hujjatli", duration: 40 },
        { id: "y4", time: "17:40", title: "Tele-Viktorina", category: "Kognitiv", duration: 40 },
        { id: "y5", time: "18:20", title: "Bosh Boshliq Tokou", category: "Shou", duration: 50 }
      ]
    },
    {
      id: "sport_tv",
      name: "Sport TV (Live)",
      category: "sport",
      logoLetters: "S",
      logoBg: "from-emerald-500 to-teal-500",
      streamUrl: "https://famelack.com/tv/uz/",
      viewsCount: 4510,
      likesCount: 346,
      nowPlaying: "Futbol: Chempionlar Ligasi",
      nextProgram: "Sport Sharhi tahlillari",
      schedule: [
        { id: "s1", time: "14:30", title: "Futbol: Chempionlar Ligasi Match Live", category: "Sport", duration: 120, isActive: true },
        { id: "s2", time: "16:30", title: "Sport Sharhi Tahlillari", category: "Tahlil", duration: 30 },
        { id: "s3", time: "17:00", title: "Boks: Chempionat janglari", category: "Sport", duration: 90 },
        { id: "s4", time: "18:30", title: "Kun Ma'lumotlari yangiligi", category: "Yangiliklar", duration: 15 },
        { id: "s5", time: "18:45", title: "Mini-Futbol Kubogi", category: "Sport", duration: 75 }
      ]
    },
    {
      id: "sevimli_tv",
      name: "Sevimli TV",
      category: "movies",
      logoLetters: "S",
      logoBg: "from-pink-500 to-rose-500",
      streamUrl: "https://famelack.com/tv/uz/",
      viewsCount: 3120,
      likesCount: 221,
      nowPlaying: "Turk Seriali: 'Ertugrul'",
      nextProgram: "Hafata qaxramoni shou",
      schedule: [
        { id: "sv1", time: "14:40", title: "Turk Seriali: 'Ertugrul'", category: "Kino", duration: 80, isActive: true },
        { id: "sv2", time: "16:00", title: "Hafata Qaxramoni Shou", category: "Shou", duration: 60 },
        { id: "sv3", time: "17:00", title: "Kulgu Markazi (Konsert)", category: "Kulgili", duration: 90 },
        { id: "sv4", time: "18:30", title: "Siz Sevgan Qo'shiqlar", category: "Musiqa", duration: 30 }
      ]
    },
    {
      id: "kinoteatr",
      name: "Kinoteatr",
      category: "movies",
      logoLetters: "K",
      logoBg: "from-amber-500 to-orange-500",
      streamUrl: "https://famelack.com/tv/uz/",
      viewsCount: 2750,
      likesCount: 184,
      nowPlaying: "Kino: 'Forsaj 10' tarjima",
      nextProgram: "Detektiv: 'Sherlok'",
      schedule: [
        { id: "k1", time: "15:00", title: "Kino: 'Forsaj 10' tarjima film", category: "Kino", duration: 130, isActive: true },
        { id: "k2", time: "17:10", title: "Detektiv serial: 'Sherlok'", category: "Kino", duration: 60 },
        { id: "k3", time: "18:10", title: "Tarixiy kinofilmlar", category: "Kino", duration: 110 }
      ]
    },
    {
      id: "bolajon",
      name: "Bolajon TV",
      category: "kids",
      logoLetters: "B",
      logoBg: "from-yellow-400 to-orange-400",
      streamUrl: "https://famelack.com/tv/uz/",
      viewsCount: 1512,
      likesCount: 74,
      nowPlaying: "Masha va Medved quvnoq sarguzasht",
      nextProgram: "Ertaklar Olami",
      schedule: [
        { id: "b1", time: "15:00", title: "Masha va Medved", category: "Multfilm", duration: 30, isActive: true },
        { id: "b2", time: "15:30", title: "Ertaklar Olami ertaklari", category: "Multfilm", duration: 40 },
        { id: "b3", time: "16:10", title: "Robotlar Urushi sarguzashti", category: "Multfilm", duration: 50 },
        { id: "b4", time: "17:00", title: "Ingliz tilini o'rganamiz", category: "Kognitiv", duration: 30 }
      ]
    }
  ]);

  const selectChannel = (channel: Channel) => {
    // Elegant drop chime feedback
    audio.playDropChime();
    onSelectChannel(channel);
  };

  const handleLikeChannel = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playBubblePop();
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, likesCount: ch.likesCount + 1 } : ch
      )
    );
  };

  const categories = [
    { key: "all", label: "Barchasi" },
    { key: "national", label: "Milliy" },
    { key: "sport", label: "Sport" },
    { key: "movies", label: "Kinolar" },
    { key: "kids", label: "Bolalar" }
  ];

  const filteredChannels = channels.filter((ch) => {
    const matchesCategory = selectedCategory === "all" || ch.category === selectedCategory;
    const matchesSearch = ch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ch.nowPlaying.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-zinc-950/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-4">
      
      {/* Title & Stats */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-display font-medium text-sm tracking-wide text-zinc-100 flex items-center gap-2">
          <Tv className="w-4 h-4 text-purple-400" />
          Kanalni tanlang
        </h4>
        <span className="font-mono text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full text-purple-300">
          {filteredChannels.length} ta faol kanal
        </span>
      </div>

      {/* Modern fluid Search bar */}
      <div className="relative mb-3.5">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Kanal yoki serial nomini qidirish..."
          className="w-full bg-zinc-900/60 border border-white/5 focus:border-purple-500/40 rounded-xl px-9.5 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
        />
        <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-2.5" />
      </div>

      {/* Horizontal smooth scroll categories bar */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              audio.playBubblePop();
              setSelectedCategory(cat.key);
            }}
            className={`text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0 transition-all font-medium ${
              selectedCategory === cat.key
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/10 font-bold"
                : "bg-white/3 hover:bg-white/8 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Filter className="w-3 h-3 opacity-60" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Channels List Body */}
      <div className="space-y-2.5 overflow-y-auto max-h-[350px] pr-1">
        {filteredChannels.length > 0 ? (
          filteredChannels.map((channel) => {
            const isActive = channel.id === activeChannelId;
            return (
              <div
                key={channel.id}
                onClick={() => selectChannel(channel)}
                className={`group relative p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border-purple-500/40 shadow-inner"
                    : "bg-zinc-900/30 border-white/5 hover:border-white/12 hover:bg-zinc-900/50"
                }`}
              >
                {/* Active side-indicator */}
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 bg-purple-500 rounded-r-md" />
                )}

                {/* Channel visual logo bubble */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${channel.logoBg} text-white font-display font-extrabold text-base flex items-center justify-center relative flex-shrink-0 shadow-lg`}>
                  {channel.logoLetters}

                  {/* Active glowing ping badge */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border border-zinc-950 rounded-full flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-[8px] w-[8px] rounded-full bg-red-400 opacity-75"></span>
                    </span>
                  )}
                </div>

                {/* Channel details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h5 className="font-display font-medium text-xs text-zinc-100 truncate group-hover:text-purple-300 transition-colors">
                      {channel.name}
                    </h5>
                    
                    <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                      <Users className="w-3 h-3 text-cyan-400" />
                      {channel.viewsCount.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-medium">
                    {channel.nowPlaying}
                  </p>
                  
                  <p className="text-[10px] text-purple-400 font-mono mt-0.5 truncate uppercase tracking-wider">
                    Keyin: {channel.nextProgram}
                  </p>
                </div>

                {/* Love Heart button action */}
                <button
                  onClick={(e) => handleLikeChannel(channel.id, e)}
                  className="p-1 px-2 rounded-lg bg-white/2 hover:bg-pink-500/20 text-zinc-500 hover:text-pink-400 hover:border-pink-500/20 border border-transparent transition-all flex items-center gap-1 font-mono text-[9px]"
                >
                  <Heart className="w-3 h-3" />
                  {channel.likesCount}
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-zinc-500 text-xs font-mono">
            Ushbu boʻlimda kanallar topilmadi.
          </div>
        )}
      </div>
    </div>
  );
}
