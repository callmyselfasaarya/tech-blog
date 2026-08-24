import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, KeyRound, Check, X } from 'lucide-react';
import { api, validatePasswordStrength } from '../services/api';
import { TechniccalStackedLogo } from '../components/ui/TechniccalLogo';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'demo-token';
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = validatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!strength.isValid) {
      setError('Password does not meet all security requirements');
      return;
    }

    setLoading(true);
    try {
      const res = await api.resetPassword(token, password);
      setSuccessMessage(res.message || 'Your password has been reset successfully.');
      setTimeout(() => {
        navigate('/admin/login');
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] dark:bg-[#141416] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-3xl p-8 shadow-xl"
      >
        <div className="text-center mb-6 flex flex-col items-center">
          <Link to="/" className="mb-3">
            <TechniccalStackedLogo size="md" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
            <KeyRound className="w-4 h-4" /> Reset Account Password
          </div>
        </div>

        {successMessage ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-serif font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">
              Password Reset Complete
            </h3>
            <p className="text-xs font-mono text-[#7E8798] mt-2 mb-4">{successMessage}</p>
            <p className="text-[11px] font-mono text-[#7E8798]">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#7E8798] mb-1">
                NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter new strong password..."
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-xl text-xs text-[#1C1C1E] dark:text-[#F6F5F0] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                />
                <Lock className="w-4 h-4 text-[#7E8798] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Live Password Strength Checklist */}
            {password && (
              <div className="p-3 bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-xl space-y-1.5 text-[11px] font-mono">
                <p className="font-bold text-[#7E8798] uppercase text-[10px] mb-1">Password Requirements:</p>
                <div className={`flex items-center gap-1.5 ${password.length >= 8 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                  {password.length >= 8 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 8 characters long</span>
                </div>
                <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                  {/[A-Z]/.test(password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 1 uppercase letter (A-Z)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${/[a-z]/.test(password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                  {/[a-z]/.test(password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 1 lowercase letter (a-z)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${/[0-9]/.test(password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                  {/[0-9]/.test(password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 1 number (0-9)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                  {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 1 special character (!@#$%^&*)</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#7E8798] mb-1">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter new password..."
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-xl text-xs text-[#1C1C1E] dark:text-[#F6F5F0] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                />
                <Lock className="w-4 h-4 text-[#7E8798] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] text-xs font-mono uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {loading ? 'RESETTING PASSWORD...' : 'UPDATE PASSWORD'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
