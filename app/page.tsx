"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, Cpu, Layers } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function RefractStyleAgency() {
  const [isLoading, setIsLoading] = useState(true);
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    }
    return true;
  });
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      nav: ["Home", "About", "Works"],
      workWithUs: "Work With Us",
      heroBadge: "2 more Q1 spots available",
      heroTitle1: "Defining",
      heroTitle2: "Digital Identity",
      heroDesc: "We merge the precision of code with the power of design, orchestrating a single identity that signals authority everywhere.",
      explore: "Explore our services",
      capabilitiesTitle: "The full spectrum of core capabilities",
      capabilitiesDesc: "We replace the need for multiple vendors. From brand identity to custom software, we build the entire ecosystem your business runs on.",
      webDev: "Web Development",
      webDevDesc: "Transform concepts into high-performance experiences. Engineering story-driven websites and premium digital products.",
      branding: "Branding",
      brandingDesc: "We build strategic identities designed to secure a premium market position.",
      software: "Software / AI",
      softwareDesc: "We replace manual processes with intelligent software tailored to your specific operations.",
      everything1: "Everything in",
      everything2: "One Place",
      seeMore: "See More"
    },
    fr: {
      nav: ["Accueil", "À propos", "Projets"],
      workWithUs: "Collaborer",
      heroBadge: "2 places supplémentaires disponibles au T1",
      heroTitle1: "Définir",
      heroTitle2: "L'Identité Numérique",
      heroDesc: "Nous fusionnons la précision du code avec la puissance du design, orchestrant une identité unique qui signale l'autorité partout.",
      explore: "Explorer nos services",
      capabilitiesTitle: "Le spectre complet de nos capacités",
      capabilitiesDesc: "Nous remplaçons le besoin de multiples fournisseurs. De l'identité de marque aux logiciels sur mesure, nous construisons l'écosystème entier sur lequel repose votre entreprise.",
      webDev: "Développement Web",
      webDevDesc: "Transformez des concepts en expériences de haute performance. Ingénierie de sites web narratifs et de produits numériques premium.",
      branding: "Stratégie de Marque",
      brandingDesc: "Nous construisons des identités stratégiques conçues pour garantir un positionnement de marché premium.",
      software: "Logiciel / IA",
      softwareDesc: "Nous remplaçons les processus manuels par des logiciels intelligents adaptés à vos opérations spécifiques.",
      everything1: "Tout en",
      everything2: "Un Seul Endroit",
      seeMore: "Voir plus"
    }
  };

  const t = content[lang];

  // Using a simple opacity fade prevents the layout from jumping
  const textFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  return (
    <main className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500 overflow-hidden font-sans">
      
      {/* 1. SPLASH SCREEN PRELOADER */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <motion.path
                d="M50 15 L20 85 h15 L50 45 L65 85 h15 Z" 
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={{ pathLength: 0, fill: "rgba(168, 85, 247, 0)" }}
                animate={{ pathLength: 1, fill: "rgba(168, 85, 247, 1)" }}
                transition={{
                  pathLength: { duration: 1.5, ease: "easeInOut" },
                  fill: { duration: 0.4, delay: 1.5, ease: "easeIn" }
                }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      {/* 3. NAVBAR COMPONENT */}
      <Navbar dark={dark} setDark={setDark} lang={lang} setLang={setLang} />

      {/* 4. SPLIT HERO SECTION */}
      <section className="relative z-10 pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 min-h-[90vh]">
        <div className="flex-1">
          <div className="h-8 mb-4">
            <motion.div 
              key={`badge-${lang}`}
              {...textFade}
              className="inline-flex items-center gap-2 bg-[var(--card-bg)] backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              {t.heroBadge}
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 overflow-hidden min-h-[140px]">
            <motion.span key={`t1-${lang}`} {...textFade} className="block">{t.heroTitle1}</motion.span>
            <motion.span 
               key={`t2-${lang}`} 
               {...textFade} 
               className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 block"
            >
              {t.heroTitle2}
            </motion.span>
          </h1>
          
          <div className="min-h-[100px]">
            <motion.p 
              key={`desc-${lang}`}
              {...textFade}
              className="text-lg opacity-70 max-w-lg leading-relaxed"
            >
              {t.heroDesc}
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
            <button className="bg-[var(--text-color)] text-[var(--bg-color)] px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 w-full sm:w-auto min-w-[200px]">
              <motion.span key={`btn1-${lang}`} {...textFade} className="block">{t.workWithUs}</motion.span>
            </button>
            <button className="flex items-center gap-2 font-medium hover:opacity-70 transition-opacity group min-w-[200px]">
              <motion.span key={`btn2-${lang}`} {...textFade} className="flex items-center gap-2">
                {t.explore} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </button>
          </div>
        </div>

        <div className="flex-1 w-full perspective-1000 flex justify-center">
          <motion.div
            animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-80 h-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute w-40 h-40 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center shadow-[inset_0_0_50px_rgba(168,85,247,0.3)] transform translate-z-12">
               <Cpu size={60} className="text-purple-400 opacity-80" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CAPABILITIES BENTO GRID */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 min-h-[120px]">
          <motion.h2 key={`cap-t-${lang}`} {...textFade} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.capabilitiesTitle}</motion.h2>
          <motion.p key={`cap-d-${lang}`} {...textFade} className="opacity-70 max-w-2xl mx-auto">{t.capabilitiesDesc}</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Web Dev */}
          <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <Code2 className="text-purple-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-3"><motion.span key={`card1-t-${lang}`} {...textFade}>{t.webDev}</motion.span></h3>
              <div className="min-h-[60px] mb-8">
                <motion.p key={`card1-d-${lang}`} {...textFade} className="opacity-70 max-w-sm">{t.webDevDesc}</motion.p>
              </div>
              <button className="text-sm font-semibold flex items-center gap-2 group-hover:text-purple-400 transition-colors">
                <motion.span key={`card1-s-${lang}`} {...textFade} className="flex items-center gap-2">{t.seeMore} <ArrowRight size={14} /></motion.span>
              </button>
            </div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Card 2: Branding */}
          <motion.div whileHover={{ y: -5 }} className="bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <Sparkles className="text-indigo-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-3"><motion.span key={`card2-t-${lang}`} {...textFade}>{t.branding}</motion.span></h3>
              <div className="min-h-[80px] mb-8">
                <motion.p key={`card2-d-${lang}`} {...textFade} className="opacity-70">{t.brandingDesc}</motion.p>
              </div>
              <button className="text-sm font-semibold flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                <motion.span key={`card2-s-${lang}`} {...textFade} className="flex items-center gap-2">{t.seeMore} <ArrowRight size={14} /></motion.span>
              </button>
            </div>
          </motion.div>

          {/* Card 3: Software / AI */}
          <motion.div whileHover={{ y: -5 }} className="bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <Layers className="text-blue-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-3"><motion.span key={`card3-t-${lang}`} {...textFade}>{t.software}</motion.span></h3>
              <div className="min-h-[80px] mb-8">
                <motion.p key={`card3-d-${lang}`} {...textFade} className="opacity-70">{t.softwareDesc}</motion.p>
              </div>
              <button className="text-sm font-semibold flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                <motion.span key={`card3-s-${lang}`} {...textFade} className="flex items-center gap-2">{t.seeMore} <ArrowRight size={14} /></motion.span>
              </button>
            </div>
          </motion.div>

          {/* Card 4: Everything in One Place */}
          <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10 flex w-full h-full">
              <div className="flex-1">
                <h3 className="text-4xl font-bold mb-4">
                  <motion.span key={`card4-t1-${lang}`} {...textFade} className="block">{t.everything1}</motion.span>
                  <motion.span key={`card4-t2-${lang}`} {...textFade} className="block">{t.everything2}</motion.span>
                </h3>
              </div>
              <div className="flex-1 flex justify-end items-center">
                 <div className="w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent border border-white/10 rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-500">
                    <Layers size={48} className="text-white/50" />
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}