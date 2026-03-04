"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Box, Layers, Zap, MousePointer2, Send, ArrowRight } from 'lucide-react';

export default function ArtSolutionFinal() {
  // 1. STATE DEFINITIONS
  const [isLoading, setIsLoading] = useState(true);
  const [dark, setDark] = useState(true);

  // 2. THEME LOGIC
  useEffect(() => {
    // This applies the theme to the <html> tag for your CSS to read
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // 3. PRELOADER TIMER
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* --- THE SPLASH SCREEN --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              <motion.path
                d="M50 15 L20 85 h15 L50 45 L65 85 h15 Z" 
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={{ pathLength: 0, fill: "rgba(168, 85, 247, 0)" }}
                animate={{ 
                  pathLength: 1, 
                  fill: "rgba(168, 85, 247, 1)"
                }}
                transition={{
                  pathLength: { duration: 1.5, ease: "easeInOut" },
                  fill: { duration: 0.4, delay: 1.5, ease: "easeIn" }
                }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 3D FLOATING BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" 
        />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-[100]">
        <div className="glass-card rounded-3xl px-8 py-4 flex justify-between items-center border border-white/10">
          <div className="text-2xl font-black tracking-tighter italic">
            ART<span className="text-purple-500">.</span>SOLUTION
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setDark(!dark)}
              className="p-3 rounded-2xl bg-zinc-500/10 hover:bg-zinc-500/20 transition-all text-purple-500"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden md:block bg-purple-600 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/20">
              Inquire
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center min-h-screen text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1 }}
          className="perspective-1000 flex flex-col items-center"
        >
          {/* 3D FLOATING CRYSTAL OBJECT */}
          <div className="relative w-32 h-32 mb-12 perspective-1000">
            <motion.div
              animate={{ 
                rotateY: 360, 
                rotateX: [20, 0, 20],
                y: [0, -20, 0] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute inset-0 bg-gradient-to-t from-purple-600/40 to-blue-400/10 border border-white/20"
                  style={{
                    transform: `rotateY(${deg}deg) translateZ(50px) rotateX(30deg)`,
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                  }}
                />
              ))}
            </motion.div>
          </div>

          <h1 className="text-6xl md:text-[11rem] font-black leading-none tracking-tighter italic uppercase">
            Artistic <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">
              Intelligence.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl text-lg md:text-xl font-light text-zinc-500"
        >
          Where complex engineering meets 3D artistic soul. We don't build pages; we build digital sculptures.
        </motion.p>

        <motion.div className="mt-12 flex gap-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
          <button className="glass-card px-10 py-5 rounded-2xl font-bold flex items-center gap-3 group">
            START THE EXPERIENCE <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* 3D BENTO GRID (FEATURES) */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {[
          { icon: <Box className="text-purple-500" />, title: "3D Spatial Design", desc: "Websites that live in 3D space, reacting to depth and motion." },
          { icon: <Layers className="text-blue-500" />, title: "Recursive UI", desc: "Interfaces within interfaces. Complex yet flawlessly intuitive." },
          { icon: <Zap className="text-yellow-500" />, title: "Kinetic Speed", desc: "Optimized for the 2026 web. Instant load, zero friction." }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10, rotateY: 5 }}
            className="glass-card p-10 rounded-[2.5rem] border border-white/5 h-full"
          >
            <div className="mb-6 bg-white/5 w-fit p-4 rounded-2xl">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* 3D GALLERY SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black italic mb-16 tracking-tighter">SELECTED ARTIFACTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div whileHover={{ scale: 0.98 }} className="aspect-[4/5] glass-card rounded-[3rem] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <p className="text-xs font-bold tracking-[0.3em] opacity-50 uppercase mb-2">Web Design / 2026</p>
                <h4 className="text-4xl font-black italic">ORBITAL SYSTEMS</h4>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="aspect-[4/5] glass-card rounded-[3rem] overflow-hidden relative group mt-12 md:mt-24">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <p className="text-xs font-bold tracking-[0.3em] opacity-50 uppercase mb-2">Identity / 2026</p>
                <h4 className="text-4xl font-black italic">CRYSTAL LOGIC</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-40 px-6 flex justify-center">
        <div className="w-full max-w-4xl glass-card rounded-[4rem] p-12 md:p-24 border border-white/10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1">
              <h2 className="text-6xl font-black italic leading-none mb-6">REACH <br />OUT.</h2>
              <p className="text-zinc-500">Currently accepting high-impact creative partnerships for Q3 2026.</p>
            </div>
            <form className="flex-[1.5] space-y-6">
              <input type="text" placeholder="YOUR IDENTITY" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all font-bold text-xs tracking-widest" />
              <textarea placeholder="THE VISION" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all font-bold text-xs tracking-widest" />
              <button className="w-full bg-purple-600 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-purple-500 shadow-xl shadow-purple-500/20 flex justify-center items-center gap-3 group">
                SEND SIGNAL <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="text-3xl font-black italic tracking-tighter mb-8">ART SOLUTION</div>
        <div className="flex justify-center gap-12 text-[10px] font-bold tracking-[0.5em] uppercase text-zinc-500">
          <span>Twitter</span>
          <span>Behance</span>
          <span>Awwwards</span>
        </div>
      </footer>
    </main>
  );
}