import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {CubeCarousel} from './components/CubeCarousel';
import {Gallery} from './components/Gallery';
import {CreatorsSection} from './components/creators/CreatorsSection';
import {StoriesSection} from './components/stories/StoriesSection';
import {ContactSection} from './components/support/ContactSection';
import {HelpSection} from './components/support/HelpSection';
import {EventsButton} from './components/events/EventsButton';
import {EventsPage} from './components/events/EventsPage';
import {LoginPage} from './components/auth/LoginPage';
import {RegisterPage} from './components/auth/RegisterPage';
import {ForgotPasswordPage} from './components/auth/ForgotPasswordPage';

export default function App() {
    const {t, i18n} = useTranslation();
    const [showEvents, setShowEvents] = useState(false);
    const [currentPage, setCurrentPage] = useState<'main' | 'login' | 'register' | 'forgot-password'>('main');

    // Handle URL hash changes
    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#events') {
                setShowEvents(true);
                setCurrentPage('main');
            } else if (hash === '#login') {
                setCurrentPage('login');
                setShowEvents(false);
            } else if (hash === '#register') {
                setCurrentPage('register');
                setShowEvents(false);
            } else if (hash === '#forgot-password') {
                setCurrentPage('forgot-password');
                setShowEvents(false);
            } else {
                setCurrentPage('main');
                setShowEvents(false);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Check initial hash

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // 监听语言变化并更新文档标题和HTML lang属性
    useEffect(() => {
        document.documentElement.lang = i18n.language;
        // 可以根据需要更新其他与语言相关的全局设置
    }, [i18n.language]);

    if (currentPage === 'login') {
        return <LoginPage/>;
    }

    if (currentPage === 'register') {
        return <RegisterPage/>;
    }

    if (currentPage === 'forgot-password') {
        return <ForgotPasswordPage/>;
    }

    if (showEvents) {
        return <EventsPage onClose={() => {
            window.location.hash = '';
            setShowEvents(false);
        }}/>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>

            <main className="pt-16">
                <section id="home" className="relative">
                    <CubeCarousel/>
                </section>

                <StoriesSection/>

                <CreatorsSection/>

                <section id="gallery" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        {t('nav.gallery')}
                    </h2>
                    <Gallery/>
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
                                        {t('about.values.title')}
                                    </h3>
                                    <p className="text-gray-600">{t('about.mission')}</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t('about.vision')}
                                    </h3>
                                    <p className="text-gray-600">{t('about.vision')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <HelpSection/>

                <ContactSection/>
            </main>

            <EventsButton/>
            <Footer/>
        </div>
    );
}