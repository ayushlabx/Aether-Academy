import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Shield, Eye, Star, Map } from 'lucide-react';

const nodes = [
  {
    id: 'foundation',
    label: 'FOUNDATION',
    desc: 'Cloud Basics & Architecture',
    status: 'completed',
    icon: Check,
    color: '#59FFA0'
  },
  {
    id: 'identity',
    label: 'IDENTITY',
    desc: 'IAM & Access Management',
    status: 'in-progress',
    icon: Shield,
    color: '#B64DFF'
  },
  {
    id: 'defense',
    label: 'DEFENSE',
    desc: 'Network & Perimeter Security',
    status: 'locked',
    icon: Lock,
    color: '#1E2142'
  },
  {
    id: 'monitor',
    label: 'MONITOR',
    desc: 'Logging & Threat Detection',
    status: 'locked',
    icon: Eye,
    color: '#1E2142'
  },
  {
    id: 'expert',
    label: 'EXPERT',
    desc: 'Advanced Zero Trust',
    status: 'locked',
    icon: Star,
    color: '#1E2142'
  }
];

export default function Roadmap() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl p-8"
    >
      <div className="mb-10">
        <h3 className="font-heading font-bold text-white flex items-center gap-2 uppercase tracking-wider text-sm mb-1">
          <Map className="w-4 h-4 text-[#FF6ACB]" /> CLOUD SECURITY ROADMAP
        </h3>
        <p className="text-[10px] text-[#9A9AB5] uppercase tracking-widest">Your path to becoming a cloud security expert</p>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-6 left-8 right-8 h-1 bg-[#1E2142] rounded-full z-0" />
        <div 
          className="absolute top-6 left-8 h-1 bg-gradient-to-r from-[#59FFA0] to-[#B64DFF] rounded-full z-0 shadow-[0_0_10px_rgba(182,77,255,0.5)]" 
          style={{ width: '35%' }} 
        />

        <div className="relative z-10 flex justify-between">
          {nodes.map((node, i) => {
            const isCompleted = node.status === 'completed';
            const isInProgress = node.status === 'in-progress';
            
            return (
              <div key={node.id} className="flex flex-col items-center group w-1/5">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 mb-4 transition-transform duration-300 ${
                    isCompleted ? 'bg-[#101126] border-[#59FFA0] text-[#59FFA0] shadow-[0_0_15px_rgba(89,255,160,0.3)]' :
                    isInProgress ? 'bg-[#101126] border-[#B64DFF] text-[#B64DFF] shadow-[0_0_20px_rgba(182,77,255,0.5)] animate-pulse' :
                    'bg-[#16172F] border-[#1E2142] text-[#9A9AB5]'
                  } ${!isCompleted && !isInProgress ? '' : 'group-hover:scale-110 cursor-pointer'}`}
                >
                  <node.icon className={`w-5 h-5 ${isInProgress ? 'animate-pulse' : ''}`} />
                </div>
                
                <h4 className={`font-heading font-bold text-xs tracking-widest mb-1 text-center ${
                  isCompleted ? 'text-[#59FFA0]' :
                  isInProgress ? 'text-[#B64DFF]' :
                  'text-[#9A9AB5]'
                }`}>
                  {node.label}
                </h4>
                
                <p className="text-[10px] text-[#9A9AB5] text-center max-w-[100px] leading-tight hidden md:block">
                  {node.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
}
