import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Flame, Terminal } from 'lucide-react';

const quests = [
  {
    id: 1,
    title: "Secure S3 Bucket Quest",
    type: "IN PROGRESS",
    typeColor: "bg-[#FFD166]/20 text-[#FFD166] border-[#FFD166]/30",
    difficulty: "Medium",
    xp: "+250 XP",
    progress: 75,
    icon: Flame,
    iconColor: "text-[#FFD166]"
  },
  {
    id: 2,
    title: "Cloud Capture The Flag",
    type: "EVENT",
    typeColor: "bg-[#4CC9FF]/20 text-[#4CC9FF] border-[#4CC9FF]/30",
    difficulty: "Hard",
    xp: "+500 XP",
    progress: null,
    time: "Starts in 2h 30m",
    icon: Star,
    iconColor: "text-[#4CC9FF]"
  },
  {
    id: 3,
    title: "IAM Policy Protector",
    type: "DAILY QUEST",
    typeColor: "bg-[#59FFA0]/20 text-[#59FFA0] border-[#59FFA0]/30",
    difficulty: "Easy",
    xp: "+150 XP",
    progress: 0,
    icon: Terminal,
    iconColor: "text-[#59FFA0]"
  },
  {
    id: 4,
    title: "Hands-on: AWS GuardDuty",
    type: "LAB",
    typeColor: "bg-[#B64DFF]/20 text-[#B64DFF] border-[#B64DFF]/30",
    difficulty: "Medium",
    xp: "+300 XP",
    progress: 50,
    icon: Cloud,
    iconColor: "text-[#B64DFF]"
  }
];

// Reusing a local Cloud icon since it's not imported above
function Cloud(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

export default function QuestCards() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-white tracking-wider flex items-center gap-2">
          CONTINUE YOUR JOURNEY
        </h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white transition-colors">
            &larr;
          </button>
          <button className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white hover:text-[#B64DFF] transition-colors border-[#B64DFF]/50">
            &rarr;
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
        {quests.map((quest, index) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 snap-start"
          >
            <div className="glass-panel glass-panel-hover rounded-3xl p-6 h-full flex flex-col relative overflow-hidden group cursor-pointer">
              
              {/* Top Row: Badges */}
              <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${quest.typeColor}`}>
                  {quest.type}
                </div>
                <div className="bg-[#FFD166]/10 text-[#FFD166] border border-[#FFD166]/20 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {quest.xp}
                </div>
              </div>

              {/* Title & Icon */}
              <div className="flex gap-4 items-start mb-6">
                <div className={`w-12 h-12 rounded-xl bg-[#101126] border border-white/5 flex items-center justify-center flex-shrink-0 ${quest.iconColor}`}>
                  <quest.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white leading-tight group-hover:text-[#B64DFF] transition-colors">
                    {quest.title}
                  </h3>
                  <div className="text-xs text-[#9A9AB5] mt-1 flex items-center gap-1.5">
                    Difficulty: 
                    <span className={
                      quest.difficulty === 'Easy' ? 'text-[#59FFA0]' : 
                      quest.difficulty === 'Medium' ? 'text-[#FFD166]' : 'text-[#FF5C7A]'
                    }>
                      {quest.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5">
                {quest.progress !== null ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#9A9AB5]">Progress</span>
                      <span className="text-[#FF6ACB]">{quest.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#101126] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${quest.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#B64DFF] to-[#FF6ACB] rounded-full relative"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#4CC9FF]">
                    <Clock className="w-4 h-4" />
                    {quest.time}
                  </div>
                )}
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#B64DFF]/30 rounded-3xl pointer-events-none transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
