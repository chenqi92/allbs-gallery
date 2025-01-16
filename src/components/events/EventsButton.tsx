import React from 'react';
import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function EventsButton() {
  const { t } = useTranslation();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = 'events';
  };
  
  return (
    <button
      onClick={handleClick}
      className="fixed right-6 bottom-24 z-40 group"
      aria-label={t('events.openEvents')}
    >
      <div className="relative">
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
          3
        </div>
        
        {/* Button */}
        <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 active:scale-95">
          <Trophy className="w-6 h-6" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-4 transition-all duration-300">
            {t('events.newEvents')}
          </div>
        </div>
      </div>
    </button>
  );
}