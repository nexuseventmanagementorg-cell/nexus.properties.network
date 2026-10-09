import React, { useState } from 'react';
import { Activity, ArrowRight, Bot, Globe, Mic, ShieldCheck, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  aiAdminResponsibilities,
  auditRules,
  escalationRules,
  languageRules,
  languageSelectionModes,
  providerRules,
  qualityRules,
  sttRules,
  superAdminResponsibilities,
  supportedLanguages,
  textNormalizationRules,
  ttsRules,
  voiceAuditSystem,
  voiceChannels,
  voiceDashboardSignals,
  voiceExperienceRules,
  voiceIdentity,
  voiceMemoryRules,
  voiceMemoryStore,
  voiceNotifications,
  voicePerformanceMetrics,
  voicePersonality,
  voiceRules,
  voiceWorkflow,
} from '../architecture/Section33VoiceAIOperatingSystem';

type VoiceView = 'overview' | 'workflow' | 'experience' | 'governance';

const views: { id: VoiceView; label: string }[] = [
  { id: 'overview', label: 'Voice Overview' },
  { id: 'workflow', label: 'Voice Workflow' },
  { id: 'experience', label: 'Language and Quality' },
  { id: 'governance', label: 'Governance and Metrics' },
];

export const Section33VoiceAIOperatingSystemSection: React.FC = () => {
  const [view, setView] = useState<VoiceView>('overview');

  return (
    <section id="voice-ai-operating-system" className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[680px] rounded-full bg-[#2DD4BF]/5 blur-[170px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#D4AF37] glass-panel">
            <Mic className="h-3.5 w-3.5" />
            SECTION 33 // VOICE AI OPERATING SYSTEM
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Proposed voice experience for Nexus.</h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg">This is a voice-system blueprint. Production voice providers, persistent language preferences, and connections to the 54 registry entries or external channels are not established.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/40 p-3">
          {views.map((item) => (
            <button
              key={item.id}
              onClick={() => { soundEngine.playClick(); setView(item.id); }}
              className={`rounded-xl border px-3 py-2 text-xs font-mono transition-colors ${view === item.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:col-span-8">
              <div className="mb-5 flex items-center gap-3">
                <Volume2 className="h-6 w-6 text-[#2DD4BF]" />
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">NEXUS VOICE IDENTITY</div>
                  <h3 className="mt-1 text-2xl font-bold text-white">Pakistani female voice, governed for every assistant</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {voiceIdentity.map((item, index) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-3">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500"><span>Identity {index + 1}</span><ArrowRight className="h-3 w-3 text-[#2DD4BF]" /></div>
                    <div className="text-sm font-semibold text-white">{item}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <List label="Voice personality" items={voicePersonality} />
                <List label="Voice channels" items={voiceChannels} />
              </div>
            </div>

            <div className="space-y-3 lg:col-span-4">
              <List label="Supported languages" items={supportedLanguages} />
              <List label="Language selection" items={languageSelectionModes} />
              <List label="Voice memory store" items={voiceMemoryStore} />
            </div>
          </div>
        )}

        {view === 'workflow' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center gap-3"><Mic className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Voice workflow</h3></div>
              <div className="space-y-2">{voiceWorkflow.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs font-mono text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span><span className="text-sm text-neutral-200">{step}</span></div>)}</div>
            </div>
            <div className="space-y-3">
              <RuleList label="Speech to text" rules={sttRules} />
              <RuleList label="Text to speech" rules={ttsRules} />
              <RuleList label="Text normalization engine" rules={textNormalizationRules} />
            </div>
          </div>
        )}

        {view === 'experience' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <RuleList label="Voice experience rules" rules={voiceExperienceRules} />
              <RuleList label="Language rules" rules={languageRules} />
              <RuleList label="Voice memory rules" rules={voiceMemoryRules} />
            </div>
            <div className="space-y-3">
              <RuleList label="Provider rules" rules={providerRules} />
              <RuleList label="Voice quality rules" rules={qualityRules} />
            </div>
          </div>
        )}

        {view === 'governance' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">AI Admin and Super Admin</h3></div>
                <div className="grid gap-3 sm:grid-cols-2"><List label="AI Admin responsibilities" items={aiAdminResponsibilities} /><List label="Super Admin responsibilities" items={superAdminResponsibilities} /></div>
              </div>
              <List label="Voice dashboard" items={voiceDashboardSignals} />
              <List label="Notifications" items={voiceNotifications} />
              <List label="Audit system" items={voiceAuditSystem} />
            </div>
            <div className="space-y-3">
              <RuleList label="Voice rules" rules={voiceRules} />
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Activity className="h-5 w-5 text-[#D4AF37]" /><h3 className="text-xl font-bold text-white">Voice quality metrics</h3></div>
                <div className="space-y-2">{voicePerformanceMetrics.map((metric) => <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"><span className="text-xs text-neutral-400">{metric.label}</span><span className="text-sm font-semibold text-white">{metric.value}</span></div>)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-3"><Bot className="h-5 w-5 text-[#2DD4BF]" /><h3 className="text-xl font-bold text-white">Escalation matrix</h3></div>
                <div className="space-y-2">{escalationRules.map((rule) => <div key={rule.level} className="rounded-xl border border-white/5 bg-black/40 p-3"><div className="text-sm font-semibold text-white">{rule.level}. {rule.owner}</div><div className="mt-1 text-xs text-neutral-400">{rule.trigger}</div><div className="mt-1 text-xs text-[#2DD4BF]">{rule.action}</div></div>)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const RuleList: React.FC<{ label: string; rules: { title: string; description: string }[] }> = ({ label, rules }) => (
  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
    <div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div>
    <div className="mt-2 space-y-2">{rules.map((rule) => <div key={rule.title}><div className="text-xs font-semibold text-white">{rule.title}</div><div className="mt-1 text-xs leading-relaxed text-neutral-400">{rule.description}</div></div>)}</div>
  </div>
);

const List: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
    <div className="text-[10px] font-mono uppercase text-neutral-500">{label}</div>
    <div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-xs text-neutral-200"><span className="text-[#2DD4BF]">•</span>{item}</div>)}</div>
  </div>
);
