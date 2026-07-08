import React from 'react';
import { motion } from 'framer-motion';
import { Map, Trophy, Target, Shield, Cloud, Lock, Compass } from 'lucide-react';
import worldMapImg from '@assets/generated_images/world-map.jpg';

const stats = [
  { label: 'Level', value: '24', color: 'text-[#B64DFF]' },
  { label: 'XP', value: '3450/5000', color: 'text-[#FFD166]', isBar: true, progress: 69 },
  { label: 'Quests Completed', value: '523', color: 'text-white' },
  { label: 'Certificates Earned', value: '38', color: 'text-white' },
  { label: 'Global Rank', value: '#1,204', color: 'text-[#4AE8FF]' },
];

const nodes = [
  { id: 1, name: 'Cloud Basics', icon: Cloud, x: '20%', y: '80%', color: '#59FFA0' },
  { id: 2, name: 'Identity Realm', icon: Shield, x: '35%', y: '50%', color: '#4CC9FF' },
  { id: 3, name: 'Threat Territory', icon: Target, x: '60%', y: '60%', color: '#FF5C7A' },
  { id: 4, name: 'Security Labs', icon: Compass, x: '75%', y: '30%', color: '#B64DFF' },
  { id: 5, name: 'Compliance Island', icon: Lock, x: '50%', y: '85%', color: '#FFD166' },
  { id: 6, name: 'Career Peak', icon: Trophy, x: '85%', y: '15%', color: '#FF6BBF' },
];

export default function WorldMap() {
  return (
    <section className="w-full pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: World Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border border-white/10 relative h-[400px] md:h-[500px] group"
        >
          <div className="absolute inset-0 bg-[#08081A]/40 z-10 pointer-events-none group-hover:bg-[#08081A]/20 transition-colors duration-500" />
          
          <img 
            src={worldMapImg} 
            alt="World Map" 
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
          />

          {/* Glowing Paths SVG */}
          <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="path-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4AE8FF" />
                <stop offset="50%" stopColor="#B64DFF" />
                <stop offset="100%" stopColor="#FF6BBF" />
              </linearGradient>
            </defs>
            <path d="M 20 80 Q 27 65 35 50 T 60 60 T 75 30 T 85 15" fill="none" stroke="url(#path-grad)" strokeWidth="0.8" strokeDasharray="2,2" className="animate-pulse" />
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div 
              key={node.id}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer group/node"
              style={{ left: node.x, top: node.y }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-[#101126]/80 backdrop-blur-md transition-all duration-300 group-hover/node:scale-110 group-hover/node:shadow-[0_0_20px_var(--node-color)]"
                style={{ borderColor: node.color, '--node-color': node.color } as React.CSSProperties}
              >
                <node.icon className="w-5 h-5" style={{ color: node.color }} />
              </div>
              <div className="bg-[#08081A]/90 border border-white/10 px-3 py-1 rounded-md opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs font-bold text-white tracking-wider">{node.name}</span>
              </div>
            </div>
          ))}
          
          <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#16172F] border border-white/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-[#B64DFF]" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white tracking-wider">Aetheria</h2>
          </div>
        </motion.div>

        {/* Right: Stats Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading font-bold text-xl text-white mb-6 flex items-center gap-2">
              <span className="text-[#FF6ACB]">✦</span> Your Stats
            </h3>
            
            <div className="space-y-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-[#9A9AB5]">{stat.label}</span>
                    <span className={`font-heading font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                  {stat.isBar && (
                    <div className="h-2 w-full bg-[#101126] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#9D4EDD] to-[#FF6ACB] rounded-full relative"
                      >
                        <div className="absolute top-0 right-0 w-4 h-full bg-white/30 blur-[2px]" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <span className="text-xs font-semibold text-[#9A9AB5] uppercase tracking-wider mb-3 block">Cloud Badges</span>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#101126] border border-[#FFD166]/30 flex items-center justify-center shadow-[0_0_10px_rgba(255,209,102,0.1)]">
                   <span className="text-[#FFD166] font-bold text-xs">AWS</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#101126] border border-[#4CC9FF]/30 flex items-center justify-center shadow-[0_0_10px_rgba(76,201,255,0.1)]">
                   <span className="text-[#4CC9FF] font-bold text-xs">AZR</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#101126] border border-white/10 flex items-center justify-center opacity-40 grayscale">
                   <span className="text-white font-bold text-xs">GCP</span>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-[#B64DFF]/20 to-[#FF6ACB]/20 border border-[#B64DFF]/50 text-white font-bold tracking-wider hover:bg-[#B64DFF]/30 transition-all flex items-center justify-center gap-2">
            VIEW PROFILE <span className="text-[10px]">▶</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
