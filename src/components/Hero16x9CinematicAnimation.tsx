// src/components/Hero16x9CinematicAnimation.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Sliders,
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  Box,
  Image as ImageIcon,
  Check,
  Copy,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export interface HeroSceneStep {
  id: number;
  timeRange: string;
  name: string;
  urduName: string;
  stage: 'EMPTY PLOT' | 'BLUEPRINT' | 'CONSTRUCTION' | 'BUILDING RISE' | 'FACADE' | 'LANDSCAPING' | 'PREMIUM REVEAL' | 'PAKISTAN IDENTITY' | 'SEAMLESS LOOP';
  description: string;
  imageSrc: string;
  lightingTemp: string;
  cameraAction: string;
  safeZoneNegativeSpace: string;
}

export const HERO_SCENES_16_9: HeroSceneStep[] = [
  {
    id: 1,
    timeRange: '00:00 – 00:02',
    name: 'SCENE 1 — Empty Plot Drone Establishing',
    urduName: 'منظر ۱ — خالی پلاٹ کا فضائی جائزہ',
    stage: 'EMPTY PLOT',
    description: 'Cinematic wide 16:9 aerial drone view descending toward an empty corner residential plot in a prime Pakistani sector. Paved boulevards with palm trees and distant hills establish a tranquil, upscale Pakistani atmosphere.',
    imageSrc: '/renders/hero_16_9_empty_plot.jpg',
    lightingTemp: 'Golden Hour 2800K (Warm low-angle sun, long soft shadows)',
    cameraAction: 'Smooth forward drone glide at 12 km/h, descending from 45m to 25m',
    safeZoneNegativeSpace: 'Left 45% of frame kept clean with soft road gradient for headline typography'
  },
  {
    id: 2,
    timeRange: '00:02 – 00:04',
    name: 'SCENE 2 — Glowing Blueprint Grid Mapping',
    urduName: 'منظر ۲ — تھری ڈی بلیو پرنٹ اور ڈیجیٹل نقشہ',
    stage: 'BLUEPRINT',
    description: 'Subtle luminescent cyan and gold architectural blueprint lines project organically over the terracotta soil, mapping out the building footprint, boundary setbacks, driveway, and pool perimeter.',
    imageSrc: '/renders/pakistan_realestate_empty_plot_1790206387493.jpg',
    lightingTemp: 'Late Afternoon 3400K + Cyan Luminescent Holographic Grid',
    cameraAction: 'Gentle deceleration while tilting camera down 15° toward foundation center',
    safeZoneNegativeSpace: 'High contrast between blueprint lines and dark soil leaves left copy crystal clear'
  },
  {
    id: 3,
    timeRange: '00:04 – 00:07',
    name: 'SCENE 3 — Accelerated Foundation & Excavation',
    urduName: 'منظر ۳ — بنیادوں کی کھدائی اور کنکریٹ فورمک',
    stage: 'CONSTRUCTION',
    description: 'Foundation trenches displace soil with physical realism. Steel reinforcement rebar cages drop into position and ready-mix concrete pumps pour the foundational footing seamlessly.',
    imageSrc: '/renders/pakistan_realestate_concrete_structure_1790206407726.jpg',
    lightingTemp: 'Accelerated Daylight Sweep (48x time-lapse simulation)',
    cameraAction: 'Smooth slow 12° orbital arc tracking around the developing foundation',
    safeZoneNegativeSpace: 'Excavation localized in center-right, left quadrant remains dark and legible'
  },
  {
    id: 4,
    timeRange: '00:07 – 00:10',
    name: 'SCENE 4 — Building Rise: Reinforced Structural Frame',
    urduName: 'منظر ۴ — کنکریٹ کالمز اور فلور سلیبس کی بلندی',
    stage: 'BUILDING RISE',
    description: 'Ground-floor reinforced concrete columns rise vertically. Slabs, beams, and second-floor cantilevered terrace cast progressively. Tower crane arm articulates in a smooth time-lapse arc.',
    imageSrc: '/renders/pakistan_realestate_concrete_structure_1790206407726.jpg',
    lightingTemp: 'Crisp Midday 5400K with natural atmospheric dust haze',
    cameraAction: 'Low-angle crane boom rising from 3m to 14m elevation',
    safeZoneNegativeSpace: 'Vertical structure occupies right-of-center; sky/landscape background on left'
  },
  {
    id: 5,
    timeRange: '00:10 – 00:13',
    name: 'SCENE 5 — Facade Transformation: Travertine & Glass Curtain',
    urduName: 'منظر ۵ — ٹراورٹین ماربل اور برونز گلاس فساڈ',
    stage: 'FACADE',
    description: 'Raw concrete surfaces clad with polished Roman travertine marble. Double-glazed dark bronze acoustic curtain wall glass slides into place with crisp daylight reflections.',
    imageSrc: '/renders/pakistan_realestate_finished_facade_1790206432013.jpg',
    lightingTemp: 'Golden Afternoon 3200K glancing off tempered bronze glass',
    cameraAction: 'Controlled horizontal dolly tracking along the cantilevered balcony',
    safeZoneNegativeSpace: 'Reflections stay soft without specular glare over text overlay zones'
  },
  {
    id: 6,
    timeRange: '00:13 – 00:15',
    name: 'SCENE 6 — Luxury Landscaping, Driveway & Palms',
    urduName: 'منظر ۶ — رائل پامز، ڈرائیو وے اور واٹر فاؤنٹین',
    stage: 'LANDSCAPING',
    description: 'Cobblestone driveway lays into place. Mature Pakistani royal palms root into place in accelerated growth. Manicured lawn unfolds and a cascading infinity fountain fills with crystal water.',
    imageSrc: '/renders/pakistan_realestate_finished_facade_1790206432013.jpg',
    lightingTemp: 'Sunset Golden Hour 2600K with deep amber tree shadows',
    cameraAction: 'Sweeping glide past foreground palm fronds toward the illuminated portico',
    safeZoneNegativeSpace: 'Lush dark lawn at bottom-left provides natural high-contrast base for CTAs'
  },
  {
    id: 7,
    timeRange: '00:15 – 00:17',
    name: 'SCENE 7 — Blue Hour Transition & Architectural Illumination',
    urduName: 'منظر ۷ — بلیو آور اور وارم آرکیٹیکچرل لائٹنگ',
    stage: 'PREMIUM REVEAL',
    description: 'Sky transitions from sunset into royal blue hour. Architectural 3000K warm strip LEDs activate along the roof overhangs and travertine reveals. Pool underwater lights shimmer with water ripples.',
    imageSrc: '/renders/pakistan_realestate_night_reveal_1790206460189.jpg',
    lightingTemp: 'Blue Hour 7200K Ambient Sky + 2800K Warm Interior/Exterior LEDs',
    cameraAction: 'Majestic 3/4 cinematic crane sweep revealing the full illuminated villa estate',
    safeZoneNegativeSpace: 'Deep night sky on upper-left gives maximum readability to white text'
  },
  {
    id: 8,
    timeRange: '00:17 – 00:18',
    name: 'SCENE 8 & 9 — Hero Reveal & Seamless Loop Transition',
    urduName: 'منظر ۸ و ۹ — ہیرو ریویل اور ہموار لوپ واپسی',
    stage: 'SEAMLESS LOOP',
    description: 'Camera ascends smoothly toward the original high-altitude establishing vector. Distant Islamabad Margalla hills and city glow integrate the property into Pakistan, before lighting crossfades into Scene 1.',
    imageSrc: '/renders/pakistan_realestate_city_skyline_1790206493139.jpg',
    lightingTemp: 'Metropolitan Night Glow smoothly interpolating toward Golden Dawn',
    cameraAction: 'Ascending high-altitude pullback (15m → 80m) matching Scene 1 entrance trajectory',
    safeZoneNegativeSpace: 'Balanced wide-angle negative space enables infinite looping behind web UI'
  }
];

// Interactive 16:9 Three.js Real-Time Model with Day-Night Cycle & Seamless Loop
function HeroSceneMesh16x9({ loopProgress }: { loopProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Progressive construction factors
  const foundationPct = Math.min(1, Math.max(0, (loopProgress - 0.15) / 0.18));
  const structurePct = Math.min(1, Math.max(0, (loopProgress - 0.3) / 0.22));
  const facadePct = Math.min(1, Math.max(0, (loopProgress - 0.52) / 0.2));
  const landscapePct = Math.min(1, Math.max(0, (loopProgress - 0.68) / 0.18));
  const isNight = loopProgress > 0.75;
  const nightLightPct = Math.min(1, Math.max(0, (loopProgress - 0.75) / 0.18));

  // Seamless loop rotation and camera feeling
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = (loopProgress * Math.PI * 0.45) + Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[2, -0.5, 0]}>
      {/* Dynamic Directional Sun / Moon */}
      <ambientLight intensity={isNight ? 0.3 : 0.85} />
      <directionalLight
        position={[20, 20 * Math.cos(loopProgress * Math.PI), 15]}
        intensity={isNight ? 0.4 : 1.6}
        color={loopProgress < 0.3 ? '#FFAA55' : loopProgress < 0.65 ? '#FFF5EA' : '#FF8833'}
        castShadow
      />

      {/* Night Architectural Spotlights */}
      {isNight && (
        <>
          <pointLight position={[0, 3, 2]} intensity={nightLightPct * 4.5} color="#FFE099" distance={16} />
          <pointLight position={[-3, 2, -1]} intensity={nightLightPct * 3.5} color="#FFD077" distance={14} />
          <spotLight position={[2, 0.1, 4]} target-position={[0, 4, 0]} intensity={nightLightPct * 5} color="#E5B842" angle={0.7} />
        </>
      )}

      {/* Ground Plane (Soil to Lush Turf) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial
          color={landscapePct > 0.5 ? '#1E3322' : '#452A1C'}
          roughness={0.85}
        />
      </mesh>

      {/* Holographic Blueprint Grid Overlay (Active in Early Stages) */}
      {loopProgress < 0.32 && (
        <gridHelper
          args={[16, 32, '#E5B842', '#38BDF8']}
          position={[0, 0.02, 0]}
        />
      )}

      {/* Excavation Trench */}
      {loopProgress > 0.12 && loopProgress < 0.45 && (
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[9, 0.5, 8]} />
          <meshStandardMaterial color="#2B1A12" roughness={0.9} wireframe={loopProgress < 0.2} />
        </mesh>
      )}

      {/* Foundation Footing */}
      {foundationPct > 0 && (
        <group scale={[1, foundationPct, 1]}>
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.8, 0.4, 7.8]} />
            <meshStandardMaterial color="#64748B" roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* Structural Frame Rising */}
      {structurePct > 0 && (
        <group>
          {/* Ground Floor Columns */}
          <group scale={[1, Math.min(1, structurePct * 2), 1]}>
            {[-3.8, 0, 3.8].map((x) =>
              [-3.2, 3.2].map((z) => (
                <mesh key={`col-1-${x}-${z}`} position={[x, 1.6, z]} castShadow>
                  <boxGeometry args={[0.45, 2.8, 0.45]} />
                  <meshStandardMaterial color="#475569" roughness={0.6} />
                </mesh>
              ))
            )}
            {/* First Floor Cantilevered Slab */}
            <mesh position={[0, 3.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[9.2, 0.35, 8.4]} />
              <meshStandardMaterial color="#64748B" roughness={0.6} />
            </mesh>
          </group>

          {/* Second Floor Frame */}
          {structurePct > 0.5 && (
            <group scale={[1, Math.min(1, (structurePct - 0.5) * 2), 1]}>
              {[-3.8, 0, 3.8].map((x) =>
                [-3.2, 3.2].map((z) => (
                  <mesh key={`col-2-${x}-${z}`} position={[x, 4.6, z]} castShadow>
                    <boxGeometry args={[0.45, 2.8, 0.45]} />
                    <meshStandardMaterial color="#475569" roughness={0.6} />
                  </mesh>
                ))
              )}
              {/* Roof Cantilever Slab */}
              <mesh position={[0.4, 6.1, 0.3]} castShadow receiveShadow>
                <boxGeometry args={[9.8, 0.4, 9.0]} />
                <meshStandardMaterial color="#334155" roughness={0.5} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* Travertine Facade & Glass Curtain Walls */}
      {facadePct > 0 && (
        <group>
          {/* Travertine Stone Tower Feature */}
          <mesh position={[-3.0, 3.2, 0.2]} castShadow receiveShadow>
            <boxGeometry args={[2.6, 6.0 * facadePct, 7.5]} />
            <meshStandardMaterial color="#D7C9BD" roughness={0.4} metalness={0.05} />
          </mesh>

          {/* Double-Height Glass Curtain Wall */}
          <mesh position={[1.8, 3.1, 3.8]}>
            <planeGeometry args={[4.6, 5.5 * facadePct]} />
            <meshPhysicalMaterial
              color="#0F2B38"
              roughness={0.08}
              metalness={0.85}
              transmission={0.8}
              transparent
              opacity={0.85}
              reflectivity={0.9}
            />
          </mesh>

          {/* Glass Balcony Balustrade */}
          <mesh position={[1.8, 3.6, 4.1]}>
            <boxGeometry args={[4.8, 0.9 * facadePct, 0.05]} />
            <meshPhysicalMaterial color="#BAE6FD" roughness={0.05} transmission={0.9} transparent opacity={0.65} />
          </mesh>

          {/* Architectural Timber Louvers */}
          {[-0.3, 0.2, 0.7, 1.2].map((x, i) => (
            <mesh key={`louver-169-${i}`} position={[x, 4.6, 3.85]}>
              <boxGeometry args={[0.08, 2.6 * facadePct, 0.12]} />
              <meshStandardMaterial color="#854D0E" roughness={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* Landscaping & Water Elements */}
      {landscapePct > 0 && (
        <group>
          {/* Cobblestone Driveway */}
          <mesh position={[2.8, 0.02, 6.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[4.2, 7.5 * landscapePct]} />
            <meshStandardMaterial color="#1E293B" roughness={0.65} />
          </mesh>

          {/* Infinity Pool */}
          <mesh position={[-2.8, 0.03, 4.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[4.0, 4.5 * landscapePct]} />
            <meshPhysicalMaterial color="#0284C7" roughness={0.05} transmission={0.7} transparent opacity={0.9} reflectivity={1} />
          </mesh>

          {/* Royal Date Palms */}
          {[
            { pos: [-5.0, 0, 5.0] as [number, number, number], s: 1 },
            { pos: [5.5, 0, 3.5] as [number, number, number], s: 0.95 },
            { pos: [5.2, 0, -3.5] as [number, number, number], s: 1.15 }
          ].map((palm, i) => (
            <group key={`palm-169-${i}`} position={palm.pos} scale={[palm.s, palm.s * landscapePct, palm.s]}>
              <mesh position={[0, 2.0, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.26, 4.0, 8]} />
                <meshStandardMaterial color="#54382B" roughness={0.9} />
              </mesh>
              <mesh position={[0, 4.0, 0]} castShadow>
                <sphereGeometry args={[1.3, 8, 8]} />
                <meshStandardMaterial color="#15803D" roughness={0.8} />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
}

interface Hero16x9CinematicAnimationProps {
  onClose?: () => void;
  standalone?: boolean;
}

export const Hero16x9CinematicAnimation: React.FC<Hero16x9CinematicAnimationProps> = ({
  onClose,
  standalone = false
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [loopProgress, setLoopProgress] = useState(0); // 0 to 1 across 18s duration
  const [viewEngine, setViewEngine] = useState<'photoreal' | 'webgl3d'>('photoreal');
  const [showWebsiteOverlays, setShowWebsiteOverlays] = useState(true);
  const [activeTab, setActiveTab] = useState<'timeline' | 'safezones' | 'prompts' | 'unreal'>('timeline');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const durationSec = 18.0; // 18 seconds duration as specified (15–20s range)

  // Determine current active step
  const currentStepIndex = Math.min(
    HERO_SCENES_16_9.length - 1,
    Math.floor(loopProgress * HERO_SCENES_16_9.length)
  );
  const currentStep = HERO_SCENES_16_9[currentStepIndex];

  // Continuous 24fps timeline loop (18 seconds = 432 frames)
  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isPlaying) {
        setLoopProgress((prev) => {
          const next = prev + delta / durationSec;
          return next >= 1 ? 0 : next; // Seamless loop!
        });
      }
      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, durationSec]);

  const handleSeek = (progressValue: number) => {
    setLoopProgress(progressValue);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className={`relative w-full ${standalone ? 'min-h-screen bg-[#04060A] text-white p-4 sm:p-8 flex flex-col justify-center items-center' : 'h-full'}`}>
      {/* Outer Cinema Frame (16:9 Desktop Native Aspect Ratio) */}
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#080B11] shadow-2xl shadow-black/80 flex flex-col">
        
        {/* Top Header Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0B0F17] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E5B842] to-[#B38728] flex items-center justify-center text-black font-bold shadow-md shadow-[#E5B842]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-wide uppercase">
                  Website Hero 16:9 Architectural Animation
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                  SEAMLESS LOOP • 18 SECONDS
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                Empty Land → Blueprint → Construction → 5-Star Finished Luxury Property (Pakistani Market)
              </p>
            </div>
          </div>

          {/* Engine Selector & Overlay Toggle */}
          <div className="flex items-center gap-2">
            <div className="bg-white/5 border border-white/10 rounded-lg p-0.5 flex text-xs">
              <button
                onClick={() => setViewEngine('photoreal')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewEngine === 'photoreal'
                    ? 'bg-[#E5B842] text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>8K Photoreal</span>
              </button>
              <button
                onClick={() => setViewEngine('webgl3d')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewEngine === 'webgl3d'
                    ? 'bg-[#E5B842] text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D WebGL Loop</span>
              </button>
            </div>

            {/* Toggle Website Text Overlay */}
            <button
              onClick={() => setShowWebsiteOverlays(!showWebsiteOverlays)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                showWebsiteOverlays
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Toggle Simulated Website Hero Headline Overlay"
            >
              {showWebsiteOverlays ? <Eye className="w-3.5 h-3.5 text-[#E5B842]" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Web Overlay</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs cursor-pointer ml-1"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* ==============================================================
            THE 16:9 CINEMATIC HERO VIEWPORT (Native 16:9 Desktop Frame)
           ============================================================== */}
        <div className="relative w-full aspect-[16/9] bg-black overflow-hidden select-none group">
          
          {/* Visual Layer 1: Photoreal Keyframe Stream */}
          {viewEngine === 'photoreal' && (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentStep.imageSrc}
                alt={currentStep.name}
                className="w-full h-full object-cover transform scale-105 transition-all duration-1000 ease-out"
                style={{
                  transform: `scale(${1.03 + Math.sin(loopProgress * Math.PI) * 0.05}) translate(${Math.sin(loopProgress * 5) * 5}px, ${Math.cos(loopProgress * 3) * 3}px)`
                }}
              />
              {/* Studio Left-Side Gradient Mask: Ensures 100% Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06080D]/90 via-[#06080D]/50 to-transparent pointer-events-none" />
              {/* Bottom Subtle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            </div>
          )}

          {/* Visual Layer 2: Real-time 3D WebGL Mesh Canvas */}
          {viewEngine === 'webgl3d' && (
            <div className="absolute inset-0 w-full h-full">
              <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[12, 10, 16]} fov={38} />
                <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.05} minDistance={8} maxDistance={30} />
                <HeroSceneMesh16x9 loopProgress={loopProgress} />
              </Canvas>
              {/* Left-Side Gradient Mask for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06080D]/90 via-[#06080D]/40 to-transparent pointer-events-none" />
            </div>
          )}

          {/* ==============================================================
              SIMULATED WEBSITE HERO OVERLAY (Text, Pill Badge, Search Bar)
              Proves that the 16:9 composition has perfect negative space!
             ============================================================== */}
          {showWebsiteOverlays && (
            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-between z-20 pointer-events-none">
              
              {/* Top Row: Floating Category Tags */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5B842]/40 text-[11px] font-mono tracking-wider shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5B842] animate-ping" />
                  <span className="text-[#E5B842] font-bold">BUILD YOUR FUTURE</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] text-neutral-300 border border-white/10 font-mono">
                  <span>DHA • ISLAMABAD • LAHORE • KARACHI</span>
                </div>
              </div>

              {/* Main Center-Left Headline & CTA Box */}
              <div className="max-w-xl space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-xl">
                  PREMIUM <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] via-emerald-300 to-[#E5B842]">
                    REAL ESTATE
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed max-w-lg drop-shadow-md">
                  Explore a visual property-network prototype. Listings, verification, and institutional transaction integrations are not established as live services.
                </p>

                {/* Simulated Hero CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto">
                  <button className="px-6 py-3 rounded-xl bg-[#00E599] hover:bg-[#25F5AD] text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-[#00E599]/30 hover:scale-105 transition-all cursor-pointer">
                    <span>EXPLORE PROPERTIES</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button className="px-5 py-3 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur-md text-white font-semibold text-xs border border-white/20 hover:border-[#E5B842] hover:text-[#E5B842] transition-all cursor-pointer">
                    <span>LIST YOUR PLOT</span>
                  </button>
                </div>
              </div>

              {/* Bottom Row: Live Telemetry Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono">
                  <span className="text-[#E5B842] font-bold">{currentStep.stage}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-300">{currentStep.timeRange}</span>
                  <span className="text-neutral-500 hidden md:inline">•</span>
                  <span className="text-neutral-400 hidden md:inline">24 FPS SEAMLESS LOOP</span>
                </div>

                <div className="text-[11px] font-mono text-neutral-400 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5">
                  TIME: {(loopProgress * durationSec).toFixed(1)}s / 18.0s
                </div>
              </div>
            </div>
          )}

          {/* Continuous Loop Bottom Scrubber Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
            <div
              className="h-full bg-gradient-to-r from-[#E5B842] via-[#00E599] to-[#E5B842] transition-all duration-75"
              style={{ width: `${loopProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Bottom Playback & Studio Console Bar */}
        <div className="p-4 sm:p-5 bg-[#090C12] border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Play/Pause & Reset */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-[#E5B842] text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-md shadow-[#E5B842]/20"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={() => handleSeek(0)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Restart Loop"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Scrub Slider */}
            <div className="w-48 sm:w-64">
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={loopProgress}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full accent-[#E5B842] cursor-pointer"
              />
            </div>
          </div>

          {/* Stage Fast Jump Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {HERO_SCENES_16_9.map((scene, i) => (
              <button
                key={scene.id}
                onClick={() => handleSeek(i / (HERO_SCENES_16_9.length - 1))}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  currentStepIndex === i
                    ? 'bg-[#E5B842] text-black shadow-sm'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {scene.stage}
              </button>
            ))}
          </div>
        </div>

        {/* Tabbed Production Inspector */}
        <div className="border-t border-white/10 bg-[#06080D]">
          <div className="flex items-center border-b border-white/10 px-5">
            {[
              { id: 'timeline', label: '18s Loop Timeline' },
              { id: 'safezones', label: 'Website Safe-Zones' },
              { id: 'prompts', label: '16:9 Video Prompts' },
              { id: 'unreal', label: 'Unreal / Web Integration' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#E5B842] text-[#E5B842]'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5 max-h-[300px] overflow-y-auto no-scrollbar text-xs">
            {/* Tab 1: Timeline */}
            {activeTab === 'timeline' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-[#E5B842] uppercase font-bold">
                      CURRENT STAGE: {currentStep.stage}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{currentStep.name}</h3>
                    <p className="text-neutral-300 text-xs mt-1">{currentStep.description}</p>
                  </div>
                  <div className="text-right text-[11px] font-mono text-neutral-400">
                    <div>{currentStep.timeRange}</div>
                    <div className="text-amber-300">{currentStep.lightingTemp}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-neutral-400 block text-[10px] uppercase font-mono">Camera Choreography</span>
                    <span className="text-white text-xs">{currentStep.cameraAction}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-neutral-400 block text-[10px] uppercase font-mono">Text Safe Zone Strategy</span>
                    <span className="text-emerald-400 text-xs">{currentStep.safeZoneNegativeSpace}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Safe Zones */}
            {activeTab === 'safezones' && (
              <div className="space-y-3 text-neutral-300">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                  <h4 className="font-bold text-sm mb-1 text-emerald-400">Zero-Collision UI Layout Strategy</h4>
                  <p className="text-xs leading-relaxed">
                    The 3D model and construction action is strictly anchored to the <strong>center-right 55%</strong> of the 16:9 canvas. The left 45% is intentionally composed with low-frequency spatial elements (distant road curve, soft landscape, and subtle atmospheric haze) supplemented by a progressive CSS gradient overlay (`from-[#06080D]/90 via-[#06080D]/50 to-transparent`).
                  </p>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
                  <li><strong>Desktop (16:9):</strong> Text floats comfortably in the left quadrant; property shines on the right.</li>
                  <li><strong>Tablet (4:3):</strong> Center crop preserves the building core while keeping headline readable.</li>
                  <li><strong>Mobile (9:16):</strong> Uses vertical center crop, pushing building to upper-half and CTA buttons below.</li>
                </ul>
              </div>
            )}

            {/* Tab 3: AI Video Prompts */}
            {activeTab === 'prompts' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">16:9 Master Looping Video Prompt</span>
                  <button
                    onClick={() => copyToClipboard(
                      "Horizontal 16:9 cinematic architectural real-estate website hero animation time-lapse. Continuous smooth camera movement over a prime empty residential plot in a modern Pakistani master-planned development transforming into an ultra-modern luxury villa estate. Progressive sequence: demarcated terracotta plot with glowing architectural blueprint grid lines -> excavation and foundation concrete pour -> reinforced concrete columns and slabs rising floor-by-floor -> Roman travertine marble cladding and floor-to-ceiling bronze glass curtain walls installed -> mature date palms and cobblestone driveway landscaping -> smooth daylight transition to blue hour night with warm 3000K indirect architectural LED illumination -> majestic hero 3/4 angle reveal. Subtle distant Margalla hills Pakistani skyline context. Clean negative space on the left side of the frame for website typography overlay. Smooth seamless loop transition back to opening camera altitude. Ultra-realistic, 8k resolution, Unreal Engine 5.4 Lumen global illumination, 24fps --ar 16:9 --no text, logo, watermark, subtitles, ui, cartoon, low-poly, cheap cgi, flickering, distorted building, melting geometry",
                      'hero-169-prompt'
                    )}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#E5B842] text-black font-bold text-xs hover:bg-[#F5C852] cursor-pointer"
                  >
                    {copiedKey === 'hero-169-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'hero-169-prompt' ? 'Copied' : 'Copy 16:9 Prompt'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-amber-200 leading-relaxed select-all">
                  Horizontal 16:9 cinematic architectural real-estate website hero animation time-lapse. Continuous smooth camera movement over a prime empty residential plot in a modern Pakistani master-planned development transforming into an ultra-modern luxury villa estate. Progressive sequence: demarcated terracotta plot with glowing architectural blueprint grid lines → excavation and foundation concrete pour → reinforced concrete columns and slabs rising floor-by-floor → Roman travertine marble cladding and floor-to-ceiling bronze glass curtain walls installed → mature date palms and cobblestone driveway landscaping → smooth daylight transition to blue hour night with warm 3000K indirect architectural LED illumination → majestic hero 3/4 angle reveal. Subtle distant Margalla hills Pakistani skyline context. Clean negative space on the left side of the frame for website typography overlay. Smooth seamless loop transition back to opening camera altitude. Ultra-realistic, 8k resolution, Unreal Engine 5.4 Lumen global illumination, 24fps --ar 16:9 --no text, logo, watermark, subtitles, ui, cartoon, low-poly, cheap cgi, flickering, distorted building, melting geometry
                </div>
              </div>
            )}

            {/* Tab 4: Web Integration Snippet */}
            {activeTab === 'unreal' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">HTML5 / Video Tag Seamless Looping Code</span>
                  <button
                    onClick={() => copyToClipboard(
                      `<video autoPlay loop muted playsInline poster="/renders/hero_16_9_empty_plot.jpg" className="absolute inset-0 w-full h-full object-cover">\n  <source src="/videos/pakistan_realestate_hero_loop_16x9.mp4" type="video/mp4" />\n</video>\n<div className="absolute inset-0 bg-gradient-to-r from-[#06080D]/90 via-[#06080D]/50 to-transparent pointer-events-none" />`,
                      'code-snippet'
                    )}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer"
                  >
                    {copiedKey === 'code-snippet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'code-snippet' ? 'Copied' : 'Copy HTML5'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-neutral-300 overflow-x-auto whitespace-pre">
                  {`<video autoPlay loop muted playsInline poster="/renders/hero_16_9_empty_plot.jpg" className="absolute inset-0 w-full h-full object-cover">\n  <source src="/videos/pakistan_realestate_hero_loop_16x9.mp4" type="video/mp4" />\n</video>\n<div className="absolute inset-0 bg-gradient-to-r from-[#06080D]/90 via-[#06080D]/50 to-transparent pointer-events-none" />`}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
