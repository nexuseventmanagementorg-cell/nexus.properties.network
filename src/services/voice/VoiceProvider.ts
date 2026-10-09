export type VoiceLanguage = 'roman_ur' | 'ur' | 'en';
export type VoiceProviderName = 'elevenlabs' | 'openai' | 'google' | 'browser';

export interface VoiceRequest {
  text: string;
  language: VoiceLanguage;
  voiceId?: string;
  rate?: number;
  volume?: number;
}

export interface VoiceProvider {
  readonly name: VoiceProviderName;
  isAvailable(): boolean;
  synthesize(request: VoiceRequest): Promise<ArrayBuffer | void>;
  stop(): void;
}

export const defaultVoiceProfile = {
  language: 'roman_ur' as VoiceLanguage,
  supportedLanguages: ['roman_ur', 'ur', 'en'] as VoiceLanguage[],
  providerOrder: ['elevenlabs', 'openai', 'google', 'browser'] as VoiceProviderName[],
};
