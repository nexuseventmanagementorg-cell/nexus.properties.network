// src/sections/TransformationSection.tsx
import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

/** Placeholder for the transformation animation section */
export default function TransformationSection() {
  const meshRef = useRef<Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#2DD4BF" emissive="#2DD4BF" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}
