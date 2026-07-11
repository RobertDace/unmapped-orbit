"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';

const HeroCountdown = () => {
  const [mounted, setMounted] = useState(false);
  
  // Tanggal pendekatan
  const timeElapsed = useCountdown('2025-10-13T00:00:00');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-center space-y-6 py-8">
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">
        A few of <span className="italic text-amber-200 font-light">my favorite</span><br />
        memories of you
      </h2>
      
      <p className="text-xs font-mono text-purple-300/60 uppercase tracking-[0.2em] pt-2">
        Tap any chapter below to unlock the log
      </p>

      {/* Container Utama Timer */}
      <div className="flex flex-col items-center bg-[#12072b]/60 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-8 rounded-3xl max-w-lg mx-auto shadow-2xl space-y-6">
        
        {/* Deretan Angka Flip Clock */}
        <div className="flex justify-center gap-3 sm:gap-6 w-full" style={{ perspective: '800px' }}>
          {Object.entries(timeElapsed).map(([unit, value]) => {
            const formattedValue = value.toString().padStart(2, '0');
            return (
              <div key={unit} className="flex flex-col items-center gap-3">
                
                {/* Frame Kosong di belakang agar tidak tembus pandang saat kertas berputar */}
                <div className="relative w-14 h-16 sm:w-20 sm:h-24 rounded-lg sm:rounded-xl border border-purple-500/30 flex items-center justify-center bg-[#05010a] shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  
                  {/* ANIMASI SELURUH KOTAK (KERTAS + ANGKA) */}
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={formattedValue}
                      initial={{ rotateX: 80, opacity: 0.3, y: -10 }}
                      animate={{ rotateX: 0, opacity: 1, y: 0 }}
                      exit={{ rotateX: -80, opacity: 0.3, y: 10 }}
                      transition={{ 
                        duration: 0.55, 
                        type: "spring", 
                        stiffness: 120, 
                        damping: 14 
                      }}
                      style={{ transformOrigin: "center", transformStyle: "preserve-3d" }}
                      className="absolute inset-0 bg-[#090314] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8)] rounded-lg sm:rounded-xl flex items-center justify-center z-20"
                    >
                      <span className="font-serif text-3xl sm:text-5xl font-bold text-amber-200 tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                        {formattedValue}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  {/* STATIC OVERLAYS (Engsel, Sekrup, & Kaca) -> Harus ada di luar AnimatePresence agar tidak ikut berputar */}
                  
                  {/* Efek kaca/plastik memantul di paruh atas */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30 rounded-t-lg sm:rounded-t-xl" />
                  
                  {/* Garis Engsel Pembelah Mekanikal */}
                  <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black shadow-[0_1px_1px_rgba(255,255,255,0.15)] -translate-y-1/2 z-40" />
                  
                  {/* Ornamen Sekrup Kiri-Kanan */}
                  <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-black/90 -translate-y-1/2 z-40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]" />
                  <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-black/90 -translate-y-1/2 z-40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]" />

                </div>

                {/* Label Hari/Jam/Menit/Detik */}
                <span className="text-[9px] sm:text-[10px] font-mono text-purple-300/70 uppercase tracking-[0.2em]">
                  {unit}
                </span>
              </div>
            );
          })}
        </div>

        {/* Teks Tambahan di Bawah Timer */}
        <div className="pt-2 border-t border-purple-500/20 w-3/4 mx-auto">
          <p className="text-[9px] sm:text-[10px] font-mono text-amber-200/50 uppercase tracking-[0.3em]">
            — time has gracefully passed —
          </p>
        </div>

      </div>
    </div>
  );
};

export default HeroCountdown;