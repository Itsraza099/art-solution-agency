"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Calendar, Mail, MapPin, X } from 'lucide-react';

export default function Contact() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    }
    return true;
  });
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [selectedOption, setSelectedOption] = useState<'calendar' | 'email' | 'maps' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const content = {
    en: {
      title: "Get In Touch",
      subtitle: "We'd love to hear from you. Choose your preferred way to connect.",
      bookCall: "Schedule a Video Call",
      bookCallDesc: "Book a time that works for you and let's discuss your project.",
      sendEmail: "Send Us an Email",
      sendEmailDesc: "Reach out directly and we'll get back to you within 24 hours.",
      viewMap: "Visit Our Location",
      viewMapDesc: "Find us on Google Maps and plan your visit.",
      calendlyPlaceholder: "Calendly booking link",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      send: "Send Message",
      close: "Close",
      selectOption: "Select how you'd like to connect"
    },
    fr: {
      title: "Nous Contacter",
      subtitle: "Nous aimerions vous entendre. Choisissez votre meilleur moyen de nous contacter.",
      bookCall: "Planifier un Appel Vidéo",
      bookCallDesc: "Réservez un créneau qui vous convient et discutons de votre projet.",
      sendEmail: "Nous Envoyer un Email",
      sendEmailDesc: "Contactez-nous directement et nous vous répondrons en 24 heures.",
      viewMap: "Visitez Notre Lieu",
      viewMapDesc: "Trouvez-nous sur Google Maps et planifiez votre visite.",
      calendlyPlaceholder: "Lien de réservation Calendly",
      nameLabel: "Nom",
      emailLabel: "Email",
      messageLabel: "Message",
      send: "Envoyer le Message",
      close: "Fermer",
      selectOption: "Choisissez comment vous souhaitez nous contacter"
    }
  };

  const t = content[lang];

  const textFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:rmn099@gmail.com';
  };

  const handleMapsClick = () => {
    window.open('https://maps.app.goo.gl/GipjbTr25garCFk28', '_blank');
  };

  const handleCalendlyClick = () => {
    setSelectedOption('calendar');
  };

  const contactOptions = [
    {
      id: 'calendar',
      icon: <Calendar size={40} className="text-purple-500" />,
      title: t.bookCall,
      desc: t.bookCallDesc,
      onClick: handleCalendlyClick
    },
    {
      id: 'email',
      icon: <Mail size={40} className="text-indigo-500" />,
      title: t.sendEmail,
      desc: t.sendEmailDesc,
      onClick: handleEmailClick
    },
    {
      id: 'maps',
      icon: <MapPin size={40} className="text-blue-500" />,
      title: t.viewMap,
      desc: t.viewMapDesc,
      onClick: handleMapsClick
    }
  ];

  return (
    <main className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500 overflow-hidden font-sans">
      <Navbar dark={dark} setDark={setDark} lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.h1
          key={`contact-title-${lang}`}
          {...textFade}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
        >
          {t.title}
        </motion.h1>
        <motion.p
          key={`contact-subtitle-${lang}`}
          {...textFade}
          className="text-xl opacity-70 max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* Contact Options Grid */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <motion.p
          key={`select-option-${lang}`}
          {...textFade}
          className="text-center text-lg opacity-70 mb-12"
        >
          {t.selectOption}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ y: -8 }}
              onClick={option.onClick}
              className="group bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-left transition-all hover:border-white/20"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {option.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                <motion.span key={`${option.id}-title-${lang}`} {...textFade}>
                  {option.title}
                </motion.span>
              </h3>
              <p className="opacity-70 leading-relaxed">
                <motion.span key={`${option.id}-desc-${lang}`} {...textFade} className="block">
                  {option.desc}
                </motion.span>
              </p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Calendar Modal */}
      <AnimatePresence>
        {selectedOption === 'calendar' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedOption(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-color)] border border-white/10 rounded-[2rem] p-8 max-w-2xl w-full relative"
            >
              <button
                onClick={() => setSelectedOption(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-bold mb-6">
                <motion.span key={`calendly-title-${lang}`} {...textFade}>
                  {t.bookCall}
                </motion.span>
              </h2>

              <div className="space-y-6">
                <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-white/10 p-8 rounded-xl text-center">
                  <p className="opacity-70 mb-6">
                    {lang === 'en'
                      ? 'Calendly link coming soon! For now, please email us to schedule.'
                      : 'Le lien Calendly arrive bientôt! Pour l\'instant, veuillez nous envoyer un email pour prendre rendez-vous.'}
                  </p>
                  <button
                    onClick={handleEmailClick}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-bold transition-all hover:shadow-lg"
                  >
                    {lang === 'en' ? 'Email Us Instead' : 'Nous Envoyer un Email'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty space at bottom */}
      <div className="h-20" />
    </main>
  );
}
