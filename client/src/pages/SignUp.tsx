import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechniccalStackedLogo, TechniccalWordmarkLogo } from '../components/ui/TechniccalLogo';
import { BlurFade } from '../components/ui/BlurFade';

export const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <BlurFade delay={0.1} yOffset={20}>
        <div className="bg-[#E8E7E2]/60 dark:bg-[#222225] p-6 sm:p-8 rounded-3xl border border-[#E1E1E1] dark:border-[#2C2C30] shadow-sm">
          {/* Top Logo Form 2: Stacked Monogram + Wordmark Logo */}
          <div className="text-center mb-6 flex flex-col items-center">
            <div className="mb-4">
              <TechniccalStackedLogo size="sm" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Join Techniccal Insider
            </h1>
            <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] mt-1">
              Receive weekly technical dispatches, system design breakdowns, and engineering research.
            </p>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={() => alert('Google auth integration ready.')}
            className="w-full py-2.5 px-4 mb-5 bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] font-medium text-xs rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          {submitted ? (
            <div className="p-4 bg-[#3B719F]/10 border border-[#3B719F]/30 text-[#3B719F] dark:text-blue-400 text-xs rounded-xl text-center font-medium">
              Welcome to Techniccal Insider! You will receive our next engineering dispatch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#4C586F] dark:text-[#A0A9B8] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Ada Lovelace"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#4C586F] dark:text-[#A0A9B8] mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="ada@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#4C586F] dark:text-[#A0A9B8] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E8798] hover:text-[#1C1C1E]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] hover:opacity-90 transition-opacity cursor-pointer mt-2"
              >
                Join Insider Membership
              </button>

              <div className="pt-2 text-center text-xs text-[#4C586F] dark:text-[#A0A9B8]">
                Already an Insider?{' '}
                <Link to="/admin/login" className="font-medium text-[#1C1C1E] dark:text-[#F6F5F0] hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </BlurFade>

      <BlurFade delay={0.25} yOffset={16}>
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7E8798]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Encrypted Authentication</span>
          </div>

          {/* Bottom Logo Form 1: Wordmark Logo */}
          <TechniccalWordmarkLogo size="lg" />
        </div>
      </BlurFade>
    </div>
  );
};
