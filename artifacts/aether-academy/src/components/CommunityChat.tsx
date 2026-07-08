import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Hash, Send } from 'lucide-react';
import astraAvatar from '@assets/generated_images/astra-avatar.png';
import lumiAvatar from '@assets/generated_images/lumi-avatar.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const channels = ['#general', '#labs', '#events', '#help', '#off-topic'];

const messages = [
  {
    id: 1,
    user: 'CyberNeko',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNeko&backgroundColor=4CC9FF',
    content: 'Just completed the IAM Policy Protector quest! Great challenge 🔥',
    time: 'Today at 10:24 AM',
    color: 'border-[#4CC9FF]'
  },
  {
    id: 2,
    user: 'CloudStrider',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CloudStrider&backgroundColor=FFD166',
    content: 'Nice! That one was tricky. Any tips?',
    time: 'Today at 10:26 AM',
    color: 'border-[#FFD166]'
  },
  {
    id: 3,
    user: 'NovaByte',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NovaByte&backgroundColor=B64DFF',
    content: 'Make sure to follow the least privilege principle. Astra AI Chat helped me a lot! ⭐',
    time: 'Today at 10:30 AM',
    color: 'border-[#B64DFF]'
  },
  {
    id: 4,
    user: 'ByteGuardian',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ByteGuardian&backgroundColor=59FFA0',
    content: 'Anyone up for the CTF event later?',
    time: 'Today at 10:35 AM',
    color: 'border-[#59FFA0]'
  },
  {
    id: 5,
    user: 'Lumi',
    image: lumiAvatar,
    content: "I'll be cheering for you all! 🌟",
    time: 'Today at 10:36 AM',
    color: 'border-[#FF6ACB]',
    isNpc: true
  }
];

export default function CommunityChat() {
  const [activeChannel, setActiveChannel] = useState('#general');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl overflow-hidden flex flex-col h-[500px]"
    >
      <div className="p-4 border-b border-white/5 bg-[#101126]/80 flex flex-col gap-3">
        <h3 className="font-heading font-bold text-white flex items-center gap-2 uppercase tracking-wider text-sm">
          <MessageSquare className="w-4 h-4 text-[#B64DFF]" /> Community Chat
        </h3>
        <p className="text-[10px] text-[#9A9AB5] uppercase tracking-widest">Secure. Discuss. Learn Together.</p>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {channels.map(channel => (
            <button
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeChannel === channel 
                  ? 'bg-[#1E2142] text-white border border-[#B64DFF]/30' 
                  : 'text-[#9A9AB5] hover:bg-[#16172F] hover:text-[#D8D8E8]'
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 hide-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className="flex gap-3 group">
            {msg.isNpc ? (
              <div className={`w-10 h-10 rounded-xl overflow-hidden border-2 flex-shrink-0 bg-[#101126] ${msg.color}`}>
                <img src={msg.image} alt={msg.user} className="w-full h-full object-cover scale-110" />
              </div>
            ) : (
              <Avatar className={`w-10 h-10 border-2 ${msg.color} flex-shrink-0`}>
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.user[0]}</AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`font-bold text-sm ${msg.isNpc ? 'text-[#FF6ACB]' : 'text-white'}`}>
                  {msg.user}
                </span>
                {msg.isNpc && <span className="bg-[#FF6ACB]/20 text-[#FF6ACB] text-[9px] px-1.5 rounded font-bold">NPC</span>}
                <span className="text-[10px] text-[#9A9AB5]">{msg.time}</span>
              </div>
              <p className="text-sm text-[#D8D8E8] leading-relaxed">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#101126]/80 border-t border-white/5">
        <div className="relative">
          <input 
            type="text" 
            placeholder={`Message ${activeChannel}...`}
            className="w-full bg-[#16172F] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-[#9A9AB5] focus:outline-none focus:border-[#B64DFF]/50 transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#1E2142] hover:bg-[#B64DFF] rounded-lg transition-colors group">
            <Send className="w-4 h-4 text-[#9A9AB5] group-hover:text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
