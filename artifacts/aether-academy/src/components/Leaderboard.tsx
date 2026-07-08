import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import astraAvatar from '@assets/generated_images/astra-avatar.png';

const leaders = [
  { rank: 1, name: 'SecureSamurai', level: 28, xp: '8,750', color: 'text-[#FFD166]', bg: 'bg-[#FFD166]/10 border-[#FFD166]/30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samurai&backgroundColor=FFD166' },
  { rank: 2, name: 'CloudNinja', level: 27, xp: '7,920', color: 'text-[#D8D8E8]', bg: 'bg-white/5 border-white/10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja&backgroundColor=C8C8FF' },
  { rank: 3, name: 'ByteBard', level: 26, xp: '6,540', color: 'text-[#FF9A5C]', bg: 'bg-[#FF9A5C]/10 border-[#FF9A5C]/30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bard&backgroundColor=FF9A5C' },
  { rank: 4, name: 'NovaByte', level: 24, xp: '3,450', color: 'text-[#B64DFF]', bg: 'bg-[#B64DFF]/10 border-[#B64DFF]/50 shadow-[0_0_15px_rgba(182,77,255,0.2)]', isUser: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NovaByte&backgroundColor=B64DFF' },
  { rank: 5, name: 'DataDefender', level: 23, xp: '2,980', color: 'text-[#9A9AB5]', bg: 'bg-transparent border-transparent', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Defender&backgroundColor=9A9AB5' },
];

export default function Leaderboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl p-6 relative overflow-hidden h-full min-h-[500px]"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B64DFF]/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-heading font-bold text-white flex items-center gap-2 uppercase tracking-wider text-sm mb-1">
            <Trophy className="w-4 h-4 text-[#FFD166]" /> LEADERBOARD
          </h3>
          <p className="text-[10px] text-[#9A9AB5] uppercase tracking-widest">Top cloud protectors this month</p>
        </div>
        <button className="text-[10px] font-bold text-[#4CC9FF] hover:text-white transition-colors uppercase tracking-wider">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {leaders.map((user) => (
          <div 
            key={user.rank}
            className={`flex items-center gap-4 p-3 rounded-2xl border ${user.bg} transition-transform hover:scale-[1.02] cursor-pointer`}
          >
            <div className={`font-heading font-bold text-lg w-6 text-center ${user.color}`}>
              {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
            </div>
            
            <Avatar className={`w-10 h-10 border-2 border-white/10`}>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm truncate ${user.isUser ? 'text-[#B64DFF]' : 'text-white'}`}>
                  {user.name}
                </span>
                {user.isUser && (
                  <span className="bg-[#B64DFF] text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                    You
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#9A9AB5] font-semibold">Level {user.level}</span>
            </div>
            
            <div className="text-right">
              <span className="block font-heading font-bold text-[#FFD166] text-sm">{user.xp}</span>
              <span className="text-[9px] text-[#9A9AB5] uppercase tracking-widest">XP</span>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Character */}
      <div className="absolute -bottom-4 -right-8 w-40 h-40 opacity-40 pointer-events-none mix-blend-screen">
        <img src={astraAvatar} alt="Decoration" className="w-full h-full object-contain filter grayscale brightness-200 sepia hue-rotate-[250deg] saturate-[3]" />
      </div>
    </motion.div>
  );
}
