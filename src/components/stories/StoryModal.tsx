import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Clock, User, Tag, Share2, Heart, ArrowLeft, Home } from 'lucide-react';
import { Story } from '../../types/story';

interface StoryModalProps {
  story: Story;
  onClose: () => void;
}

export function StoryModal({ story, onClose }: StoryModalProps) {
  const { t } = useTranslation();

  // Handle browser history
  useEffect(() => {
    // Push state when opening modal
    const state = { type: 'story', id: story.id };
    window.history.pushState(state, '', `#story/${story.id}`);

    // Handle back button
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.type === 'story') {
        // Stay on story if navigating between stories
        return;
      }
      // Close modal if navigating back to main page
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [story.id, onClose]);

  // Handle scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // Smoothly animate out
    const modal = document.getElementById('story-modal');
    if (modal) {
      modal.classList.add('animate-fade-out');
      setTimeout(onClose, 300);
    } else {
      onClose();
    }
  };

  const scrollToTop = () => {
    const content = document.getElementById('story-content');
    if (content) {
      content.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      id="story-modal"
      className="fixed inset-0 z-50 bg-black/90 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Mobile Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-10 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-10 hidden md:block"
        aria-label="Close story"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div 
        id="story-content"
        className="h-screen overflow-y-auto overscroll-contain pt-14 md:pt-0 pb-8 px-4 md:px-8"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Cover Image */}
          <div className="relative h-[40vh] md:h-96">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-indigo-600">
                  {t(`stories.categories.${story.category}`)}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{story.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{story.author}</span>
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold">{story.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <img
                src={story.authorAvatar}
                alt={story.author}
                className="w-12 h-12 rounded-full"
                loading="eager"
              />
              <div>
                <h4 className="font-medium text-gray-900">{story.author}</h4>
                <p className="text-sm text-gray-500">{story.authorBio}</p>
              </div>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none">
              {story.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={index} className="mb-6 text-gray-700 text-base md:text-lg">
                        {block.content}
                      </p>
                    );
                  case 'image':
                    return (
                      <figure key={index} className="my-8">
                        <img
                          src={block.url}
                          alt={block.caption}
                          className="w-full rounded-lg"
                          loading="lazy"
                        />
                        {block.caption && (
                          <figcaption className="mt-2 text-center text-sm text-gray-500">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  case 'quote':
                    return (
                      <blockquote key={index} className="my-8 pl-4 md:pl-6 border-l-4 border-indigo-500 italic text-gray-700">
                        {block.content}
                        {block.author && (
                          <footer className="mt-2 text-sm text-gray-500">
                            — {block.author}
                          </footer>
                        )}
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-3">
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors active:scale-95"
                  aria-label="Like story"
                >
                  <Heart className="w-5 h-5" />
                  <span>{story.likes}</span>
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors active:scale-95"
                  aria-label="Share story"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">{t('stories.share')}</span>
                </button>
              </div>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                ← Back to stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}