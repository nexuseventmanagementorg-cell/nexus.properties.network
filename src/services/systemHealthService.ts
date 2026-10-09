export interface SystemHealthStatus {
  database: 'ok' | 'degraded' | 'offline';
  storage: 'ok' | 'degraded' | 'offline';
  auth: 'ok' | 'degraded' | 'offline';
  ai: 'ok' | 'degraded' | 'offline';
  notifications: 'ok' | 'degraded' | 'offline';
}

export const systemHealthService = {
  getStatus: (): SystemHealthStatus => ({
    database: 'ok',
    storage: 'ok',
    auth: 'ok',
    ai: 'ok',
    notifications: 'ok',
  }),
};
