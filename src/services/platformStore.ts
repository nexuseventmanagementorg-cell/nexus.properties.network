export type PlatformRole = 'Buyer' | 'Seller' | 'Agent' | 'Agency' | 'Developer' | 'Investor' | 'Industrial' | 'Corporate' | 'Government' | 'AI Admin' | 'Super Admin';
export type LeadStatus = 'New' | 'Contacted' | 'Negotiating' | 'Converted' | 'Closed' | 'Rejected';
export type DealStatus = 'Open' | 'Negotiating' | 'Pending Documents' | 'Pending Payment' | 'Completed' | 'Cancelled';
export interface PlatformSettings { notifications: boolean; language: string; lastUpdated: string; userId?: string; }

export { getProperties as getPlatformProperties, getArchivedPropertyRecords as getArchivedPlatformProperties, createProperty as createPlatformProperty, updateProperty as editPlatformProperty, deleteProperty as removePlatformProperty, archiveProperty as archivePlatformProperty, restoreProperty as restorePlatformProperty } from './propertyService';
export { getLeads as getPlatformLeads, createLead, updateLead } from './leadService';
export { getDeals as getPlatformDeals, createDeal, updateDeal } from './dealService';
export { getUserSettings as getPlatformSettings, saveUserSettings as savePlatformSettings } from './userService';
export const PLATFORM_UPDATED_EVENT = 'nexus-platform-updated';
