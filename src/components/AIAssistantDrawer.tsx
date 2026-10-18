// src/components/AIAssistantDrawer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Mic, MicOff, Volume2, VolumeX, Send, ArrowRight, Sparkles, RefreshCw, Crown, Shield } from 'lucide-react';
import { AI_EMPLOYEES } from '../data/nexusData';
import { SAMPLE_AREAS } from '../data/sampleAreas';
import { SAMPLE_CITIES } from '../data/sampleCities';
import { SamplePropertyType } from '../data/sampleProperties';
import { searchProperties } from '../services/propertyService';
import { soundEngine } from '../utils/sound';
import { LanguageMode, AIEmployee } from '../types';
import agentImage from '../assets/agent.png';
import { routeMessage, RoutingDecision } from '../utils/routingEngine';
import { speechIntelligenceEngine } from '../utils/speechIntelligence';
import { findFAQAnswer } from '../data/faqData';
import { intentToNaturalConfirmation, parsePropertyIntent, PropertyIntent } from '../utils/propertyIntentParser';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  agentName?: string;
}

type ModelConnectionStatus = 'not_checked' | 'connected' | 'not_configured' | 'unavailable';

type ConversationDomain = 'property' | 'lead' | 'deal' | 'verification' | 'payments' | 'crm' | 'subscriptions' | 'marketplace' | 'faq';

const detectConversationDomain = (query: string): ConversationDomain => {
  const text = query.toLowerCase();
  if (/lead\s*lock|lead theft|lead poach|client poach/.test(text)) return 'lead';
  if (/deal\s*lock|deal milestone|commission|escrow/.test(text)) return 'deal';
  if (/verify|verification|title|ownership|document/.test(text)) return 'verification';
  if (/payment|jazzcash|easypaisa|invoice|refund/.test(text)) return 'payments';
  if (/crm|contact|follow.?up|appointment|task|note/.test(text)) return 'crm';
  if (/subscription|billing plan|premium plan/.test(text)) return 'subscriptions';
  if (/marketplace|property portal|national inventory/.test(text)) return 'marketplace';
  if (/plot|house|ghar|property|apartment|flat|shop|dukan|office|building|farm\s*house|investment|invest|commercial|residential|budget|crore|lakh|lac|marla|kanal|bedroom|phase|\bin\b|\bmein\b|\bchahiye\b/.test(text)) return 'property';
  return 'faq';
};

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageMode;
  setLang: (l: LanguageMode) => void;
  initialAgentName?: string;
}

const formatAssistantResponse = (text: string) => text
  .replace(/^\[[^\]]+\]:\s*/u, '')
  .replace(/SAMPLE-\d+-[A-Z]-\d+:\s*/gi, '')
  .replace(/\s*(\|\||\||::|---|###)\s*/g, '. ')
  .replace(/[{}[\]]/g, '')
  .replace(/[ \t]+/g, ' ')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

const buildRequirementConfirmation = (query: string, lang: LanguageMode) => {
  const lower = query.toLowerCase();
  const city = SAMPLE_CITIES.find((item) => lower.includes(item.city.toLowerCase()));
  const area = SAMPLE_AREAS.find((item) => lower.includes(item.name.toLowerCase()));
  const sizeMatch = query.match(/\b\d+(?:\.\d+)?\s*(?:kanal|marla|sq\.?\s*ft|square\s+feet)\b/i);
  const size = sizeMatch?.[0] || '';
  const location = area && city
    ? `${area.name} ${city.city}`
    : city?.city || area?.name || query.match(/\bin\s+(.+?)(?:\s+(?:dikhao|dikhayein|show|please)|$)/i)?.[1]?.trim() || '';
  const verification = /\bverified?\b|\bverification\b/i.test(query) ? 'verified ' : '';
  const isInvestment = /\binvestment\b|\binvest\b/i.test(query);
  const isCommercial = /\bcommercial\b/i.test(query);
  const isResidential = /\bresidential\b/i.test(query);
  const propertyType = isCommercial && /\bplot\b/i.test(query)
    ? 'commercial plot'
    : isResidential && /\bplot\b/i.test(query)
      ? 'residential plot'
      : /\bapartment\b|\bflat\b/i.test(query)
        ? 'apartment'
        : /\bfarm\s+house\b/i.test(query)
          ? 'farm house'
          : /\bhouse\b/i.test(query)
            ? 'house'
            : /\bplot\b/i.test(query)
              ? 'plot'
              : /\bshop\b/i.test(query)
                ? 'shop'
                : /\boffice\b/i.test(query)
                  ? 'office'
                  : /\bbuilding\b/i.test(query)
                    ? 'building'
                    : isCommercial
                      ? 'commercial property'
                      : 'property options';
  const requirement = isInvestment
    ? `${location ? `${location} mein ` : ''}investment ke liye behtareen property options`
    : `${location ? `${location} mein ` : ''}${verification}${size ? `${size} ` : ''}${propertyType}`.trim();

  if (lang === 'en') return `You would like to see ${requirement}.`;
  if (lang === 'ur') return `آپ ${requirement} دیکھنا چاہتے ہیں۔`;
  return `Aap ${requirement} dekhna chahte hain.`;
};

const buildPropertyReply = async (query: string, lang: LanguageMode, includeGreeting: boolean, intent: PropertyIntent): Promise<string | null> => {
  const lower = query.toLowerCase();
  const city = SAMPLE_CITIES.find((item) => item.city === intent.city);
  const propertyType: SamplePropertyType | undefined = intent.propertyType;

  if (!city || !propertyType) return null;

  const visibleResults = (await searchProperties({
    city: city.city,
    area: intent.area,
    phase: intent.phase,
    propertyType,
    purpose: intent.purpose,
    maxPriceRaw: intent.budgetMaxRaw,
    minBedrooms: intent.bedrooms,
    sizeText: intent.sizeText,
  })).slice(0, 3);

  if (!visibleResults.length) return null;

  const property = visibleResults[0];
  const isLive = 'state' in property && property.state === 'LIVE PROPERTY';
  const confirmation = intentToNaturalConfirmation(intent, lang);
  const greeting = includeGreeting ? (lang === 'en' ? 'Hello.' : lang === 'ur' ? 'خوش آمدید۔' : 'Assalamo Alaikum.') : '';
  const location = `${property.area}, ${city.city}`;
  const requestedTypeLabel = propertyType === 'Commercial' && lower.includes('plot')
    ? 'commercial plot'
    : propertyType.toLowerCase();

  if (lang === 'en') {
    return `${greeting}${greeting ? '\n\n' : ''}${confirmation}\n\n${isLive ? 'I found a live property record.' : 'No live property record was found.'}\n\nLocation ${location}.\n\nSize ${property.areaSize}.\n\nPrice ${property.price}.\n\nStatus ${isLive ? 'Live Property' : 'Unavailable'}.\n\nMy recommendation is to compare the location, size, and price before making a decision. You can ask for another area or budget range next.`;
  }

  if (lang === 'ur') {
    return `${greeting}${greeting ? '\n\n' : ''}${confirmation}\n\n${isLive ? 'ایک لائیو پراپرٹی ریکارڈ دستیاب ہے۔' : 'اس علاقے میں کوئی لائیو پراپرٹی ریکارڈ نہیں ملا۔'}\n\nمقام ${location}.\n\nسائز ${property.areaSize}.\n\nقیمت ${property.price}.\n\nحیثیت ${isLive ? 'لائیو پراپرٹی' : 'دستیاب نہیں'}.\n\nمیری تجویز ہے کہ فیصلہ کرنے سے پہلے جگہ، سائز اور قیمت کا موازنہ کریں۔`;
  }

  return `${greeting}${greeting ? '\n\n' : ''}${confirmation}\n\n${isLive ? 'Mujhe ek live property record mili hai.' : 'Is area me koi live property record nahi mila.'}\n\nLocation ${location}.\n\nSize ${property.areaSize}.\n\nPrice ${property.price}.\n\nStatus ${isLive ? 'Live Property' : 'Unavailable'}.\n\nMeri recommendation hai ke faisla karne se pehle location, size aur price ka muqabla karein.`;
};

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
  const [isThinking, setIsThinking] = useState(false);
  const [modelConnectionStatus, setModelConnectionStatus] = useState<ModelConnectionStatus>('not_checked');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const spokenGreetingRef = useRef('');
  const lastInteractionAtRef = useRef(Date.now());
  const conversationContextRef = useRef<{ property: PropertyIntent; lead: string[]; deal: string[]; faq: string[] }>({ property: { confidence: 0 }, lead: [], deal: [], faq: [] });
  const memoryStorageKey = 'nexus_ai_memory';

  const saveMemory = (entry: { type: string; value: string }) => {
    try {
      const globalStore = (globalThis as Record<string, unknown>).__nexus_ai_memory__ as Array<{ type: string; value: string; createdAt: string }> | undefined;
      const current = Array.isArray(globalStore) ? globalStore : [];
      const next = [...current, { ...entry, createdAt: new Date().toISOString() }].slice(-100);
      (globalThis as Record<string, unknown>).__nexus_ai_memory__ = next;
    } catch {
      // Runtime memory fallback only; no localStorage dependency remains.
    }
  };

  const normalizeChatScript = (text: string) => lang === 'roman_ur'
    ? text
      .replace(/\baik\b/gi, 'ek')
      .replace(/\bmein\b/gi, 'main')
      .replace(/\bmey\b/gi, 'main')
      .replace(/\bchahye\b/gi, 'chahiye')
    : text;

  const getWelcomeMessage = (agentName: string) => {
    if (lang === 'en') {
      return `Greetings. This is a preview of the ${agentName} role in the Nexus AI Workforce Registry. It is not a deployed production agent, and live property, verification, and lock services are not established here. What would you like to explore?`;
    }
    if (lang === 'ur') {
      return `خوش آمدید! یہ Nexus AI Workforce Registry میں ${agentName} کے کردار کا پیش نظارہ ہے، فعال production agent نہیں۔ یہاں براہ راست پراپرٹی، تصدیق یا Lead Lock سروس قائم نہیں ہے۔ آپ کس چیز کے بارے میں جاننا چاہتے ہیں؟`;
    }
    if (activeAgent.welcomeMessage) {
      return normalizeChatScript(activeAgent.welcomeMessage);
    }
    return normalizeChatScript(`Assalamo Alaikum! Yeh Nexus AI Workforce Registry mein ${agentName} ke role ka preview hai, deployed production agent nahin. Yahan live property, verification, ya Lead Lock service available honay ka dawa nahin kiya ja raha. Aap kis cheez ke baare mein maloomat chahte hain?`);
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

    const isUrduSpeech = lang === 'ur' || lang === 'roman_ur';
    const speechText = speechIntelligenceEngine
      .normalizeForSpeech(text)
      .replace(/\s+/g, ' ')
      .trim();
    if (!speechText) return;

    setIsSpeaking(true);
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
    const domain = detectConversationDomain(userText);
    const isPropertyContinuation = domain === 'faq' && /^(?:\d+(?:\.\d+)?\s*(?:marla|kanal|acre)|budget\b|under\b|upto\b|\d+\s*bed(?:room)?s?|phase\s*\w+)\b/i.test(userText.trim());
    const isPropertyTurn = domain === 'property' || isPropertyContinuation;
    const freshIntent: PropertyIntent = isPropertyTurn ? parsePropertyIntent(userText) : { confidence: 0 };
    const hasNewPropertyAnchor = Boolean(freshIntent.city || freshIntent.area || freshIntent.phase || freshIntent.propertyType || freshIntent.purpose);
    const propertyBase = hasNewPropertyAnchor
      ? { city: conversationContextRef.current.property.city, area: conversationContextRef.current.property.area, confidence: conversationContextRef.current.property.confidence }
      : conversationContextRef.current.property;
    const currentIntent: PropertyIntent = isPropertyTurn ? parsePropertyIntent(userText, propertyBase) : { confidence: 0 };
    if (isPropertyTurn) conversationContextRef.current.property = currentIntent;
    else if (domain === 'lead' || domain === 'deal') conversationContextRef.current[domain].push(userText);
    else conversationContextRef.current.faq.push(userText);
    saveMemory({ type: 'conversation', value: userText });
    const shouldGreet = Date.now() - lastInteractionAtRef.current > 15 * 60 * 1000;
    lastInteractionAtRef.current = Date.now();
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
    setTimeout(async () => {
      soundEngine.playActivate();
      let reply = '';
      const lower = userText.toLowerCase();
      const propertyIntent = /\b(plot|house|apartment|flat|shop|office|building|property|commercial|residential|investment|investor|farm house)\b/i.test(userText);

      if (decision.level === 'REJECTED') {
        reply = lang === 'roman_ur'
          ? 'Yeh request verified Nexus records ke mutabiq process nahi ki ja sakti. Me guessing ya fake information provide nahi karungi.'
          : 'This request cannot be processed without verified Nexus records. I will not guess or fabricate information.';
      } else if (decision.level === 'SUPER_ADMIN') {
        reply = lang === 'roman_ur'
          ? 'Is request ke liye authorized human review zaroori hai. Is preview mein escalation service connected nahi, is liye main ise escalate hone ka dawa nahi kar sakti.'
          : 'This request requires authorized human review. Escalation is not connected in this preview, so I cannot claim it has been submitted.';
      } else if (decision.level === 'AI_ADMIN') {
          reply = lang === 'roman_ur'
          ? 'Yeh security ya ownership review mangta hai. Investigation aur audit services connected nahi hain; final faislay ke liye authorized admin se rabta karein.'
          : 'This requires a security or ownership review. Investigation and audit services are not connected; please contact an authorized administrator.';
      } else {
        const propertyReply = isPropertyTurn && (currentIntent.city || currentIntent.area) ? await buildPropertyReply(userText, lang, shouldGreet, currentIntent) : null;

        if (propertyReply) {
          reply = propertyReply;
        } else if (isPropertyTurn && !currentIntent.city && !currentIntent.area) {
          reply = lang === 'ur'
            ? 'براہ کرم شہر یا علاقہ بتائیں تاکہ میں درست پراپرٹی تلاش کر سکوں۔'
            : lang === 'roman_ur'
              ? 'Meherbani karke city ya area batayein taa ke main sahi property search kar sakun.'
              : 'Which city or area should I search?';
        } else if (isPropertyTurn) {
          reply = lang === 'roman_ur'
            ? 'Is exact requirement ke liye abhi koi matching listing nahi mili. City, area, size ya budget change karke dobara try karein.'
            : lang === 'ur'
              ? 'اس مخصوص ضرورت کے لیے کوئی مماثل لسٹنگ نہیں ملی۔ شہر، علاقہ، سائز یا بجٹ تبدیل کر کے دوبارہ کوشش کریں۔'
              : 'No listing matches this exact requirement yet. Try another city, area, size, or budget.';
        } else {
          const faq = findFAQAnswer(userText);
          if (faq) {
            reply = `[${faq.category} FAQ]: ${faq.answer}`;
          }
        }

        if (!reply) {
          try {
            const conversation = [
              ...messages.map((message) => ({
                role: message.sender === 'user' ? 'user' as const : 'model' as const,
                text: message.text,
              })),
              { role: 'user' as const, text: userText },
            ].slice(-12);
            const response = await fetch('/api/ai/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                messages: conversation,
                language: lang,
                agentName: activeAgent.name,
                sourceContext: isPropertyTurn
                  ? `Parsed property intent only; this is not verified inventory: ${JSON.stringify(currentIntent)}`
                  : undefined,
              }),
              signal: AbortSignal.timeout(24000),
            });
            const result = await response.json() as { reply?: string; code?: string };
            if (response.ok && typeof result.reply === 'string' && result.reply.trim()) {
              reply = result.reply.trim();
              setModelConnectionStatus('connected');
            } else if (result.code === 'AI_NOT_CONFIGURED') {
              setModelConnectionStatus('not_configured');
            } else {
              setModelConnectionStatus('unavailable');
            }
          } catch {
            setModelConnectionStatus('unavailable');
          }
        }

        if (!reply && lang === 'en') {
          if (lower.includes('lead lock') || lower.includes('theft') || lower.includes('poach')) {
          reply = `The canonical Lead Lock duration is 48 hours, but production lock enforcement is not implemented. Eligibility, fees, payment prerequisites, release authority, and extensions remain DECISION REQUIRED.`;
          } else if (lower.includes('lahore') || lower.includes('dha') || lower.includes('plot')) {
          reply = `I do not have authoritative live inventory or verification data. Please provide a city, area, budget, and property type; sample records must not be treated as verified listings.`;
          } else if (lower.includes('karachi') || lower.includes('clifton')) {
          reply = `I do not have authoritative live inventory or market data for Karachi. Any sample records or market estimates shown in this preview are not verified evidence.`;
          } else if (lower.includes('islamabad') || lower.includes('f-7') || lower.includes('blue area')) {
          reply = `I do not have authoritative live inventory or valuation data for Islamabad. Deal Lock is not an escrow service, and its production enforcement is not implemented.`;
          } else {
          reply = `The language model is not connected, so this is a local preview of the ${activeAgent.name} role. No live property, verification, or workflow service is connected.`;
          }
        } else if (!reply && lang === 'ur') {
          if (lower.includes('lead') || lower.includes('لیڈ') || lower.includes('چوری')) {
          reply = `Nexus کے طے شدہ اصول میں Lead Lock کی مدت 48 گھنٹے ہے، لیکن production lock enforcement موجود نہیں۔ اہلیت، فیس، ادائیگی، release authority اور extension کے فیصلے ابھی درکار ہیں۔`;
          } else if (lower.includes('لاہور') || lower.includes('lahore') || lower.includes('ڈی ایچ اے')) {
          reply = `میرے پاس براہ راست مستند inventory یا verification data موجود نہیں۔ براہ کرم شہر، علاقہ، بجٹ اور پراپرٹی کی قسم بتائیں؛ sample records کو verified listing نہ سمجھیں۔`;
          } else {
          reply = `Language model connect nahi hai, is liye yeh ${activeAgent.name} role ka local preview hai. Live property, verification ya workflow service connected nahi.`;
          }
        } else if (!reply) {
          if (lower.includes('lead') || lower.includes('chori') || lower.includes('poach')) {
          reply = `Nexus ki canonical Lead Lock duration 48 hours hai, lekin production lock service abhi implement nahin hui. Eligibility, release authority, extension, fee, aur payment prerequisite DECISION REQUIRED hain.`;
          } else if (lower.includes('plot') || lower.includes('lahore') || lower.includes('dha') || lower.includes('karachi')) {
          reply = `Is waqt mujhe authoritative live inventory data available nahin hai. Aap city, area, budget, aur property type batayen; sample data ko verified listing nahin samjha jayega.`;
          } else {
          reply = `Aapka sawal samajh aaya. Language model abhi connect nahi, is liye main sirf local preview guidance de sakti hoon. Live property, verification ya workflow integration available hone ka dawa nahi karungi.`;
          }
        }
      }

      const requirementConfirmation = intentToNaturalConfirmation(currentIntent, lang);
      const responseWithRequirement = propertyIntent && !reply.startsWith(requirementConfirmation)
        ? `${requirementConfirmation}\n\n${reply}`
        : reply;
      const greetingPrefix = shouldGreet
        ? lang === 'en' ? 'Hello.' : lang === 'ur' ? 'خوش آمدید۔' : 'Assalamo Alaikum.'
        : '';
      const responseWithGreeting = greetingPrefix && !responseWithRequirement.startsWith(greetingPrefix)
        ? `${greetingPrefix}\n\n${responseWithRequirement}`
        : responseWithRequirement;
      const userFacingReply = normalizeChatScript(formatAssistantResponse(responseWithGreeting));

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: userFacingReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentName: activeAgent.name
        }
      ]);

      setIsThinking(false);
      speakText(userFacingReply);
    }, 600);
    setIsThinking(true);
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
                <h3 className="text-sm font-bold text-white tracking-wide">Nexus Property Advisor</h3>
                <span className={`w-2 h-2 rounded-full ${modelConnectionStatus === 'connected' ? 'bg-emerald-400 animate-ping' : modelConnectionStatus === 'unavailable' ? 'bg-red-400' : 'bg-amber-300'}`} />
              </div>
              <p className="text-[10px] font-mono text-[#D4AF37]">
                {modelConnectionStatus === 'connected'
                  ? 'Model connected · property records remain unverified'
                  : modelConnectionStatus === 'not_configured'
                    ? 'Local preview · model key not configured'
                    : modelConnectionStatus === 'unavailable'
                      ? 'Local preview · model unavailable'
                      : 'Property guidance · model status unverified'}
              </p>
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
          <span className="text-neutral-400 text-[10px]">CHOOSE SPECIALIST:</span>
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
                {emp.role}
              </option>
            ))}
          </select>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.agentName && msg.sender === 'ai' && (
                <span className="text-[10px] font-mono text-[#D4AF37] mb-1 px-1">
                  Nexus Property Advisor
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
                    : 'glass-card-luxury text-neutral-200 border-white/10 rounded-tl-none whitespace-pre-line'
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
          {isThinking && (
            <div className="flex items-center gap-2 text-[10px] text-neutral-400" role="status" aria-live="polite">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
              Preparing a grounded response...
            </div>
          )}
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
              disabled={isThinking}
              aria-label={isThinking ? 'Preparing reply' : 'Send message'}
              className="p-3 rounded-xl bg-[#D4AF37] hover:bg-[#F3CF57] text-black font-bold transition-all cursor-pointer disabled:cursor-wait disabled:opacity-50"
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
