"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Star } from 'lucide-react';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SurpriseModal: React.FC<SurpriseModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
          
          {/* Latar Belakang Gelap / Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Kartu Surat Hologram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0e0620]/90 backdrop-blur-2xl border border-purple-500/40 rounded-3xl shadow-[0_0_80px_rgba(124,58,237,0.4)] overflow-hidden"
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            {/* Ornamen Cahaya di Sudut */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/30 rounded-full blur-[60px]" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-[60px]" />

            {/* Tombol Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 p-8 sm:p-10 space-y-6">
              
              {/* Header Surat */}
              <div className="flex flex-col items-center justify-center space-y-3 pb-4 border-b border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                  <Heart size={20} className="text-[#0e0620]" fill="currentColor" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-wider drop-shadow-md">
                  Surat Rahasia
                </h2>
                <p className="text-[10px] font-mono text-purple-300/60 uppercase tracking-[0.3em]">
                  <Sparkles size={10} className="inline mr-1 text-amber-300" />
                  Unlocked Chapter
                  <Sparkles size={10} className="inline ml-1 text-amber-300" />
                </p>
              </div>

              {/* Isi Surat Romantis */}
              <div className="space-y-4 text-sm sm:text-base text-purple-100/90 font-serif leading-relaxed italic relative">
                <Star size={16} className="absolute -top-4 -left-2 text-purple-400/30" />
                
                <p>
                  Setiap kali mengingat rute Probolinggo menuju Jogja, rasanya perjalanan bus di tanggal 23 Juni 2026 itu menjadi awal dari rute paling membahagiakan yang pernah aku tempuh.
                </p>
                <p>
                  Jarak tidak pernah benar-benar terasa jauh kalau pada akhirnya ujung dari perjalanan itu adalah kamu, iya kamu Naiqo. 
                </p>
                <p>
                  Nanti, kita luangkan waktu lagi yaa untuk liburan kita ke kebun binatang dan ngelihat burung heartopia lagii, sama nanti kita me time di villa sambil netflix and chill film horror bareng kamu. 
                </p>
                <p>
                  Terima kasih banyak yaa naiqo sudah menetap dan mengorbit di duniaku sayaangg.
                </p>
                
                <Star size={12} className="absolute -bottom-2 right-4 text-amber-400/30" />
              </div>

              {/* Tanda Tangan */}
              <div className="pt-6 text-right">
                <p className="text-xs font-mono text-purple-300/60 uppercase tracking-widest mb-2">Yours truly,</p>
                <p className="font-serif text-2xl text-amber-200 font-bold drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
                  — Robit.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SurpriseModal;