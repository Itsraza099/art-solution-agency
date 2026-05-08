"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  dark: boolean;
  setDark: (dark: boolean) => void;
  lang: 'en' | 'fr';
  setLang: (lang: 'en' | 'fr') => void;
}

export default function Navbar({ dark, setDark, lang, setLang }: NavbarProps) {
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = lang === 'en' 
    ? [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" }
      ]
    : [
        { label: "Accueil", href: "/" },
        { label: "À propos", href: "/about" },
        { label: "Contact", href: "/contact" }
      ];

  const textFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  return (
    <>
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-6 w-full z-50 px-6 flex justify-between items-center left-1/2 -translate-x-1/2">
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          Art<span className="text-purple-500">Solution</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center relative bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 px-2 py-2 rounded-full shadow-lg">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onMouseEnter={() => setHoveredNav(i)}
              onMouseLeave={() => setHoveredNav(null)}
              className="relative px-6 py-2 text-sm font-medium transition-colors z-10"
            >
              <motion.span key={`${lang}-${item.label}`} {...textFade}>
                {mounted ? item.label : ""}
              </motion.span>
              
              {hoveredNav === i && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-full z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="w-10 h-10 rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 hover:scale-105 transition-transform flex items-center justify-center font-bold text-[10px] tracking-tighter"
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          
          <button 
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 hover:scale-105 transition-transform flex items-center justify-center"
          >
            {mounted ? (dark ? <Sun size={16} /> : <Moon size={16} />) : <div className="w-4 h-4" />}
          </button>
          
          <button className="hidden md:block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all min-w-[150px]">
            <motion.span key={`cta-${lang}`} {...textFade} className="block">
              {mounted ? (lang === 'en' ? 'Work With Us' : 'Collaborer') : ""}
            </motion.span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 hover:scale-105 transition-transform flex items-center justify-center"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-20 left-0 right-0 mx-6 bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="px-4 py-3 rounded-lg font-medium transition-colors hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.span key={`mobile-${lang}-${item.label}`} {...textFade}>
                      {mounted ? item.label : ""}
                    </motion.span>
                  </Link>
                ))}
                <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 rounded-lg font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all mt-2">
                  <motion.span key={`mobile-cta-${lang}`} {...textFade} className="block">
                    {mounted ? (lang === 'en' ? 'Work With Us' : 'Collaborer') : ""}
                  </motion.span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}