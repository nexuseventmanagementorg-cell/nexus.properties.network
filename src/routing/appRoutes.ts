import type { PlatformRole } from '../services/platformStore';

export const APP_PATHS = {
  home: '/',
  dashboard: '/dashboard',
  marketplace: '/marketplace',
  listProperty: '/list-property',
  agents: '/agents',
  pricing: '/pricing',
  leadProtection: '/lead-protection',
  dealLock: '/deal-lock',
  coverage: '/coverage',
  faq: '/faq',
  contact: '/contact',
  messages: '/messages',
  notifications: '/notifications',
  crm: '/crm',
  verification: '/verification',
  subscriptions: '/subscriptions',
  payments: '/payments',
  commission: '/commission',
  ai: '/ai',
  aiWorkforce: '/ai-workforce',
  admin: '/admin',
  adminAi: '/admin/ai',
  adminAudit: '/admin/audit',
  aiAdmin: '/ai-admin',
  superAdmin: '/super-admin',
  propertyDetail: '/properties',
  agentDetail: '/agents',
  leadDetail: '/lead',
  dealDetail: '/deal',
  login: '/auth/login',
  register: '/auth/register',
  privacy: '/privacy',
  terms: '/terms',
  apiDocs: '/api-docs',
  animation3d: '/3d-animation',
  heroAnimation: '/hero-animation',
} as const;

export type AppPathKey = keyof typeof APP_PATHS;

export const PRODUCT_PAGE_PATHS = [
  APP_PATHS.marketplace,
  APP_PATHS.listProperty,
  APP_PATHS.agents,
  APP_PATHS.pricing,
  APP_PATHS.leadProtection,
  APP_PATHS.dealLock,
  APP_PATHS.coverage,
  APP_PATHS.faq,
  APP_PATHS.contact,
  APP_PATHS.messages,
  APP_PATHS.notifications,
  APP_PATHS.crm,
  APP_PATHS.verification,
  APP_PATHS.subscriptions,
  APP_PATHS.payments,
  APP_PATHS.commission,
  APP_PATHS.ai,
  APP_PATHS.aiWorkforce,
] as const;
export type ProductRoutePath =
  | (typeof PRODUCT_PAGE_PATHS)[number]
  | `/properties/${string}`
  | `/agents/${string}`
  | `/lead/${string}`
  | `/deal/${string}`;

export const PRODUCT_ROUTES = [
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'listProperty', label: 'List property' },
  { id: 'agents', label: 'Find an agent' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'leadProtection', label: 'Lead protection' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'ai', label: 'AI assistant' },
  { id: 'contact', label: 'Contact' },
] as const;

export const APPLICATION_NAVIGATION = [
  { path: APP_PATHS.home, label: 'Home' },
  ...PRODUCT_ROUTES.map((route) => ({ path: APP_PATHS[route.id], label: route.label })),
];

const dashboardRoles: Record<string, PlatformRole> = {
  buyer: 'Buyer',
  seller: 'Seller',
  agent: 'Agent',
  agency: 'Agency',
  developer: 'Developer',
  investor: 'Investor',
  industrial: 'Industrial',
  corporate: 'Corporate',
  government: 'Government',
  'ai-admin': 'AI Admin',
  'super-admin': 'Super Admin',
};

export type ApplicationRoute =
  | { kind: 'home' }
  | { kind: 'animation3d' }
  | { kind: 'heroAnimation' }
  | { kind: 'auth'; mode: 'login' | 'register' }
  | { kind: 'document'; path: '/privacy' | '/terms' | '/api-docs' }
  | { kind: 'dashboard'; role: PlatformRole }
  | { kind: 'product'; path: ProductRoutePath }
  | { kind: 'notFound' };

export const resolveApplicationRoute = (pathname: string): ApplicationRoute => {
  if (pathname === APP_PATHS.home) return { kind: 'home' };
  if (pathname === APP_PATHS.animation3d) return { kind: 'animation3d' };
  if (pathname === APP_PATHS.heroAnimation) return { kind: 'heroAnimation' };
  if (pathname === APP_PATHS.login) return { kind: 'auth', mode: 'login' };
  if (pathname === APP_PATHS.register) return { kind: 'auth', mode: 'register' };
  if (pathname === APP_PATHS.privacy || pathname === APP_PATHS.terms || pathname === APP_PATHS.apiDocs) {
    return { kind: 'document', path: pathname };
  }
  if (pathname === APP_PATHS.admin) return { kind: 'dashboard', role: 'AI Admin' };
  if (pathname === APP_PATHS.adminAi || pathname.startsWith(`${APP_PATHS.adminAi}/`)) return { kind: 'dashboard', role: 'AI Admin' };
  if (pathname === APP_PATHS.adminAudit || pathname.startsWith(`${APP_PATHS.adminAudit}/`)) return { kind: 'dashboard', role: 'Super Admin' };
  if (pathname === APP_PATHS.superAdmin || pathname.startsWith(`${APP_PATHS.superAdmin}/`)) return { kind: 'dashboard', role: 'Super Admin' };
  if (pathname === APP_PATHS.aiAdmin || pathname.startsWith(`${APP_PATHS.aiAdmin}/`)) return { kind: 'dashboard', role: 'AI Admin' };

  const dashboardMatch = new RegExp(`^${APP_PATHS.dashboard}/([^/]+)/?$`).exec(pathname);
  if (dashboardMatch) {
    const role = dashboardRoles[dashboardMatch[1].toLowerCase()];
    return role ? { kind: 'dashboard', role } : { kind: 'notFound' };
  }

  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const detailPrefixes = [APP_PATHS.propertyDetail, APP_PATHS.agentDetail, APP_PATHS.leadDetail, APP_PATHS.dealDetail];
  const isDetailRoute = detailPrefixes.some((prefix) => {
    const remainder = normalizedPath.slice(`${prefix}/`.length);
    return normalizedPath.startsWith(`${prefix}/`) && remainder.length > 0 && !remainder.includes('/');
  });
  if (PRODUCT_PAGE_PATHS.includes(normalizedPath as (typeof PRODUCT_PAGE_PATHS)[number]) || isDetailRoute) {
    return { kind: 'product', path: normalizedPath as ProductRoutePath };
  }
  return { kind: 'notFound' };
};

export const routeForRole = (role: PlatformRole) =>
  `${APP_PATHS.dashboard}/${role.toLowerCase().replace(/\s+/g, '-')}`;

export const propertyDetailPath = (propertyId: string) =>
  `${APP_PATHS.propertyDetail}/${encodeURIComponent(propertyId)}`;

export const agentDetailPath = (agentId: string) =>
  `${APP_PATHS.agentDetail}/${encodeURIComponent(agentId)}`;

export const navigateApp = (path: string, replace = false) => {
  if (typeof window === 'undefined') return;
  if (replace) window.history.replaceState({}, '', path);
  else window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
