import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Camera, HelpCircle, Info, Mail } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthButton } from './auth/AuthButton';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const { t } = useTranslation();

  const navItems = [
    { key: 'home', label: t('nav.home'), icon: Camera },
    { key: 'stories', label: t('nav.stories') },
    { key: 'creators', label: t('nav.creators') },
    { key: 'gallery', label: t('nav.gallery') },
    { key: 'about', label: t('nav.about'), icon: Info },
    { key: 'help', label: t('nav.help'), icon: HelpCircle },
    { key: 'contact', label: t('nav.contact'), icon: Mail }
  ];

  // Update page title based on current section
  useEffect(() => {
    const sectionTitle = t(`pageTitle.${currentSection}`);
    document.title = `${sectionTitle} | PhotoGallery`;
  }, [currentSection, t]);

  // Detect current section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Camera className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">PhotoGallery</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors ${
                  currentSection === item.key ? 'text-indigo-600' : ''
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </a>
            ))}
            <LanguageSwitcher />
            <AuthButton />
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md ${
                  currentSection === item.key ? 'text-indigo-600 bg-gray-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </a>
            ))}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}