import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { images } from '../config';

export function CubeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const totalSlides = images.carousel.length;
  const transitionDuration = 400; // ms

  const getSlideIndex = useCallback((offset: number) => {
    return (currentIndex + offset + totalSlides) % totalSlides;
  }, [currentIndex, totalSlides]);

  const goToSlide = useCallback((index: number, dir: 'left' | 'right') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(dir);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const nextIndex = getSlideIndex(1);
    goToSlide(nextIndex, 'right');
  }, [getSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = getSlideIndex(-1);
    goToSlide(prevIndex, 'left');
  }, [getSlideIndex, goToSlide]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !isTransitioning) {
      timer = setTimeout(nextSlide, 5000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, isTransitioning, nextSlide]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-900">
      {/* 3D Scene Container */}
      <div 
        className="relative w-full h-full"
        style={{
          perspective: '2000px',
        }}
      >
        {/* Cube */}
        <div
          className="absolute w-full h-full transition-transform duration-[400ms] ease-out preserve-3d"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-50vh) rotateY(${-currentIndex * 90}deg)`,
          }}
        >
          {/* Cube Faces */}
          {images.carousel.map((image, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === getSlideIndex(-1);
            const isNext = index === getSlideIndex(1);

            if (!isActive && !isPrev && !isNext) return null;

            let transform = '';
            if (isActive) transform = 'rotateY(0deg) translateZ(50vh)';
            else if (isPrev) transform = 'rotateY(-90deg) translateZ(50vh)';
            else if (isNext) transform = 'rotateY(90deg) translateZ(50vh)';

            return (
              <div
                key={image}
                className="absolute inset-0 w-full h-full backface-hidden preserve-3d"
                style={{
                  transform,
                }}
              >
                {/* Image Container */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={`${image}?auto=format&fit=crop&w=1920&q=80`}
                    alt={`Slide ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[2000ms] hover:scale-110"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538';
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.carousel.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, index > currentIndex ? 'right' : 'left')}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}