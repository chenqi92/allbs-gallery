import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Mail, Lock, User, Eye, EyeOff, AlertCircle, Home} from 'lucide-react';

interface PasswordStrength {
    score: number;
    feedback: string;
}

function validatePassword(password: string): PasswordStrength {
    // Simple password strength check
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const score = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial]
        .filter(Boolean).length;

    let feedback = '';
    if (score <= 2) {
        feedback = 'Password is too weak';
    } else if (score === 3) {
        feedback = 'Password is moderate';
    } else if (score === 4) {
        feedback = 'Password is strong';
    } else {
        feedback = 'Password is very strong';
    }

    return {score, feedback};
}

export function RegisterPage() {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
        score: 0,
        feedback: ''
    });

    const handlePasswordChange = (password: string) => {
        setFormData(prev => ({...prev, password}));
        setPasswordStrength(validatePassword(password));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError(t('auth.errors.passwordMismatch'));
            return;
        }

        setError(null);
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Register:', formData);
        } catch (err) {
            setError(t('auth.errors.registrationFailed'));
        } finally {
            setLoading(false);
        }
    };

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
                        {t('auth.createAccount')}
                    </h2>
                    <p className="text-gray-600">
                        {t('auth.registerDescription')}
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
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.username')}
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData(prev => ({...prev, username: e.target.value}))}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                                minLength={3}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.email')}
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.password')}
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5"/>
                                ) : (
                                    <Eye className="w-5 h-5"/>
                                )}
                            </button>
                        </div>
                        {formData.password && (
                            <div className="mt-2">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${
                                            passwordStrength.score <= 2 ? 'bg-red-500' :
                                                passwordStrength.score === 3 ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                        }`}
                                        style={{width: `${(passwordStrength.score / 5) * 100}%`}}
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    {passwordStrength.feedback}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.confirmPassword')}
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                id="confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                                {t('auth.errors.passwordMismatch')}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="agree-terms"
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={(e) => setFormData(prev => ({...prev, agreeToTerms: e.target.checked}))}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            required
                        />
                        <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                            {t('auth.agreeToTerms')}{' '}
                            <a href="#terms" className="text-indigo-600 hover:text-indigo-500">
                                {t('auth.terms')}
                            </a>
                            {' '}{t('auth.and')}{' '}
                            <a href="#privacy" className="text-indigo-600 hover:text-indigo-500">
                                {t('auth.privacy')}
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !formData.agreeToTerms || formData.password !== formData.confirmPassword}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                    >
                        {loading ? t('auth.signingUp') : t('auth.signUp')}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        {t('auth.alreadyHaveAccount')}{' '}
                        <a
                            href="#login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            {t('auth.signIn')}
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}