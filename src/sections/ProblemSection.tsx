// src/sections/ProblemSection.tsx
import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

/** Placeholder for the "Problem" storytelling section */
export default function ProblemSection() {
  const meshRef = useRef<Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
