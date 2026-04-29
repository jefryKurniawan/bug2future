"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial color="#3C6EB4" attach="material" distort={0.3} speed={1.5} roughness={0.2} metalness={0.8} wireframe />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}