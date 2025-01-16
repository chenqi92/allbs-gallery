import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft, Calendar, Users, Trophy,
  Download, Share2, FileText, Gift,
  ExternalLink, Clock
} from 'lucide-react';
import { Event } from '../../types/event';

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
  onShowWinners: () => void;
}

export function EventDetails({ event, onClose, onShowWinners }: EventDetailsProps) {
  const { t } = useTranslation();

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
            <span>{t('events.backToEvents')}</span>
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-amber-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{event.date}</span>
            </div>
            {event.participantCount && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{event.participantCount} participants</span>
              </div>
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.status === 'ongoing'
                ? 'bg-green-500 text-white'
                : event.status === 'upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-500 text-white'
            }`}>
              {t(`events.status.${event.status}`)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cover Image */}
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full rounded-xl shadow-lg"
            />

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('events.about')}
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Rules & Guidelines */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t('events.rules')}
              </h2>
              <div className="prose prose-amber max-w-none">
                {event.rules.map((rule, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rule.title}
                    </h3>
                    <p className="text-gray-600">{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Winners Section (if ended) */}
            {event.status === 'ended' && event.winners && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    {t('events.winners')}
                  </h2>
                  <button
                    onClick={onShowWinners}
                    className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                  >
                    {t('events.viewGallery')}
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {event.winners.slice(0, 3).map((winner, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      onClick={onShowWinners}
                    >
                      <img
                        src={winner.image}
                        alt={winner.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-medium">{winner.title}</p>
                        <p className="text-sm text-gray-200">{winner.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            {event.status === 'ongoing' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg mb-4 flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  {t('events.participate')}
                </button>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.deadline}</span>
                  </div>
                  <button className="hover:text-gray-700">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Prizes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                {t('events.prizes')}
              </h3>
              <div className="space-y-4">
                {event.prizes.map((prize, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      index === 0
                        ? 'bg-amber-100 text-amber-600'
                        : index === 1
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {prize.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {prize.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            {event.resources && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t('events.resources')}
                </h3>
                <div className="space-y-3">
                  {event.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-amber-500 group"
                    >
                      <span className="text-gray-600 group-hover:text-amber-600">
                        {resource.title}
                      </span>
                      {resource.type === 'download' ? (
                        <Download className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}