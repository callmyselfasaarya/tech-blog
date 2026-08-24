import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { TechniccalStackedLogo } from '../components/ui/TechniccalLogo';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('editor@techniccal.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
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
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="mb-3">
            <TechniccalStackedLogo size="md" />
          </Link>
          <p className="text-xs font-mono tracking-widest text-[#7E8798] uppercase">
            PUBLICATION CMS LOGIN
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#7E8798] mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-xl text-xs text-[#1C1C1E] dark:text-[#F6F5F0] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
              />
              <Mail className="w-4 h-4 text-[#7E8798] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#7E8798] mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
            {loading ? 'LOGGING IN...' : 'LOG IN TO CMS'}
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-4 text-center text-[11px] text-[#7E8798] font-mono">
            Default Credentials: editor@techniccal.com / admin123
          </div>
        </form>
      </motion.div>
    </div>
  );
};
