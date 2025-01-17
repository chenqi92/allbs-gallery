import React, {useState, useEffect, useCallback, useRef} from 'react';
import {ChevronLeft, ChevronRight, Play, Pause} from 'lucide-react';
import {images} from '../config';

interface Layer {
    image: string;
    title: string;
    description: string;
}

const TRANSITION_DURATION = 1000;
const AUTO_PLAY_INTERVAL = 5000;

export function CurtainCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [isPlaying, setIsPlaying] = useState(true);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const containerRef = useRef<HTMLDivElement>(null);

    const layers: Layer[] = images.carousel.map((url, index) => ({
        image: url,
        title: `Scene ${index + 1}`,
        description: 'A beautiful moment captured in time'
    }));

    // Handle mouse movement for parallax effect
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        setMousePosition({x, y});
    }, []);

    const goToSlide = useCallback((index: number, dir: 'left' | 'right') => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setDirection(dir);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        const nextIndex = (currentIndex + 1) % layers.length;
        goToSlide(nextIndex, 'right');
    }, [currentIndex, layers.length, goToSlide]);

    const prevSlide = useCallback(() => {
        const prevIndex = (currentIndex - 1 + layers.length) % layers.length;
        goToSlide(prevIndex, 'left');
    }, [currentIndex, layers.length, goToSlide]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && !isTransitioning) {
            timer = setTimeout(nextSlide, AUTO_PLAY_INTERVAL);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, isTransitioning, nextSlide]);

    return (
        <div
            ref={containerRef}
            className="relative h-screen overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 opacity-30">
                {Array.from({length: 20}).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                ))}
            </div>

            {/* Main Stage */}
            <div className="relative w-full h-full">
                {/* Theater Curtains with Parallax */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent"
                        style={{
                            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                    <div
                        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-900/30 to-transparent transform origin-left"
                        style={{
                            transform: `translate(${mousePosition.x * -20}px, 0) scaleX(${1 + mousePosition.x * 0.1})`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                    <div
                        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/30 to-transparent transform origin-right"
                        style={{
                            transform: `translate(${mousePosition.x * 20}px, 0) scaleX(${1 - mousePosition.x * 0.1})`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                </div>

                {/* Slides Container */}
                <div className="relative w-full h-full">
                    {layers.map((layer, index) => {
                        const isActive = index === currentIndex;
                        const isPrev = (index === ((currentIndex - 1 + layers.length) % layers.length));
                        const isNext = (index === ((currentIndex + 1) % layers.length));

                        return (
                            <div
                                key={layer.image}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                    isActive ? 'opacity-100 z-20' :
                                        isPrev || isNext ? 'opacity-0 z-10' : 'opacity-0 z-0'
                                } ${
                                    isTransitioning && isActive && direction === 'right' ? 'translate-x-0 scale-100' :
                                        isTransitioning && isActive && direction === 'left' ? 'translate-x-0 scale-100' :
                                            isTransitioning && isPrev ? '-translate-x-full scale-95' :
                                                isTransitioning && isNext ? 'translate-x-full scale-95' : ''
                                }`}
                            >
                                {/* Multi-layer Background with Parallax */}
                                <div className="absolute inset-0">
                                    {/* Far Background (slowest movement) */}
                                    <div
                                        className="absolute inset-0 bg-black"
                                        style={{
                                            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                                            transition: 'transform 0.2s ease-out'
                                        }}
                                    />

                                    {/* Middle Background */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                                            transition: 'transform 0.15s ease-out'
                                        }}
                                    >
                                        <img
                                            src={layer.image}
                                            alt={layer.title}
                                            className="w-full h-full object-cover opacity-50 scale-110"
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                        />
                                    </div>

                                    {/* Front Background (fastest movement) */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                                            transition: 'transform 0.1s ease-out'
                                        }}
                                    >
                                        <img
                                            src={layer.image}
                                            alt={layer.title}
                                            className="w-full h-full object-cover"
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                        />
                                    </div>

                                    {/* Dynamic Gradient Overlay */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                                        style={{
                                            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                                            transition: 'transform 0.2s ease-out'
                                        }}
                                    />
                                </div>

                                {/* Content Layer with Parallax */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <h2
                                        className="text-4xl md:text-6xl font-bold mb-4 transform translate-y-8 opacity-0 transition-all duration-700 delay-300 group-[.active]:translate-y-0 group-[.active]:opacity-100"
                                        style={{
                                            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
                                            transition: 'transform 0.1s ease-out'
                                        }}
                                    >
                                        {layer.title}
                                    </h2>
                                    <p
                                        className="text-xl md:text-2xl max-w-2xl text-center transform translate-y-8 opacity-0 transition-all duration-700 delay-500 group-[.active]:translate-y-0 group-[.active]:opacity-100"
                                        style={{
                                            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                                            transition: 'transform 0.15s ease-out'
                                        }}
                                    >
                                        {layer.description}
                                    </p>
                                </div>

                                {/* Dynamic Decorative Elements */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div
                                        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent"
                                        style={{
                                            transform: `translateY(${mousePosition.y * -15}px)`,
                                            transition: 'transform 0.2s ease-out'
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent"
                                        style={{
                                            transform: `translateY(${mousePosition.y * 15}px)`,
                                            transition: 'transform 0.2s ease-out'
                                        }}
                                    />
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

            {/* Pagination Indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {layers.map((_, index) => (
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