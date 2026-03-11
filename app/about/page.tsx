"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Code2, Sparkles, Cpu, Layers, ArrowRight } from 'lucide-react';

export default function About() {
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

  const content = {
    en: {
      title: "About Art Solution Agency",
      subtitle: "We merge the precision of code with the power of design",
      missionTitle: "Our Mission",
      missionDesc: "To transform digital landscapes by creating innovative solutions that blend strategic design with cutting-edge technology. We believe every business deserves a premium digital identity.",
      teamTitle: "Our Team",
      teamDesc: "A collective of passionate developers, designers, and strategists dedicated to delivering excellence.",
      services: [
        { icon: "code", title: "Web Development", desc: "High-performance, story-driven websites and digital products crafted with precision." },
        { icon: "sparkles", title: "Branding", desc: "Strategic identities designed to secure premium market positioning and lasting impact." },
        { icon: "layers", title: "Software & AI", desc: "Intelligent custom solutions that replace manual processes and streamline operations." }
      ]
    },
    fr: {
      title: "À Propos de Art Solution Agency",
      subtitle: "Nous fusionnons la précision du code avec la puissance du design",
      missionTitle: "Notre Mission",
      missionDesc: "Transformer les paysages numériques en créant des solutions innovantes qui mélangent la conception stratégique et la technologie de pointe. Nous croyons que chaque entreprise mérite une identité numérique premium.",
      teamTitle: "Notre Équipe",
      teamDesc: "Un collectif de développeurs, designers et stratèges passionnés dédiés à l'excellence.",
      services: [
        { icon: "code", title: "Développement Web", desc: "Sites web performants et produits numériques premium fabriqués avec précision." },
        { icon: "sparkles", title: "Stratégie de Marque", desc: "Identités stratégiques conçues pour garantir le positionnement premium du marché." },
        { icon: "layers", title: "Logiciel & IA", desc: "Solutions intelligentes personnalisées qui remplacent les processus manuels." }
      ]
    }
  };

  const t = content[lang];

  const textFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'code': return <Code2 size={32} className="text-purple-500" />;
      case 'sparkles': return <Sparkles size={32} className="text-indigo-500" />;
      case 'layers': return <Layers size={32} className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <main className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500 overflow-hidden font-sans">
      <Navbar dark={dark} setDark={setDark} lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.h1
          key={`about-title-${lang}`}
          {...textFade}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
        >
          {t.title}
        </motion.h1>
        <motion.p
          key={`about-subtitle-${lang}`}
          {...textFade}
          className="text-xl opacity-70 max-w-2xl mx-auto mb-12"
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            key={`mission-${lang}`}
            {...textFade}
            className="bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem]"
          >
            <h2 className="text-3xl font-bold mb-4">{t.missionTitle}</h2>
            <p className="opacity-70 text-lg leading-relaxed">{t.missionDesc}</p>
          </motion.div>

          <motion.div
            key={`team-${lang}`}
            {...textFade}
            className="bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem]"
          >
            <h2 className="text-3xl font-bold mb-4">{t.teamTitle}</h2>
            <p className="opacity-70 text-lg leading-relaxed">{t.teamDesc}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.services.map((service, i) => (
            <motion.div
              key={`service-${i}-${lang}`}
              whileHover={{ y: -5 }}
              className="bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] group"
            >
              <div className="mb-4">{getIcon(service.icon)}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="opacity-70 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          key={`cta-${lang}`}
          {...textFade}
          className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/10 p-12 rounded-[2rem]"
        >
          <h2 className="text-3xl font-bold mb-6">
            {lang === 'en' ? 'Ready to work together?' : 'Prêt à collaborer?'}
          </h2>
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all">
            <motion.span key={`contact-btn-${lang}`} {...textFade} className="block">
              {lang === 'en' ? 'Get In Touch' : 'Nous Contacter'}
            </motion.span>
          </button>
        </motion.div>
      </section>

      <div className="h-20" />
    </main>
  );
}
