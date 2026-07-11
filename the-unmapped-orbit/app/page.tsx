"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WelcomeGate from './components/WelcomeGate';
import CustomCursor from './components/CustomCursor';
import HeroCountdown from './components/HeroCountdown';
import RomanticDeck from './components/RomanticDeck';
import MusicPlayer from './components/MusicPlayer';
import SurpriseModal from './components/SurpriseModal'; // <-- Sudah memanggil file yang benar

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSecretLetter, setShowSecretLetter] = useState(false);

  if (!isUnlocked) {
    return <WelcomeGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#05010a] text-purple-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      <CustomCursor />
      
      {/* BACKGROUND KOSMIK LIVE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute inset-0 opacity-80" animate={{ backgroundPosition: ["0px 0px", "200px 200px"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ backgroundImage: `radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0))` }} />
        <motion.div className="absolute inset-0 opacity-50" animate={{ backgroundPosition: ["0px 0px", "-200px -200px"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ backgroundImage: `radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(2.5px 2.5px at 130px 80px, #ffffff, rgba(0,0,0,0))` }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4], x: [0, 80, 0], y: [0, -50, 0], rotate: [0, 45, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/50 blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3], x: [0, -80, 0], y: [0, 60, 0], rotate: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/50 blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2], x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-[10%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-fuchsia-600/40 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#05010a_120%)] z-0 pointer-events-none" />
      </div>
      
      {/* Container Konten Utama */}
      <main className="relative z-10 container mx-auto px-4 pb-32">
        <HeroCountdown />
        <RomanticDeck onOpenSurprise={() => setShowSecretLetter(true)} />
      </main>

      <MusicPlayer />

      {/* Memanggil Komponen SurpriseModal yang asli */}
      <SurpriseModal 
        isOpen={showSecretLetter} 
        onClose={() => setShowSecretLetter(false)} 
      />
      
    </div>
  );
}