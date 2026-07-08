import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

export default function EventCalendar() {
  // Simple static mock for May 2025
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 4; // Thursday

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl p-6 flex flex-col h-[500px]"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-white flex items-center gap-2 uppercase tracking-wider text-sm">
          <Calendar className="w-4 h-4 text-[#4CC9FF]" /> EVENT CALENDAR
        </h3>
      </div>

      <div className="flex items-center justify-between mb-4 bg-[#101126] p-2 rounded-xl border border-white/5">
        <button aria-label="Previous month" className="p-1 hover:bg-[#1E2142] rounded-md text-[#9A9AB5] hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-heading font-bold text-white tracking-wide">MAY 2025</span>
        <button aria-label="Next month" className="p-1 hover:bg-[#1E2142] rounded-md text-[#9A9AB5] hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-[10px] font-bold text-[#9A9AB5]">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1 content-start">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map(day => {
          const isToday = day === 13;
          const hasEvent = day === 13 || day === 20 || day === 25;
          return (
            <div 
              key={day} 
              className={`aspect-square flex items-center justify-center text-xs font-semibold rounded-lg transition-all cursor-pointer relative ${
                isToday 
                  ? 'bg-gradient-to-br from-[#B64DFF] to-[#FF6ACB] text-white shadow-[0_0_10px_rgba(182,77,255,0.4)]' 
                  : 'text-[#D8D8E8] hover:bg-[#1E2142] hover:text-white'
              }`}
            >
              {day}
              {hasEvent && !isToday && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4CC9FF]" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="bg-[#101126] border border-[#B64DFF]/30 rounded-xl p-4 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#B64DFF] to-[#FF6ACB]" />
          
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#16172F] border border-white/10 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-[#FFD166]" />
            </div>
            <div className="flex-1">
              <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#B64DFF] transition-colors leading-tight">
                Cloud Security Q&A Tournament
              </h4>
              <p className="text-[10px] text-[#9A9AB5] mt-1 font-medium">May 13, 2025 · 7:00 PM UTC</p>
            </div>
          </div>
          
          <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-[#B64DFF] to-[#FF6ACB] text-white text-xs font-bold tracking-wider hover:shadow-[0_0_15px_rgba(182,77,255,0.4)] transition-shadow">
            JOIN EVENT
          </button>
        </div>
      </div>
    </motion.div>
  );
}
