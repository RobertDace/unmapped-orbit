"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronDown, Sparkles, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 🎵 DAFTAR PLAYLIST LAGU KAMU
// ==========================================
const playlist = [
  {
    title: "City Of Stars",
    artist: "Ryan Gosling & Emma Stone",
    cover: "https://i.scdn.co/image/ab67616d0000b2730bdf4dd39843ad48c5b66bc4", 
    src: "/audio/City Of Stars.mp3" 
  },
  {
    title: "Mia & Sebastian’s Theme",
    artist: "Justin Hurwitz • La La Land",
    cover: "https://i.scdn.co/image/ab67616d0000b2730bdf4dd39843ad48c5b66bc4",
    src: "/audio/lalaland.mp3"
  },

];

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [showToast, setShowToast] = useState(true);

  const currentTrack = playlist[trackIndex];

  // ==========================================
  // FITUR BARU: AUTO-PLAY SAAT GERBANG TERBUKA
  // ==========================================
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Mencoba memutar lagu secara otomatis
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay berhasil!
            setIsPlaying(true);
          })
          .catch((error) => {
            // Autoplay gagal (biasanya kalau di-refresh tanpa lewat gerbang)
            console.log("Autoplay dicegah oleh browser:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []); // Array kosong berarti hanya dijalankan SATU KALI saat Music Player muncul


  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, [trackIndex]);

  // Efek ketika lagu diganti
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [trackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => handleNext(); 

    if (audio.readyState >= 1) setAudioData();

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    const fallbackInterval = setInterval(() => {
      if (audio.readyState >= 1 && audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    }, 1000);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      clearInterval(fallbackInterval);
    };
  }, [trackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    
    audio.currentTime = percentage * duration;
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <audio ref={audioRef} src={currentTrack.src} />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 sm:top-10 left-1/2 z-[100] bg-[#170c38]/90 border border-amber-300/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-xl shadow-2xl flex items-center gap-2 text-[9px] sm:text-xs text-amber-200 font-mono w-max max-w-[90vw]"
          >
            <Sparkles size={12} className="text-amber-300 animate-pulse shrink-0" />
            <span className="truncate">Now Playing: <strong>{currentTrack.title}</strong></span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-[90] flex justify-start pointer-events-none">
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.button
              key="minimized"
              initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
              onClick={() => setIsMinimized(false)}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-purple-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer group pointer-events-auto overflow-hidden bg-black"
            >
              <img 
                src={currentTrack.cover} 
                alt="Album Cover" 
                className={`absolute inset-0 w-full h-full object-cover rounded-full ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} 
              />
              <div className="absolute w-4 h-4 bg-black rounded-full border border-purple-500/50 z-10" />
              <div className="absolute inset-0 rounded-full border border-white/10" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-[#12072b]/95 border border-purple-500/30 p-3.5 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center gap-3.5 w-full sm:min-w-[360px] max-w-sm relative pointer-events-auto"
            >
              <button
                onClick={() => setIsMinimized(true)}
                className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1e103c] border border-purple-500/50 flex items-center justify-center text-purple-200 hover:text-amber-200 transition-colors cursor-pointer shadow-lg z-20"
              >
                <ChevronDown size={14} />
              </button>

              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-purple-400/20 group">
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-[12px] sm:text-xs font-serif font-bold text-white truncate drop-shadow-md">
                  {currentTrack.title}
                </h4>
                <p className="text-[10px] font-mono text-purple-300/70 truncate mt-0.5">
                  {currentTrack.artist}
                </p>

                <div 
                  className="w-full h-1.5 sm:h-2 bg-black/50 border border-purple-900/50 rounded-full mt-2 relative cursor-pointer group/slider"
                  onClick={handleSeek}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-amber-300 rounded-full"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full shadow-[0_0_8px_rgba(251,191,36,0.9)] opacity-0 group-hover/slider:opacity-100 transition-opacity transform translate-x-1/2" />
                  </div>
                </div>

                <div className="flex justify-between text-[8px] sm:text-[9px] font-mono text-purple-300/60 pt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 pl-1">
                <button onClick={handlePrev} className="text-purple-300/70 hover:text-white transition-colors p-1 cursor-pointer">
                  <SkipBack size={14} fill="currentColor" />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-200/50 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                </button>
                
                <button onClick={handleNext} className="text-purple-300/70 hover:text-white transition-colors p-1 cursor-pointer">
                  <SkipForward size={14} fill="currentColor" />
                </button>

                <button onClick={toggleMute} className="text-purple-300/50 hover:text-amber-200 transition-colors p-1 cursor-pointer ml-1">
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={16} />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MusicPlayer;