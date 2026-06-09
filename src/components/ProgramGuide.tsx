import { useState, useEffect } from "react";
import { ProgramItem } from "../types";
import { audio } from "./AudioEngine";
import { Clock, Calendar, Check, BellRing, Sparkles, Hourglass } from "lucide-react";

interface ProgramGuideProps {
  schedule: ProgramItem[];
  channelName: string;
}

export default function ProgramGuide({ schedule, channelName }: ProgramGuideProps) {
  const [reminders, setReminders] = useState<string[]>([]);

  // Load reminders
  useEffect(() => {
    const saved = localStorage.getItem("jonlitv_reminders");
    if (saved) {
      try {
        setReminders(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const toggleReminder = (itemId: string, itemTitle: string) => {
    let current: string[] = [];
    if (reminders.includes(itemId)) {
      current = reminders.filter((id) => id !== itemId);
      audio.playBubblePop();
    } else {
      current = [...reminders, itemId];
      // Play a beautiful notification gong sound effect on future setting!
      audio.playNotificationChime();
    }
    setReminders(current);
    localStorage.setItem("jonlitv_reminders", JSON.stringify(current));
  };

  return (
    <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-2xl">
      {/* Header info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <h4 className="font-display font-bold text-sm tracking-wide text-zinc-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Bugungi TV Dastur
          </h4>
          <p className="text-[11px] font-mono text-purple-300 mt-0.5">
            {channelName} koʻrsatuvlari roʻyxati
          </p>
        </div>
        
        {/* Date indicator with soft pastels */}
        <span className="flex items-center gap-1.5 text-[10px] font-mono bg-white/3 border border-white/5 px-3 py-1 rounded-full text-zinc-400">
          <Calendar className="w-3 h-3 text-cyan-400" />
          BUGUN: 9-IYUN, 2026
        </span>
      </div>

      {/* Program grid list */}
      <div className="space-y-3">
        {schedule && schedule.length > 0 ? (
          schedule.map((item) => {
            const isSet = reminders.includes(item.id);
            const isLive = item.isActive;
            return (
              <div
                key={item.id}
                className={`flex gap-3 p-3 rounded-xl border relative transition-all duration-300 ${
                  isLive
                    ? "bg-gradient-to-r from-purple-950/20 to-purple-900/10 border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.05)]"
                    : "bg-zinc-900/30 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Visual time bubble */}
                <div className="flex flex-col items-center justify-center bg-zinc-950/80 border border-white/5 rounded-lg px-2.5 py-1.5 h-12 w-14 text-center flex-shrink-0">
                  <span className={`text-[11px] font-bold font-mono ${isLive ? "text-purple-400 animate-pulse" : "text-zinc-300"}`}>
                    {item.time}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono mt-0.5">{item.duration} dax.</span>
                </div>

                {/* Info and Status details */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono bg-zinc-900/80 text-zinc-400 border border-white/5 px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.category}
                    </span>

                    {/* LIVE bubble label */}
                    {isLive && (
                      <span className="text-[8px] font-display font-extrabold bg-red-500 text-white px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        HOZIR EFIRDA
                      </span>
                    )}
                  </div>

                  <h5 className={`text-xs font-semibold truncate mt-1.5 ${isLive ? "text-purple-200" : "text-zinc-200"}`}>
                    {item.title}
                  </h5>

                  {isLive && (
                    <div className="mt-2 w-full max-w-[150px] bg-white/5 h-1 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full w-[45%] animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Reminder button trigger */}
                <div className="flex items-center flex-shrink-0">
                  {!isLive ? (
                    <button
                      onClick={() => toggleReminder(item.id, item.title)}
                      className={`h-8 px-3 rounded-lg text-[10px] font-bold font-display uppercase tracking-wider border transition-all flex items-center gap-1 ${
                        isSet
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                          : "bg-white/2 border-white/5 text-zinc-400 hover:text-white hover:border-white/12"
                      }`}
                    >
                      {isSet ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Eslatiladi
                        </>
                      ) : (
                        <>
                          <BellRing className="w-3.5 h-3.5 text-zinc-500" />
                          Eslatish
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase flex items-center gap-1">
                      <Hourglass className="w-3 h-3 text-purple-400 animate-spin" />
                      YONIK
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-zinc-500 text-xs font-mono text-center py-6">
            Dasturlar yuklanmoqda...
          </div>
        )}
      </div>
    </div>
  );
}
