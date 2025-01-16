import React from 'react';
import { Heart, Eye, Users } from 'lucide-react';
import { Creator } from '../../types/creator';
import { useTranslation } from 'react-i18next';

interface CreatorCardProps {
  creator: Creator;
  onClick: (creator: Creator) => void;
}

export function CreatorCard({ creator, onClick }: CreatorCardProps) {
  const { t } = useTranslation();
  
  return (
    <div 
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onClick={() => onClick(creator)}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={creator.featuredWorks[0]?.image}
          alt={creator.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold">{creator.name}</h3>
              <p className="text-sm text-gray-200 capitalize">{creator.type}</p>
            </div>
          </div>
          
          <div className="flex gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{creator.stats.followers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{creator.stats.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{creator.stats.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {creator.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{creator.bio}</p>
      </div>
    </div>
  );
}