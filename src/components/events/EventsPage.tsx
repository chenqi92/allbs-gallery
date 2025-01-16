import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, Calendar, Users, Award, ChevronLeft,
  AlertCircle, Timer, Home, ChevronRight,
  Camera, FileText, Gift, Medal, Share2,
  Download, ExternalLink, Clock
} from 'lucide-react';
import { EventCard } from './EventCard';
import { EventDetails } from './EventDetails';
import { WinnersGallery } from './WinnersGallery';
import { events } from '../../data/events';

type Tab = 'ongoing' | 'upcoming' | 'announcements' | 'past';

interface EventsPageProps {
  onClose: () => void;
}

export function EventsPage({ onClose }: EventsPageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('ongoing');
  const [isExiting, setIsExiting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showWinners, setShowWinners] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showWinners) {
          setShowWinners(false);
        } else if (selectedEvent) {
          setSelectedEvent(null);
        } else {
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedEvent, showWinners]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash !== '#events') {
        handleClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const filteredEvents = events.filter(event => {
    switch (activeTab) {
      case 'ongoing':
        return event.status === 'ongoing';
      case 'upcoming':
        return event.status === 'upcoming';
      case 'announcements':
        return event.type === 'announcement';
      case 'past':
        return event.status === 'ended';
      default:
        return true;
    }
  });

  if (showWinners) {
    return <WinnersGallery onClose={() => setShowWinners(false)} />;
  }

  if (selectedEvent) {
    const event = events.find(e => e.id === selectedEvent);
    if (event) {
      return (
        <EventDetails 
          event={event} 
          onClose={() => setSelectedEvent(null)}
          onShowWinners={() => setShowWinners(true)}
        />
      );
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-300 ${
      isExiting ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleClose}
                className="flex items-center gap-2 text-white hover:text-amber-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{t('nav.home')}</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                <Trophy className="w-8 h-8" />
                {t('events.title')}
              </h1>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Return home"
            >
              <Home className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-amber-100 max-w-2xl">
            {t('events.description')}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-[104px] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Events">
            {(['ongoing', 'upcoming', 'announcements', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'ongoing' && <Timer className="w-4 h-4" />}
                {tab === 'upcoming' && <Calendar className="w-4 h-4" />}
                {tab === 'announcements' && <AlertCircle className="w-4 h-4" />}
                {tab === 'past' && <Clock className="w-4 h-4" />}
                {t(`events.tabs.${tab}`)}
                {tab === 'ongoing' && (
                  <span className="ml-2 bg-amber-100 text-amber-600 py-0.5 px-2 rounded-full text-xs">
                    {filteredEvents.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('events.noEvents')}
            </h3>
            <p className="text-gray-500">
              {t('events.checkBack')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}