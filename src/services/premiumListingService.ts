export type PremiumListingTier = 'Featured Listing' | 'Premium Listing' | 'Developer Spotlight';

export const premiumListingTiers: Record<PremiumListingTier, number> = {
  'Featured Listing': 15000,
  'Premium Listing': 30000,
  'Developer Spotlight': 50000,
};

export const createPremiumListing = (tier: PremiumListingTier, ownerId: string) => ({
  ownerId,
  tier,
  amount: premiumListingTiers[tier],
  status: 'Pending',
  createdAt: new Date().toISOString(),
});
