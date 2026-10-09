INSERT INTO properties (id, owner_id, title, city, area, phase, property_type, price, status, audit_id) VALUES
('11111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Sample 1 Kanal Luxury House - Lahore', 'Lahore', 'DHA', 'Phase 1', 'House', 80000000, 'active', 'AUD-SEED-1'),
('22222222-2222-4222-8222-222222222222', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Sample Residential Plot - Lahore', 'Lahore', 'DHA', 'Phase 1', 'Plot', 22500000, 'active', 'AUD-SEED-2'),
('33333333-3333-4333-8333-333333333333', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Sample Main Boulevard Commercial Property - Lahore', 'Lahore', 'DHA', 'Phase 1', 'Commercial', 55000000, 'active', 'AUD-SEED-3');

INSERT INTO users (id, full_name, email, role, status, audit_id) VALUES
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Nexus Seed User', 'seed-user@nexus.local', 'Seller', 'active', 'AUD-SEED-USER-1');
