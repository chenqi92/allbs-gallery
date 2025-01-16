import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Creator } from '../../types/creator';
import { creators } from '../../data/creators';
import { CreatorCard } from './CreatorCard';
import { CreatorProfile } from './CreatorProfile';
import { Pagination } from '../Pagination';
import { useTranslation } from 'react-i18next';

type CreatorType = 'all' | 'photographer' | 'illustrator' | 'artist';
const ITEMS_PER_PAGE = 8;

export function CreatorsSection() {
  const { t } = useTranslation();
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<CreatorType>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || creator.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredCreators.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCreators = filteredCreators.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of section
    document.getElementById('creators')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType]);

  return (
    <section id="creators" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('creators.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('creators.description')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('creators.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'photographer', 'illustrator', 'artist'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t(`creators.types.${type}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onClick={setSelectedCreator}
            />
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

        {/* Creator Profile Modal */}
        {selectedCreator && (
          <CreatorProfile
            creator={selectedCreator}
            onClose={() => setSelectedCreator(null)}
          />
        )}
      </div>
    </section>
  );
}