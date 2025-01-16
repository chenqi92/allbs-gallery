import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, Trophy, Timer, Clock } from 'lucide-react';
import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const { t } = useTranslation();

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      {/* Event Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
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

        {/* Event Type */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-white/90 text-sm font-medium text-gray-800">
            {t(`events.types.${event.type}`)}
          </span>
        </div>

        {/* Title and Date */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-2 group-hover:text-amber-300 transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            {event.participantCount && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{event.participantCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          {event.status === 'ongoing' && (
            <>
              <Timer className="w-4 h-4" />
              <span>{event.deadline}</span>
            </>
          )}
          {event.status === 'upcoming' && (
            <>
              <Clock className="w-4 h-4" />
              <span>{event.startDate}</span>
            </>
          )}
          {event.status === 'ended' && event.winners && (
            <>
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500">Winners Announced</span>
            </>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">
          {event.description}
        </p>
      </div>
    </div>
  );
}