import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { audio } from "./AudioEngine";
import { MessageSquare, Send, Radio, User, ShieldAlert } from "lucide-react";
import { ChatMessage } from "../types";

export default function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial mock chat comments relative to Uzbek culture, matches and TV platform
  const UZBEK_NAMES = ["Baxodir", "Zilola", "Anvar", "Shaxnoza", "Diyorbek", "Nozima", "Sardor", "Malika", "Temur", "Kamola"];
  const CHAT_PHRASES = [
    "Jonli TV judayam tez va qulay ekan, gap yo'q!",
    "Loyiha asoschisiga kattakon rahmat! Abdurazakov ijodingizga omad!",
    "Yuklanish animatsiyasi tomchi effekti daxshat chiqibdi, hayratda qoldim 👍",
    "Futbol translyatsiyasi bormi bugun Yoshlar kanalida?",
    "Kinoteatr kanalidagi tarjima kinolar sifati aʻlo darajada.",
    "Ovozli tomchi effekti maza berdi, sayt dizayni premium darajada!",
    "Hamma milliy kanallar joyida ekan, rahmat kattakon.",
    "Abdurazakov akadan yangi loyihalar kutib qolamiz. Omad doim yor bo'lsin!",
    "Milliy TV darslarini shu yerdan ko'rib boryapman.",
    "Eraning eng zo'r TV portali, super yumshoq ranglar, ko'zni charchatmaydi.",
  ];

  const AVATAR_COLORS = [
    "bg-red-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500",
    "bg-teal-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500"
  ];

  // Load chat or generate baseline messages
  useEffect(() => {
    const saved = localStorage.getItem("jonlitv_chat");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        initBaselineMessages();
      }
    } else {
      initBaselineMessages();
    }
  }, []);

  const initBaselineMessages = () => {
    const initial: ChatMessage[] = [
      {
        id: "1",
        username: "Tizim",
        message: "Xush kelibsiz! Jonli TV saytining faollar guruhiga qo'shildingiz. O'z fikringiz va tabriklaringizni yozib qoldiring.",
        timestamp: "Hozir",
        avatarColor: "bg-purple-600",
        isSystem: true,
      },
      {
        id: "2",
        username: "Diyorbek_Dev",
        message: "Sayt zo'r ishlab chiqilibdi! Abdurazakov aka dizaynni o'ta chiroyli va mukammal qilibsiz, omad!",
        timestamp: "2 dax.",
        avatarColor: "bg-cyan-500",
      },
    ];
    setMessages(initial);
    localStorage.setItem("jonlitv_chat", JSON.stringify(initial));
  };


  // Simulate other viewers texting occasionally to make it extremely lively!
  useEffect(() => {
    const chatSimulator = setInterval(() => {
      // 30% chance every 8 seconds of spawing a fresh reader message
      if (Math.random() > 0.4) {
        const randomName = UZBEK_NAMES[Math.floor(Math.random() * UZBEK_NAMES.length)];
        const randomPhrase = CHAT_PHRASES[Math.floor(Math.random() * CHAT_PHRASES.length)];
        const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
        
        const nextMsg: ChatMessage = {
          id: Date.now().toString(),
          username: randomName,
          message: randomPhrase,
          timestamp: "Hozir",
          avatarColor: randomColor,
        };

        setMessages((prev) => {
          const current = [...prev, nextMsg].slice(-40); // cap at 40 max messages
          localStorage.setItem("jonlitv_chat", JSON.stringify(current));
          return current;
        });

        // Trigger a tiny click pop audio indicator
        audio.playBubblePop();
      }
    }, 9000);

    return () => clearInterval(chatSimulator);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const myMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "Siz (Mehmon)",
      message: inputText.trim(),
      timestamp: "Hozir",
      avatarColor: "bg-purple-600",
    };

    setMessages((prev) => {
      const current = [...prev, myMessage];
      localStorage.setItem("jonlitv_chat", JSON.stringify(current));
      return current;
    });

    setInputText("");
    // Play drop click sound
    audio.playDropChime();
  };

  const handleClearChat = () => {
    localStorage.removeItem("jonlitv_chat");
    initBaselineMessages();
    audio.playBubblePop();
  };

  return (
    <div className="flex flex-col h-full max-h-[500px] bg-zinc-950/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header section with live feed indicator */}
      <div className="flex items-center justify-between bg-zinc-900/80 px-4 py-3.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="font-display font-semibold text-xs tracking-wider text-zinc-100 uppercase flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            Tomoshabinlar Chat Guruhi
          </span>
        </div>
        <button
          onClick={handleClearChat}
          className="text-[10px] font-mono text-zinc-500 hover:text-rose-400 transition-colors"
        >
          Tozalash
        </button>
      </div>

      {/* Messages layout */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 h-[340px]">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -10, y: 5 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-2.5 items-start ${
                msg.isSystem ? "bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/10" : ""
              }`}
            >
              {!msg.isSystem && (
                <div className={`w-7 h-7 rounded-full ${msg.avatarColor} text-white flex items-center justify-center font-bold text-xs select-none flex-shrink-0 mt-0.5`}>
                  {msg.username.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <span className={`text-xs font-semibold truncate ${
                    msg.isSystem ? "text-purple-300 font-display font-medium" : "text-zinc-200"
                  }`}>
                    {msg.username}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono select-none flex-shrink-0">{msg.timestamp}</span>
                </div>
                
                <p className={`text-xs break-words mt-0.5 leading-relaxed ${
                  msg.isSystem ? "text-zinc-300 text-center text-[11px]" : "text-zinc-300"
                }`}>
                  {msg.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input container */}
      <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/60 border-t border-white/5 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Fikringizni ulashing..."
          className="flex-1 bg-zinc-950/80 border border-white/5 focus:border-purple-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-md group"
        >
          <Send className="w-4 h-4 text-purple-100 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
}
