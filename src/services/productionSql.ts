export const productionSql = {
  users: `CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, email TEXT UNIQUE NOT NULL, full_name TEXT, role TEXT, status TEXT DEFAULT 'active', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  properties: `CREATE TABLE IF NOT EXISTS properties (id UUID PRIMARY KEY, owner_id UUID, title TEXT, city TEXT, area TEXT, phase TEXT, property_type TEXT, price NUMERIC, status TEXT DEFAULT 'active', cover_image_url TEXT, gallery_urls JSONB DEFAULT '[]'::jsonb, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  leads: `CREATE TABLE IF NOT EXISTS leads (id UUID PRIMARY KEY, property_id UUID, owner_id UUID, assigned_to UUID, status TEXT DEFAULT 'NEW', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  deals: `CREATE TABLE IF NOT EXISTS deals (id UUID PRIMARY KEY, property_id UUID, owner_id UUID, assigned_to UUID, status TEXT DEFAULT 'OPEN', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  messages: `CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY, conversation_id UUID, sender_id UUID, recipient_id UUID, body TEXT, direction TEXT, status TEXT DEFAULT 'unread', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  notifications: `CREATE TABLE IF NOT EXISTS notifications (id UUID PRIMARY KEY, recipient_id UUID, title TEXT, message TEXT, read BOOLEAN DEFAULT FALSE, status TEXT DEFAULT 'unread', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  payments: `CREATE TABLE IF NOT EXISTS payments (id UUID PRIMARY KEY, owner_id UUID, amount NUMERIC, provider TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  subscriptions: `CREATE TABLE IF NOT EXISTS subscriptions (id UUID PRIMARY KEY, owner_id UUID, plan TEXT, status TEXT DEFAULT 'Pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  verifications: `CREATE TABLE IF NOT EXISTS verifications (id UUID PRIMARY KEY, owner_id UUID, entity_type TEXT, entity_id UUID, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  ai_conversations: `CREATE TABLE IF NOT EXISTS ai_conversations (id UUID PRIMARY KEY, user_id UUID, session_id TEXT, role TEXT, history JSONB DEFAULT '[]'::jsonb, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  deal_commissions: `CREATE TABLE IF NOT EXISTS deal_commissions (id UUID PRIMARY KEY, deal_id UUID, amount NUMERIC, commission_type TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());`,
  admin_audit_log: `CREATE TABLE IF NOT EXISTS admin_audit_log (id UUID PRIMARY KEY, actor_id UUID, actor_role TEXT, action TEXT, target_type TEXT, target_id UUID, created_at TIMESTAMPTZ DEFAULT NOW());`,
  buckets: [
    'property-images',
    'avatars',
    'verification-documents',
  ],
};
