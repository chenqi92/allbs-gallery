import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Download, Eye, Filter, Loader2 } from 'lucide-react';
import { images, ImageData } from '../config';

const INITIAL_BATCH_SIZE = 12;
const LOAD_MORE_THRESHOLD = 200;
const LOAD_MORE_BATCH_SIZE = 8;
const RETRY_DELAY = 3000;

interface ImageTransform {
  rotate: number;
  flipX: boolean;
  flipY: boolean;
  contrast: number;
  brightness: number;
}

const IMAGE_TYPES = ['all', 'landscape', 'portrait', 'nature', 'architecture', 'abstract'] as const;
type ImageType = (typeof IMAGE_TYPES)[number];

export function Gallery() {
  const [displayedImages, setDisplayedImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [selectedType, setSelectedType] = useState<ImageType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [transform, setTransform] = useState<ImageTransform>({
    rotate: 0,
    flipX: false,
    flipY: false,
    contrast: 100,
    brightness: 100,
  });

  const loadingRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Filter images based on selected type
  const filteredImages = React.useMemo(() => {
    if (selectedType === 'all') return images.gallery;
    return images.gallery.filter(img => img.type === selectedType);
  }, [selectedType]);

  // Simulated async loading function
  const loadImages = useCallback(async (startIndex: number, count: number) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate random error
    if (Math.random() < 0.1) {
      throw new Error('Failed to load images');
    }

    const endIndex = Math.min(startIndex + count, filteredImages.length);
    return filteredImages.slice(startIndex, endIndex);
  }, [filteredImages]);

  // Load more images with retry mechanism
  const loadMoreImages = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const newImages = await loadImages(
        displayedImages.length,
        LOAD_MORE_BATCH_SIZE
      );

      if (newImages.length === 0) {
        setHasMore(false);
        return;
      }

      setDisplayedImages(prev => [...prev, ...newImages]);
      setRetryCount(0);
    } catch (err) {
      setError('Failed to load images');
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadMoreImages();
        }, RETRY_DELAY);
      }
    } finally {
      setIsLoading(false);
    }
  }, [displayedImages.length, hasMore, isLoading, loadImages, retryCount]);

  // Initial load
  useEffect(() => {
    setDisplayedImages([]);
    setHasMore(true);
    loadImages(0, INITIAL_BATCH_SIZE)
      .then(initialImages => {
        setDisplayedImages(initialImages);
        setHasMore(initialImages.length < filteredImages.length);
      })
      .catch(() => setError('Failed to load initial images'));
  }, [selectedType, loadImages, filteredImages.length]);

  // Intersection Observer setup
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadMoreImages();
      }
    }, options);

    const currentObserver = observer.current;
    const currentLoader = loadingRef.current;

    if (currentLoader) {
      currentObserver.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        currentObserver.unobserve(currentLoader);
      }
    };
  }, [loadMoreImages]);

  // Reset transform when selecting a new image
  const handleImageSelect = (image: ImageData) => {
    setSelectedImage(image);
    setTransform({
      rotate: 0,
      flipX: false,
      flipY: false,
      contrast: 100,
      brightness: 100,
    });
  };

  // Download image
  const handleDownload = async (image: ImageData, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="mb-8 flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-700">Filter by Type</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {IMAGE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedType === type
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-gray-100 text-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4">
        {displayedImages.map((image, index) => (
          <div
            key={`${image.url}-${index}`}
            className="relative break-inside-avoid mb-4 group cursor-pointer overflow-hidden rounded-lg"
          >
            <img
              src={`${image.url}?auto=format&fit=crop&w=600&q=80`}
              alt={image.title}
              className="w-full rounded-lg shadow-md transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
              <div className="flex gap-3 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={() => handleImageSelect(image)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200 group/button"
                >
                  <Eye className="w-5 h-5 text-gray-800" />
                  <span className="absolute bg-black text-white text-xs px-2 py-1 rounded -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/button:opacity-100 transition-opacity duration-200">
                    Preview
                  </span>
                </button>
                <button
                  onClick={(e) => handleDownload(image, e)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200 group/button"
                >
                  <Download className="w-5 h-5 text-gray-800" />
                  <span className="absolute bg-black text-white text-xs px-2 py-1 rounded -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/button:opacity-100 transition-opacity duration-200">
                    Download
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading/Error States */}
      <div ref={loadingRef} className="py-8 flex flex-col items-center justify-center">
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more images...</span>
          </div>
        )}
        
        {error && !isLoading && (
          <div className="text-center">
            <p className="text-red-500 mb-2">{error}</p>
            <button
              onClick={() => loadMoreImages()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!hasMore && !isLoading && !error && displayedImages.length > 0 && (
          <p className="text-gray-500">You've reached the end!</p>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div
            className="relative max-w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${selectedImage.url}?auto=format&fit=crop&w=1200&q=100`}
              alt={selectedImage.title}
              style={{
                transform: `rotate(${transform.rotate}deg) 
                           scaleX(${transform.flipX ? -1 : 1}) 
                           scaleY(${transform.flipY ? -1 : 1})`,
                filter: `contrast(${transform.contrast}%) brightness(${transform.brightness}%)`,
                transition: 'transform 0.3s ease-out, filter 0.3s ease-out',
              }}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          <button
            onClick={(e) => handleDownload(selectedImage, e)}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full transition-colors duration-200"
          >
            <Download className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      )}
    </div>
  );
}