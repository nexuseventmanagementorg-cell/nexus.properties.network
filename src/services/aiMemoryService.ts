export interface AIPersonaMemory {
  id: string;
  userId: string;
  sessionId: string;
  role: string;
  message: string;
  createdAt: string;
}

export const aiMemoryService = {
  save: (input: Omit<AIPersonaMemory, 'id' | 'createdAt'>) => ({
    id: `AI-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...input,
  }),
  getHistory: () => [] as AIPersonaMemory[],
};
