import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, MailCheck } from 'lucide-react';
import { api } from '../services/api';
import { TechniccalStackedLogo } from '../components/ui/TechniccalLogo';

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setSuccess(false);
      setMessage('Missing email verification token.');
      return;
    }

    const verify = async () => {
      try {
        const res = await api.verifyEmail(token);
        setSuccess(true);
        setMessage(res.message || 'Email address verified successfully!');
      } catch (err: any) {
        setSuccess(false);
        setMessage(err.message || 'Verification link expired or invalid.');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#F6F5F0] dark:bg-[#141416] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-3xl p-8 shadow-2xl text-center"
      >
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="mb-4">
            <TechniccalStackedLogo size="md" />
          </Link>
          <div className="w-12 h-12 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-2">
            <MailCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-serif text-[#1C1C1E] dark:text-[#F6F5F0]">
            Email Verification
          </h2>
          <p className="text-xs font-mono text-[#7E8798] uppercase mt-1 tracking-wider">
            Techniccal Publication Reader Security
          </p>
        </div>

        {loading ? (
          <div className="py-8 space-y-3 font-mono text-xs text-[#7E8798]">
            <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Validating SHA-256 token signature...</p>
          </div>
        ) : success ? (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-mono text-left">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{message}</span>
            </div>

            <p className="text-xs text-[#7E8798] font-mono leading-relaxed">
              Your account is fully verified. You can now access exclusive member articles, saved reading lists, and insider letters.
            </p>

            <Link
              to="/account"
              className="w-full py-3 px-4 bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] text-xs font-mono uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Go to Member Portal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-mono text-left">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{message}</span>
            </div>

            <p className="text-xs text-[#7E8798] font-mono leading-relaxed">
              Verification links expire after 24 hours for security. Please sign in to request a fresh verification link.
            </p>

            <div className="flex gap-3">
              <Link
                to="/sign-up"
                className="flex-1 py-2.5 px-3 bg-[#F6F5F0] dark:bg-[#141416] text-[#1C1C1E] dark:text-[#F6F5F0] text-xs font-mono font-semibold rounded-xl border border-[#E1E1E1] dark:border-[#2C2C30]"
              >
                Sign Up
              </Link>
              <Link
                to="/admin/login"
                className="flex-1 py-2.5 px-3 bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] text-xs font-mono font-semibold rounded-xl"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
