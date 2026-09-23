// src/components/AIAssistantDrawer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Mic, MicOff, Volume2, VolumeX, Send, ArrowRight, Sparkles, RefreshCw, Crown, Shield } from 'lucide-react';
import { AI_EMPLOYEES } from '../data/nexusData';
import { soundEngine } from '../utils/sound';
import { LanguageMode, AIEmployee } from '../types';
import agentImage from '../assets/agent.png';
import { routeMessage, RoutingDecision } from '../utils/routingEngine';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  agentName?: string;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageMode;
  setLang: (l: LanguageMode) => void;
  initialAgentName?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  initialAgentName = 'AI Admin Supervisory Core'
}) => {
  const [activeAgent, setActiveAgent] = useState<AIEmployee>(
    AI_EMPLOYEES.find(e => e.name === initialAgentName) || AI_EMPLOYEES[53]
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [routingDecision, setRoutingDecision] = useState<RoutingDecision | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const spokenGreetingRef = useRef('');

  const normalizeChatScript = (text: string) => text
    .replace(/\bmein\b/gi, 'mey')
    .replace(/\bme\b/gi, 'mey')
    .replace(/\bhai\b/gi, 'hey');

  const getWelcomeMessage = (agentName: string) => {
    if (lang === 'en') {
      return `Greetings. I am ${agentName} of NEXUS OS™. I supervise inventory verification, Lead Lock™ protection, and nationwide property queries across 130+ Pakistani cities. How may I assist your real estate operations today?`;
    }
    if (lang === 'ur') {
      return `خوش آمدید! میں NEXUS OS™ کا ${agentName} ہوں۔ میں پاکستان کے 130 سے زائد شہروں میں پراپرٹی کی تصدیق، لیڈ لاک اور لین دین کے انتظام کے لیے حاضر ہوں۔ میں آپ کی کیا مدد کر سکتا ہوں؟`;
    }
    if (activeAgent.welcomeMessage) {
      return normalizeChatScript(activeAgent.welcomeMessage);
    }
    return normalizeChatScript(`Assalamo Alaikum! Me NEXUS OS ka ${agentName} hoon. Pakistan ke 130+ shehron me verified plots, Lead Lock™ protection aur safe deal execution ke liye aap mujh se sawal pooch sakte hain. Kya information chahye aapko?`);
  };

  // Voice lists load asynchronously in Chrome and Edge.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => setAvailableVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  // Sync initial agent when prop changes
  useEffect(() => {
    if (initialAgentName) {
      const found = AI_EMPLOYEES.find(e => e.name === initialAgentName);
      if (found) setActiveAgent(found);
    }
  }, [initialAgentName]);

  // Initial welcome greeting depending on language
  useEffect(() => {
    const welcome = getWelcomeMessage(activeAgent.name);

    setMessages([
      {
        sender: 'ai',
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentName: activeAgent.name
      }
    ]);
  }, [activeAgent, lang]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition (STT) setup
  const toggleVoiceRecording = () => {
    soundEngine.playClick();
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice speech recognition is not supported in this browser. Please use Chrome/Edge or type your query.');
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognitionClass();
      rec.continuous = false;
      rec.interimResults = false;

      // Set recognition language
      if (lang === 'ur' || lang === 'roman_ur') {
        rec.lang = 'ur-PK';
      } else {
        rec.lang = 'en-US';
      }

      rec.onstart = () => {
        setIsRecording(true);
        soundEngine.playRadar();
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };

      rec.onerror = () => {
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch {
      setIsRecording(false);
    }
  };

  // Text-To-Speech (TTS)
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const speechText = text
      .replace(/[™®©]/g, '')
      .replace(/[#*_`]/g, '')
      .replace(/(\d+)\s*\+/g, '$1 plus')
      .replace(/[+:;()[\]{}<>/\\|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!speechText) return;

    setIsSpeaking(true);
    const isUrduSpeech = lang === 'ur' || lang === 'roman_ur';
    const normalizedLanguage = isUrduSpeech ? 'ur' : 'en';
    const languageMatches = availableVoices.filter(voice => voice.lang.toLowerCase().startsWith(normalizedLanguage));
    const pakistanVoices = availableVoices.filter(voice => /ur[-_ ]?pk|urdu|pakistan|hi[-_ ]?in|hindi/i.test(`${voice.name} ${voice.lang}`));
    const pakistaniFemaleVoice = pakistanVoices.find(voice => /female|asma|heera|sara|zira/i.test(`${voice.name} ${voice.lang}`));
    const preferredVoice = pakistaniFemaleVoice
      || pakistanVoices[0]
      || languageMatches.find(voice => /female|zira|heera|sara/i.test(voice.name))
      || languageMatches[0]
      || availableVoices.find(voice => /en[-_ ]?in/i.test(voice.lang))
      || availableVoices.find(voice => /female|zira|heera|sara/i.test(voice.name));
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.voice = preferredVoice || null;
    utterance.lang = isUrduSpeech ? 'ur-PK' : 'en-IN';
    utterance.rate = isUrduSpeech ? 0.97 : 1.06;
    utterance.pitch = isUrduSpeech ? 1.03 : 0.96;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Speak each agent's first greeting when the drawer is actually opened.
  useEffect(() => {
    if (!isOpen) {
      spokenGreetingRef.current = '';
      return;
    }

    const greetingKey = `${activeAgent.id}:${lang}`;
    if (spokenGreetingRef.current === greetingKey) return;

    spokenGreetingRef.current = greetingKey;
    const greeting = getWelcomeMessage(activeAgent.name);
    const timer = window.setTimeout(() => speakText(greeting), 180);
    return () => window.clearTimeout(timer);
  }, [isOpen, activeAgent, lang]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    soundEngine.playClick();
    const userText = inputMessage;
    const decision = routeMessage(userText);
    setRoutingDecision(decision);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: userText,
        timestamp: now
      }
    ]);
    setInputMessage('');

    // Generate Contextual AI Response
    setTimeout(() => {
      soundEngine.playActivate();
      let reply = '';
      const lower = userText.toLowerCase();

      if (decision.level === 'REJECTED') {
        reply = lang === 'roman_ur'
          ? 'Yeh request verified Nexus records ke mutabiq process nahi ki ja sakti. Me guessing ya fake information provide nahi karungi.'
          : 'This request cannot be processed without verified Nexus records. I will not guess or fabricate information.';
      } else if (decision.level === 'SUPER_ADMIN') {
        reply = lang === 'roman_ur'
          ? 'Aapki request Super Admin human review ke liye escalate ki ja rahi hai. Final decision authorized human review ke baad issue hoga.'
          : 'Your request is being escalated to Super Admin for authorized human review. No autonomous final decision will be made.';
      } else if (decision.level === 'AI_ADMIN') {
          reply = lang === 'roman_ur'
          ? 'AI Admin activate ho gaya hai. Is request ko investigation workflow me route kiya ja raha hai aur audit record maintain kiya jayega.'
          : 'AI Admin has been activated. This request is being routed to an investigation workflow and an audit record will be maintained.';
      } else if (lang === 'en') {
        if (lower.includes('lead lock') || lower.includes('theft') || lower.includes('poach')) {
          reply = `[Lead Lock™ Guardian AI]: Your inquiry is hashed using SHA-256 and locked into your client dossier. In NEXUS OS, no other agent can poach or contact your buyer. Guaranteed zero client leakage across the entire network.`;
        } else if (lower.includes('lahore') || lower.includes('dha') || lower.includes('plot')) {
          reply = `[Listing Auditor AI]: DHA Phase 6 and Prism Lahore are showing strong market activity with verified cadastral boundaries. Direct-owner parcels with active NOCs are available for review.`;
        } else if (lower.includes('karachi') || lower.includes('clifton')) {
          reply = `[Commercial ROI AI]: Clifton and DHA Phase 8 Karachi have strong rental demand. Listed waterfront properties are checked against High Court docket stay orders.`;
        } else if (lower.includes('islamabad') || lower.includes('f-7') || lower.includes('blue area')) {
          reply = `[Valuation AI]: Islamabad Blue Area commercial floorplates are being benchmarked against current market evidence. Deal Lock™ escrow is mandatory for high-value transfers.`;
        } else {
          reply = `[${activeAgent.name}]: Telemetry confirmed. In NEXUS OS, every property parcel is verified, every lead is locked, and every transaction is dispute-aware. I can connect you with an AI specialist for detailed underwriting.`;
        }
      } else if (lang === 'ur') {
        if (lower.includes('lead') || lower.includes('لیڈ') || lower.includes('چوری')) {
          reply = `لیڈ لاک™ سسٹم آپ کی تمام لیڈز کو محفوظ رکھتا ہے۔ کسی دوسرے ایجنٹ کو آپ کے کلائنٹ تک رسائی نہیں مل سکتی۔ تمام ریکارڈ محفوظ ہیں۔`;
        } else if (lower.includes('لاہور') || lower.includes('lahore') || lower.includes('ڈی ایچ اے')) {
          reply = `لاہور ڈی ایچ اے فیز 6 اور پرزم میں تصدیق شدہ پلاٹس دستیاب ہیں۔ فرد اور رجسٹری ریکارڈز کی آن گراؤنڈ تصدیق کی گئی ہے۔`;
        } else {
          reply = `آپ کی درخواست موصول ہو گئی ہے۔ NEXUS OS پاکستان بھر میں شفافیت اور خودکار تصدیق کے لیے کام کر رہا ہے۔ کیا آپ پراپرٹی خریدنا چاہتے ہیں یا لسٹ کرنا چاہتے ہیں؟`;
        }
      } else {
        // Roman Urdu
        if (lower.includes('lead') || lower.includes('chori') || lower.includes('poach')) {
          reply = `Lead Lock™ system ke teht aapka client 100% aapke naam par cryptographically lock ho jata hai. Koi doosra broker aapki lead poach nahi kar sakta!`;
        } else if (lower.includes('plot') || lower.includes('lahore') || lower.includes('dha') || lower.includes('karachi')) {
          reply = `NEXUS OS me 130+ cities ki verified properties available hain. DHA Lahore, Karachi Clifton aur Islamabad Blue Area me direct owner inventory verified hai.`;
        } else {
          reply = `Aapka sawal confirm ho gaya hai. NEXUS OS ke 54 AI Employees 24/7 online hain. Aap verified plot search kar sakte hain ya apni property secure tareeqay se list kar sakte hain.`;
        }
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: normalizeChatScript(reply),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentName: activeAgent.name
        }
      ]);

      speakText(normalizeChatScript(reply));
    }, 600);
  };

  const quickPrompts = [
    { label: 'How does Lead Lock™ work?', query: 'Explain how Lead Lock prevents lead theft' },
    { label: 'Verify 1 Kanal Plot in DHA Lahore', query: 'Show me verified 1 Kanal plot in DHA Lahore' },
    { label: 'اردو: لیڈ لاک کیسے کام کرتا ہے؟', query: 'لیڈ لاک کیسے کام کرتا ہے؟' },
    { label: 'Roman: Karachi me investment opportunities', query: 'Karachi me best investment opportunities dikhayein' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg h-full glass-panel border-l border-white/10 flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-[#D4AF37]/70 shadow-lg shadow-[#2DD4BF]/20">
              <img src={agentImage} alt="NEXUS AI Assistant" className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">{activeAgent.name}</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[10px] font-mono text-[#D4AF37]">{activeAgent.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* TTS Mute Toggle */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setTtsEnabled(!ttsEnabled);
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className="p-2 rounded-xl glass-pill text-neutral-300 hover:text-white"
              title={ttsEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 rounded-xl glass-pill text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Agent Switcher Ribbon */}
        <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400 text-[10px]">TRANSFER CONSULTATION:</span>
          <select
            value={activeAgent.name}
            onChange={(e) => {
              soundEngine.playActivate();
              const found = AI_EMPLOYEES.find(emp => emp.name === e.target.value);
              if (found) setActiveAgent(found);
            }}
            className="bg-[#111111] text-xs text-[#2DD4BF] border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:border-[#D4AF37]"
          >
            {AI_EMPLOYEES.map((emp) => (
              <option key={emp.id} value={emp.name} className="bg-black text-white">
                {emp.name} ({emp.department})
              </option>
            ))}
          </select>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {routingDecision && (
            <div className="rounded-xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 p-3 text-[10px] font-mono text-neutral-300">
              <div className="flex items-center justify-between gap-3 text-[#2DD4BF] font-bold">
                <span>ROUTER // {routingDecision.level.replace('_', ' ')}</span>
                <span>{routingDecision.specialists.length ? 'TRANSFER ACTIVE' : 'REQUEST BLOCKED'}</span>
              </div>
              <div className="mt-1">{routingDecision.reason}</div>
              <div className="mt-1 text-neutral-500">{routingDecision.responsePolicy}</div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.agentName && (
                <span className="text-[10px] font-mono text-[#D4AF37] mb-1 px-1">
                  {msg.agentName}
                </span>
              )}
              <div className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.sender === 'ai' && (
                  <img
                    src={agentImage}
                    alt={`${msg.agentName || activeAgent.name} avatar`}
                    className="w-8 h-8 rounded-full object-cover border border-[#2DD4BF]/60 shrink-0"
                  />
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#D4AF37] text-black font-medium rounded-tr-none'
                    : 'glass-card-luxury text-neutral-200 border-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              <span className="text-[9px] font-mono text-neutral-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, qIdx) => (
            <button
              key={qIdx}
              onClick={() => {
                setInputMessage(qp.query);
              }}
              className="px-2.5 py-1 rounded-lg glass-pill text-[11px] font-mono text-neutral-300 hover:text-white hover:border-[#D4AF37] whitespace-nowrap cursor-pointer"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice & Multi-language controls */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/80">
          <div className="flex items-center gap-2">
            {/* Voice Input (Speech to Text) */}
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'glass-panel text-neutral-300 hover:text-[#2DD4BF] hover:border-[#2DD4BF]'
              }`}
              title={isRecording ? 'Listening (Click to Stop)...' : 'Speak into Microphone'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                isRecording
                  ? 'Listening to speech...'
                  : lang === 'ur'
                  ? 'یہاں اپنا سوال لکھیں...'
                  : lang === 'roman_ur'
                  ? 'Apna sawal yahan type karein...'
                  : 'Inquire with AI specialists...'
              }
              className="flex-1 bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            />

            {/* Send Button */}
            <button
              type="submit"
              className="p-3 rounded-xl bg-[#D4AF37] hover:bg-[#F3CF57] text-black font-bold transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mt-2 px-1">
            <span>MULTILINGUAL ENGINE: EN / اردو / ROMAN</span>
            {isRecording && <span className="text-red-400 font-bold">RECORDING VOICE...</span>}
            {isSpeaking && <span className="text-[#2DD4BF] font-bold">AI SPEAKING AUDIO...</span>}
          </div>
        </form>
      </div>
    </div>
  );
};
