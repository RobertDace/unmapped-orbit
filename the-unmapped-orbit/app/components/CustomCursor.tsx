"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Deteksi posisi mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fisika pegas (spring)
  const springDot = { damping: 25, stiffness: 300, mass: 0.5 };
  const springAura = { damping: 40, stiffness: 100, mass: 0.8 };

  const dotX = useSpring(cursorX, springDot);
  const dotY = useSpring(cursorY, springDot);
  const auraX = useSpring(cursorX, springAura);
  const auraY = useSpring(cursorY, springAura);

  useEffect(() => {
    // FUNGSI CEK DEVICE: Harus memiliki mouse (pointer: fine) DAN layar lebar (bukan HP)
    const checkDevice = () => {
      if (window.matchMedia("(pointer: fine)").matches && window.innerWidth > 768) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    // Cek saat pertama kali dimuat
    checkDevice();

    // Cek ulang jika ukuran layar berubah (misal dari landscape ke portrait)
    window.addEventListener('resize', checkDevice);

    // Jika di Desktop, nyalakan deteksi mouse
    if (isDesktop) {
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };
      window.addEventListener('mousemove', moveCursor);
      
      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('resize', checkDevice);
      };
    }

    return () => window.removeEventListener('resize', checkDevice);
  }, [cursorX, cursorY, isDesktop]);

  // Jika bukan desktop, jangan render apapun
  if (!isDesktop) return null;

  return (
    <>
      {/* Titik Inti Kursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-amber-300 rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_10px_#fde047] hidden md:block"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      
      {/* Aura Kursor (DIPERKECIL dari w-24 h-24 menjadi w-12 h-12) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-purple-400/30 bg-purple-500/10 rounded-full pointer-events-none z-[9998] backdrop-blur-[2px] hidden md:block"
        style={{ x: auraX, y: auraY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}