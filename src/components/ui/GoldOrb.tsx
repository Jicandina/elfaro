import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Orb() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.22;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 3]} intensity={5} color="#C9A84C" />
      <pointLight position={[-4, -3, 2]} intensity={1.5} color="#dde6f5" />
      <group ref={ref}>
        <mesh>
          <dodecahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial color="#C9A84C" transparent opacity={0.06} />
        </mesh>
        <mesh>
          <dodecahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial color="#C9A84C" wireframe />
        </mesh>
      </group>
    </>
  );
}

function Particles() {
  const geo = useMemo(() => {
    const arr = new Float32Array(25 * 3);
    for (let i = 0; i < 25; i++) {
      const r = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  const mat = useMemo(() => new THREE.PointsMaterial({
    size: 0.05,
    color: '#C9A84C',
    transparent: true,
    opacity: 0.5,
  }), []);

  return <points geometry={geo} material={mat} />;
}

export default function GoldOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Orb />
      <Particles />
    </Canvas>
  );
}
