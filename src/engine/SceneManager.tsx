// src/engine/SceneManager.tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';
import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import TransformationSection from '../sections/TransformationSection';
import PropertyGraphSection from '../sections/PropertyGraphSection';
import AIWorkforceSection from '../sections/AIWorkforceSection';

/**
 * SceneManager – holds all storytelling sections. Each section is a separate
 * component that adds its own objects to the three‑scene. We wrap them in a
 * <group> so they can be positioned along the Z‑axis (depth) and moved by the
 * ScrollControls.
 */
export const SceneManager = () => {
  const groupRef = useRef<Group>(null);

  // Simple animation loop: rotate the whole scene slowly for a subtle dynamic feel
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sections are stacked along Z – adjust spacing as needed */}
      <group position={[0, 0, 0]}>
        <HeroSection />
      </group>
      <group position={[0, 0, -20]}>
        <ProblemSection />
      </group>
      <group position={[0, 0, -40]}>
        <TransformationSection />
      </group>
      <group position={[0, 0, -60]}>
        <PropertyGraphSection />
      </group>
      <group position={[0, 0, -80]}>
        <AIWorkforceSection />
      </group>
      {/* Add further sections later */}
    </group>
  );
};
