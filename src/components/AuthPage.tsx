import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Fingerprint, Lock, ShieldCheck, User } from 'lucide-react';
import transparentLogo from '../assets/transparentlogo.png';
import { getDashboardRoute, loginUser, registerUser, requestPasswordReset } from '../services/authService';
import type { PlatformRole } from '../services/platformStore';
import { APP_PATHS, navigateApp } from '../routing/appRoutes';

type AuthMode = 'login' | 'register';

export const AuthPage: React.FC<{ mode: AuthMode }> = ({ mode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const goHome = () => {
    navigateApp(APP_PATHS.home);
  };

  const goDashboard = (role: string) => {
    navigateApp(getDashboardRoute(role as PlatformRole));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();
    const fullName = String(formData.get('fullName') ?? '').trim();
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      if (mode === 'register') {
        const result = await registerUser({ fullName, email, password });
        if (result.confirmationRequired || !result.user) {
          setStatusMessage('Registration received. Confirm your email before signing in.');
          setSubmitted(true);
          setFormError('');
          return;
        }
        goDashboard(result.user.role);
        setFormError('');
        return;
      }

      const userRecord = await loginUser(email, password);
      goDashboard(userRecord.role);
      setFormError('');
    } catch (error) {
      setFormError(error instanceof Error ? `${error.message}${mode === 'login' ? ' Please register or reset your password.' : ' Registration failed.'}` : 'Authentication failed.');
    }
  };

  const handlePasswordReset = async () => {
    const emailField = document.querySelector<HTMLInputElement>('input[name="email"]');
    const email = emailField?.value?.trim();

    if (!email) {
      setFormError('Enter your email address to reset your password.');
      return;
    }

    try {
      const request = await requestPasswordReset(email);
      setStatusMessage(`Password reset request prepared for ${request.email} at ${request.requestedAt}.`);
      setFormError('');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Password reset failed.');
    }
  };

  return (
    <main className="min-h-screen bg-[#06080D] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl lg:grid-cols-[0.85fr_1.15fr]">
          <div className="hidden flex-col justify-between bg-gradient-to-br from-[#D4AF37]/15 via-black/50 to-[#2DD4BF]/10 p-10 lg:flex">
            <img src={transparentLogo} alt="Nexus Property Network" className="w-[190px]" />
            <div>
              <Fingerprint className="mb-5 h-9 w-9 text-[#D4AF37]" />
              <h1 className="text-4xl font-extrabold tracking-tight">Access the governed property network.</h1>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">Identity, role permissions, AI assignment, and verified workflows begin here.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300"><ShieldCheck className="h-4 w-4" /> Human-supervised access control</div>
          </div>

          <div className="p-6 sm:p-10">
            <button onClick={goHome} className="mb-10 flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white"><ArrowRight className="h-4 w-4 rotate-180" /> Back to Nexus Network</button>
            <div className="mb-8 lg:hidden"><img src={transparentLogo} alt="Nexus Property Network" className="w-[170px]" /></div>
            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <ShieldCheck className="mb-4 h-8 w-8 text-emerald-300" />
                <h2 className="text-2xl font-bold">{mode === 'login' ? 'Session restored' : 'Confirm your email'}</h2>
                <p className="mt-2 text-sm text-neutral-300">{statusMessage || 'The authentication workflow is ready for backend connection.'}</p>
                <button onClick={goHome} className="mt-6 rounded-xl bg-[#D4AF37] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black">Return Home</button>
              </div>
            ) : (
              <>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">NEXUS IDENTITY GATE</span>
                <h2 className="mt-2 text-3xl font-extrabold">{mode === 'login' ? 'Welcome back.' : 'Create your Nexus ID.'}</h2>
                <p className="mt-3 text-sm text-neutral-400">{mode === 'login' ? 'Continue to your role-aware workspace.' : 'Create your account and begin verified onboarding.'}</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  {mode === 'register' && <label className="block text-xs font-mono text-neutral-400">FULL NAME<input name="fullName" required className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]" placeholder="Your full name" /></label>}
                  <label className="block text-xs font-mono text-neutral-400">EMAIL<input name="email" required type="email" className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-10 py-3 text-sm text-white outline-none focus:border-[#D4AF37]" placeholder="you@example.com" /></label>
                  <label className="block text-xs font-mono text-neutral-400">PASSWORD<div className="relative"><Lock className="absolute left-3 top-3.5 h-4 w-4 text-neutral-500" /><input name="password" required type={showPassword ? 'text' : 'password'} className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] py-3 pl-10 pr-12 text-sm text-white outline-none focus:border-[#D4AF37]" placeholder="Secure password" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-3 rounded p-1 text-neutral-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}</button></div></label>
                  {formError && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">{formError}</div>}
                  {statusMessage && <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">{statusMessage}</div>}
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] py-3.5 text-xs font-bold uppercase tracking-wider text-black"><User className="h-4 w-4" />{mode === 'login' ? 'Continue Login' : 'Create Nexus ID'}</button>
                </form>
                {mode === 'login' && (
                  <button type="button" onClick={handlePasswordReset} className="mt-4 text-xs font-mono text-[#D4AF37] underline underline-offset-4">
                    Forgot password
                  </button>
                )}
                <div className="mt-5 flex items-center gap-2 text-[10px] font-mono text-neutral-500"><Fingerprint className="h-3.5 w-3.5" />Google OAuth and phone verification connect at backend launch.</div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
