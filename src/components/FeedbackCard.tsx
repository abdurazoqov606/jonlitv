import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { audio } from "./AudioEngine";
import { Send, Heart, Star, Sparkles, MessageSquareHeart } from "lucide-react";
import { FeedbackItem } from "../types";

export default function FeedbackCard() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [rating, setRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load appreciation messages
  useEffect(() => {
    const saved = localStorage.getItem("jonlitv_appreciation");
    if (saved) {
      try {
        setFeedbacks(JSON.parse(saved));
      } catch (e) {
        initBaselineAppreciation();
      }
    } else {
      initBaselineAppreciation();
    }
  }, []);

  const initBaselineAppreciation = () => {
    const baseline: FeedbackItem[] = [
      {
        id: "base1",
        name: "Sardorbek_Uz",
        comment: "Yulduzli va suvli tomchili yuklanish daxshat chiqibdi! Sayt ochilganida tovushi mazza berdi, Asoschi Abdurazakovga raxmat, haqiqiy professional!",
        rating: 5,
        date: "Bugun",
      },
      {
        id: "base2",
        name: "Nilufar_Dev",
        comment: "Kanal almashish silliq va ranglari yumshoq ekan. Koʻzni charchatmaydi. Milliy TV-ni shu yerdan kuzatib boraman 👏",
        rating: 5,
        date: "Kecha",
      }
    ];
    setFeedbacks(baseline);
    localStorage.setItem("jonlitv_appreciation", JSON.stringify(baseline));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !commentInput.trim()) return;

    // Create item
    const newItem: FeedbackItem = {
      id: Date.now().toString(),
      name: nameInput.trim(),
      comment: commentInput.trim(),
      rating: rating,
      date: "Hozir",
    };

    const next = [newItem, ...feedbacks];
    setFeedbacks(next);
    localStorage.setItem("jonlitv_appreciation", JSON.stringify(next));

    // Clear form
    setNameInput("");
    setCommentInput("");
    setRating(5);

    // Play wet melody splash sound
    audio.playDropChime();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquareHeart className="w-5 h-5 text-purple-400" />
        <div>
          <h4 className="font-display font-medium text-sm text-zinc-100">Abdurazakovga Tashakkurnoma</h4>
          <p className="text-[10px] text-zinc-500 font-mono">Platforma asoschisi uchun tabrik va istaklar</p>
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            required
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Ismingiz..."
            className="w-full bg-zinc-900/60 border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
          />
          
          {/* Custom rating dynamic icons selectors */}
          <div className="flex items-center justify-center gap-1.5 bg-zinc-900/60 border border-white/5 rounded-xl px-2">
            {[1, 2, 3, 4, 5].map((stars) => (
              <button
                type="button"
                key={stars}
                onClick={() => {
                  audio.playBubblePop();
                  setRating(stars);
                }}
                className="transition-transform active:scale-75"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    stars <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          required
          rows={2}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Tashakkurnoma va istaklaringizni yozing..."
          className="w-full bg-zinc-900/60 border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all resize-none"
        />

        <button
          type="submit"
          className="w-full py-2.5 text-xs font-bold font-display uppercase tracking-widest rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-3.5 h-3.5 text-purple-200" />
          Tashakkur Yoʻllash
        </button>
      </form>

      {/* Celebration success notification alert */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2 text-[11px] text-emerald-400"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            Maktubingiz sayt xotirasiga yozildi, Tashakkur!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appreciation list */}
      <div className="mt-5 space-y-3 max-h-[190px] overflow-y-auto pr-1">
        {feedbacks.map((item) => (
          <div key={item.id} className="p-3 bg-zinc-900/30 border border-white/3 rounded-xl">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
              <span className="font-bold text-purple-300">@{item.name}</span>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span>{item.date}</span>
              </div>
            </div>
            
            <p className="text-[11px] text-zinc-400 leading-relaxed mt-1.5 break-words font-medium">
              "{item.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
