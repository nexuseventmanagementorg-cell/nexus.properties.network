// src/engine/ScrollControls.tsx
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from 'three';

/**
 * ScrollControls – maps the window scroll position to the three‑fiber camera.
 * It listens to the page scroll and interpolates the camera position along a
 * pre‑defined path. The path is a simple linear progression for now; more
 * complex splines can be added later per section.
 */
export const ScrollControls = () => {
  const { camera } = useThree();
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      // Example: move camera back on Z as we scroll down
      const start = new Vector3(0, 0, 15);
      const end = new Vector3(0, 0, 5);
      const newPos = start.clone().lerp(end, progress);
      camera.position.set(newPos.x, newPos.y, newPos.z);
    };
    window.addEventListener('scroll', onScroll);
    // Initialise position
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [camera, maxScroll]);

  return null;
};
