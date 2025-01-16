import React from 'react';
import { X, Instagram, Twitter, Globe, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { Creator } from '../../types/creator';
import { useTranslation } from 'react-i18next';

interface CreatorProfileProps {
  creator: Creator;
  onClose: () => void;
}

export function CreatorProfile({ creator, onClose }: CreatorProfileProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<'recent' | 'collections'>('recent');
  const [isFollowing, setIsFollowing] = React.useState(false);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90">
      <div className="min-h-screen px-4 py-8">
        <div className="relative max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="relative h-80">
            <img
              src={creator.featuredWorks[0]?.image}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-end gap-6">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{creator.name}</h2>
                  <p className="text-gray-200 capitalize">{creator.type}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      isFollowing
                        ? 'bg-white/20 hover:bg-white/30 text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    {isFollowing ? t('creators.unfollow') : t('creators.follow')}
                  </button>
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Bio & Philosophy */}
            <div className="max-w-3xl">
              <p className="text-gray-600 mb-4">{creator.bio}</p>
              <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700">
                "{creator.philosophy}"
              </blockquote>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {creator.social.portfolio && (
                <a
                  href={creator.social.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {creator.social.instagram && (
                <a
                  href={creator.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {creator.social.twitter && (
                <a
                  href={creator.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Featured Works */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">{t('creators.featuredWorks')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creator.featuredWorks.map((work) => (
                  <div
                    key={work.id}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full aspect-[3/2] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="text-lg font-bold mb-2">{work.title}</h4>
                        <p className="text-sm text-gray-200">{work.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-12 border-b border-gray-200">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('recent')}
                  className={`pb-4 font-medium transition-colors ${
                    activeTab === 'recent'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('creators.recentWorks')}
                </button>
                <button
                  onClick={() => setActiveTab('collections')}
                  className={`pb-4 font-medium transition-colors ${
                    activeTab === 'collections'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('creators.collections')}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'recent' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {creator.recentWorks.map((work) => (
                    <div
                      key={work.id}
                      className="relative rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-medium mb-1">{work.title}</h4>
                          <p className="text-sm text-gray-200">{work.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creator.collections.map((collection) => (
                    <div
                      key={collection.id}
                      className="bg-gray-50 rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <div className="relative aspect-[3/2]">
                        <img
                          src={collection.coverImage}
                          alt={collection.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-1">{collection.title}</h4>
                        <p className="text-sm text-gray-500">
                          {collection.workCount} {t('creators.works')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}