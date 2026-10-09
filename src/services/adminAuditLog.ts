export interface AdminAuditLog {
  id: string;
  actorId: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId?: string;
  createdAt: string;
}

export const adminAuditLog = {
  log: (input: Omit<AdminAuditLog, 'id' | 'createdAt'>) => ({
    id: `AUD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...input,
  }),
  getAll: () => [] as AdminAuditLog[],
};
