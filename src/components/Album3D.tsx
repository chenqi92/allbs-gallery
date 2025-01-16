import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { images } from '../config';

interface Point {
  x: number;
  y: number;
}

export function Album3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());
  const lastPointRef = useRef<Point>({ x: 0, y: 0 });

  const totalImages = images.carousel.length;
  const angleStep = 360 / totalImages;

  // Auto-rotation effect
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: prev.y - angleStep / 60
        }));
      }, 16); // ~60fps
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, angleStep]);

  // Inertia effect
  useEffect(() => {
    let animationFrame: number;

    const applyInertia = () => {
      if (!isDragging && (Math.abs(velocityRef.current.x) > 0.1 || Math.abs(velocityRef.current.y) > 0.1)) {
        setRotation(prev => ({
          ...prev,
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y
        }));

        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;
        animationFrame = requestAnimationFrame(applyInertia);
      }
    };

    if (!isDragging) {
      animationFrame = requestAnimationFrame(applyInertia);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPlaying(false);
    setStartPoint({ x: e.clientX, y: e.clientY });
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPoint.x;
    const deltaY = e.clientY - startPoint.y;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTimeRef.current;

    if (deltaTime > 0) {
      velocityRef.current = {
        x: (e.clientY - lastPointRef.current.y) / deltaTime * 5,
        y: -(e.clientX - lastPointRef.current.x) / deltaTime * 5
      };
    }

    setRotation(prev => ({
      ...prev,
      x: prev.x + deltaY * 0.5,
      y: prev.y - deltaX * 0.5
    }));

    setStartPoint({ x: e.clientX, y: e.clientY });
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = currentTime;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    setRotation(prev => ({
      ...prev,
      y: prev.y - angleStep
    }));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setRotation(prev => ({
      ...prev,
      y: prev.y + angleStep
    }));
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0, z: 0 });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Ambient Light Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-[800px] h-[500px] preserve-3d cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1000px',
            perspectiveOrigin: '50% 50%'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="relative w-full h-full transition-transform duration-100 ease-out"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {images.carousel.map((image, index) => {
              const angle = (index * angleStep) * (Math.PI / 180);
              const radius = 400;
              const z = radius * Math.cos(angle);
              const x = radius * Math.sin(angle);

              return (
                <div
                  key={image}
                  className="absolute left-1/2 top-1/2 w-[300px] h-[400px] -translate-x-1/2 -translate-y-1/2 preserve-3d"
                  style={{
                    transform: `translate3d(${x}px, 0, ${z}px) rotateY(${index * angleStep}deg)`,
                  }}
                >
                  {/* Card */}
                  <div className="relative w-full h-full preserve-3d group">
                    {/* Front */}
                    <div className="absolute inset-0 bg-white rounded-lg shadow-2xl overflow-hidden backface-hidden">
                      <img
                        src={image}
                        alt={`Album ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Back */}
                    <div 
                      className="absolute inset-0 bg-white/90 rounded-lg shadow-2xl backface-hidden"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          Photo {index + 1}
                        </h3>
                        <p className="text-gray-600 text-center">
                          Drag to explore the album in 3D space
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-full">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <button
          onClick={resetRotation}
          className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label="Reset rotation"
        >
          <RotateCw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}