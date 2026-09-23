// src/components/ThreeCanvas.tsx
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three';

// ========================================================
// 1. AUTHENTIC PAKISTAN GEOGRAPHIC BORDER CONTOUR (3D COORDS)
// Normalized coordinates with topographic elevation (Z-axis)
// ========================================================
const PAKISTAN_BORDER_COORDINATES: [number, number, number][] = [
  // 1. Arabian Sea Coast (South)
  [-2.95, -2.15, 0.0],  // Jiwani / Gwadar West
  [-2.65, -2.10, 0.0],  // Gwadar Port
  [-2.20, -2.02, 0.0],  // Pasni
  [-1.65, -1.90, 0.0],  // Ormara
  [-1.25, -1.75, 0.02], // Karachi Coast
  [-0.95, -1.90, 0.0],  // Indus Delta Creek

  // 2. Eastern Border (Sindh & Punjab)
  [-0.75, -1.65, 0.05], // Rann of Kutch
  [-0.55, -1.25, 0.08], // Tharparkar
  [-0.30, -0.80, 0.10], // Umerkot
  [-0.10, -0.40, 0.12], // Rahim Yar Khan
  [0.25, -0.15, 0.14],  // Bahawalpur / Cholistan
  [0.85, 0.15, 0.16],   // Okara / Kasur border
  [1.25, 0.45, 0.18],   // Lahore Wagah Border
  [1.40, 0.85, 0.22],   // Narowal / Sialkot Shakargarh

  // 3. Line of Control & Northern Ranges (High Elevation)
  [1.50, 1.25, 0.40],   // Jammu / Kashmir Foothills
  [1.40, 1.70, 0.65],   // Skardu / Karakoram approach
  [1.25, 2.05, 0.80],   // Siachen / K2 High Range
  [0.90, 2.30, 0.85],   // Khunjerab Pass (Highest Point)
  [0.45, 2.15, 0.75],   // Hunza / Gilgit
  [-0.10, 2.05, 0.65],  // Nanga Parbat / Kohistan
  [-0.45, 1.90, 0.55],  // Chitral / Hindu Kush

  // 4. Western Durand Line (KPK & Balochistan)
  [-0.75, 1.45, 0.45],  // Khyber Pass / Torkham
  [-0.95, 1.10, 0.38],  // Parachinar / Kurram
  [-1.15, 0.75, 0.32],  // Waziristan Ridge
  [-1.35, 0.40, 0.30],  // Zhob Gateway
  [-1.60, 0.10, 0.28],  // Chaman Border
  [-1.85, -0.25, 0.25], // Quetta West Ridge
  [-2.25, -0.35, 0.20], // Nushki / Chaghi Desert
  [-2.80, -0.45, 0.15], // Taftan Iran Border
  [-2.85, -1.05, 0.12], // Panjgur Corridor
  [-2.95, -1.65, 0.08], // Turbat Corridor
  [-2.95, -2.15, 0.0],  // Return to Jiwani
];

// Internal Provincial Administrative Partition Lines
const PROVINCIAL_DIVIDERS: [number, number, number][][] = [
  // Punjab / Sindh boundary
  [
    [-0.10, -0.40, 0.12],
    [-0.40, -0.45, 0.10],
    [-0.70, -0.50, 0.08],
  ],
  // Punjab / KPK boundary
  [
    [0.10, 1.05, 0.35],
    [-0.20, 0.90, 0.30],
    [-0.50, 0.70, 0.25],
  ],
  // Balochistan / Sindh boundary
  [
    [-0.70, -0.50, 0.08],
    [-0.90, -1.00, 0.05],
    [-1.15, -1.50, 0.02],
    [-1.25, -1.75, 0.02],
  ],
  // Northern Corridor to Islamabad
  [
    [0.18, 1.25, 0.35],
    [0.45, 1.70, 0.55],
    [0.45, 2.15, 0.75],
  ]
];

// ========================================================
// 2. MAJOR CITIES & AREA LOCATIONS WITH 3D BEACONS & LABELS
// ========================================================
export interface CityMarker {
  id: string;
  name: string;
  urduName: string;
  areaHub: string;
  pos: [number, number, number];
  color: string;
  size: number;
  activeUnits: string;
  status: string;
  tier: 'FEDERAL_CORE' | 'METROPOLITAN' | 'COASTAL_PORT' | 'REGIONAL_HUB';
  subAreas?: { name: string; pos: [number, number, number] }[];
}

export const MAJOR_CITIES_3D: CityMarker[] = [
  {
    id: 'isb',
    name: 'ISLAMABAD',
    urduName: 'اسلام آباد',
    areaHub: 'Blue Area // Sector F-7 // Gulberg Greens',
    pos: [0.18, 1.25, 0.35],
    color: '#2DD4BF',
    size: 0.16,
    activeUnits: '4,890 Verified',
    status: 'FEDERAL CAPITAL // ONLINE',
    tier: 'FEDERAL_CORE',
    subAreas: [
      { name: 'Blue Area', pos: [0.32, 1.35, 0.38] },
      { name: 'Sector F-7', pos: [0.08, 1.38, 0.40] },
      { name: 'DHA Islamabad', pos: [0.28, 1.12, 0.32] },
    ]
  },
  {
    id: 'rwp',
    name: 'RAWALPINDI',
    urduName: 'راولپنڈی',
    areaHub: 'Bahria Town 1-8 // Chaklala 3',
    pos: [0.12, 1.08, 0.32],
    color: '#2DD4BF',
    size: 0.12,
    activeUnits: '5,640 Verified',
    status: 'GARRISON HUB',
    tier: 'REGIONAL_HUB',
    subAreas: [
      { name: 'Bahria Town', pos: [0.22, 0.98, 0.30] }
    ]
  },
  {
    id: 'lhr',
    name: 'LAHORE',
    urduName: 'لاہور',
    areaHub: 'DHA Phase 9 Prism // Gulberg I-V // Lake City',
    pos: [1.22, 0.42, 0.18],
    color: '#D4AF37',
    size: 0.22,
    activeUnits: '12,450 Verified',
    status: 'METROPOLITAN CADASTRE',
    tier: 'METROPOLITAN',
    subAreas: [
      { name: 'DHA Prism', pos: [1.38, 0.35, 0.20] },
      { name: 'Gulberg Core', pos: [1.12, 0.52, 0.19] },
      { name: 'Lake City', pos: [1.18, 0.28, 0.17] },
    ]
  },
  {
    id: 'khi',
    name: 'KARACHI',
    urduName: 'کراچی',
    areaHub: 'Clifton Blocks // DHA Phase 8 // Bahria Karachi',
    pos: [-1.25, -1.72, 0.04],
    color: '#D4AF37',
    size: 0.24,
    activeUnits: '18,200 Verified',
    status: 'COASTAL FINANCIAL AXIS',
    tier: 'METROPOLITAN',
    subAreas: [
      { name: 'Clifton Coast', pos: [-1.42, -1.82, 0.02] },
      { name: 'DHA Phase 8', pos: [-1.15, -1.85, 0.03] },
      { name: 'Bahria Town Khi', pos: [-1.05, -1.55, 0.08] },
    ]
  },
  {
    id: 'gwd',
    name: 'GWADAR',
    urduName: 'گوادر',
    areaHub: 'Deep Sea Port // Free Zone North // Marine Drive',
    pos: [-2.65, -2.08, 0.02],
    color: '#2DD4BF',
    size: 0.18,
    activeUnits: '1,890 Verified',
    status: 'CPEC SEZ GATEWAY',
    tier: 'COASTAL_PORT',
    subAreas: [
      { name: 'Free Zone North', pos: [-2.55, -1.95, 0.05] },
      { name: 'Marine Drive', pos: [-2.78, -2.15, 0.01] }
    ]
  },
  {
    id: 'pew',
    name: 'PESHAWAR',
    urduName: 'پشاور',
    areaHub: 'DHA Peshawar // Hayatabad 1-7',
    pos: [-0.55, 1.38, 0.42],
    color: '#2DD4BF',
    size: 0.14,
    activeUnits: '2,480 Verified',
    status: 'KPK LOGISTICS CORRIDOR',
    tier: 'REGIONAL_HUB',
    subAreas: [
      { name: 'Hayatabad', pos: [-0.68, 1.45, 0.45] }
    ]
  },
  {
    id: 'qta',
    name: 'QUETTA',
    urduName: 'کوئٹہ',
    areaHub: 'DHA Quetta // Cantt // Zarghun Housing',
    pos: [-1.65, -0.15, 0.26],
    color: '#2DD4BF',
    size: 0.14,
    activeUnits: '1,120 Verified',
    status: 'WESTERN HIGHLANDS',
    tier: 'REGIONAL_HUB',
    subAreas: [
      { name: 'DHA Quetta', pos: [-1.52, -0.05, 0.28] }
    ]
  },
  {
    id: 'fsd',
    name: 'FAISALABAD',
    urduName: 'فیصل آباد',
    areaHub: 'Canal Road // FDA City // Madina Town',
    pos: [0.68, 0.32, 0.15],
    color: '#D4AF37',
    size: 0.15,
    activeUnits: '3,200 Verified',
    status: 'INDUSTRIAL HUB',
    tier: 'REGIONAL_HUB'
  },
  {
    id: 'mux',
    name: 'MULTAN',
    urduName: 'ملتان',
    areaHub: 'DHA Multan // Bosan Road // Cantt',
    pos: [0.25, -0.25, 0.12],
    color: '#2DD4BF',
    size: 0.13,
    activeUnits: '2,150 Verified',
    status: 'SOUTHERN CORRIDOR',
    tier: 'REGIONAL_HUB'
  },
  {
    id: 'skt',
    name: 'SIALKOT',
    urduName: 'سیالکوٹ',
    areaHub: 'Citi Housing // Sambrial Dry Port',
    pos: [1.32, 0.82, 0.22],
    color: '#2DD4BF',
    size: 0.12,
    activeUnits: '1,420 Verified',
    status: 'EXPORT SEZ',
    tier: 'REGIONAL_HUB'
  },
  {
    id: 'hyd',
    name: 'HYDERABAD',
    urduName: 'حیدرآباد',
    areaHub: 'Qasimabad // Latifabad // Auto Bhan',
    pos: [-1.02, -1.45, 0.05],
    color: '#2DD4BF',
    size: 0.12,
    activeUnits: '1,680 Verified',
    status: 'INDUS CORRIDOR',
    tier: 'REGIONAL_HUB'
  },
  {
    id: 'glt',
    name: 'GILGIT / HUNZA',
    urduName: 'گلگت / ہنزہ',
    areaHub: 'Karakoram Highway // River Basin',
    pos: [0.55, 2.15, 0.78],
    color: '#2DD4BF',
    size: 0.13,
    activeUnits: '640 Verified',
    status: 'NORTHERN SOVEREIGN PIN',
    tier: 'REGIONAL_HUB'
  }
];

// Laser network connecting inter-city pipelines
const INTER_CITY_PIPELINES: [number, number][] = [
  [0, 1],   // Islamabad - Rawalpindi
  [0, 5],   // Islamabad - Peshawar
  [0, 2],   // Islamabad - Lahore
  [0, 11],  // Islamabad - Gilgit/Hunza
  [1, 7],   // Rawalpindi - Faisalabad
  [2, 7],   // Lahore - Faisalabad
  [2, 9],   // Lahore - Sialkot
  [7, 8],   // Faisalabad - Multan
  [8, 10],  // Multan - Hyderabad
  [10, 3],  // Hyderabad - Karachi
  [3, 4],   // Karachi - Gwadar (Coastal Highway)
  [6, 4],   // Quetta - Gwadar (CPEC West)
  [6, 8],   // Quetta - Multan
  [6, 5],   // Quetta - Peshawar
  [2, 3],   // Lahore - Karachi (Main High-Speed Backbone)
  [0, 6],   // Islamabad - Quetta
];

// ========================================================
// 3. ANIMATED DATA PACKET STREAM (ENERGY GLOW ON LINES)
// ========================================================
const TravelingDataPacket: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  offset: number;
  color: string;
}> = ({ start, end, speed, offset, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const p1 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    const cur = p1.clone().lerp(p2, t);
    meshRef.current.position.set(cur.x, cur.y, cur.z);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// ========================================================
// 4. MAIN CINEMATIC SCENE COMPONENT
// ========================================================
const CinematicPakistanScene: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const mapGroupRef = useRef<THREE.Group>(null);
  const adminOrbRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Background starfield / quantum data particles
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 550;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color('#D4AF37');
    const teal = new THREE.Color('#2DD4BF');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;

      const chosen = Math.random() > 0.45 ? gold : teal;
      colors[i * 3] = chosen.r;
      colors[i * 3 + 1] = chosen.g;
      colors[i * 3 + 2] = chosen.b;
    }
    return [positions, colors];
  }, []);

  // Topographic grid points over Pakistan
  const topographicGridPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let x = -2.8; x <= 1.5; x += 0.25) {
      for (let y = -2.1; y <= 2.2; y += 0.25) {
        // Approximate elevation based on North / West
        let z = 0.02;
        if (y > 1.2) z = (y - 1.0) * 0.45; // Northern Mountains
        else if (x < -1.0) z = (-x - 0.8) * 0.15; // Western Highlands
        points.push([x, y, z]);
      }
    }
    return points;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (mapGroupRef.current) {
      // 3D Cinematic Camera / Map rotation reacting to scroll and smooth time
      // Top down near Hero, angled perspective as user explores
      const targetPitch = 0.25 + scrollProgress * 0.45 + Math.sin(t * 0.15) * 0.04;
      const targetYaw = Math.sin(t * 0.12) * 0.12 + (scrollProgress * Math.PI * 0.35);
      const targetRoll = Math.cos(t * 0.08) * 0.03;

      mapGroupRef.current.rotation.x = THREE.MathUtils.lerp(mapGroupRef.current.rotation.x, targetPitch, 0.04);
      mapGroupRef.current.rotation.y = THREE.MathUtils.lerp(mapGroupRef.current.rotation.y, targetYaw, 0.04);
      mapGroupRef.current.rotation.z = THREE.MathUtils.lerp(mapGroupRef.current.rotation.z, targetRoll, 0.04);

      // Camera depth zoom with scroll
      const targetZ = -0.5 - scrollProgress * 2.2;
      const targetY = -0.2 + scrollProgress * 0.6;
      mapGroupRef.current.position.z = THREE.MathUtils.lerp(mapGroupRef.current.position.z, targetZ, 0.05);
      mapGroupRef.current.position.y = THREE.MathUtils.lerp(mapGroupRef.current.position.y, targetY, 0.05);
    }

    // AI Admin orbital rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.5;
      ring1Ref.current.rotation.x = t * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.4;
      ring2Ref.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group ref={mapGroupRef} position={[0, -0.2, 0]}>
      {/* 1. Deep Space Cosmic / Data Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Topographic Cyber Grid Nodes across Pakistan landmass */}
      {topographicGridPoints.map((pt, i) => (
        <mesh key={i} position={pt}>
          <boxGeometry args={[0.015, 0.015, 0.015]} />
          <meshBasicMaterial color="#2DD4BF" transparent opacity={0.2} />
        </mesh>
      ))}

      {/* 3. Glowing National Border Contour of Pakistan (Multi-Segment Line) */}
      <Line
        points={PAKISTAN_BORDER_COORDINATES}
        color="#2DD4BF"
        lineWidth={2.2}
        transparent
        opacity={0.85}
      />
      {/* Secondary Gold Shadow Line for Neon Depth */}
      <Line
        points={PAKISTAN_BORDER_COORDINATES.map(([x, y, z]) => [x, y, z - 0.03] as [number, number, number])}
        color="#D4AF37"
        lineWidth={1.2}
        transparent
        opacity={0.4}
      />

      {/* 4. Internal Provincial Administrative Dividers */}
      {PROVINCIAL_DIVIDERS.map((div, dIdx) => (
        <Line
          key={dIdx}
          points={div}
          color="#D4AF37"
          lineWidth={1.0}
          transparent
          opacity={0.35}
          dashed
          dashSize={0.1}
          gapSize={0.05}
        />
      ))}

      {/* 5. Inter-City Laser Network Lines (Golden & Teal Superhighways) */}
      {INTER_CITY_PIPELINES.map(([fromIdx, toIdx], idx) => {
        const p1 = MAJOR_CITIES_3D[fromIdx].pos;
        const p2 = MAJOR_CITIES_3D[toIdx].pos;
        const isCore = idx % 2 === 0;

        return (
          <group key={idx}>
            <Line
              points={[p1, p2]}
              color={isCore ? '#D4AF37' : '#2DD4BF'}
              lineWidth={1.8}
              transparent
              opacity={0.55}
            />
            {/* Animated Data Packets traveling across inter-city pipelines */}
            <TravelingDataPacket
              start={p1}
              end={p2}
              speed={0.4 + (idx % 3) * 0.15}
              offset={(idx * 0.17) % 1}
              color={isCore ? '#FFF0B3' : '#A7F3D0'}
            />
            <TravelingDataPacket
              start={p2}
              end={p1}
              speed={0.35 + (idx % 2) * 0.2}
              offset={(idx * 0.29) % 1}
              color={isCore ? '#D4AF37' : '#2DD4BF'}
            />
          </group>
        );
      })}

      {/* 6. Major Cities: 3D Beacons, Radar Sonar Rings, Light Pillars, and 3D Labels */}
      {MAJOR_CITIES_3D.map((city) => {
        const isHovered = hoveredCity === city.id;

        return (
          <group key={city.id} position={city.pos}>
            {/* 3D Glowing City Core Sphere */}
            <Sphere
              args={[city.size, 16, 16]}
              onPointerOver={() => setHoveredCity(city.id)}
              onPointerOut={() => setHoveredCity(null)}
            >
              <meshStandardMaterial
                color={city.color}
                emissive={city.color}
                emissiveIntensity={isHovered ? 2.5 : 1.6}
                roughness={0.2}
              />
            </Sphere>

            {/* Concentric Sonar Pulse Shell */}
            <Sphere args={[city.size * 1.5, 16, 16]}>
              <meshBasicMaterial
                color={city.color}
                wireframe
                transparent
                opacity={isHovered ? 0.6 : 0.25}
              />
            </Sphere>

            {/* Radar Expanding Ground Ring */}
            <Ring args={[city.size * 1.6, city.size * 1.85, 32]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshBasicMaterial
                color={city.color}
                side={THREE.DoubleSide}
                transparent
                opacity={0.45}
              />
            </Ring>

            {/* Vertical Ascending Light Pillar Beacon */}
            <Line
              points={[[0, 0, 0], [0, 0, 0.45]]}
              color={city.color}
              lineWidth={1.5}
              transparent
              opacity={0.7}
            />

            {/* Sub-Area Micro Nodes Branching from City */}
            {city.subAreas?.map((sub, sIdx) => {
              const relPos: [number, number, number] = [
                sub.pos[0] - city.pos[0],
                sub.pos[1] - city.pos[1],
                sub.pos[2] - city.pos[2],
              ];

              return (
                <group key={sIdx}>
                  <Line
                    points={[[0, 0, 0], relPos]}
                    color="#2DD4BF"
                    lineWidth={1.0}
                    transparent
                    opacity={0.4}
                  />
                  <mesh position={relPos}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshBasicMaterial color="#2DD4BF" />
                  </mesh>
                </group>
              );
            })}

            {/* 3D Cinematic HTML Badge & City Name Label */}
            <Html
              position={[0, 0.16, 0.12]}
              center
              distanceFactor={8}
              zIndexRange={[10, 0]}
              style={{ pointerEvents: 'none' }}
            >
              <div
                className={`transition-all duration-300 select-none whitespace-nowrap px-2.5 py-1.5 rounded-xl border backdrop-blur-md flex flex-col items-center ${
                  isHovered
                    ? 'bg-black/90 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/30 scale-110'
                    : 'bg-black/75 border-white/15 shadow-lg'
                }`}
              >
                {/* City Title with Active Ping */}
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: city.color }}
                  />
                  <span
                    className="text-[11px] font-bold font-mono tracking-wider"
                    style={{ color: city.color }}
                  >
                    {city.name}
                  </span>
                  <span className="text-[9px] text-neutral-400 font-sans">
                    ({city.urduName})
                  </span>
                </div>

                {/* Micro Area Hub & Active Listings */}
                <div className="text-[8px] font-mono text-neutral-300 mt-0.5 tracking-tight flex items-center gap-1">
                  <span>{city.areaHub.split('//')[0]}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-emerald-400 font-semibold">Live inventory</span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}

      {/* 7. Central AI Admin Supervisory Orb (Stationed over Islamabad / Potohar) */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.9}>
        <group ref={adminOrbRef} position={[0.18, 1.25, 0.95]}>
          {/* Core Sovereign Dodecahedron */}
          <Sphere args={[0.22, 24, 24]}>
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#AA8010"
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>

          {/* Holographic Neural Wireframe Shell */}
          <Sphere args={[0.30, 16, 16]}>
            <meshBasicMaterial
              color="#2DD4BF"
              wireframe
              transparent
              opacity={0.4}
            />
          </Sphere>

          {/* Concentric Rotating Orbital Rings */}
          <mesh ref={ring1Ref}>
            <ringGeometry args={[0.38, 0.41, 36]} />
            <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
          <mesh ref={ring2Ref}>
            <ringGeometry args={[0.48, 0.51, 36]} />
            <meshBasicMaterial color="#2DD4BF" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>

          {/* AI Admin Label */}
          <Html position={[0, 0.38, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
            <div className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[9px] font-mono font-bold text-[#D4AF37] tracking-wider whitespace-nowrap shadow-lg">
              AI ADMIN // SUPERVISORY CORE
            </div>
          </Html>
        </group>
      </Float>

      {/* Dynamic Cinematic Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 5, 4]} intensity={2.0} color="#D4AF37" />
      <pointLight position={[-4, -5, 4]} intensity={1.8} color="#2DD4BF" />
      <directionalLight position={[0, 0, 5]} intensity={0.8} color="#FFFFFF" />
    </group>
  );
};

// ========================================================
// 5. EXPORTED CANVAS WRAPPER
// ========================================================
export const ThreeCanvas: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, -0.6, 5.8], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <CinematicPakistanScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
