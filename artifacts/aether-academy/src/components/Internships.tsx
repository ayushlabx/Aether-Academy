import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import cityImg from '@assets/generated_images/internships-city.jpg';

export default function Internships() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl overflow-hidden relative min-h-[250px] flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#08081A] via-[#08081A]/90 to-transparent z-10" />
        <img src={cityImg} alt="Cyberpunk City" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 p-8 md:p-12 w-full md:w-2/3">
        <h3 className="font-heading font-bold text-white flex items-center gap-2 uppercase tracking-wider text-sm mb-4">
          <Briefcase className="w-4 h-4 text-[#4AE8FF]" /> INTERNSHIPS
        </h3>
        
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4 leading-tight">
          Kickstart your career in <span className="text-gradient-cyan">Cybersecurity</span>
        </h2>
        
        <p className="text-sm text-[#D8D8E8] mb-8 max-w-md leading-relaxed">
          Level up your real-world experience. Apply for exclusive cloud security internships with top tech partners available only to Aether Academy graduates.
        </p>
        
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4CC9FF]/20 to-[#B64DFF]/20 border border-[#4CC9FF]/50 text-white font-bold tracking-wider hover:bg-[#4CC9FF]/30 transition-all flex items-center gap-2">
          VIEW INTERNSHIPS <span className="text-xs">▶</span>
        </button>
      </div>
    </motion.div>
  );
}
