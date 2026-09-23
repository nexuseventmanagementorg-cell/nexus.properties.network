// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Moon, Sun, Search, User, Shield } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { LanguageMode } from '../types';
import transparentLogo from '../assets/transparentlogo.png';
import { getCopy } from '../i18n';

interface NavbarProps {
  lang: LanguageMode;
  setLang: (l: LanguageMode) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, activeSection }) => {
  const [darkMode, setDarkMode] = useState(true);

  const scrollTo = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateTo = (path: string) => {
    soundEngine.playClick();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navLinks = [
    { id: 'home', label: getCopy(lang, 'home') }, { id: 'problems', label: getCopy(lang, 'problems') }, { id: 'property-graph', label: getCopy(lang, 'graph') }, { id: 'workforce', label: getCopy(lang, 'workforce') }, { id: 'property-discovery', label: getCopy(lang, 'properties') }, { id: 'coverage', label: getCopy(lang, 'coverage') }, { id: 'lead-lock', label: getCopy(lang, 'leadLock') }, { id: 'deal-lock', label: getCopy(lang, 'dealLock') }, { id: 'trust', label: getCopy(lang, 'trust') }, { id: 'digital-government', label: getCopy(lang, 'government') }, { id: 'revenue-engine', label: getCopy(lang, 'revenue') }, { id: 'expansion-roadmap', label: getCopy(lang, 'roadmap') }, { id: 'user-journey', label: getCopy(lang, 'journeys') }, { id: 'database-architecture', label: getCopy(lang, 'database') }, { id: 'security-architecture', label: 'Security' }, { id: 'ai-constitution', label: 'AI Constitution' }, { id: 'ecosystems', label: getCopy(lang, 'ecosystems') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 bg-[#06080D]/90 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo exactly matching Reference Image */}
        <div 
          onClick={() => scrollTo('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={transparentLogo}
            alt="Nexus Property Network"
            className="w-[110px] sm:w-[145px] h-auto object-contain group-hover:scale-[1.02] transition-transform"
          />
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex max-w-[52vw] items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap text-[13px] font-medium text-neutral-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded-lg transition-all text-xs tracking-wide cursor-pointer ${
                  isActive
                    ? 'text-[#E5B842] font-semibold border-b-2 border-[#E5B842] rounded-b-none'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools (Language, Dark Mode Toggle, Login, Register) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher */}
          <div className="hidden sm:flex glass-pill rounded-lg p-0.5 text-[11px] font-mono">
            <button
              onClick={() => { soundEngine.playClick(); setLang('roman_ur'); }}
              className={`px-2 py-0.5 rounded-md transition-all ${lang === 'roman_ur' ? 'bg-[#E5B842] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              {getCopy(lang, 'roman')}
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setLang('en'); }}
              className={`px-2 py-0.5 rounded-md transition-all ${lang === 'en' ? 'bg-[#E5B842] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setLang('ur'); }}
              className={`px-2 py-0.5 rounded-md transition-all ${lang === 'ur' ? 'bg-[#E5B842] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              اردو
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setDarkMode(!darkMode);
            }}
            className="p-2 rounded-xl text-neutral-300 hover:text-[#E5B842] transition-colors cursor-pointer"
            title="Toggle Mode"
          >
            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#E5B842]" />}
          </button>

          {/* Login Button */}
          <button
            onClick={() => {
              navigateTo('/auth/login');
            }}
            className="hidden sm:inline-block px-4 py-1.5 rounded-xl border border-white/20 text-neutral-200 text-xs font-semibold hover:border-white hover:text-white transition-all cursor-pointer"
          >
            {getCopy(lang, 'login')}
          </button>

          {/* Register Button exactly matching Reference Image */}
          <button
            onClick={() => {
              navigateTo('/auth/register');
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#E5B842] to-[#CAA034] hover:from-[#F5C852] hover:to-[#E5B842] text-black font-bold text-xs tracking-wider shadow-lg shadow-[#E5B842]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-black" />
            <span>{getCopy(lang, 'register')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
