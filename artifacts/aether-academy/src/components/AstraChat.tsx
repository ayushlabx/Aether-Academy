import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles } from 'lucide-react';
import astraAvatar from '@assets/generated_images/astra-avatar.png';

interface Message {
  id: number;
  from: 'astra' | 'user';
  text: string;
}

const SUGGESTIONS = [
  'What is IAM in AWS?',
  'Explain Zero Trust',
  'Cloud security best practices?',
  'Help me with this cloud quest',
];

export default function AstraChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'astra', text: 'Hello NovaByte! ✨ How can I help you secure your cloud journey today?' },
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Clear pending reply timer on unmount to avoid post-unmount state updates
  useEffect(() => {
    return () => { if (replyTimerRef.current) clearTimeout(replyTimerRef.current); };
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = setTimeout(() => {
      setTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        from: 'astra',
        text: `Great question! "${text}" is a key topic in cloud security. I'd love to walk you through it step by step. Ready to start a quest on this? ⚔️`,
      };
      setMessages(prev => [...prev, reply]);
    }, 1400);
  };

  return (
    <>
      {/* Floating trigger button — fixed top-right below navbar */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        aria-label="Open Astra AI Chat"
        className="fixed top-5 right-16 z-[100] flex items-center gap-2 px-4 py-2 rounded-full bg-[#16172F]/90 border border-[#B64DFF]/50 backdrop-blur-xl shadow-[0_0_20px_rgba(182,77,255,0.3)] hover:shadow-[0_0_30px_rgba(182,77,255,0.5)] hover:border-[#FF6ACB]/70 transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pink flower icon */}
        <span className="text-xl leading-none select-none group-hover:rotate-12 transition-transform duration-300">🌸</span>
        <span className="text-xs font-bold text-[#C8C8FF] tracking-wide hidden sm:inline">Astra AI</span>
        {/* Online dot */}
        <span className="w-2 h-2 rounded-full bg-[#59FFA0] shadow-[0_0_6px_#59FFA0] animate-pulse" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="astra-chat"
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[72px] right-4 z-[99] w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_60px_rgba(182,77,255,0.25)] bg-[#101126]/95 backdrop-blur-2xl"
            style={{ maxHeight: 'calc(100dvh - 90px)' }}
          >
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B64DFF] via-[#FF6ACB] to-[#4CC9FF]" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#16172F]/60 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#FF6ACB] bg-[#16172F]">
                    <img src={astraAvatar} alt="Astra" className="w-full h-full object-cover scale-110" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#59FFA0] rounded-full border-2 border-[#101126]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-1">
                    Astra AI Chat <Sparkles className="w-3 h-3 text-[#FFD166]" />
                  </p>
                  <p className="text-[10px] text-[#9A9AB5]">10,000+ Q&amp;A Database</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-[#9A9AB5] hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 200, maxHeight: 320 }}>
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.from === 'astra' && (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-[#FF6ACB]/50 flex-shrink-0 bg-[#16172F]">
                      <img src={astraAvatar} alt="Astra" className="w-full h-full object-cover scale-110" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'astra'
                        ? 'bg-[#16172F] border border-white/5 text-[#D8D8E8] rounded-tl-sm'
                        : 'bg-gradient-to-br from-[#9D4EDD] to-[#FF6BBF] text-white rounded-tr-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#FF6ACB]/50 flex-shrink-0 bg-[#16172F]">
                    <img src={astraAvatar} alt="Astra" className="w-full h-full object-cover scale-110" />
                  </div>
                  <div className="bg-[#16172F] border border-white/5 rounded-full px-4 py-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B64DFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B64DFF] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B64DFF] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pt-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-[#0D0E22]/50">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-[10px] bg-[#16172F] hover:bg-[#1E2142] border border-[#B64DFF]/30 text-[#C8C8FF] px-2.5 py-1.5 rounded-full transition-colors mt-2"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-[#0D0E22]/50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask Astra anything..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  className="w-full bg-[#16172F] border border-white/10 rounded-xl py-2.5 pl-4 pr-11 text-sm text-white placeholder:text-[#9A9AB5] focus:outline-none focus:border-[#B64DFF]/50 transition-colors"
                />
                <button
                  onClick={() => sendMessage(input)}
                  aria-label="Send message"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-gradient-to-r from-[#B64DFF] to-[#FF6ACB] rounded-lg hover:shadow-[0_0_12px_rgba(182,77,255,0.5)] transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
