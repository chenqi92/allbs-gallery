import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, User, ChevronRight } from 'lucide-react';
import { stories } from '../../data/stories';
import { StoryModal } from './StoryModal';
import { Pagination } from '../Pagination';

const ITEMS_PER_PAGE = 8;

export function StoriesSection() {
  const { t } = useTranslation();
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Get featured story (first story)
  const featuredStory = stories[0];
  
  // Get remaining stories for pagination
  const remainingStories = stories.slice(1);
  const totalPages = Math.ceil(remainingStories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStories = remainingStories.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of section
    document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="stories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('stories.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('stories.description')}
          </p>
        </div>

        {/* Featured Story */}
        <div 
          className="relative mb-12 group cursor-pointer"
          onClick={() => setSelectedStory(featuredStory)}
        >
          <div className="aspect-[21/9] rounded-2xl overflow-hidden">
            <img
              src={featuredStory.coverImage}
              alt={featuredStory.title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-4 mb-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-indigo-600">
                {t(`stories.categories.${featuredStory.category}`)}
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{featuredStory.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{featuredStory.author}</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
              {featuredStory.title}
            </h3>
            <p className="text-gray-200 max-w-3xl">
              {featuredStory.excerpt}
            </p>
          </div>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentStories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={() => setSelectedStory(story)}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm">
                    {t(`stories.categories.${story.category}`)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{story.author}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {story.excerpt}
                </p>
                <div className="flex items-center text-indigo-600 font-medium group/link">
                  <span>{t('stories.readMore')}</span>
                  <ChevronRight className="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Story Modal */}
        {selectedStory && (
          <StoryModal
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
      </div>
    </section>
  );
}