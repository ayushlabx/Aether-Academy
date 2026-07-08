import React from 'react';
import { Hexagon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08081A] border-t border-white/5 pt-16 pb-8 relative z-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex items-center justify-center w-8 h-8">
                <Hexagon className="absolute text-[#B64DFF] w-8 h-8" strokeWidth={1.5} />
                <div className="w-3 h-3 bg-gradient-to-tr from-[#B64DFF] to-[#4CC9FF] rounded-[2px] transform rotate-45" />
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-white">
                AETHER ACADEMY
              </span>
            </div>
            <p className="text-sm text-[#9A9AB5] leading-relaxed mb-6">
              Empowering the next generation of cloud security leaders through gamified learning and community.
            </p>
            <div className="flex gap-4">
              {['Discord', 'Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-8 h-8 rounded-full bg-[#16172F] border border-white/5 flex items-center justify-center text-[#9A9AB5] hover:text-[#B64DFF] hover:border-[#B64DFF]/50 transition-colors">
                  <span className="text-[10px] font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white tracking-wider mb-4">PLATFORM</h4>
            <ul className="space-y-3">
              {['Quests', 'Labs', 'Roadmap', 'Certificates'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[#9A9AB5] hover:text-[#4CC9FF] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white tracking-wider mb-4">COMMUNITY</h4>
            <ul className="space-y-3">
              {['Chat Rooms', 'Events', 'Leaderboards', 'Quizzes'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[#9A9AB5] hover:text-[#FF6ACB] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white tracking-wider mb-4">RESOURCES</h4>
            <ul className="space-y-3">
              {['Documentation', 'Blog', 'Support', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[#9A9AB5] hover:text-[#59FFA0] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9A9AB5]">
            © 2025 Aether Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#9A9AB5] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[#9A9AB5] hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
