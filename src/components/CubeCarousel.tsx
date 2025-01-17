import React, {useState, useEffect, useCallback, useRef} from 'react';
import {ChevronLeft, ChevronRight, Play, Pause} from 'lucide-react';
import {images} from '../config';

export function CubeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [isVisible, setIsVisible] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const transitionDuration = 400; // ms

    // Intersection Observer for performance optimization
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            {
                rootMargin: '100px', // Start loading before the element is visible
                threshold: 0.1
            }
        );

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Preload images
    useEffect(() => {
        const preloadImages = () => {
            images.carousel.forEach((url) => {
                const img = new Image();
                img.src = `${url}?auto=format&fit=crop&w=1920&q=80`;
            });
        };

        if (isVisible) {
            preloadImages();
        }
    }, [isVisible]);

    // Debounced scroll handler
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                const rect = carouselRef.current?.getBoundingClientRect();
                if (rect) {
                    setIsVisible(
                        rect.top < window.innerHeight && rect.bottom >= 0
                    );
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    const getSlideIndex = useCallback((offset: number) => {
        const totalSlides = images.carousel.length;
        return (currentIndex + offset + totalSlides) % totalSlides;
    }, [currentIndex]);

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

    // Auto-advance timer with visibility check
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && !isTransitioning && isVisible) {
            timer = setTimeout(nextSlide, 5000);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, isTransitioning, nextSlide, isVisible]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isVisible) return;
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, isVisible]);

    return (
        <div
            ref={carouselRef}
            className="relative h-[600px] overflow-hidden bg-gray-900"
        >
            {/* 3D Scene Container */}
            <div
                className="relative w-full h-full"
                style={{
                    perspective: '2000px',
                }}
            >
                {/* Cube */}
                <div
                    className="absolute w-full h-full transition-transform duration-[400ms] ease-out preserve-3d will-change-transform"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `translateZ(-50vh) rotateY(${-currentIndex * 90}deg)`,
                    }}
                >
                    {/* Cube Faces */}
                    {images.carousel.map((image, index) => (
                        <div
                            key={image}
                            className="absolute inset-0 w-full h-full backface-hidden preserve-3d"
                            style={{
                                transform: `rotateY(${index * 90}deg) translateZ(50vh)`,
                                transition: 'transform 0.4s ease-out',
                            }}
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-full overflow-hidden">
                                <img
                                    src={`${image}?auto=format&fit=crop&w=1920&q=80`}
                                    alt={`Slide ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[2000ms] hover:scale-110 will-change-transform"
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = images.carousel[0]; // 使用第一张图片作为备用
                                    }}
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"/>
                            </div>
                        </div>
                    ))}
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
                    <ChevronLeft className="w-6 h-6 text-white"/>
                </button>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6 text-white"/>
                    ) : (
                        <Play className="w-6 h-6 text-white"/>
                    )}
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-white"/>
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