import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CubeCarousel } from './components/CubeCarousel';
import { Gallery } from './components/Gallery';
import { CreatorsSection } from './components/creators/CreatorsSection';
import { StoriesSection } from './components/stories/StoriesSection';
import { ContactSection } from './components/support/ContactSection';
import { HelpSection } from './components/support/HelpSection';
import { EventsButton } from './components/events/EventsButton';
import { EventsPage } from './components/events/EventsPage';

export default function App() {
  const { t } = useTranslation();
  const [showEvents, setShowEvents] = useState(false);

  // Handle URL hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      setShowEvents(window.location.hash === '#events');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showEvents) {
    return <EventsPage onClose={() => {
      window.location.hash = '';
      setShowEvents(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        <section id="home" className="relative">
          <CubeCarousel />
        </section>

        <StoriesSection />

        <CreatorsSection />

        <section id="gallery" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('nav.gallery')}
          </h2>
          <Gallery />
        </section>


        <section id="about" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                {t('about.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-600">{t('about.mission')}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-600">{t('about.vision')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HelpSection />
        
        <ContactSection />
      </main>

      <EventsButton />
      <Footer />
    </div>
  );
}