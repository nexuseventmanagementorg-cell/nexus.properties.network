// src/sections/HeroSection.tsx
import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * HeroSection – full‑screen cinematic intro.
 * For now this is a placeholder: a rotating torus knot with overlay text and CTA buttons.
 */
export default function HeroSection() {
  const meshRef = useRef<Mesh>(null);

  // Simple rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* 3D object */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[2, 0.5, 100, 16]} />
        <meshStandardMaterial color="#2DD4BF" emissive="#2DD4BF" emissiveIntensity={0.5} />
      </mesh>
      {/* Overlay HTML UI (CTA) */}
      <Html center>
        <div style={{
          color: '#ffffff',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Pakistan's First AI‑Powered Real Estate Operating System
          </h1>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={ctaStyle}>Start Property Search</button>
            <button style={ctaStyle}>List Your Property</button>
            <button style={ctaStyle}>Join The Network</button>
          </div>
        </div>
      </Html>
    </group>
  );
}

const ctaStyle: React.CSSProperties = {
  background: '#D4AF37',
  border: 'none',
  padding: '0.75rem 1.5rem',
  color: '#050505',
  fontWeight: 'bold',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(45,212,191,0.7)',
};
