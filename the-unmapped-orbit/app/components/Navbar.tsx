"use client";
import React from 'react';
import { Disc } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-30 relative">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 text-white">
        <Disc size={18} className="text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span className="font-serif font-bold text-sm tracking-wide">The Unmapped Orbit</span>
      </div>

      {/* Navigation Links (image_a263a3.jpg) */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-purple-200/70">
        <a href="#surface" className="hover:text-amber-200 transition-colors">Surface</a>
        <a href="#memories" className="hover:text-amber-200 transition-colors">Our Memories</a>
        <a href="#orbit" className="hover:text-amber-200 transition-colors">The Orbit</a>
        <a href="#letter" className="hover:text-amber-200 transition-colors">The Letter</a>
        <a href="#wishes" className="hover:text-amber-200 transition-colors">Wishes</a>
      </nav>
    </header>
  );
};

export default Navbar;