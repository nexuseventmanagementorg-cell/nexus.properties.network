import type { PlatformRole } from './platformStore';
export type AuthorizationAction = 'read' | 'create' | 'update' | 'delete' | 'approve' | 'manage';

const permissions: Record<PlatformRole, AuthorizationAction[]> = {
  Buyer: ['read', 'create'], Seller: ['read', 'create', 'update'], Agent: ['read', 'create', 'update'], Agency: ['read', 'create', 'update', 'manage'], Developer: ['read', 'create', 'update', 'manage'], Investor: ['read', 'create'], Industrial: ['read', 'create', 'update'], Corporate: ['read', 'create', 'update', 'manage'], Government: ['read', 'approve'], 'AI Admin': ['read', 'create', 'update', 'approve', 'manage'], 'Super Admin': ['read', 'create', 'update', 'delete', 'approve', 'manage'],
};

export const can = (role: PlatformRole, action: AuthorizationAction) => permissions[role]?.includes(action) || false;
export const canRead = (role: PlatformRole) => can(role, 'read');
export const canCreate = (role: PlatformRole) => can(role, 'create');
export const canUpdate = (role: PlatformRole) => can(role, 'update');
export const canDelete = (role: PlatformRole) => can(role, 'delete');
export const canApprove = (role: PlatformRole) => can(role, 'approve');
export const canManage = (role: PlatformRole) => can(role, 'manage');
export const requirePermission = (role: PlatformRole, action: AuthorizationAction) => { if (!can(role, action)) throw new Error(`${role} is not authorized to ${action} this resource.`); };
