import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@aether.blog');
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
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121212] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-editorial text-3xl tracking-tight text-[#1A1A1A] dark:text-[#ECECEC] block mb-1">
            ÆTHER
          </Link>
          <p className="text-xs font-mono tracking-widest text-[#9E9A8E] uppercase">
            PUBLICATION CMS LOGIN
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-sm flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-sans">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#6B685F] dark:text-[#A0A0A0] uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9E9A8E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333333] rounded-sm pl-9 pr-3 py-2 text-sm text-[#1A1A1A] dark:text-[#ECECEC] focus:outline-none focus:border-[#1A1A1A] dark:focus:border-[#EEEEEE]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#6B685F] dark:text-[#A0A0A0] uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9E9A8E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333333] rounded-sm pl-9 pr-3 py-2 text-sm text-[#1A1A1A] dark:text-[#ECECEC] focus:outline-none focus:border-[#1A1A1A] dark:focus:border-[#EEEEEE]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 bg-[#1A1A1A] hover:bg-[#333] dark:bg-[#EEEEEE] dark:hover:bg-[#FFF] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Log In to CMS'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E8E5DC] dark:border-[#262626] text-center text-[11px] font-mono text-[#9E9A8E]">
          Default Credentials: <span className="text-[#1A1A1A] dark:text-[#ECECEC]">admin@aether.blog</span> / <span className="text-[#1A1A1A] dark:text-[#ECECEC]">admin123</span>
        </div>
      </motion.div>
    </div>
  );
};
