import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { images } from '../config';

const RADIUS = 10;
const IMAGE_WIDTH = 5;
const IMAGE_HEIGHT = 3.5;
const ROTATION_SPEED = 0.003;
const MIN_ZOOM = 12;
const MAX_ZOOM = 20;

// Fallback image URL in case of loading errors
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538';

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center justify-center space-x-2 text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading...</span>
      </div>
    </Html>
  );
}

interface ImageFrameProps {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}

function ImageFrame({ url, position, rotation, onClick, isSelected }: ImageFrameProps) {
  const [textureUrl, setTextureUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Handle texture loading with error fallback
  const texture = useTexture(textureUrl, 
    // Success callback
    (loadedTexture) => {
      setIsLoading(false);
      loadedTexture.encoding = THREE.sRGBEncoding;
      loadedTexture.needsUpdate = true;
    },
    // Error callback
    () => {
      console.warn(`Failed to load texture: ${textureUrl}, falling back to default`);
      setTextureUrl(FALLBACK_IMAGE);
    }
  );

  // Animation for hover and selection effects
  useFrame(() => {
    if (!meshRef.current) return;
    
    const scale = hovered ? 1.1 : isSelected ? 1.05 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, 1), 0.1);
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      rotation[1],
      0.1
    );
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[IMAGE_WIDTH, IMAGE_HEIGHT]} />
      <meshStandardMaterial
        map={texture}
        emissive={new THREE.Color(isSelected ? 0x333333 : 0x000000)}
        emissiveIntensity={0.5}
        metalness={0.5}
        roughness={0.7}
      />
      {(hovered || isSelected) && (
        <Html center position={[0, -IMAGE_HEIGHT / 2 - 0.5, 0]}>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm transform -translate-y-2">
            Click to view
          </div>
        </Html>
      )}
    </mesh>
  );
}

function Scene() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = (e.clientX - startX) * 0.01;
    setRotation(prev => prev - delta);
    setStartX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useFrame(() => {
    if (!groupRef.current || isDragging) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotation,
      0.05
    );
  });

  const imageFrames = images.carousel.slice(0, 8).map((url, index) => {
    const angle = (index / images.carousel.length) * Math.PI * 2;
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;
    
    return (
      <ImageFrame
        key={url}
        url={url}
        position={[x, 0, z]}
        rotation={[0, -angle, 0]}
        onClick={() => setSelectedImage(index)}
        isSelected={selectedImage === index}
      />
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      {imageFrames}
    </group>
  );
}

export function ThreeCarousel() {
  const [cameraPosition, setCameraPosition] = useState(15);
  
  const handleZoomIn = () => {
    setCameraPosition(prev => Math.max(prev - 1, MIN_ZOOM));
  };
  
  const handleZoomOut = () => {
    setCameraPosition(prev => Math.min(prev + 1, MAX_ZOOM));
  };

  return (
    <div className="relative w-full h-screen">
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, cameraPosition]}
          fov={50}
        />
        <Suspense fallback={<LoadingSpinner />}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={() => setCameraPosition(prev => prev + 1)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={handleZoomIn}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
            disabled={cameraPosition <= MIN_ZOOM}
          >
            <ZoomIn className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
            disabled={cameraPosition >= MAX_ZOOM}
          >
            <ZoomOut className="w-6 h-6 text-white" />
          </button>
        </div>

        <button
          onClick={() => setCameraPosition(prev => prev - 1)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}