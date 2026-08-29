import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { TechniccalLogo } from '../components/ui/TechniccalLogo';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F6F5F0] dark:bg-[#1C1C1E] font-sans">
      {/* Left Column Branding */}
      <div className="hidden lg:flex lg:col-span-5 bg-[#1C1C1E] text-[#F6F5F0] p-12 flex-col justify-between border-r border-[#2C2C30] engineering-grid relative">
        <div className="space-y-6">
          <Link to="/">
            <TechniccalLogo variant="light" size="lg" />
          </Link>
          <div className="pt-8 space-y-4">
            <span className="text-xs font-mono text-[#3B719F] uppercase tracking-widest font-bold block">SECURITY // ACCOUNT RECOVERY</span>
            <h2 className="font-display font-extrabold text-4xl leading-tight">
              Reset your password safely.
            </h2>
            <p className="text-sm font-serif text-[#A0A9B8] leading-relaxed">
              Enter your registered email address to receive secure account verification instructions.
            </p>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#6B7485]">
          TECHNICALL / RECOVERY SERVICE v2.6
        </div>
      </div>

      {/* Right Column Form */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12">
        <div className="flex items-center justify-between">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]">
            <ArrowLeft className="w-4 h-4" /> BACK TO LOGIN
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-6 py-12">
          <div className="space-y-2">
            <h1 className="font-display font-bold text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Forgot Password
            </h1>
            <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8]">
              We will send a password reset link to your email.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4" /> RECOVERY LINK SENT
              </div>
              <p className="text-[11px] font-sans">
                Check <strong>{email}</strong> for instructions to set your new password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] font-semibold">
                  REGISTERED EMAIL
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-mono font-bold tracking-wider rounded bg-[#1C1C1E] dark:bg-[#F6F5F0] text-[#F6F5F0] dark:text-[#1C1C1E] hover:opacity-90 transition-opacity cursor-pointer uppercase shadow-xs disabled:opacity-50"
              >
                {loading ? 'SENDING LINK...' : 'SEND RECOVERY LINK'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center text-[10px] font-mono text-[#4C586F] dark:text-[#A0A9B8]">
          © 2026 TECHNICALL MEDIA INC.
        </div>
      </div>
    </div>
  );
};
