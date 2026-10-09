import type { VoiceProvider, VoiceProviderName, VoiceRequest } from './VoiceProvider';

export class RemoteVoiceProvider implements VoiceProvider {
  constructor(
    public readonly name: Exclude<VoiceProviderName, 'browser'>,
    private readonly endpoint: string,
    private readonly apiKey?: string,
  ) {}

  isAvailable() {
    return Boolean(this.apiKey && typeof window !== 'undefined');
  }

  async synthesize(request: VoiceRequest) {
    if (!this.isAvailable()) return;
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error(`${this.name} voice provider returned ${response.status}`);
    return response.arrayBuffer();
  }

  stop() {}
}
