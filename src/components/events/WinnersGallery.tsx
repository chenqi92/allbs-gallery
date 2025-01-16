import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Trophy, Heart, Share2, Download } from 'lucide-react';

interface WinnersGalleryProps {
  onClose: () => void;
}

export function WinnersGallery({ onClose }: WinnersGalleryProps) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-amber-100 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{t('events.backToEvent')}</span>
          </button>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            {t('events.winnersGallery')}
          </h1>
          <p className="text-amber-100">
            {t('events.winnersDescription')}
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Winner Cards */}
          {/* Add your winner cards here */}
        </div>
      </div>
    </div>
  );
}