// src/components/HeroAnimationStage.tsx
import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MAJOR_CITIES_3D, CityMarker } from './ThreeCanvas';
import { soundEngine } from '../utils/sound';
import { ShieldCheck, MapPin, Sparkles, Bot, Check, ArrowRight, Layers, Globe } from 'lucide-react';
import heroImage from '../assets/hero.png';

// ========================================================
// 3D PAKISTAN MAP SCENE EMBEDDED IN HERO RIGHT CONTAINER
// ========================================================
const PAKISTAN_BORDER_POINTS: [number, number, number][] = [
  [-2.6, -1.9, 0.0],
  [-2.3, -1.8, 0.0],
  [-1.9, -1.7, 0.0],
  [-1.4, -1.6, 0.0],
  [-1.1, -1.5, 0.0],
  [-0.8, -1.6, 0.0],
  [-0.6, -1.4, 0.05],
  [-0.4, -1.0, 0.08],
  [-0.2, -0.6, 0.10],
  [0.0, -0.2, 0.12],
  [0.4, 0.0, 0.15],
  [0.8, 0.2, 0.18],
  [1.1, 0.4, 0.20],
  [1.3, 0.7, 0.25],
  [1.4, 1.1, 0.35],
  [1.3, 1.5, 0.55],
  [1.1, 1.8, 0.70],
  [0.8, 2.0, 0.75],
  [0.4, 1.9, 0.65],
  [-0.1, 1.8, 0.55],
  [-0.4, 1.6, 0.45],
  [-0.6, 1.3, 0.40],
  [-0.8, 0.9, 0.35],
  [-1.0, 0.6, 0.30],
  [-1.2, 0.3, 0.25],
  [-1.4, 0.0, 0.22],
  [-1.6, -0.3, 0.18],
  [-2.0, -0.4, 0.15],
  [-2.5, -0.5, 0.12],
  [-2.6, -1.0, 0.08],
  [-2.6, -1.5, 0.04],
  [-2.6, -1.9, 0.0]
];

// Laser connections between major hubs
const NETWORK_PIPES: [number, number][] = [
  [0, 1],  // Isb - Rwp
  [0, 2],  // Isb - Lhr
  [0, 5],  // Isb - Pew
  [0, 11], // Isb - Glt (Gilgit)
  [2, 7],  // Lhr - Fsd
  [2, 9],  // Lhr - Skt
  [7, 8],  // Fsd - Mux
  [8, 10], // Mux - Hyd
  [10, 3], // Hyd - Khi
  [3, 4],  // Khi - Gwd (Gwadar)
  [6, 4],  // Qta - Gwd
  [6, 8],  // Qta - Mux
  [6, 5],  // Qta - Pew
  [2, 3],  // Lhr - Khi
];

const AnimatedPacket: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  offset: number;
  color: string;
}> = ({ start, end, speed, offset, color }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const p1 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    const cur = p1.clone().lerp(p2, t);
    ref.current.position.set(cur.x, cur.y, cur.z);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const PakistanMap3DScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle cinematic oscillation
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
      groupRef.current.rotation.x = 0.22 + Math.cos(t * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={0.68}>
      {/* Pakistan Glowing Contour Line */}
      <Line
        points={PAKISTAN_BORDER_POINTS}
        color="#2DD4BF"
        lineWidth={2.2}
        transparent
        opacity={0.9}
      />
      <Line
        points={PAKISTAN_BORDER_POINTS.map(([x, y, z]) => [x, y, z - 0.02] as [number, number, number])}
        color="#E5B842"
        lineWidth={1.2}
        transparent
        opacity={0.4}
      />

      {/* Network Connecting Pipelines */}
      {NETWORK_PIPES.map(([fromIdx, toIdx], idx) => {
        const p1 = MAJOR_CITIES_3D[fromIdx].pos;
        const p2 = MAJOR_CITIES_3D[toIdx].pos;
        const isCore = idx % 2 === 0;

        return (
          <group key={idx}>
            <Line
              points={[p1, p2]}
              color={isCore ? '#E5B842' : '#2DD4BF'}
              lineWidth={1.5}
              transparent
              opacity={0.6}
            />
            <AnimatedPacket
              start={p1}
              end={p2}
              speed={0.4 + (idx % 3) * 0.15}
              offset={(idx * 0.18) % 1}
              color={isCore ? '#FFF0B3' : '#A7F3D0'}
            />
          </group>
        );
      })}

      {/* Major City Nodes with 3D Beacons and Names */}
      {MAJOR_CITIES_3D.map((city) => {
        const isHovered = hoveredCity === city.id;
        return (
          <group key={city.id} position={city.pos}>
            {/* Glowing City Core */}
            <Sphere
              args={[city.size * 0.8, 16, 16]}
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

            {/* Radar Sonar Ring */}
            <Ring args={[city.size * 1.3, city.size * 1.55, 24]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshBasicMaterial
                color={city.color}
                side={THREE.DoubleSide}
                transparent
                opacity={0.45}
              />
            </Ring>

            {/* Ascending Light Pillar */}
            <Line
              points={[[0, 0, 0], [0, 0, 0.4]]}
              color={city.color}
              lineWidth={1.5}
              transparent
              opacity={0.65}
            />

            {/* 3D Floating City Badge with Area Hub */}
            <Html
              position={[0, 0.18, 0.1]}
              center
              distanceFactor={8}
              zIndexRange={[10, 0]}
              style={{ pointerEvents: 'none' }}
            >
              <div
                className={`transition-all duration-300 select-none whitespace-nowrap px-2 py-1 rounded-xl border backdrop-blur-md flex flex-col items-center ${
                  isHovered
                    ? 'bg-black/95 border-[#E5B842] shadow-xl shadow-[#E5B842]/30 scale-110'
                    : 'bg-[#06080D]/85 border-white/15 shadow-lg'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: city.color }}
                  />
                  <span
                    className="text-[10px] font-bold font-mono tracking-wider"
                    style={{ color: city.color }}
                  >
                    {city.name}
                  </span>
                  <span className="text-[8px] text-neutral-400">
                    ({city.urduName})
                  </span>
                </div>
                <div className="text-[7.5px] font-mono text-neutral-300 mt-0.5">
                  {city.areaHub.split('//')[0]}
                </div>
              </div>
            </Html>
          </group>
        );
      })}

      <ambientLight intensity={0.6} />
      <pointLight position={[3, 4, 4]} intensity={2.0} color="#E5B842" />
      <pointLight position={[-3, -4, 4]} intensity={1.8} color="#2DD4BF" />
    </group>
  );
};

// ========================================================
// HERO ANIMATION STAGE (DEDICATED RIGHT-HAND CONTAINER)
// ========================================================
export const HeroAnimationStage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3D_MAP' | 'CITY_NETWORK'>('CITY_NETWORK');

  return (
    <div className="relative w-full h-[580px] sm:h-[630px] rounded-3xl overflow-hidden glass-card-luxury border border-[#E5B842]/30 shadow-2xl bg-[#06080D]">
      {/* Top Stage Control Pill */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1 rounded-xl glass-pill bg-black/70 border border-white/10 text-[11px] font-mono">
          <button
            onClick={() => {
              soundEngine.playClick();
              setViewMode('CITY_NETWORK');
            }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'CITY_NETWORK'
                ? 'bg-[#E5B842] text-black font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Smart Lead Network
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setViewMode('3D_MAP');
            }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === '3D_MAP'
                ? 'bg-[#2DD4BF] text-black font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            3D Pakistan Map
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>130+ CITIES CONNECTED</span>
        </div>
      </div>

      {/* VIEW 1: 3D INTERACTIVE PAKISTAN MAP VIEW */}
      {viewMode === '3D_MAP' && (
        <div className="absolute inset-0 z-10 w-full h-full">
          <Canvas
            camera={{ position: [0, 0.1, 6.0], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <PakistanMap3DScene />
          </Canvas>

          {/* Compass Rose & Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-neutral-400 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="text-[#E5B842] font-bold">PAKISTAN PROPERTY GRAPH</span>
              <span>// 5,000+ Mapped Areas</span>
            </div>
            <div className="text-emerald-400 font-bold">
              CADASTRAL SYNC ACTIVE
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SMART CITY LEAD NETWORK (MATCHING USER REFERENCE IMAGE 2) */}
      {viewMode === 'CITY_NETWORK' && (
        <div className="relative w-full h-full overflow-hidden select-none">
          {/* Authentic Background Cityscape Image */}
          <img
            src={heroImage}
            alt="Nexus Smart Property Lead Network"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080D] via-transparent to-black/30 pointer-events-none" />

          {/* Floating Glowing Area Pins (Original map positions) */}
          {/* DHA Lahore Pin */}
          <div className="absolute top-[28%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer animate-float scale-[2.1] origin-center">
            <div className="flex items-center gap-1.5 px-2.5 py-0.75 rounded-full bg-black/85 border border-[#2DD4BF] text-[#2DD4BF] text-[9px] font-mono font-bold shadow-lg shadow-[#2DD4BF]/30 hover:scale-110 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-ping" />
              <span>DHA Lahore</span>
            </div>
          </div>

          <div className="absolute top-[32%] right-[22%] z-20 cursor-pointer scale-[2.1] origin-center">
            <div className="flex items-center gap-1.5 px-2.5 py-0.75 rounded-full bg-black/85 border border-[#E5B842] text-[#E5B842] text-[9px] font-mono font-bold shadow-lg shadow-[#E5B842]/30 hover:scale-110 transition-transform">
              <MapPin className="w-2.5 h-2.5 text-[#E5B842]" />
              <span>Gulberg</span>
            </div>
          </div>

          <div className="absolute top-[44%] left-[45%] z-20 cursor-pointer scale-[2.1] origin-center">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/85 border border-white/20 text-white text-[8.5px] font-mono font-semibold shadow hover:scale-110 transition-transform">
              <MapPin className="w-2.5 h-2.5 text-[#2DD4BF]" />
              <span>Johar Town</span>
            </div>
          </div>

          <div className="absolute top-[52%] left-[40%] z-20 cursor-pointer scale-[2.1] origin-center">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/85 border border-white/20 text-white text-[8.5px] font-mono font-semibold shadow hover:scale-110 transition-transform">
              <MapPin className="w-2.5 h-2.5 text-[#2DD4BF]" />
              <span>Model Town</span>
            </div>
          </div>

          <div className="absolute top-[56%] right-[20%] z-20 cursor-pointer scale-[2.1] origin-center">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/85 border border-white/20 text-white text-[8.5px] font-mono font-semibold shadow hover:scale-110 transition-transform">
              <MapPin className="w-2.5 h-2.5 text-[#E5B842]" />
              <span>Bahria Town</span>
            </div>
          </div>

          <div className="absolute bottom-[24%] left-[58%] z-20 cursor-pointer scale-[2.1] origin-center">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/85 border border-white/20 text-white text-[8.5px] font-mono font-semibold shadow hover:scale-110 transition-transform">
              <MapPin className="w-2.5 h-2.5 text-[#2DD4BF]" />
              <span>Valencia</span>
            </div>
          </div>

          {/* Floating Luxury Villa Card (upper-left clear zone) */}
          <div className="absolute top-[12%] left-[2%] z-30 hidden sm:block animate-float">
            <div className="p-2 rounded-2xl glass-card-luxury border border-[#E5B842]/40 bg-black/85 shadow-2xl w-40 hover:scale-105 transition-transform">
              <div className="text-[10px] font-bold text-white tracking-wide">
                Luxury Villa - DHA Lahore
              </div>
              <div className="text-[9px] text-neutral-400 font-mono mt-0.5">
                5 Beds • 6 Baths • 1 Kanal
              </div>
              <div className="text-xs font-extrabold text-[#E5B842] mt-1">
                PKR 12.5 Crore
              </div>
            </div>
          </div>

          {/* Floating Verified Agent Card (bottom-left clear zone) */}
          <div className="absolute bottom-[3%] left-[5%] z-20 hidden md:block">
            <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-card-luxury border border-[#2DD4BF]/40 bg-black/90 shadow-2xl hover:scale-105 transition-transform">
              <div className="w-7 h-7 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center text-[#2DD4BF] font-bold text-[10px]">
                AR
              </div>
              <div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                  <span>Ahmed Raza</span>
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-[9px] text-neutral-400 font-mono">
                  DHA Specialist • Verified Agent
                </div>
              </div>
            </div>
          </div>

          {/* Floating Lead Protection Badge (bottom-right clear zone) */}
          <div className="absolute bottom-[3%] right-[4%] z-20 hidden sm:block">
            <div className="flex items-center gap-2 px-2.5 py-1.25 rounded-xl bg-black/90 border border-emerald-500/50 shadow-xl shadow-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="text-[10px] font-bold text-white leading-tight">Lead Protection</div>
                <div className="text-[8px] text-neutral-400 font-mono">Your data is safe & secure</div>
              </div>
            </div>
          </div>

          {/* Floating AI Property Assistant Widget (mid-left clear zone) */}
          <div className="absolute top-[26%] left-[3%] z-20 hidden xl:block w-40 p-2.5 rounded-2xl glass-card-luxury border border-[#2DD4BF]/40 bg-black/90 shadow-2xl">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10 mb-2">
              <div className="w-6 h-6 rounded-lg bg-[#2DD4BF]/20 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-[#2DD4BF]" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-white">AI Property Assistant</div>
                <div className="text-[8px] text-neutral-400">How can I help you?</div>
              </div>
            </div>

            <div className="space-y-1 text-[9px] font-mono text-neutral-300">
              {['Buy Property', 'Rent Property', 'Sell Property', 'Property Valuation'].map((action, aIdx) => (
                <div
                  key={aIdx}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-[#2DD4BF]/20 hover:text-[#2DD4BF] flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span>{action}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
