import React from 'react';
import {useTranslation} from 'react-i18next';
import {User} from 'lucide-react';

export function AuthButton() {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
                <User className="w-5 h-5"/>
                <span>{t('auth.signIn')}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                    <a
                        href="#login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        {t('auth.signIn')}
                    </a>
                    <a
                        href="#register"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        {t('auth.signUp')}
                    </a>
                </div>
            )}
        </div>
    );
}