'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useRef, useState } from 'react';

// Composant Tourbillon animé
function Tourbillon({ speed = 1 }) {
  const cageRef = useRef();
  
  useFrame((state) => {
    if (cageRef.current) {
      cageRef.current.rotation.y = state.clock.elapsedTime * speed;
      cageRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={cageRef}>
      {/* Cage du tourbillon */}
      <mesh>
        <torusGeometry args={[0.5, 0.05, 8, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Spiromètre */}
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.2, 0.02, 100, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

// Composant Quantième Perpétuel interactif
function QuantiemePerpetuel({ date }) {
  const [currentDate, setCurrentDate] = useState(date);
  
  useFrame((state) => {
    // Animation douce du saut du quantième
  });

  return (
    <group>
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="#fafafa"
        anchorX="center"
        anchorY="middle"
      >
        {currentDate}
      </Text>
      {/* Roues de date cachées */}
    </group>
  );
}

// Composant principal
export default function Watch3DSimulator() {
  const [complication, setComplication] = useState('tourbillon');

  return (
    <div className="w-full h-96 bg-[#0a0a0a] rounded-2xl border border-[#c0c0c0]/20">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#D4AF37" />
        
        {complication === 'tourbillon' && <Tourbillon speed={2} />}
        {complication === 'quantieme' && <QuantiemePerpetuel date="15.04.2024" />}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
      
      {/* UI Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
        <button 
          onClick={() => setComplication('tourbillon')}
          className={`px-4 py-2 rounded-lg text-sm ${
            complication === 'tourbillon' 
              ? 'bg-[#D4AF37] text-[#0a0a0a]' 
              : 'bg-[#2d2d2d] text-[#fafafa]'
          }`}
        >
          🌀 Tourbillon
        </button>
        <button 
          onClick={() => setComplication('quantieme')}
          className={`px-4 py-2 rounded-lg text-sm ${
            complication === 'quantieme' 
              ? 'bg-[#D4AF37] text-[#0a0a0a]' 
              : 'bg-[#2d2d2d] text-[#fafafa]'
          }`}
        >
          📅 Quantième
        </button>
      </div>
    </div>
  );
}
