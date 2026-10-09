import { BrowserFallbackProvider } from './BrowserFallbackProvider';
import { RemoteVoiceProvider } from './RemoteVoiceProvider';
import { defaultVoiceProfile, type VoiceProvider, type VoiceProviderName, type VoiceRequest } from './VoiceProvider';

export class VoiceManager {
  private readonly providers: VoiceProvider[];

  constructor(providers?: VoiceProvider[]) {
    this.providers = providers ?? [
      new RemoteVoiceProvider('elevenlabs', '/api/voice/elevenlabs', import.meta.env.VITE_ELEVENLABS_API_KEY),
      new RemoteVoiceProvider('openai', '/api/voice/openai', import.meta.env.VITE_OPENAI_API_KEY),
      new RemoteVoiceProvider('google', '/api/voice/google', import.meta.env.VITE_GOOGLE_TTS_API_KEY),
      new BrowserFallbackProvider(),
    ];
  }

  async speak(request: VoiceRequest) {
    const ordered = defaultVoiceProfile.providerOrder
      .map((name) => this.providers.find((provider) => provider.name === name))
      .filter((provider): provider is VoiceProvider => Boolean(provider));
    let lastError: unknown;
    for (const provider of ordered) {
      if (!provider.isAvailable()) continue;
      try {
        return await provider.synthesize(request);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError ?? new Error('No voice provider is available');
  }

  stop(providerName?: VoiceProviderName) {
    this.providers.filter((provider) => !providerName || provider.name === providerName).forEach((provider) => provider.stop());
  }
}

export const voiceManager = new VoiceManager();
