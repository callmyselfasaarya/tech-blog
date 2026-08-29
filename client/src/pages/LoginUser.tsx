import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, Shield, CheckCircle2 } from 'lucide-react';
import { TechniccalLogo, TechniccalMonogram } from '../components/ui/TechniccalLogo';
import { useAuth } from '../context/AuthContext';

export const LoginUser: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/account');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F6F5F0] dark:bg-[#1C1C1E] font-sans">
      {/* Left Column: Techniccal Branding & Editorial Manifesto (Desktop) */}
      <div className="hidden lg:flex lg:col-span-5 bg-[#1C1C1E] text-[#F6F5F0] p-12 flex-col justify-between border-r border-[#2C2C30] engineering-grid relative">
        <div className="space-y-6">
          <Link to="/">
            <TechniccalLogo variant="light" size="lg" />
          </Link>
          <div className="pt-8 space-y-4">
            <span className="text-xs font-mono text-[#3B719F] uppercase tracking-widest font-bold block">MEMBER ACCESS // AUTHENTICATION</span>
            <h2 className="font-display font-extrabold text-4xl leading-tight">
              Engineering insights worth keeping.
            </h2>
            <p className="text-sm font-serif text-[#A0A9B8] leading-relaxed">
              Access insider dispatches, architecture blueprints, saved reading lists, and personalized newsletter preferences.
            </p>
          </div>
        </div>

        <div className="space-y-4 border-t border-[#2C2C30] pt-6 font-mono text-xs text-[#A0A9B8]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B719F]" />
            <span>High-signal engineering dispatches</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B719F]" />
            <span>Private code repository blueprints</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B719F]" />
            <span>Zero spam, zero hype</span>
          </div>
          <div className="pt-4 text-[10px] text-[#6B7485]">
            TECHNICALL / AUTHENTICATION v2.6
          </div>
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]">
            <ArrowLeft className="w-4 h-4" /> RETURN TO INDEX
          </Link>
          <Link to="/register" className="text-xs font-mono text-[#3B719F] hover:underline font-bold">
            CREATE ACCOUNT →
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-6 py-12">
          <div className="space-y-2">
            <h1 className="font-display font-bold text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Sign in to Techniccal
            </h1>
            <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8]">
              Enter your credentials to access your reader account.
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs font-mono rounded bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] font-semibold">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4C586F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@organization.com"
                  className="w-full pl-9 pr-4 py-2.5 text-xs font-mono rounded bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] font-semibold">
                  PASSWORD
                </label>
                <Link to="/forgot-password" className="text-[11px] font-mono text-[#3B719F] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#4C586F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 text-xs font-mono rounded bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-xs font-mono font-bold tracking-wider rounded bg-[#1C1C1E] dark:bg-[#F6F5F0] text-[#F6F5F0] dark:text-[#1C1C1E] hover:opacity-90 transition-opacity cursor-pointer uppercase shadow-xs disabled:opacity-50"
            >
              {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
            </button>
          </form>

          <div className="pt-4 border-t border-[#E1E1E1] dark:border-[#2C2C30] text-center text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">
            Need help? Contact <a href="mailto:support@techniccal.com" className="text-[#3B719F] underline">support@techniccal.com</a>
          </div>
        </div>

        <div className="text-center text-[10px] font-mono text-[#4C586F] dark:text-[#A0A9B8]">
          © 2026 TECHNICALL MEDIA INC. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
};
