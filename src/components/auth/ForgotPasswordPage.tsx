import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Mail, AlertCircle, ArrowLeft, Home, Check} from 'lucide-react';

export function ForgotPasswordPage() {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess(true);
        } catch (err) {
            setError(t('auth.errors.resetFailed'));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-600"/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t('auth.resetEmailSent')}
                    </h2>
                    <p className="text-gray-600">
                        {t('auth.resetEmailInstructions')}
                    </p>
                    <a
                        href="#login"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
                    >
                        <ArrowLeft className="w-4 h-4"/>
                        {t('auth.backToLogin')}
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <a
                href="#"
                className="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <Home className="w-5 h-5"/>
                <span>{t('auth.backToHome')}</span>
            </a>

            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('auth.forgotPassword')}
                    </h2>
                    <p className="text-gray-600">
                        {t('auth.forgotPasswordDescription')}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5"/>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.email')}
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                    >
                        {loading ? t('auth.sendingResetEmail') : t('auth.sendResetEmail')}
                    </button>

                    <div className="text-center">
                        <a
                            href="#login"
                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
                        >
                            <ArrowLeft className="w-4 h-4"/>
                            {t('auth.backToLogin')}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}