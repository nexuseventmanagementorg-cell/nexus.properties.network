// src/engine/Engine.tsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ScrollControls } from './ScrollControls';
import { SceneManager } from './SceneManager';

/**
 * Engine – top‑level wrapper that provides a Three.js canvas, scroll handling
 * and lazy‑loaded scene sections.
 */
export const Engine = () => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <Suspense fallback={null}>
        {/* ScrollControls drives camera position based on page scroll */}
        <ScrollControls />
        {/* SceneManager loads/unloads each storytelling section */}
        <SceneManager />
      </Suspense>
    </Canvas>
  );
};
