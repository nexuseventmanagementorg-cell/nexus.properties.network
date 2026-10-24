import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { LanguageMode } from '../types';
import transparentLogo from '../assets/transparentlogo.png';
import { getCopy } from '../i18n';
import { AppLink } from '../routing/AppLink';
import { APPLICATION_NAVIGATION, APP_PATHS, routeForRole } from '../routing/appRoutes';
import { authStateChangedEvent, getCurrentUser } from '../services/authService';

interface NavbarProps {
  lang: LanguageMode;
  setLang: (l: LanguageMode) => void;
  currentPath: string;
}

const routeIsActive = (currentPath: string, href: string) =>
  currentPath === href
  || (href === APP_PATHS.marketplace && currentPath.startsWith(`${APP_PATHS.propertyDetail}/`))
  || (href === APP_PATHS.agents && currentPath.startsWith(`${APP_PATHS.agentDetail}/`));

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, currentPath }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser);
  const accountPath = user ? routeForRole(user.role) : APP_PATHS.login;

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser());
    window.addEventListener(authStateChangedEvent, syncUser);
    return () => window.removeEventListener(authStateChangedEvent, syncUser);
  }, []);

  const onNavigation = () => {
    soundEngine.playClick();
    setMobileOpen(false);
  };

  const navigationItems = APPLICATION_NAVIGATION.map(({ path, label }) => (
        <AppLink
          key={path}
          to={path}
          onNavigate={onNavigation}
          aria-current={routeIsActive(currentPath, path) ? 'page' : undefined}
          className={`rounded-lg px-3 py-2 text-xs tracking-wide transition-colors ${
            routeIsActive(currentPath, path)
              ? 'border-b-2 border-[#E5B842] text-[#E5B842]'
              : 'text-neutral-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          {label}
        </AppLink>
      ));
  const mobileAccountItems = (
    <>
      <AppLink
        to={accountPath}
        onNavigate={onNavigation}
        className="rounded-lg px-3 py-2 text-xs text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        {user ? 'Profile / Dashboard' : 'Login'}
      </AppLink>
      {!user && (
        <AppLink
          to={APP_PATHS.register}
          onNavigate={onNavigation}
          className="rounded-lg px-3 py-2 text-xs text-[#E5B842] transition-colors hover:bg-white/5"
        >
          Register
        </AppLink>
      )}
    </>);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#06080D]/95 px-4 py-3 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <AppLink to={APP_PATHS.home} onNavigate={onNavigation} aria-label="Nexus home" className="shrink-0">
          <img
            src={transparentLogo}
            alt="Nexus Property Network"
            className="w-[110px] object-contain transition-transform hover:scale-[1.02] sm:w-[145px]"
          />
        </AppLink>

        <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto whitespace-nowrap lg:flex">
          {navigationItems}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden rounded-lg p-0.5 font-mono text-[11px] sm:flex">
            <button
              type="button"
              onClick={() => { soundEngine.playClick(); setLang('roman_ur'); }}
              className={`rounded-md px-2 py-1 ${lang === 'roman_ur' ? 'bg-[#E5B842] font-bold text-black' : 'text-neutral-400 hover:text-white'}`}
              aria-label="Use Roman Urdu"
            >
              {getCopy(lang, 'roman')}
            </button>
            <button
              type="button"
              onClick={() => { soundEngine.playClick(); setLang('en'); }}
              className={`rounded-md px-2 py-1 ${lang === 'en' ? 'bg-[#E5B842] font-bold text-black' : 'text-neutral-400 hover:text-white'}`}
              aria-label="Use English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => { soundEngine.playClick(); setLang('ur'); }}
              className={`rounded-md px-2 py-1 ${lang === 'ur' ? 'bg-[#E5B842] font-bold text-black' : 'text-neutral-400 hover:text-white'}`}
              aria-label="Use Urdu"
            >
              اردو
            </button>
          </div>

          <AppLink
            to={accountPath}
            onNavigate={onNavigation}
            className="hidden items-center gap-1.5 rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-neutral-200 transition-colors hover:border-white hover:text-white sm:flex"
          >
            <User className="h-3.5 w-3.5" />
            {user ? 'Dashboard' : getCopy(lang, 'login')}
          </AppLink>
          {!user && (
            <AppLink
              to={APP_PATHS.register}
              onNavigate={onNavigation}
              className="hidden rounded-xl bg-gradient-to-r from-[#E5B842] to-[#CAA034] px-4 py-2 text-xs font-bold tracking-wide text-black shadow-lg shadow-[#E5B842]/20 transition hover:scale-105 sm:inline-flex"
            >
              {getCopy(lang, 'register')}
            </AppLink>
          )}
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/15 text-white lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-product-navigation"
            onClick={() => setMobileOpen((isOpen) => !isOpen)}
          >
            <span className={`h-0.5 w-5 bg-current transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-product-navigation" aria-label="Mobile product navigation" className="mx-auto mt-3 grid max-w-7xl grid-cols-2 gap-2 border-t border-white/10 pt-3 sm:grid-cols-3 lg:hidden">
          {navigationItems}
          {mobileAccountItems}
        </nav>
      )}
    </header>
  );
};
