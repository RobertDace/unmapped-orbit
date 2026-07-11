"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, UtensilsCrossed, Snowflake, Train, Heart, 
  Send, CheckCircle2, Flame, Ticket, Lock, MoonStar, Orbit, Sparkle, RefreshCw
} from 'lucide-react';
import { playPopSFX, playSizzlingSFX, playStampSFX, playTrainSFX } from '../utils/sfx';

interface RomanticDeckProps {
  onOpenSurprise: () => void;
}

const RomanticDeck: React.FC<RomanticDeckProps> = ({ onOpenSurprise }) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('owl');
  const [unlockedTabs, setUnlockedTabs] = useState(['owl']);

  // ==================== STATE UNTUK NOTIFIKASI ALA ELDEN RING ====================
  const [chapterTitleNotif, setChapterTitleNotif] = useState<string | null>(null);
  const [chapterFinishedNotif, setChapterFinishedNotif] = useState<string | null>(null);

  // Trigger Notifikasi Masuk Chapter
  useEffect(() => {
    setMounted(true);
    const chapNames: Record<string, string> = { 
      owl: 'CHAPTER I', aglio: 'CHAPTER II', moscow: 'CHAPTER III', pluto: 'CHAPTER IV' 
    };
    setChapterTitleNotif(chapNames[activeTab]);
    const t = setTimeout(() => setChapterTitleNotif(null), 3000);
    return () => clearTimeout(t);
  }, [activeTab]);

  // Fungsi Trigger Chapter Completed
  const triggerFinished = (title: string) => {
    setChapterFinishedNotif(title);
    setTimeout(() => setChapterFinishedNotif(null), 4000);
  };

  // ==================== LEVEL 1: OWL CHAT & STARS ====================
  const [owlPhase, setOwlPhase] = useState<'chat' | 'stars'>('chat');
  const [starsCaught, setStarsCaught] = useState(0);
  const [starPos, setStarPos] = useState({ top: '25%', left: '75%' });
  const [starBursts, setStarBursts] = useState<{id: number, top: string, left: string}[]>([]);

  const [chats, setChats] = useState([
    { sender: 'them', text: 'belum tidur kah kamu?', time: '02:14 AM' },
    { sender: 'me', text: 'blm kenapa?', time: '02:15 AM' },
  ]);
  const [chatStep, setChatStep] = useState(0);
  const extraChats = [
    { sender: 'them', text: 'gapapaa, kalo kamu gabisa tidur aku siap nemenin kokkk', time: '02:16 AM' },
    { sender: 'me', text: 'preeett', time: '02:16 AM' },
    { sender: 'them', text: 'wkwkwkwkwkwkwk', time: '02:17 AM' }
  ];

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (owlPhase === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, owlPhase]);

  const handleNextChat = () => {
    playPopSFX();
    if (chatStep < extraChats.length) {
      setChats(prev => [...prev, extraChats[chatStep]]);
      setChatStep(prev => prev + 1);
    }
  };

  const handleStarClick = () => {
    playPopSFX();
    const currentPos = { ...starPos };
    const burstId = Date.now();
    setStarBursts(prev => [...prev, { id: burstId, top: currentPos.top, left: currentPos.left }]);
    setTimeout(() => { setStarBursts(prev => prev.filter(b => b.id !== burstId)); }, 800);

    const safePositions = [
      { top: '25%', left: '75%' },
      { top: '65%', left: '20%' },
      { top: '35%', left: '80%' }
    ];
    
    if (starsCaught + 1 === 3) { // Tepat saat menyentuh 3 bintang
      setStarsCaught(3);
      triggerFinished('CHAPTER I COMPLETED');
      if (!unlockedTabs.includes('aglio')) setUnlockedTabs(prev => [...prev, 'aglio']);
    } else {
      const next = starsCaught + 1;
      setStarsCaught(next);
      if (safePositions[next]) setStarPos(safePositions[next]);
    }
  };

  const getOwlNarrative = () => {
    if (owlPhase === 'chat') return "Setiap notifikasi darimu adalah salah satu alasan aku betah terjaga...";
    if (starsCaught === 0) return "Malam itu begitu sunyi, menyisakan rindu yang berterbangan di angkasa.";
    if (starsCaught === 1) return "Satu per satu memori kecil mulai bersinar menerangi malam.";
    if (starsCaught === 2) return "Waktu serasa berhenti, tawa kecil kita terekam sempurna di udara.";
    return "Dan di subuh itu, aku sadar... kenyamanan ini bukan sekadar kebetulan.";
  };

  // ==================== LEVEL 2: AGLIO OLIO INTERACTIVE ====================
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [isCooking, setIsCooking] = useState(false);
  const [isDishReady, setIsDishReady] = useState(false);

  const availableIngredients = [
    { id: 'pasta', label: 'Spaghetti Pasta', detail: 'Waktu' },
    { id: 'garlic', label: 'Bawang & Zaitun', detail: 'Komunikasi' },
    { id: 'chili', label: 'Cabai Flakes & Herb', detail: 'Cerita' },
  ];

  const handleAddIngredient = (id: string) => {
    if (addedIngredients.includes(id) || isCooking || isDishReady) return;
    playPopSFX();
    playSizzlingSFX();
    setAddedIngredients(prev => [...prev, id]);
  };

  const cookAglioOlio = () => {
    playSizzlingSFX();
    setIsCooking(true);
    setTimeout(() => {
      setIsCooking(false);
      setIsDishReady(true);
      triggerFinished('CHAPTER II COMPLETED');
      if (!unlockedTabs.includes('moscow')) setUnlockedTabs(prev => [...prev, 'moscow']);
    }, 2200);
  };

  const resetRecipe = () => {
    setAddedIngredients([]);
    setIsDishReady(false);
  };

  const getAglioNarrative = () => {
    if (addedIngredients.length === 0) return "Kadang hal yang paling mahal datang dari resep kesederhanaan waktu.";
    if (addedIngredients.length === 1) return "Dimulai dengan komunikasi sederhana yang meresap perlahan.";
    if (addedIngredients.length === 2) return "Bercampur dengan cerita lucu dan hangat yang mencairkan suasana.";
    if (addedIngredients.length === 3 && !isCooking && !isDishReady) return "Sempurna. Semua bumbu sudah lengkap.";
    if (isCooking) return "Aroma tawa dan cerita mulai menguar di udara...";
    return "Momen sederhana ini... rasanya cukup untuk bikin aku ketagihan selamanya.";
  };

  // ==================== LEVEL 3: MOSCOW WISH ====================
  const [scratchProgress, setScratchProgress] = useState(0);
  const [showWishTicket, setShowWishTicket] = useState(false);

  const handleScratch = () => {
    playStampSFX();
    if (scratchProgress + 1 >= 4) setScratchProgress(4);
    else setScratchProgress(prev => prev + 1);
  };

  const handleClaimWishTicket = () => {
    playTrainSFX();
    setShowWishTicket(true);
    triggerFinished('CHAPTER III COMPLETED');
    if (!unlockedTabs.includes('pluto')) setUnlockedTabs(prev => [...prev, 'pluto']);
  };

  const getMoscowNarrative = () => {
    if (scratchProgress === 0) return "Udara dingin Moscow membekukan kaca, sebeku harapan yang belum terucap.";
    if (scratchProgress === 1) return "Sedikit demi sedikit, bayangan kota impianmu mulai tergambar jelas.";
    if (scratchProgress === 2) return "Aku selalu percaya, kalau kamu punya langkah yang cukup kuat untuk sampai ke sana.";
    if (scratchProgress === 3) return "Satu usapan lagi... dan lihatlah keindahan yang sedang menantimu.";
    if (scratchProgress >= 4 && !showWishTicket) return "Cita-citamu begitu terang, bersinar bagai katedral di tengah malam salju.";
    return "Ini bukan sekadar tiket. Ini adalah doa dan janji bahwa aku akan selalu mendukungmu Naiqo.";
  };

  // ==================== LEVEL 4: PLUTO PARTICLES ====================
  const [bursts, setBursts] = useState<any[]>([]);
  const triggerBurst = (e: React.MouseEvent) => {
    playPopSFX();
    const newP = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i * 22.5) * (Math.PI / 180),
      distance: Math.random() * 100 + 50,
    }));
    setBursts(newP);
    setTimeout(() => setBursts([]), 1000);
  };

  const getPlutoNarrative = () => {
    if (bursts.length > 0) return "Setiap letupannya, menguatkan alasan kenapa orbit ini hanya untukmu.";
    return "Sejauh apa pun kita melangkah, aku akan selalu menemukan titik untuk mengorbit di sekitarmu.";
  };

  const chapters = [
    { id: 'owl', num: 'CHAPTER I', title: '2 AM Owl Chat', icon: MoonStar },
    { id: 'aglio', num: 'CHAPTER II', title: 'Aglio Olio', icon: UtensilsCrossed },
    { id: 'moscow', num: 'CHAPTER III', title: 'Moscow Wish', icon: Snowflake },
    { id: 'pluto', num: 'CHAPTER IV', title: 'Pluto Orbit', icon: Orbit },
  ];

  if (!mounted) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 py-4 space-y-6">

      {/* ================= OVERLAYS (ELDEN RING POPUPS & SOFT NOTIFS) ================= */}
      
      {/* 1. SOFT CHAPTER ENTERING NOTIFICATION */}
      <AnimatePresence>
        {chapterTitleNotif && !chapterFinishedNotif && (
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed top-24 left-0 w-full z-[90] flex justify-center pointer-events-none"
          >
            <h2 className="font-serif text-xl sm:text-2xl text-purple-200/50 tracking-[0.5em] uppercase">
              {chapterTitleNotif}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ELDEN RING "CHAPTER COMPLETED" POPUP */}
      <AnimatePresence>
        {chapterFinishedNotif && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-[2px]"
          >
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-amber-400/90 tracking-[0.3em] uppercase text-center drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
              {chapterFinishedNotif}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chapter Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        {chapters.map((chap) => {
          const Icon = chap.icon;
          const isUnlocked = unlockedTabs.includes(chap.id);
          const isActive = activeTab === chap.id;
          return (
            <button
              key={chap.id}
              onClick={() => {
                if (isUnlocked) {
                  playPopSFX();
                  setActiveTab(chap.id);
                }
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-purple-900/40 border-amber-300/60 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                  : isUnlocked
                  ? 'bg-[#12072b]/60 border-purple-500/20 hover:border-purple-400/40'
                  : 'bg-black/40 border-purple-950/40 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8px] font-mono tracking-widest text-amber-200/80 uppercase">{chap.num}</span>
                {!isUnlocked && <Lock size={10} className="text-purple-400/50" />}
              </div>
              <p className="text-xs font-serif font-bold text-white truncate flex items-center gap-1.5">
                <Icon size={14} className="text-amber-200/90" /> {chap.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Content Container Frame */}
      <div className="relative min-h-[420px] z-10">
        <AnimatePresence mode="wait" initial={false}>
          
          {/* ================= CHAPTER 1 ================= */}
          {activeTab === 'owl' && (
            <motion.div key="owl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="bg-[#12072b]/80 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-center border-b border-purple-500/20 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-amber-200/80 uppercase tracking-widest">CHAPTER ONE</span>
                  <h3 className="text-lg font-serif font-bold text-white">where it all started</h3>
                </div>
                <div className="flex bg-black/40 p-1 rounded-xl border border-purple-500/20 text-[10px] font-mono">
                  <button onClick={() => setOwlPhase('chat')} className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${owlPhase === 'chat' ? 'bg-purple-900/80 text-amber-200' : 'text-purple-300/60'}`}>1. Chat Log</button>
                  <button onClick={() => setOwlPhase('stars')} className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${owlPhase === 'stars' ? 'bg-purple-900/80 text-amber-200' : 'text-purple-300/60'}`}>2. Wake The Owl ({starsCaught}/3)</button>
                </div>
              </div>
              
              {owlPhase === 'chat' ? (
                <div className="space-y-4 flex-1">
                  <div className="space-y-3 min-h-[160px] max-h-[220px] overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {chats.map((c, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${c.sender === 'me' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${c.sender === 'me' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none' : 'bg-black/50 border border-purple-500/20 text-purple-100 rounded-tl-none'}`}>{c.text}</div>
                        <span className="text-[9px] text-purple-300/40 mt-1 font-mono">{c.time}</span>
                      </motion.div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  {chatStep < extraChats.length ? (
                    <button onClick={handleNextChat} className="w-full py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-200 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"><Send size={14} /> Lanjut Balas Chat ({extraChats.length - chatStep} sisa)</button>
                  ) : (
                    <button onClick={() => setOwlPhase('stars')} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"><Sparkles size={14} /> Bangunkan Burung Hantu Nocturnal </button>
                  )}
                </div>
              ) : (
                <div className="relative h-64 bg-gradient-to-b from-[#0e0622] via-[#140830] to-[#080216] rounded-2xl border border-purple-500/20 flex flex-col items-center justify-center p-4 text-center overflow-hidden shadow-inner flex-1">
                  {starBursts.map(burst => (
                    <div key={burst.id} className="absolute z-20" style={{ top: burst.top, left: burst.left }}>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div key={i} initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }} animate={{ opacity: 0, scale: 1.5, x: Math.cos((i * 45 * Math.PI) / 180) * 50, y: Math.sin((i * 45 * Math.PI) / 180) * 50 }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute text-amber-200"><Sparkle size={12} fill="currentColor" /></motion.div>
                      ))}
                    </div>
                  ))}
                  <div className="absolute top-4 left-6 opacity-30 text-amber-200">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z" /></svg>
                  </div>
                  {starsCaught === 0 && <motion.div animate={{ y: [-5, -20], opacity: [0.8, 0], x: [0, 10] }} transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }} className="absolute top-10 right-[35%] font-mono font-bold text-amber-200/90 text-sm tracking-widest pointer-events-none">Zzz...</motion.div>}
                  <div className="relative w-56 h-40 flex items-center justify-center">
                    <svg className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" viewBox="0 0 200 160" fill="none">
                      <path d="M 0 135 Q 60 122 120 128 T 200 118" stroke="#3b1d5a" strokeWidth="12" strokeLinecap="round" />
                      <path d="M 120 128 Q 140 108 170 102" stroke="#3b1d5a" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 160 100 Q 150 92 162 87 Q 170 94 160 100 Z" fill="#22c55e" />
                      <path d="M 140 104 Q 130 97 142 92 Q 150 99 140 104 Z" fill="#16a34a" />
                      <ellipse cx="85" cy="123" rx="6" ry="3" fill="#fbbf24" />
                      <ellipse cx="105" cy="123" rx="6" ry="3" fill="#fbbf24" />
                      <motion.g animate={{ scaleY: [1, 1.03, 1], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} style={{ originY: "123px", originX: "95px" }}>
                        <path d="M 70 82 Q 65 118 80 123 H 110 Q 125 118 120 82 Z" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                        <path d="M 68 84 L 63 56 L 85 68 L 105 68 L 127 56 L 122 84 Z" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                        <path d="M 82 95 Q 95 101 108 95" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M 85 103 Q 95 109 105 103" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <polygon points="91,76 99,76 95,84" fill="#fbbf24" />
                        <AnimatePresence mode="popLayout">
                          {starsCaught === 0 && (
                            <motion.g key="sleep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                              <path d="M 76 72 Q 82 78 88 72" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                              <path d="M 102 72 Q 108 78 114 72" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                            </motion.g>
                          )}
                          {starsCaught === 1 && (
                            <motion.g key="half" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                              <circle cx="82" cy="71" r="5" fill="#fef08a" />
                              <circle cx="82" cy="71" r="2" fill="#0f172a" />
                              <path d="M 76 68 Q 82 64 88 68" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" fill="none" />
                              <path d="M 102 72 Q 108 78 114 72" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                            </motion.g>
                          )}
                          {starsCaught === 2 && (
                            <motion.g key="awake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                              <circle cx="82" cy="70" r="7" fill="#fef08a" />
                              <circle cx="82" cy="70" r="3" fill="#0f172a" />
                              <circle cx="108" cy="70" r="7" fill="#fef08a" />
                              <circle cx="108" cy="70" r="3" fill="#0f172a" />
                            </motion.g>
                          )}
                          {starsCaught === 3 && (
                            <motion.g key="wide-awake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                              <circle cx="82" cy="70" r="9" fill="#fef08a" className="animate-pulse" />
                              <circle cx="82" cy="70" r="4" fill="#0f172a" />
                              <circle cx="84" cy="68" r="1.5" fill="#ffffff" />
                              <circle cx="108" cy="70" r="9" fill="#fef08a" className="animate-pulse" />
                              <circle cx="108" cy="70" r="4" fill="#0f172a" />
                              <circle cx="110" cy="68" r="1.5" fill="#ffffff" />
                            </motion.g>
                          )}
                        </AnimatePresence>
                      </motion.g>
                    </svg>
                    {starsCaught < 3 && (
                      <motion.button onClick={handleStarClick} style={{ position: 'absolute', top: starPos.top, left: starPos.left }} animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="p-2.5 bg-amber-400/30 border border-amber-300 rounded-full text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.8)] z-10 cursor-pointer"><Sparkle size={18} fill="currentColor" /></motion.button>
                    )}
                  </div>
                </div>
              )}

              {/* Teks Naratif Bawah - Fades berdasarkan state */}
              <div className="mt-6 pt-5 border-t border-purple-500/20 text-center min-h-[60px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={getOwlNarrative()}
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 5 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -5 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm font-serif italic text-amber-200/90 leading-relaxed"
                  >
                    "{getOwlNarrative()}"
                  </motion.p>
                </AnimatePresence>
              </div>

            </motion.div>
          )}

          {/* ================= CHAPTER 2 ================= */}
          {activeTab === 'aglio' && (
            <motion.div key="aglio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="bg-[#12072b]/80 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col relative">
              <div className="flex justify-between items-center border-b border-purple-500/20 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-amber-200/80 uppercase tracking-widest">CHAPTER TWO</span>
                  <h3 className="text-lg font-serif font-bold text-white">simple comfort recipe</h3>
                </div>
                {isDishReady && <button onClick={resetRecipe} className="text-[10px] font-mono text-purple-300/60 hover:text-white flex items-center gap-1 cursor-pointer"><RefreshCw size={12} /> Masak Ulang</button>}
              </div>
              <div className="relative h-64 sm:h-72 rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#180b38] via-[#100628] to-[#080216] flex items-center justify-center overflow-hidden p-4 shadow-inner flex-1">
                <div className="absolute w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                {!isDishReady ? (
                  <div className="relative w-full max-w-sm h-full flex flex-col items-center justify-center">
                    {isCooking && (
                      <div className="absolute top-4 flex gap-4 z-20">
                        <motion.span animate={{ y: [-10, -40], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 0.9 }} className="text-2xl">💨</motion.span>
                        <motion.span animate={{ y: [-10, -50], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.1, delay: 0.2 }} className="text-3xl">💨</motion.span>
                      </div>
                    )}
                    <div className="relative w-48 h-36 flex items-center justify-center">
                      <svg className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]" viewBox="0 0 200 120" fill="none">
                        <path d="M150 60 L195 55 C198 55 200 58 198 62 L188 72 C186 74 182 74 180 72 L145 68 Z" fill="#2d1a4e" stroke="#6b21a8" strokeWidth="2" />
                        <ellipse cx="80" cy="65" rx="70" ry="35" fill="#1e103a" stroke="#a855f7" strokeWidth="3" />
                        <ellipse cx="80" cy="58" rx="64" ry="28" fill="#120726" stroke="#c084fc" strokeWidth="1.5" />
                        <ellipse cx="80" cy="60" rx="52" ry="20" fill="rgba(234, 179, 8, 0.2)" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {addedIngredients.includes('pasta') && (
                          <motion.svg initial={{ y: -80, opacity: 0, scale: 0.6 }} animate={{ y: -5, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-28 h-20 text-amber-200 drop-shadow-md z-10" viewBox="0 0 100 60" fill="none">
                            <path d="M20 30 C30 15, 50 45, 80 25" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
                            <path d="M15 35 C35 20, 55 50, 85 30" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
                            <path d="M25 25 C45 40, 65 15, 75 38" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
                          </motion.svg>
                        )}
                        {addedIngredients.includes('garlic') && (
                          <motion.svg initial={{ y: -80, opacity: 0, scale: 0.6 }} animate={{ y: 2, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-24 h-16 text-purple-200 z-10" viewBox="0 0 80 50" fill="none">
                            <circle cx="30" cy="25" r="6" fill="#f3e8ff" stroke="#c084fc" strokeWidth="2" />
                            <circle cx="50" cy="20" r="5" fill="#f3e8ff" stroke="#c084fc" strokeWidth="2" />
                            <circle cx="42" cy="30" r="6" fill="#f3e8ff" stroke="#c084fc" strokeWidth="2" />
                            <ellipse cx="38" cy="28" rx="18" ry="8" fill="rgba(250, 204, 21, 0.3)" />
                          </motion.svg>
                        )}
                        {addedIngredients.includes('chili') && (
                          <motion.svg initial={{ y: -80, opacity: 0, scale: 0.6 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-24 h-16 z-10" viewBox="0 0 80 50" fill="none">
                            <circle cx="28" cy="22" r="2.5" fill="#ef4444" />
                            <circle cx="52" cy="26" r="3" fill="#ef4444" />
                            <circle cx="40" cy="18" r="2" fill="#ef4444" />
                            <path d="M22 28 Q25 24 28 28 Q25 32 22 28 Z" fill="#22c55e" />
                          </motion.svg>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center text-center space-y-3 z-10">
                    <div className="relative w-44 h-36 flex items-center justify-center">
                      <svg className="w-full h-full drop-shadow-[0_15px_30px_rgba(251,191,36,0.25)]" viewBox="0 0 160 120" fill="none">
                        <ellipse cx="80" cy="70" rx="72" ry="36" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" />
                        <ellipse cx="80" cy="70" rx="56" ry="26" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                        <ellipse cx="80" cy="66" rx="42" ry="20" fill="#fef08a" />
                        <path d="M48 65 C60 50, 90 75, 112 60" stroke="#fde047" strokeWidth="4.5" strokeLinecap="round" />
                        <path d="M52 70 C70 55, 95 80, 110 65" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
                        <path d="M58 60 C75 75, 88 50, 105 72" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx="70" cy="60" r="2.5" fill="#dc2626" />
                        <circle cx="88" cy="68" r="3" fill="#dc2626" />
                        <path d="M62 66 Q65 62 68 66 Z" fill="#16a34a" />
                        <path d="M84 56 Q87 52 90 56 Z" fill="#16a34a" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
              {!isDishReady && (
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {availableIngredients.map(item => {
                      const isAdded = addedIngredients.includes(item.id);
                      return (
                        <button key={item.id} onClick={() => handleAddIngredient(item.id)} disabled={isAdded || isCooking} className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${isAdded ? 'bg-purple-950/40 border-purple-800 text-purple-400/40 cursor-not-allowed opacity-50' : 'bg-[#180b38] border-purple-500/30 text-purple-200 hover:border-amber-300/60 hover:bg-purple-900/40'}`}>
                          <div>
                            <span className="text-[10px] font-mono text-amber-200/90 block font-bold">{item.detail}</span>
                            <span className="text-xs font-serif font-bold text-white block mt-0.5">{item.label}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-lg font-mono ${isAdded ? 'bg-purple-900/60 text-purple-300' : 'bg-amber-400/20 text-amber-200'}`}>{isAdded ? '✓ Masuk' : '+ Tambah'}</span>
                        </button>
                      );
                    })}
                  </div>
                  {addedIngredients.length === 3 && (
                    <button onClick={cookAglioOlio} disabled={isCooking} className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"><Flame size={18} className="text-amber-200 animate-bounce" /> {isCooking ? 'Sedang Menumis di Wajan...' : 'Tumis sekarang !!'}</button>
                  )}
                </div>
              )}

              {/* Teks Naratif Bawah */}
              <div className="mt-6 pt-5 border-t border-purple-500/20 text-center min-h-[60px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p key={getAglioNarrative()} initial={{ opacity: 0, filter: 'blur(4px)', y: 5 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} exit={{ opacity: 0, filter: 'blur(4px)', y: -5 }} transition={{ duration: 0.5 }} className="text-sm font-serif italic text-amber-200/90 leading-relaxed">
                    "{getAglioNarrative()}"
                  </motion.p>
                </AnimatePresence>
              </div>

            </motion.div>
          )}

          {/* ================= CHAPTER 3 ================= */}
          {activeTab === 'moscow' && (
            <motion.div key="moscow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="bg-[#12072b]/80 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col relative">
              <div className="flex justify-between items-center border-b border-purple-500/20 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-amber-200/80 uppercase tracking-widest">CHAPTER THREE</span>
                  <h3 className="text-lg font-serif font-bold text-white">cold moscow wishlist</h3>
                </div>
              </div>
              {/* Bagian yang sempet terhapus: Kondisi jika tiket belum diklaim */}
              {!showWishTicket ? (
                <div className="space-y-4 flex-1">
                  <div onClick={handleScratch} className="relative h-56 rounded-2xl border border-indigo-400/30 flex items-center justify-center p-4 cursor-pointer text-center overflow-hidden shadow-2xl bg-black">
                    <img src="/moscow.jpg" alt="Moscow View" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/13/26/68/21/360_F_1326682127_ZpvK9lwGhsTv3egJOLpQg01nLTIh76re.jpg"; }} />
                    <div className="absolute inset-0 bg-[#12072b]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-all duration-300 z-10" style={{ opacity: (4 - scratchProgress) / 4 }}>
                      <Snowflake size={26} className="text-indigo-200 animate-spin mb-2" />
                      <p className="text-xs font-mono text-indigo-100 font-bold">Usap embun kaca {4 - scratchProgress}x lagi!</p>
                    </div>
                  </div>
                  {scratchProgress >= 4 && (
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={handleClaimWishTicket} className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-600 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"> Ambil Wish Ticket </motion.button>
                  )}
                </div>
              ) : (
                /* ================= TAMPILAN WISH TICKET (REAL BOARDING PASS) ================= */
                <motion.div 
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full flex-1 flex items-center justify-center py-2"
                >
                  <div className="relative flex flex-col sm:flex-row w-full max-w-lg bg-gradient-to-br from-[#1a0f35] to-[#0d051a] border border-amber-300/40 rounded-2xl shadow-[0_15px_40px_rgba(251,191,36,0.15)] overflow-hidden">
                    
                    {/* BAGIAN KIRI (Info Utama Tiket) */}
                    <div className="flex-1 p-5 relative border-b sm:border-b-0 sm:border-r border-dashed border-purple-500/50">
                      
                      {/* Header Tiket */}
                      <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center gap-1.5">
                          <Ticket size={16} className="text-amber-300" />
                          <span className="text-[10px] font-mono font-bold text-amber-200 tracking-[0.2em] uppercase">MOSCOW WISH PASS</span>
                        </div>
                        <span className="text-[8px] bg-amber-500/20 text-amber-300 px-2 py-1 rounded font-mono font-bold tracking-widest">FIRST CLASS</span>
                      </div>

                      {/* Nama Penumpang */}
                      <div className="mb-5">
                        <p className="text-[8px] font-mono text-purple-300/60 uppercase tracking-widest mb-0.5">Passenger Name</p>
                        <p className="text-[15px] font-bold text-white tracking-widest uppercase">NAIQO</p>
                      </div>

                      {/* Rute Penerbangan (CGK -> SVO) */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-left">
                          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-300">CGK</h2>
                          <p className="text-[8px] font-mono text-purple-300/60 uppercase tracking-wider mt-1">Jakarta, INA</p>
                        </div>
                        
                        {/* Garis Putus-putus Pesawat */}
                        <div className="flex-1 flex flex-col items-center px-4">
                          <span className="text-amber-300 text-xl mb-1">✈</span>
                          <div className="w-full border-t border-dashed border-purple-400/40 relative">
                            <div className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full -top-[3.5px] left-0" />
                            <div className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full -top-[3.5px] right-0" />
                          </div>
                        </div>

                        <div className="text-right">
                          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-300">SVO</h2>
                          <p className="text-[8px] font-mono text-purple-300/60 uppercase tracking-wider mt-1">Moscow, RU</p>
                        </div>
                      </div>

                      {/* Grid Detail Tiket */}
                      <div className="grid grid-cols-4 gap-2 border-t border-purple-500/20 pt-4">
                        <div>
                          <p className="text-[7px] font-mono text-purple-300/60 uppercase tracking-wider mb-0.5">Date</p>
                          <p className="text-[10px] font-bold text-amber-100">ANYTIME</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-mono text-purple-300/60 uppercase tracking-wider mb-0.5">Flight</p>
                          <p className="text-[10px] font-bold text-amber-100">ORBT-01</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-mono text-purple-300/60 uppercase tracking-wider mb-0.5">Gate</p>
                          <p className="text-[10px] font-bold text-amber-100">01</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-mono text-purple-300/60 uppercase tracking-wider mb-0.5">Seat</p>
                          <p className="text-[10px] font-bold text-amber-100">1A</p>
                        </div>
                      </div>
                      
                      {/* Potongan Setengah Lingkaran ala Kertas Tiket disobek */}
                      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#12072b]/95 rounded-full border-t border-l border-amber-300/40 hidden sm:block" />
                      <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#12072b]/95 rounded-full border-b border-l border-amber-300/40 hidden sm:block" />
                    </div>

                    {/* BAGIAN KANAN (Barcode & Stub) */}
                    <div className="p-5 w-full sm:w-20 bg-black/20 flex sm:flex-col items-center justify-between gap-4">
                      {/* Barcode Garis-Garis */}
                      <div className="flex sm:flex-col justify-center gap-[3px] h-10 sm:h-full w-full sm:w-auto opacity-70">
                        <div className="h-full sm:h-[2px] w-[2px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[4px] w-[4px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[1px] w-[1px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[6px] w-[6px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[3px] w-[3px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[1px] w-[1px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[5px] w-[5px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[2px] w-[2px] sm:w-full bg-amber-100" />
                        <div className="h-full sm:h-[4px] w-[4px] sm:w-full bg-amber-100" />
                      </div>
                      <div className="text-[9px] font-mono tracking-[0.3em] text-amber-300/50 rotate-0 sm:-rotate-90 origin-center whitespace-nowrap">
                        ORBIT-PASS
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* Teks Naratif Bawah */}
              <div className="mt-6 pt-5 border-t border-purple-500/20 text-center min-h-[60px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p key={getMoscowNarrative()} initial={{ opacity: 0, filter: 'blur(4px)', y: 5 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} exit={{ opacity: 0, filter: 'blur(4px)', y: -5 }} transition={{ duration: 0.5 }} className="text-sm font-serif italic text-amber-200/90 leading-relaxed">
                    "{getMoscowNarrative()}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ================= CHAPTER 4 ================= */}
          {activeTab === 'pluto' && (
            <motion.div
              key="pluto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#12072b]/80 border border-purple-500/30 rounded-3xl p-8 sm:p-12 backdrop-blur-2xl shadow-2xl text-center relative overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                {bursts.map(p => (
                  <motion.div key={p.id} initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }} animate={{ opacity: 0, x: Math.cos(p.angle) * p.distance, y: Math.sin(p.angle) * p.distance, scale: 1.5 }} transition={{ duration: 1, ease: "easeOut" }} className="absolute text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"><Sparkle size={10} fill="currentColor" /></motion.div>
                ))}
              </div>

              <div className="relative h-64 flex flex-col items-center justify-center mt-4">
                <div className="absolute w-72 h-72 bg-gradient-to-tr from-purple-600/10 via-pink-500/5 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer group" onClick={triggerBurst}>
                  <div className="absolute w-full h-full border-[1px] border-dashed border-amber-200/20 rounded-full animate-[spin_25s_linear_infinite]" />
                  <div className="absolute w-44 h-44 border-[1px] border-solid border-purple-400/20 rounded-full" />
                  <div className="absolute w-28 h-28 border border-dashed border-purple-300/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  <motion.div className="absolute w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-tr from-[#1e1b4b] to-[#c084fc] rounded-full shadow-[0_0_20px_#c084fc] border border-purple-300/60 flex items-center justify-center z-10">
                      <div className="w-10 h-10 absolute border border-amber-100/30 rounded-full transform -rotate-12 scale-x-[1.8] pointer-events-none" />
                    </div>
                  </motion.div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.6)] group-hover:scale-110 transition-transform duration-500 border border-pink-300/50">
                    <Heart size={24} className="text-white animate-pulse" fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 z-10 relative mb-8">
                <span className="text-[10px] font-mono text-amber-200/80 uppercase tracking-[0.25em] relative inline-block">
                  <span className="absolute -left-8 top-1/2 w-5 h-[1px] bg-amber-400/30" />CHAPTER FOUR<span className="absolute -right-8 top-1/2 w-5 h-[1px] bg-amber-400/30" />
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  Setia Mengorbit <span className="italic text-amber-200 font-light drop-shadow-md">Seperti Pluto</span>
                </h3>
              </div>

              <button onClick={(e) => { triggerBurst(e); onOpenSurprise(); }} className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#0a0418]/60 hover:bg-[#1a0b38]/80 border border-amber-300/30 hover:border-amber-300/80 text-amber-200 font-mono text-[10px] uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] transition-all duration-500 overflow-hidden cursor-pointer w-3/4 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="flex items-center gap-3 relative z-10"><Sparkles size={14} className="text-amber-300" /> BUKA SURAT RAHASIA AKHIR</span>
              </button>

              {/* Teks Naratif Bawah */}
              <div className="mt-auto pt-5 border-t border-purple-500/20 text-center min-h-[60px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p key={getPlutoNarrative()} initial={{ opacity: 0, filter: 'blur(4px)', y: 5 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} exit={{ opacity: 0, filter: 'blur(4px)', y: -5 }} transition={{ duration: 0.5 }} className="text-sm font-serif italic text-amber-200/90 leading-relaxed">
                    "{getPlutoNarrative()}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default RomanticDeck;