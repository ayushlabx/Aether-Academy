import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

export default function Hero() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 min-h-[80vh]">

      {/* Left Column: Typography & CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center"
      >
        <div className="font-heading font-bold text-6xl xl:text-8xl leading-[1.05] tracking-tight mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            LEARN.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="text-gradient-pink"
          >
            SECURE.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="text-gradient-cyan"
          >
            ASCEND.
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-lg text-[#D8D8E8] mb-8 max-w-md font-medium leading-relaxed"
        >
          A game-inspired cloud security academy with 10,000+ quests, real-world labs, and AI companions by your side.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#FF6BBF] text-white font-bold tracking-wide shadow-[0_0_20px_rgba(182,77,255,0.4)] hover:shadow-[0_0_30px_rgba(182,77,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2">
            START QUESTING <span className="text-xs">▶</span>
          </button>

          <button className="px-8 py-3.5 rounded-full glass-panel text-white font-bold tracking-wide hover:bg-white/10 hover:border-[#4CC9FF]/50 hover:shadow-[0_0_20px_rgba(76,201,255,0.2)] transition-all duration-300">
            EXPLORE MAP
          </button>
        </motion.div>
      </motion.div>

      {/* Right Column: Animated Canvas Scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative h-[420px] lg:h-[580px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(182,77,255,0.2)]"
      >
        <HeroCanvas />

        {/* Bottom depth fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08081A] to-transparent pointer-events-none z-10" />

        {/* Astra character name badge */}
        <motion.div
          className="absolute top-6 left-6 glass-panel px-3 py-2 rounded-xl flex items-center gap-2 z-20"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        >
          <span className="text-lg">🌸</span>
          <div>
            <div className="text-xs font-bold text-white leading-none">Astra</div>
            <div className="text-[10px] text-[#FFD166] font-semibold">Lv. 24</div>
          </div>
        </motion.div>

        {/* Lumi character name badge */}
        <motion.div
          className="absolute bottom-10 right-6 glass-panel px-3 py-2 rounded-xl flex items-center gap-2 z-20"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        >
          <span className="text-lg">⭐</span>
          <div>
            <div className="text-xs font-bold text-white leading-none">Lumi</div>
            <div className="text-[10px] text-[#4CC9FF] font-semibold">Lv. 18</div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
