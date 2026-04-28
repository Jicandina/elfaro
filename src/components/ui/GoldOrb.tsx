import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Building() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.25;
  });

  const GOLD = '#C9A84C';

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 8, 4]} intensity={5} color={GOLD} />
      <pointLight position={[-4, 2, 3]} intensity={1.5} color="#dde6f5" />

      <group ref={ref} position={[0, -0.3, 0]}>

        {/* Torre principal */}
        <group position={[0, 0.8, 0]}>
          <mesh>
            <boxGeometry args={[0.9, 3.2, 0.7]} />
            <meshStandardMaterial color={GOLD} transparent opacity={0.06} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.9, 3.2, 0.7]} />
            <meshStandardMaterial color={GOLD} wireframe />
          </mesh>
          {/* Pisos */}
          {[-1.4, -0.8, -0.2, 0.4, 1.0, 1.5].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <boxGeometry args={[0.95, 0.025, 0.75]} />
              <meshStandardMaterial color={GOLD} transparent opacity={0.6} />
            </mesh>
          ))}
          {/* Punta */}
          <mesh position={[0, 1.8, 0]}>
            <boxGeometry args={[0.15, 0.4, 0.15]} />
            <meshStandardMaterial color={GOLD} />
          </mesh>
        </group>

        {/* Edificio izquierda */}
        <group position={[-0.95, 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.65, 2.2, 0.6]} />
            <meshStandardMaterial color={GOLD} transparent opacity={0.05} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.65, 2.2, 0.6]} />
            <meshStandardMaterial color={GOLD} wireframe />
          </mesh>
          {[-0.9, -0.3, 0.3, 0.9].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <boxGeometry args={[0.7, 0.02, 0.65]} />
              <meshStandardMaterial color={GOLD} transparent opacity={0.5} />
            </mesh>
          ))}
        </group>

        {/* Edificio derecha */}
        <group position={[0.95, -0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 1.8, 0.55]} />
            <meshStandardMaterial color={GOLD} transparent opacity={0.05} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.6, 1.8, 0.55]} />
            <meshStandardMaterial color={GOLD} wireframe />
          </mesh>
          {[-0.7, -0.1, 0.5].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <boxGeometry args={[0.65, 0.02, 0.6]} />
              <meshStandardMaterial color={GOLD} transparent opacity={0.5} />
            </mesh>
          ))}
        </group>

        {/* Base / suelo */}
        <mesh position={[0, -1.0, 0]}>
          <boxGeometry args={[2.8, 0.04, 1.0]} />
          <meshStandardMaterial color={GOLD} transparent opacity={0.3} />
        </mesh>

      </group>
    </>
  );
}

function Particles() {
  const geo = useMemo(() => {
    const arr = new Float32Array(20 * 3);
    for (let i = 0; i < 20; i++) {
      const r = 2.5 + Math.random() * 1.5;
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
    opacity: 0.4,
  }), []);

  return <points geometry={geo} material={mat} />;
}

export default function GoldOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Building />
      <Particles />
    </Canvas>
  );
}
