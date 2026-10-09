CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  province TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO cities (id, name, province) VALUES
('01010101-0101-4101-8101-010101010101', 'Lahore', 'Punjab'),
('02020202-0202-4202-8202-020202020202', 'Karachi', 'Sindh'),
('03030303-0303-4303-8303-030303030303', 'Islamabad', 'Islamabad Capital Territory'),
('04040404-0404-4404-8404-040404040404', 'Rawalpindi', 'Punjab'),
('05050505-0505-4505-8505-050505050505', 'Peshawar', 'Khyber Pakhtunkhwa');
