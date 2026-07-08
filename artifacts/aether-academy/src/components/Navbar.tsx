import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Settings, Menu, X, Hexagon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'QUESTS', href: '#quests' },
  { name: 'LABS', href: '#quests' },
  { name: 'ROADMAP', href: '#roadmap' },
  { name: 'COMMUNITY', href: '#community' },
  { name: 'INTERNSHIPS', href: '#internships' },
  { name: 'CALENDAR', href: '#calendar' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#101126]/80 backdrop-blur-xl border-b border-[#B64DFF]/30 shadow-[0_4px_30px_rgba(182,77,255,0.15)]' 
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center w-10 h-10">
                <Hexagon className="absolute text-[#B64DFF] w-10 h-10 animate-glow-pulse" strokeWidth={1.5} />
                <div className="w-4 h-4 bg-gradient-to-tr from-[#B64DFF] to-[#4CC9FF] rounded-sm transform rotate-45" />
              </div>
              <span className="font-heading font-bold text-xl tracking-wider text-white flex items-center gap-2">
                <span className="text-[#B64DFF]">✦</span> AETHER ACADEMY
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold tracking-widest text-[#D8D8E8] hover:text-white px-3 py-2 rounded-md transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#B64DFF] to-[#4CC9FF] group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center space-x-5">
              <div className="flex items-center gap-3 bg-[#16172F]/80 border border-white/10 rounded-full py-1.5 px-2 pr-4 backdrop-blur-md">
                <Avatar className="w-8 h-8 border-2 border-[#B64DFF]">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=NovaByte&backgroundColor=B64DFF" />
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-none">NovaByte</span>
                  <span className="text-[10px] text-[#B64DFF] font-semibold">Level 24</span>
                </div>
              </div>
              
              <button aria-label="Notifications" className="text-[#9A9AB5] hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5C7A] rounded-full animate-pulse" />
              </button>
              
              <button aria-label="Settings" className="text-[#9A9AB5] hover:text-white transition-colors">
                <Settings className="w-5 h-5 hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#D8D8E8] hover:text-white p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#101126] border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-3 text-sm font-semibold tracking-widest text-[#D8D8E8] hover:bg-[#16172F] hover:text-white rounded-md"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between px-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-[#B64DFF]">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=NovaByte&backgroundColor=B64DFF" />
                      <AvatarFallback>NB</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">NovaByte</span>
                      <span className="text-xs text-[#B64DFF] font-semibold">Level 24</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Bell className="w-5 h-5 text-[#D8D8E8]" />
                    <Settings className="w-5 h-5 text-[#D8D8E8]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
