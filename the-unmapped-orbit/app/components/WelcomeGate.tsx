"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, ArrowRight, Sparkles, Quote } from 'lucide-react';

interface WelcomeGateProps {
  onUnlock: () => void;
}

const WelcomeGate: React.FC<WelcomeGateProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [isError, setIsError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi passcode diubah menjadi "Quintessa Xylophia" (case-insensitive)
    if (passcode.toLowerCase() === 'quintessa xylophia') {
      onUnlock();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden z-20 bg-[#05010a]">
      
      {/* ==================================================== */}
      {/* 1. ANIMATED COSMIC BACKGROUND                        */}
      {/* ==================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-80"
          animate={{ backgroundPosition: ["0px 0px", "200px 200px"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ backgroundImage: `radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0))`, backgroundSize: '200px 200px' }}
        />
        <motion.div 
          className="absolute inset-0 opacity-50"
          animate={{ backgroundPosition: ["0px 0px", "-200px -200px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ backgroundImage: `radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(2.5px 2.5px at 130px 80px, #ffffff, rgba(0,0,0,0))`, backgroundSize: '200px 200px' }}
        />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6], x: [0, 80, 0], y: [0, -50, 0], rotate: [0, 45, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/60 blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5], x: [0, -80, 0], y: [0, 60, 0], rotate: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/60 blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4], x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-[15%] left-[15%] w-[70vw] h-[70vw] rounded-full bg-fuchsia-600/50 blur-[120px]" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#05010a_120%)] z-0 pointer-events-none" />

      {/* ==================================================== */}
      {/* 2. KARTU GERBANG DENGAN FILOSOFI                     */}
      {/* ==================================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, y: [-12, 12, -12] }}
        transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        onMouseMove={handleMouseMove}
        className="group w-full max-w-lg bg-[#0a0415]/70 backdrop-blur-2xl border border-purple-500/40 rounded-[2rem] p-8 sm:p-10 shadow-[0_0_60px_rgba(168,85,247,0.4)] relative z-10 overflow-hidden my-auto"
      >
        {/* Spotlight Glow Mask */}
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0 rounded-[2rem]"
          style={{ background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(217,70,239,0.25), transparent 40%)' }} 
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/60 to-fuchsia-600/40 border border-purple-300/50 flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.5)] backdrop-blur-md">
              <Heart size={24} className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]" fill="currentColor" />
            </div>
            <div className="absolute -top-2 -right-3 text-amber-300 animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,1)]">
              <Sparkles size={18} fill="currentColor" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[9px] sm:text-[10px] font-mono text-purple-200/90 uppercase tracking-[0.3em] drop-shadow-md">
              A Special Space For Us
            </h4>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide drop-shadow-[0_2px_15px_rgba(168,85,247,0.8)]">
              The Unmapped Orbit
            </h1>
          </div>

          {/* ==================================================== */}
          {/* BLOK FILOSOFI QUINTESSA XYLOPHIA                     */}
          {/* ==================================================== */}
          <div className="relative w-full bg-gradient-to-r from-purple-900/30 to-transparent border-l-2 border-amber-300/60 p-4 sm:p-5 rounded-r-2xl text-left shadow-inner">
            <Quote size={16} className="absolute top-4 right-4 text-purple-300/20" />
            <p className="text-[10px] sm:text-xs font-serif italic text-purple-100/90 leading-relaxed drop-shadow-sm">
              <span className="text-amber-200 font-semibold font-sans not-italic block mb-2 text-[11px] uppercase tracking-widest">Quintessa Xylophia</span>
              "Quintessa mencari kedalaman esensi, sementara Xylophia menyediakan fondasi kebijaksanaan untuk menopangnya."
              <br /><br />
              Keduanya membentuk siklus pemahaman: <strong className="text-purple-200 font-semibold">Q</strong> mewakili tujuan akhir (esensi), sedangkan <strong className="text-purple-200 font-semibold">X</strong> mewakili proses perjalanan (kebijaksanaan). Tanpa fondasi X, Q hanyalah ide yang melayang; tanpa tujuan Q, X hanyalah struktur kaku tanpa makna.
            </p>
          </div>

          {/* Form Input Passcode */}
          <form onSubmit={handleSubmit} className="w-full space-y-4 pt-2 relative z-20">
            <motion.div animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }} className="relative">
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan: Quintessa Xylophia"
                className={`w-full bg-[#0a0415]/50 border ${isError ? 'border-red-500/70 focus:border-red-400' : 'border-purple-400/50 focus:border-fuchsia-400'} rounded-2xl px-5 py-4 text-sm text-white placeholder:text-purple-200/40 outline-none transition-all duration-300 backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]`}
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-300/80"><Lock size={16} /></div>
            </motion.div>
            <button type="submit" className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-white font-semibold text-sm rounded-2xl px-5 py-4 shadow-[0_0_25px_rgba(217,70,239,0.6)] hover:shadow-[0_0_45px_rgba(217,70,239,0.9)] transition-all duration-300 cursor-pointer active:scale-95">
              Buka Gerbang Orbit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeGate;