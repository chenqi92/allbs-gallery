import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { images } from '../config';

export function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const nextSlide = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % images.carousel.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide, isAnimating]);

  const prevSlide = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    const prevIndex = (currentIndex - 1 + images.carousel.length) % images.carousel.length;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide, isAnimating]);

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        const nextIndex = (currentIndex + 1) % images.carousel.length;
        goToSlide(nextIndex);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, goToSlide, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      <div className="absolute inset-0 flex items-center justify-center">
        {images.carousel.map((image, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % images.carousel.length;
          const isPrev = index === (currentIndex - 1 + images.carousel.length) % images.carousel.length;
          
          return (
            <div
              key={image}
              className={`absolute w-full h-full transition-all duration-500 ease-out transform ${
                isActive
                  ? 'opacity-100 scale-100 translate-x-0 z-20'
                  : isNext
                  ? 'opacity-50 scale-95 translate-x-full z-10'
                  : isPrev
                  ? 'opacity-50 scale-95 -translate-x-full z-10'
                  : 'opacity-0 scale-90 translate-x-0 z-0'
              }`}
            >
              <img
                src={`${image}?auto=format&fit=crop&w=1920&q=80`}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full transform transition-transform duration-[2000ms] hover:scale-110"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
            </div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full z-30 hover:bg-white transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full z-30 hover:bg-white transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {images.carousel.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform ${
              index === currentIndex
                ? 'bg-white scale-125 ring-2 ring-white/50'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}