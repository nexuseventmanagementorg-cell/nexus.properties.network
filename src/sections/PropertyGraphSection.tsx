import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/** Placeholder for the property graph storytelling section */
export default function PropertyGraphSection() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0012;
      meshRef.current.rotation.y += 0.0018;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}
