// src/components/LuxuryRealEstateAnimation3D.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Camera,
  Layers,
  Copy,
  Check,
  X,
  Sliders,
  Box,
  Image as ImageIcon
} from 'lucide-react';

export interface SceneData {
  id: number;
  timeRange: string;
  title: string;
  urduTitle: string;
  phase: 'EMPTY LAND' | 'FOUNDATION' | 'STRUCTURE' | 'ARCHITECTURE' | 'FINISHING' | 'LANDSCAPING' | 'LIGHTING' | 'LUXURY PROPERTY';
  description: string;
  cameraMove: string;
  lighting: string;
  materials: string;
  voiceoverEn: string;
  voiceoverUr: string;
  imageSrc: string;
  colorGrading: string;
  focalLength: string;
  elevation: string;
}

export const SCENES: SceneData[] = [
  {
    id: 1,
    timeRange: '00:00 – 00:03',
    title: 'SCENE 01 — Golden Hour Establishing Shot',
    urduTitle: 'منظر ۰۱ — گولڈن آور وسیع ڈرون شاٹ',
    phase: 'EMPTY LAND',
    description: 'Wide aerial drone shot descending over a prime Pakistani development sector at golden hour. Distant urban silhouettes of modern Islamabad/Lahore establish the location without stealing focus.',
    cameraMove: 'Smooth 45° descending drone push-in from 120m altitude, speed 14 km/h.',
    lighting: 'Golden Hour (2800K low-angle sunlight, volumetric atmospheric warm haze).',
    materials: 'Paved asphalt, date palms, dry terracotta soil, distant limestone architecture.',
    voiceoverEn: 'In the heart of Pakistan\'s most prestigious master-planned enclave...',
    voiceoverUr: 'پاکستان کے سب سے پروقار اور جدید ترین رہائشی علاقے کے دل میں...',
    imageSrc: '/renders/pakistan_realestate_empty_plot_1790206387493.jpg',
    colorGrading: 'Kodak 2383 Warm Golden LUT, soft highlights, cinematic contrast.',
    focalLength: '24mm Ultra-Wide Cine Prime',
    elevation: '120m → 45m'
  },
  {
    id: 2,
    timeRange: '00:03 – 00:06',
    title: 'SCENE 02 — Empty Plot & Architectural Blueprint Grid',
    urduTitle: 'منظر ۰۲ — خالی پلاٹ اور تھری ڈی بلیو پرنٹ گرڈ',
    phase: 'EMPTY LAND',
    description: 'Camera descends over the pristine red-clay construction site. Survey markings and temporary boundary fencing appear. A subtle luminescent architectural blueprint grid projects across the ground plane.',
    cameraMove: 'Centering crane tilt-down from 45m to 15m directly above the plot center.',
    lighting: 'Late afternoon sun (3400K), casting defined directional shadows across survey stakes.',
    materials: 'Compacted red soil, galvanized steel boundary mesh, neon blueprint lines.',
    voiceoverEn: 'Where vision meets ground reality, every millimeter is engineered for perfection.',
    voiceoverUr: 'جہاں خواب حقیقت کا روپ دھارتے ہیں، ہر گوشہ کمالِ فن سے ترتیب دیا جاتا ہے۔',
    imageSrc: '/renders/pakistan_realestate_empty_plot_1790206387493.jpg',
    colorGrading: 'High-contrast architectural documentary grade.',
    focalLength: '35mm Cooke Anamorphic',
    elevation: '45m → 15m'
  },
  {
    id: 3,
    timeRange: '00:06 – 00:09',
    title: 'SCENE 03 — Ground Excavation & Foundation Pouring',
    urduTitle: 'منظر ۰۳ — بنیادوں کی کھدائی اور ٹھوس کنکریٹ کی بھرائی',
    phase: 'FOUNDATION',
    description: 'Accelerated cinematic time-lapse. Excavation trenches form with physical soil displacement. Steel reinforcement cages drop into place, followed by high-strength concrete pour.',
    cameraMove: 'Orbital tracking movement 30° counter-clockwise around the foundation perimeter.',
    lighting: 'Accelerated sun-shadow sweep (time-lapse speed 48x), dynamic shadows.',
    materials: 'Ribbed grade-60 debar steel, wet grey cement slurry, timber shuttering boards.',
    voiceoverEn: 'Reinforced seismic-grade foundations built to endure for generations.',
    voiceoverUr: 'زلزلہ پروف پختہ بنیادیں، جو نسل در نسل پائیداری کی ضامن ہیں۔',
    imageSrc: '/renders/pakistan_realestate_concrete_structure_1790206407726.jpg',
    colorGrading: 'Industrial realism grade, deep slate greys, rich warm highlights.',
    focalLength: '32mm Master Prime',
    elevation: '12m Orbital'
  },
  {
    id: 4,
    timeRange: '00:09 – 00:13',
    title: 'SCENE 04 — Structural Concrete Frame Rising',
    urduTitle: 'منظر ۰۴ — کالمز، بیمز اور فلور سلیبس کی بلندی',
    phase: 'STRUCTURE',
    description: 'Columns rise vertically from the foundation. Concrete floor slabs cast progressively floor-by-floor. Tower crane maneuvers steel in an organic, seamless growth sequence.',
    cameraMove: 'Low-angle crane boom rising vertically alongside the growing structure.',
    lighting: 'Direct midday sunlight (5600K) softened by natural Pakistani atmospheric dust.',
    materials: 'Form-finished cast-in-place concrete, post-tensioned cable anchors.',
    voiceoverEn: 'Floor by floor, uncompromised structural excellence takes shape.',
    voiceoverUr: 'منزل بہ منزل، انجینئرنگ کا شاہکار وجود میں آتا ہے۔',
    imageSrc: '/renders/pakistan_realestate_concrete_structure_1790206407726.jpg',
    colorGrading: 'Crisp architectural commercial grade, neutral desaturated concrete.',
    focalLength: '28mm Cine Prime',
    elevation: '2m → 20m Rising Boom'
  },
  {
    id: 5,
    timeRange: '00:13 – 00:17',
    title: 'SCENE 05 — Architectural Facade & Glass Curtain Wall',
    urduTitle: 'منظر ۰۵ — ٹراورٹین ماربل اور ڈبل گلیزڈ گلاس فساڈ',
    phase: 'ARCHITECTURE',
    description: 'Raw concrete transitions smoothly into Italian Travertine stone cladding. Floor-to-ceiling double-glazed dark bronze acoustic glass curtain walls slide into position with crisp reflections.',
    cameraMove: 'Dolly forward with 15° Dutch tilt angle scanning along the cantilevered balcony.',
    lighting: 'Late afternoon golden reflection (3200K) bouncing off glass surface.',
    materials: 'Honed Roman travertine, low-E tempered glass, powder-coated dark bronze aluminum.',
    voiceoverEn: 'Clad in imported natural stone and acoustic bronze curtain glazing...',
    voiceoverUr: 'قدرتی ٹراورٹین پتھر اور ساؤنڈ پروف شیشے سے آراستہ فن تعمیر...',
    imageSrc: '/renders/pakistan_realestate_finished_facade_1790206432013.jpg',
    colorGrading: 'Luxury editorial, warm champagne specular highlights.',
    focalLength: '50mm Anamorphic Prime',
    elevation: '4m Eye-Level Dolly'
  },
  {
    id: 6,
    timeRange: '00:17 – 00:20',
    title: 'SCENE 06 — Luxury Landscaping, Driveway & Water Features',
    urduTitle: 'منظر ۰۶ — رائل پامز، واٹر فاؤنٹین اور نفاست سے سجی لینڈ سکیپنگ',
    phase: 'LANDSCAPING',
    description: 'Cobblestone driveway lays into place. Mature Pakistani date palms and royal palms root into place through time-lapse. Fountain water jets activate with rippling caustics.',
    cameraMove: 'Low sweeping tracking shot gliding over the manicured lawn toward the water cascade.',
    lighting: 'Golden Hour sunset (2600K), casting long dramatic tree shadows.',
    materials: 'Granite cobblestones, Bermuda turf grass, crystal water, polished black river pebbles.',
    voiceoverEn: 'Surrounded by lush resort-style landscaping and calming water elements.',
    voiceoverUr: 'سرسبز لان اور پرسکون پانی کے چشموں سے گھرا پرتعیش ماحول۔',
    imageSrc: '/renders/pakistan_realestate_finished_facade_1790206432013.jpg',
    colorGrading: 'Vibrant organic greens, deep amber sun flair.',
    focalLength: '35mm Wide Prime',
    elevation: '1.2m Ground Glide'
  },
  {
    id: 7,
    timeRange: '00:20 – 00:23',
    title: 'SCENE 07 — Blue Hour to Night Lighting Transformation',
    urduTitle: 'منظر ۰۷ — غروبِ آفتاب سے مسحور کن رات کی روشنیوں کا آغاز',
    phase: 'LIGHTING',
    description: 'Smooth sky transition from sunset into royal blue hour. Architectural 3000K warm strip LEDs activate floor-by-floor along exterior soffits. Pool underwater spotlights ignite.',
    cameraMove: 'Continuous smooth backward crane pull as lights ripple on in sequence.',
    lighting: 'Deep indigo Blue Hour (7500K ambient sky) contrasted with 2700K warm interior LEDs.',
    materials: 'Illuminated travertine textures, sparkling pool mosaics, glowing interiors.',
    voiceoverEn: 'As twilight falls, architectural illumination unveils a radiant sanctuary.',
    voiceoverUr: 'شام ڈھلتے ہی، روشنیوں کا جادو اس شاہکار کو جگمگا دیتا ہے۔',
    imageSrc: '/renders/pakistan_realestate_night_reveal_1790206460189.jpg',
    colorGrading: 'Cinematic Blue Hour Teal & Warm Amber complementary palette.',
    focalLength: '40mm Cine Prime',
    elevation: '3m → 8m Crane Pull'
  },
  {
    id: 8,
    timeRange: '00:23 – 00:26',
    title: 'SCENE 08 — Hero Reveal: 5-Star Architectural Masterpiece',
    urduTitle: 'منظر ۰۸ — ہیرو ریویل: فائیو سٹار پرتعیش محلاتی رہائش گاہ',
    phase: 'LUXURY PROPERTY',
    description: 'Dramatic low-angle cinematic crane sweep revealing the complete estate from the classic 3/4 beauty angle. Luxury SUV on driveway, crystal infinity pool reflections, immaculate details.',
    cameraMove: 'Low-to-high majestic crane sweep rising from driveway level to 2nd-floor balcony height.',
    lighting: 'Full night architectural lighting, realistic glass reflections, starry night sky.',
    materials: 'Specular reflections on glass, wet driveway cobblestone sheen, illuminated marble.',
    voiceoverEn: 'This is not just a residence. It is the pinnacle of luxury living in Pakistan.',
    voiceoverUr: 'یہ صرف ایک گھر نہیں، بلکہ پاکستان میں شاہانہ طرزِ زندگی کا نیا معیار ہے۔',
    imageSrc: '/renders/pakistan_realestate_night_reveal_1790206460189.jpg',
    colorGrading: 'Premium commercial luxury grade, deep black levels, zero noise.',
    focalLength: '35mm Master Anamorphic',
    elevation: '1.5m → 7.5m Hero Sweep'
  },
  {
    id: 9,
    timeRange: '00:26 – 00:28',
    title: 'SCENE 09 — Pakistan Identity & Master Urban Integration',
    urduTitle: 'منظر ۰۹ — قومی شناخت اور جدید شہری ہم آہنگی',
    phase: 'LUXURY PROPERTY',
    description: 'Camera lifts into the Pakistani night sky. In the distant horizon, the glowing architectural silhouette of the Faisal Mosque and Margalla Hills frames the city context with pride and prestige.',
    cameraMove: 'High-angle ascending pan showing the property seamlessly woven into the city grid.',
    lighting: 'Twinkling city lights, street sodium/LED grid, soft mountain ridge illumination.',
    materials: 'City street grid lighting, atmospheric night haze, illuminated landmarks.',
    voiceoverEn: 'Rooted in our heritage, engineered for the global future.',
    voiceoverUr: 'اپنی ثقافت سے جڑا، عالمی معیار کے مستقبل سے ہم آہنگ۔',
    imageSrc: '/renders/pakistan_realestate_city_skyline_1790206493139.jpg',
    colorGrading: 'Atmospheric night city grade, golden street grids against deep night blue.',
    focalLength: '50mm Telephoto Wide',
    elevation: '150m High Altitude'
  },
  {
    id: 10,
    timeRange: '00:28 – 00:30',
    title: 'SCENE 10 — Final High-Altitude Pullback & Brand Outro',
    urduTitle: 'منظر ۱۰ — حتمی فلائی اوے اور برانڈ اختتامیہ',
    phase: 'LUXURY PROPERTY',
    description: 'Epic drone flyaway ascending to 300 meters. The illuminated estate shines as the crowning jewel of the development before fading into the developer identity seal.',
    cameraMove: 'Smooth exponential high-altitude drone pullback with gentle rotation.',
    lighting: 'Wide cinematic city glow, starry cosmos, crisp property accentuation.',
    materials: 'Urban tapestry of lights, pristine development layout.',
    voiceoverEn: 'Nexus One. Tomorrow\'s Landmark, Today.',
    voiceoverUr: 'نیکسس ون۔ کل کا شاہکار، آج آپ کے سامنے۔',
    imageSrc: '/renders/pakistan_realestate_city_skyline_1790206493139.jpg',
    colorGrading: 'Epic finale cinematic grade, warm center vignette.',
    focalLength: '24mm Ultra-Wide',
    elevation: '300m Pullback'
  }
];

// Interactive 3D Model that dynamically reflects construction progression
function ProceduralBuilding3D({ progress }: { progress: number }) {
  const buildingGroup = useRef<THREE.Group>(null);

  // Construction stage thresholds (0 to 1)
  const foundationProgress = Math.min(1, Math.max(0, (progress - 0.1) / 0.2));
  const structureProgress = Math.min(1, Math.max(0, (progress - 0.28) / 0.3));
  const facadeProgress = Math.min(1, Math.max(0, (progress - 0.5) / 0.22));
  const landscapingProgress = Math.min(1, Math.max(0, (progress - 0.65) / 0.2));
  const nightLightProgress = Math.min(1, Math.max(0, (progress - 0.75) / 0.25));

  useFrame((state) => {
    if (buildingGroup.current) {
      // Gentle floating camera orbit feeling
      buildingGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08 + (progress * 0.4);
    }
  });

  // Calculate dynamic colors based on time of day
  const isNight = progress > 0.7;
  const sunLightIntensity = Math.max(0.1, 1.8 * (1 - Math.pow(Math.max(0, (progress - 0.55) / 0.3), 2)));
  const interiorLightIntensity = nightLightProgress * 4.5;

  return (
    <group ref={buildingGroup}>
      {/* Dynamic Lighting System */}
      <ambientLight intensity={isNight ? 0.35 : 0.8} />
      <directionalLight
        position={[15, 25 * (1 - progress * 0.6), 15]}
        intensity={sunLightIntensity}
        color={progress < 0.25 ? '#FFBA66' : progress < 0.6 ? '#FFF8E7' : '#FF9944'}
        castShadow
      />
      {/* Night Architectural Spotlights */}
      {isNight && (
        <>
          <pointLight position={[0, 4, 3]} intensity={interiorLightIntensity} color="#FFE6B3" distance={15} />
          <pointLight position={[-4, 2, 0]} intensity={interiorLightIntensity * 0.8} color="#FFD180" distance={12} />
          <pointLight position={[3, 6, -2]} intensity={interiorLightIntensity * 0.9} color="#FFECB3" distance={15} />
          <spotLight position={[0, 0.2, 5]} target-position={[0, 5, 0]} intensity={interiorLightIntensity * 2} color="#E5B842" angle={0.6} />
        </>
      )}

      {/* Ground Plane (Red Clay Soil to Manicured Lawn) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial
          color={landscapingProgress > 0.5 ? '#1B2E1E' : '#4A2F22'}
          roughness={0.8}
        />
      </mesh>

      {/* Blueprint Grid Overlay (Visible in early stages) */}
      {progress < 0.35 && (
        <gridHelper
          args={[14, 28, '#E5B842', '#38BDF8']}
          position={[0, 0.01, 0]}
        />
      )}

      {/* Excavation Trench Mesh */}
      {progress > 0.05 && progress < 0.4 && (
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[8.5, 0.6, 7.5]} />
          <meshStandardMaterial color="#2E1C14" roughness={0.9} wireframe={progress < 0.15} />
        </mesh>
      )}

      {/* Reinforced Concrete Foundation Footing */}
      {foundationProgress > 0 && (
        <group scale={[1, foundationProgress, 1]}>
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.2, 0.4, 7.2]} />
            <meshStandardMaterial color="#71717A" roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* Structural Frame: Columns & Slabs */}
      {structureProgress > 0 && (
        <group>
          {/* Ground Floor Slabs & Columns */}
          <group scale={[1, Math.min(1, structureProgress * 2), 1]}>
            {/* Columns */}
            {[-3.5, 0, 3.5].map((x) =>
              [-3, 3].map((z) => (
                <mesh key={`col-g-${x}-${z}`} position={[x, 1.5, z]} castShadow>
                  <boxGeometry args={[0.45, 2.8, 0.45]} />
                  <meshStandardMaterial color="#52525B" roughness={0.6} />
                </mesh>
              ))
            )}
            {/* First Floor Slab */}
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
              <boxGeometry args={[8.5, 0.35, 7.8]} />
              <meshStandardMaterial color="#71717A" roughness={0.6} />
            </mesh>
          </group>

          {/* Second Floor Structure */}
          {structureProgress > 0.5 && (
            <group scale={[1, Math.min(1, (structureProgress - 0.5) * 2), 1]}>
              {/* Columns */}
              {[-3.5, 0, 3.5].map((x) =>
                [-3, 3].map((z) => (
                  <mesh key={`col-2-${x}-${z}`} position={[x, 4.5, z]} castShadow>
                    <boxGeometry args={[0.45, 2.8, 0.45]} />
                    <meshStandardMaterial color="#52525B" roughness={0.6} />
                  </mesh>
                ))
              )}
              {/* Cantilevered Roof Slab */}
              <mesh position={[0.5, 6, 0.3]} castShadow receiveShadow>
                <boxGeometry args={[9.2, 0.4, 8.5]} />
                <meshStandardMaterial color="#3F3F46" roughness={0.5} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* Architectural Facade: Travertine Cladding & Glass Curtain Walls */}
      {facadeProgress > 0 && (
        <group>
          {/* Main Travertine Cladded Accent Tower */}
          <mesh position={[-2.8, 3.1, 0.1]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 5.8 * facadeProgress, 7]} />
            <meshStandardMaterial
              color="#D4C5B9"
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>

          {/* Double-Height Glass Curtain Wall */}
          <mesh position={[1.8, 3, 3.4]}>
            <planeGeometry args={[4.2, 5.2 * facadeProgress]} />
            <meshPhysicalMaterial
              color="#102A36"
              roughness={0.1}
              metalness={0.9}
              transmission={0.8}
              transparent
              opacity={0.85}
              reflectivity={0.9}
            />
          </mesh>

          {/* Balcony Glass Balustrade */}
          <mesh position={[1.8, 3.5, 3.75]}>
            <boxGeometry args={[4.4, 0.9 * facadeProgress, 0.05]} />
            <meshPhysicalMaterial
              color="#E0F2FE"
              roughness={0.05}
              transmission={0.9}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Architectural Timber Louvers */}
          {[-0.2, 0.2, 0.6, 1.0].map((x, i) => (
            <mesh key={`louver-${i}`} position={[x, 4.5, 3.42]}>
              <boxGeometry args={[0.08, 2.5 * facadeProgress, 0.12]} />
              <meshStandardMaterial color="#78350F" roughness={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* Landscaping & Water Features */}
      {landscapingProgress > 0 && (
        <group>
          {/* Paved Cobblestone Driveway */}
          <mesh position={[2.5, 0.02, 5.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[3.8, 7 * landscapingProgress]} />
            <meshStandardMaterial color="#27272A" roughness={0.6} />
          </mesh>

          {/* Reflective Infinity Pool */}
          <mesh position={[-2.5, 0.03, 4.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.6, 4.2 * landscapingProgress]} />
            <meshPhysicalMaterial
              color="#0284C7"
              roughness={0.05}
              transmission={0.6}
              transparent
              opacity={0.9}
              reflectivity={1}
            />
          </mesh>

          {/* Date Palm Trunks & Fronds */}
          {[
            { pos: [-4.5, 0, 4.5] as [number, number, number], scale: 1 },
            { pos: [5, 0, 3] as [number, number, number], scale: 0.9 },
            { pos: [4.8, 0, -3] as [number, number, number], scale: 1.1 },
          ].map((palm, idx) => (
            <group key={`palm-${idx}`} position={palm.pos} scale={[palm.scale, palm.scale * landscapingProgress, palm.scale]}>
              {/* Trunk */}
              <mesh position={[0, 1.8, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.25, 3.6, 8]} />
                <meshStandardMaterial color="#5C3D2E" roughness={0.9} />
              </mesh>
              {/* Foliage Canopy */}
              <mesh position={[0, 3.6, 0]} castShadow>
                <sphereGeometry args={[1.2, 8, 8]} />
                <meshStandardMaterial color="#166534" roughness={0.8} wireframe={landscapingProgress < 0.4} />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
}

interface LuxuryRealEstateAnimation3DProps {
  onClose?: () => void;
}

export const LuxuryRealEstateAnimation3D: React.FC<LuxuryRealEstateAnimation3DProps> = ({ onClose }) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 1 across 30 seconds
  const [viewMode, setViewMode] = useState<'photoreal' | 'webgl3d' | 'splitscreen'>('photoreal');
  const [audioMuted, setAudioMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'prompts' | 'unreal' | 'script'>('timeline');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const durationSec = 30;
  const currentScene = SCENES[currentSceneIdx];

  // Procedural Web Audio Sound Generator for cinematic construction ambiance
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
  };

  const playSynthesizedCue = (type: 'swoosh' | 'concrete' | 'night' | 'glass') => {
    if (audioMuted) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'swoosh') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.4);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'night') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.setValueAtTime(329.63, now + 0.2); // E4
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.start(now);
        osc.stop(now + 0.9);
      }
    } catch {
      // Audio autoplay gracefully handled
    }
  };

  // Playback timer loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.0033; // ~100ms updates for 30s total
          if (next >= 1) {
            return 0; // loop
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync current scene with progress
  useEffect(() => {
    const sceneIndex = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length));
    if (sceneIndex !== currentSceneIdx) {
      setCurrentSceneIdx(sceneIndex);
      if (sceneIndex === 6) playSynthesizedCue('night');
      else playSynthesizedCue('swoosh');
    }
  }, [progress, currentSceneIdx]);

  const handleSeek = (newProgress: number) => {
    setProgress(newProgress);
    const targetIdx = Math.min(SCENES.length - 1, Math.floor(newProgress * SCENES.length));
    setCurrentSceneIdx(targetIdx);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#04060A]/95 backdrop-blur-2xl text-white flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Luxury Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/10 bg-[#06080D]/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E5B842] to-[#B38728] flex items-center justify-center text-black font-bold shadow-lg shadow-[#E5B842]/20">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase text-white">
                3D Architectural Cinematic Simulator
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5B842]/15 text-[#E5B842] border border-[#E5B842]/30 font-mono font-semibold">
                VERTICAL 9:16 • 30S CINEMA REEL
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              Pakistan Luxury Real Estate Transformation: Empty Land → Foundation → Modern Masterpiece
            </p>
          </div>
        </div>

        {/* View Mode Switcher & Close */}
        <div className="flex items-center gap-2">
          <div className="bg-white/5 border border-white/10 rounded-lg p-0.5 flex text-xs">
            <button
              onClick={() => setViewMode('photoreal')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'photoreal'
                  ? 'bg-[#E5B842] text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">8K Photoreal</span>
            </button>
            <button
              onClick={() => setViewMode('webgl3d')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'webgl3d'
                  ? 'bg-[#E5B842] text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Interactive 3D WebGL</span>
            </button>
            <button
              onClick={() => setViewMode('splitscreen')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'splitscreen'
                  ? 'bg-[#E5B842] text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Split Screen</span>
            </button>
          </div>

          <button
            onClick={() => setAudioMuted(!audioMuted)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E5B842]" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer ml-2"
              title="Close Cinema Mode"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Viewport (Vertical 9:16 Canvas Center + Inspector Right) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left / Center: 9:16 Vertical Screen Frame */}
        <div className="flex-1 bg-[#020306] flex items-center justify-center p-3 sm:p-6 overflow-hidden relative">
          {/* Subtle Studio Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,184,66,0.06)_0%,transparent_70%)] pointer-events-none" />

          {/* 9:16 Phone Mockup / Cinema Viewport Container */}
          <div className="relative h-full max-h-[820px] aspect-[9/16] bg-black rounded-[2.5rem] border-[6px] border-neutral-800 shadow-2xl shadow-black/90 overflow-hidden flex flex-col group select-none ring-1 ring-white/10">
            {/* Top Phone Camera Bezel / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-neutral-900/90 border border-white/10 px-3 py-1 rounded-full shadow-inner">
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                {(progress * durationSec).toFixed(1)}s / 30.0s
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Viewport Canvas Content */}
            <div className="relative flex-1 w-full h-full overflow-hidden bg-black">
              {/* Photoreal Render Mode */}
              {(viewMode === 'photoreal' || viewMode === 'splitscreen') && (
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    viewMode === 'splitscreen' ? 'h-1/2 border-b-2 border-[#E5B842]/40' : 'h-full'
                  }`}
                >
                  <img
                    src={currentScene.imageSrc}
                    alt={currentScene.title}
                    className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 ease-out"
                    style={{
                      transform: `scale(${1 + (progress % 0.1) * 0.4}) translate(${Math.sin(progress * 10) * 4}px, ${Math.cos(progress * 8) * 3}px)`
                    }}
                  />
                  {/* Subtle Gradient Overlays for Cinematic Look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                </div>
              )}

              {/* 3D WebGL Canvas Mode */}
              {(viewMode === 'webgl3d' || viewMode === 'splitscreen') && (
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    viewMode === 'splitscreen' ? 'top-1/2 h-1/2' : 'h-full'
                  }`}
                >
                  <Canvas shadows gl={{ antialias: true, alpha: true }}>
                    <PerspectiveCamera makeDefault position={[12, 10, 14]} fov={42} />
                    <OrbitControls
                      enablePan={false}
                      maxPolarAngle={Math.PI / 2.05}
                      minDistance={6}
                      maxDistance={25}
                    />
                    <ProceduralBuilding3D progress={progress} />
                  </Canvas>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-neutral-400 border border-white/10 pointer-events-none">
                    Drag to Orbit 3D Model
                  </div>
                </div>
              )}

              {/* In-Video Cinematic Telemetry HUD */}
              <div className="absolute bottom-16 left-4 right-4 z-20 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md border border-white/15 p-3 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5B842] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5B842] animate-ping" />
                      {currentScene.phase}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-300">
                      {currentScene.timeRange}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 mb-0.5">
                    {currentScene.title}
                  </h4>
                  <p className="text-[11px] text-neutral-300 font-urdu dir-rtl text-right line-clamp-1 mb-1.5 text-amber-200/90">
                    {currentScene.urduTitle}
                  </p>
                  <div className="flex items-center gap-3 text-[9px] text-neutral-400 font-mono border-t border-white/10 pt-1.5">
                    <span>FOCAL: {currentScene.focalLength}</span>
                    <span>ALT: {currentScene.elevation}</span>
                    <span className="text-emerald-400">FPS: 60 HDR</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Inside Video */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-800 z-30">
                <div
                  className="h-full bg-gradient-to-r from-[#E5B842] via-amber-300 to-yellow-500 transition-all duration-100"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* Bottom In-Bezel Media Bar */}
            <div className="h-14 bg-neutral-950/90 border-t border-white/10 flex items-center justify-between px-5 z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-[#E5B842] text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={() => handleSeek(0)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer"
                  title="Restart"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scene Navigation Dots */}
              <div className="flex items-center gap-1">
                {SCENES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSeek(idx / (SCENES.length - 1))}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentSceneIdx === idx
                        ? 'w-4 bg-[#E5B842]'
                        : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                  />
                ))}
              </div>

              <div className="text-[11px] font-mono text-neutral-400">
                SCENE {currentSceneIdx + 1}/10
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Director Console & Production Suite */}
        <div className="w-full lg:w-[460px] bg-[#0A0D14] border-l border-white/10 flex flex-col h-[400px] lg:h-full overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-white/10 bg-[#06080D] px-2">
            {[
              { id: 'timeline', label: 'Timeline & Cue Sheet' },
              { id: 'prompts', label: 'AI Video Prompts' },
              { id: 'unreal', label: 'Unreal / Blender' },
              { id: 'script', label: 'Voiceover Script' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#E5B842] text-[#E5B842]'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Timeline & Cue Sheet */}
          {activeTab === 'timeline' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {/* Scrub Slider */}
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-300">Master Scrubber (0s – 30s)</span>
                  <span className="font-mono text-[#E5B842]">
                    {(progress * durationSec).toFixed(1)}s
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.005"
                  value={progress}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="w-full accent-[#E5B842] cursor-pointer"
                />
              </div>

              {/* Current Scene Card */}
              <div className="bg-gradient-to-br from-[#121722] to-[#0D1017] border border-[#E5B842]/30 p-4 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5B842]/20 text-[#E5B842] font-mono font-semibold">
                    ACTIVE SCENE {currentScene.id} OF 10
                  </span>
                  <span className="text-xs font-mono text-neutral-400">{currentScene.timeRange}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{currentScene.title}</h3>
                <p className="text-xs text-neutral-300 mb-3">{currentScene.description}</p>

                <div className="space-y-2 text-xs border-t border-white/10 pt-2.5">
                  <div className="flex gap-2">
                    <span className="text-neutral-400 w-20 flex-shrink-0">Camera:</span>
                    <span className="text-neutral-200 font-mono text-[11px]">{currentScene.cameraMove}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-neutral-400 w-20 flex-shrink-0">Lighting:</span>
                    <span className="text-amber-300/90 text-[11px]">{currentScene.lighting}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-neutral-400 w-20 flex-shrink-0">Materials:</span>
                    <span className="text-neutral-300 text-[11px]">{currentScene.materials}</span>
                  </div>
                </div>
              </div>

              {/* Sequence Scene List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-1">
                  10-Scene Construction Timeline
                </h4>
                {SCENES.map((scene, idx) => (
                  <div
                    key={scene.id}
                    onClick={() => handleSeek(idx / (SCENES.length - 1))}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      currentSceneIdx === idx
                        ? 'bg-[#E5B842]/10 border-[#E5B842]/50 text-white'
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        currentSceneIdx === idx ? 'bg-[#E5B842] text-black' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {scene.id}
                      </span>
                      <div>
                        <div className="text-xs font-medium text-white">{scene.title.split('—')[1]}</div>
                        <div className="text-[10px] text-neutral-400">{scene.phase}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono">{scene.timeRange}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: AI Video Prompts (Runway, Sora, Kling, Luma) */}
          {activeTab === 'prompts' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-xs">
              <div className="bg-[#E5B842]/10 border border-[#E5B842]/30 p-3 rounded-lg text-neutral-300">
                <p className="font-semibold text-[#E5B842] mb-1">Commercial Generative AI Video Prompts</p>
                <p className="text-[11px]">
                  Engineered specifically for <strong>Runway Gen-3 Alpha</strong>, <strong>OpenAI Sora</strong>, <strong>Kling 1.5</strong>, and <strong>Luma Dream Machine</strong> with exact camera motion tags and negative prompt parameters.
                </p>
              </div>

              {/* Master Prompt for Current Scene */}
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Scene {currentScene.id} Video Prompt</span>
                  <button
                    onClick={() => copyToClipboard(
                      `Vertical 9:16 commercial real-estate architectural visualization time-lapse. ${currentScene.description} Camera: ${currentScene.cameraMove}. Lighting: ${currentScene.lighting}. Physically based materials: ${currentScene.materials}. Pakistani urban environment, cinematic 8k octane render, photorealistic, Unreal Engine 5.4 Lumen global illumination, 60fps --ar 9:16 --no cartoon, anime, low-poly, cheap cgi, flickering, distorted building, melting concrete`,
                      `prompt-${currentScene.id}`
                    )}
                    className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-[#E5B842]/20 text-[#E5B842] hover:bg-[#E5B842]/30 cursor-pointer"
                  >
                    {copiedKey === `prompt-${currentScene.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === `prompt-${currentScene.id}` ? 'Copied' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <div className="p-2.5 rounded bg-black/60 font-mono text-[11px] text-neutral-300 leading-relaxed border border-white/5 select-all">
                  Vertical 9:16 commercial real-estate architectural visualization time-lapse. {currentScene.description} Camera: {currentScene.cameraMove}. Lighting: {currentScene.lighting}. Physically based materials: {currentScene.materials}. Pakistani urban environment, cinematic 8k octane render, photorealistic, Unreal Engine 5.4 Lumen global illumination, 60fps --ar 9:16
                </div>
              </div>

              {/* Negative Prompt */}
              <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-400">Global Negative Prompt</span>
                  <button
                    onClick={() => copyToClipboard(
                      "cartoon, anime, low-poly, cheap CGI, unrealistic architecture, distorted building, melting geometry, floating construction materials, impossible physics, random windows, inconsistent floors, changing building design, warped perspective, flickering, jitter, unstable camera, duplicated vehicles, distorted people, deformed machinery, oversaturated colors, fake plastic materials, excessive text, watermark, logo distortion, blurry architecture, low resolution, unrealistic shadows, landmark distortion, fantasy architecture",
                      'neg-prompt'
                    )}
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 cursor-pointer"
                  >
                    {copiedKey === 'neg-prompt' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'neg-prompt' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="font-mono text-[10px] text-neutral-400 leading-normal">
                  cartoon, anime, low-poly, cheap CGI, unrealistic architecture, distorted building, melting geometry, floating construction materials, impossible physics, random windows, inconsistent floors, changing building design, warped perspective, flickering, jitter, unstable camera, duplicated vehicles, distorted people...
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Unreal Engine & Blender Production Specs */}
          {activeTab === 'unreal' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-xs">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                <h4 className="font-bold text-[#E5B842] flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  UE 5.4 Movie Render Queue Settings
                </h4>
                <ul className="space-y-1.5 text-neutral-300 text-[11px]">
                  <li><strong>Resolution:</strong> 2160 x 3840 (Vertical 9:16 4K UHD)</li>
                  <li><strong>Frame Rate:</strong> 59.94 FPS / 60 FPS Smooth Commercial Cadence</li>
                  <li><strong>Lumen Global Illumination:</strong> Hardware Ray Tracing, Max Reflection Bounces: 4</li>
                  <li><strong>Nanite Geometry:</strong> High Precision Normals enabled for Travertine Cladding</li>
                  <li><strong>Camera Shutter Angle:</strong> 180.0° (Cinematic Motion Blur 0.5 sample)</li>
                  <li><strong>Anti-Aliasing:</strong> Temporal Super Resolution (TSR) + 8x Spatial Samples</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                <h4 className="font-bold text-white">Procedural Growth Shader Blueprint</h4>
                <p className="text-[11px] text-neutral-400">
                  Use WorldPosition Z-mask with a noise gradient offset to materialize slabs, columns, and glazing progressively without geometry popping:
                </p>
                <pre className="p-2.5 rounded bg-black/60 font-mono text-[10px] text-amber-300 border border-white/5 overflow-x-auto">
{`// HLSL Material Function: M_ConstructionSlice
float Mask = saturate((WorldPos.z - TimelineHeight) / FadeWidth);
float DitherNoise = PseudoRandom(WorldPos.xy);
clip((1.0 - Mask) - (DitherNoise * 0.15));
Opacity = saturate(1.0 - Mask);`}
                </pre>
              </div>
            </div>
          )}

          {/* Tab 4: Bilingual Pakistani Commercial Voiceover Script */}
          {activeTab === 'script' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-xs">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-[#E5B842]">Voiceover Narration (English)</h4>
                  <button
                    onClick={() => copyToClipboard(
                      SCENES.map(s => `[${s.timeRange}] ${s.voiceoverEn}`).join('\n'),
                      'script-en'
                    )}
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                  >
                    {copiedKey === 'script-en' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Full English</span>
                  </button>
                </div>
                <div className="space-y-2 text-neutral-300 text-[11px]">
                  {SCENES.map((s) => (
                    <p key={s.id} className={currentSceneIdx === s.id - 1 ? 'text-[#E5B842] font-semibold' : ''}>
                      <span className="font-mono text-neutral-500 mr-2">[{s.timeRange}]</span>
                      {s.voiceoverEn}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-[#E5B842]">Voiceover Narration (Urdu)</h4>
                  <button
                    onClick={() => copyToClipboard(
                      SCENES.map(s => `[${s.timeRange}] ${s.voiceoverUr}`).join('\n'),
                      'script-ur'
                    )}
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                  >
                    {copiedKey === 'script-ur' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>اردو متن کاپی کریں</span>
                  </button>
                </div>
                <div className="space-y-2 text-right dir-rtl text-[12px] font-urdu text-amber-100">
                  {SCENES.map((s) => (
                    <p key={s.id} className={currentSceneIdx === s.id - 1 ? 'text-[#E5B842] font-bold' : ''}>
                      <span className="font-mono text-neutral-500 ml-2">[{s.timeRange}]</span>
                      {s.voiceoverUr}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
