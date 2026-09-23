import { LanguageMode } from './types';

const copy = {
  en: {
    home: 'Home', problems: 'Problems', graph: 'Property Graph', workforce: 'AI Workforce', properties: 'Properties', coverage: 'Coverage', leadLock: 'Lead Lock', dealLock: 'Deal Lock', trust: 'Trust', government: 'Government', revenue: 'Revenue', roadmap: 'Roadmap', journeys: 'User Journeys', database: 'Database', ecosystems: 'Ecosystems',
    login: 'Login', register: 'Register', search: 'Search', listProperty: 'List My Property', joinAgent: 'Join As Agent', browse: 'Browse Properties',
    heroEyebrow: "PAKISTAN'S MOST ADVANCED", heroTitle: 'Pakistan’s First', smartProperty: 'Smart Property', leadNetwork: 'Lead Network',
    heroBody: 'Connect with verified property owners, buyers, renters and trusted local agents through AI-powered area-based lead matching, automation and Lead Protection.',
    roman: 'ROMAN', assistant: 'Ask the AI Assistant', whatsapp: 'WhatsApp support',
  },
  roman_ur: {
    home: 'Home', problems: 'Masail', graph: 'Property Graph', workforce: 'AI Workforce', properties: 'Properties', coverage: 'Coverage', leadLock: 'Lead Lock', dealLock: 'Deal Lock', trust: 'Trust', government: 'Government', revenue: 'Revenue', roadmap: 'Roadmap', journeys: 'User Journeys', database: 'Database', ecosystems: 'Ecosystems',
    login: 'Login', register: 'Register', search: 'Search', listProperty: 'Property List Karein', joinAgent: 'Agent Ke Taur Par Shamil Hon', browse: 'Properties Dekhein',
    heroEyebrow: 'PAKISTAN KA ADVANCED PROPERTY NETWORK', heroTitle: 'Pakistan ka Pehla', smartProperty: 'Smart Property', leadNetwork: 'Lead Network',
    heroBody: 'Verified property owners, buyers, renters aur trusted local agents se AI powered matching, automation aur Lead Protection ke zariye connect hon.',
    roman: 'ROMAN', assistant: 'AI Assistant se poochein', whatsapp: 'WhatsApp support',
  },
  ur: {
    home: 'ہوم', problems: 'مسائل', graph: 'پراپرٹی گراف', workforce: 'اے آئی ورک فورس', properties: 'پراپرٹیز', coverage: 'کوریج', leadLock: 'لیڈ لاک', dealLock: 'ڈیل لاک', trust: 'اعتماد', government: 'حکومت', revenue: 'ریونیو', roadmap: 'روڈ میپ', journeys: 'صارف کے سفر', database: 'ڈیٹا بیس', ecosystems: 'ایکو سسٹمز',
    login: 'لاگ اِن', register: 'رجسٹر', search: 'تلاش', listProperty: 'پراپرٹی لسٹ کریں', joinAgent: 'ایجنٹ کے طور پر شامل ہوں', browse: 'پراپرٹیز دیکھیں',
    heroEyebrow: 'پاکستان کا جدید ترین پراپرٹی نیٹ ورک', heroTitle: 'پاکستان کا پہلا', smartProperty: 'اسمارٹ پراپرٹی', leadNetwork: 'لیڈ نیٹ ورک',
    heroBody: 'تصدیق شدہ مالکان، خریداروں، کرایہ داروں اور قابل اعتماد ایجنٹس سے اے آئی میچنگ، آٹومیشن اور لیڈ پروٹیکشن کے ذریعے رابطہ کریں۔',
    roman: 'رومن', assistant: 'اے آئی اسسٹنٹ سے پوچھیں', whatsapp: 'واٹس ایپ سپورٹ',
  },
} as const;

export type CopyKey = keyof typeof copy.en;
export const getCopy = (lang: LanguageMode, key: CopyKey) => copy[lang][key];
