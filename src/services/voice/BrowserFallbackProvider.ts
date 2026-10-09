import type { VoiceProvider, VoiceRequest } from './VoiceProvider';

export class BrowserFallbackProvider implements VoiceProvider {
  readonly name = 'browser' as const;

  isAvailable() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  async synthesize(request: VoiceRequest) {
    if (!this.isAvailable()) return;
    const utterance = new SpeechSynthesisUtterance(request.text);
    utterance.lang = request.language === 'ur' || request.language === 'roman_ur' ? 'ur-PK' : 'en-IN';
    utterance.rate = request.rate ?? 1;
    utterance.volume = request.volume ?? 1;
    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (this.isAvailable()) window.speechSynthesis.cancel();
  }
}
