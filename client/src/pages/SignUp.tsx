import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto px-4 py-12"
    >
      <div className="bg-[#E2DDD8]/50 dark:bg-[#201E1D] p-6 sm:p-8 rounded-3xl border border-[#EDEAE7] dark:border-[#2C2927] shadow-sm">
        <h1 className="font-display font-bold text-2xl text-center text-[#1A1918] dark:text-[#F4F2F0] mb-6">
          Sign Up
        </h1>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => alert('Google auth integration ready.')}
          className="w-full py-2.5 px-4 mb-5 bg-[#1A1918] dark:bg-white text-white dark:text-[#1A1918] font-medium text-xs rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
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
          Google
        </button>

        {submitted ? (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-xl text-center font-medium">
            Account created successfully! Welcome to Memoir.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-sans text-[#6E6862] dark:text-[#A8A29A] mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F4F2F0] dark:bg-[#161514] border border-[#EDEAE7] dark:border-[#2C2927] text-[#1A1918] dark:text-[#F4F2F0] placeholder-[#99938B] focus:outline-none focus:ring-1 focus:ring-[#1A1918]"
              />
            </div>

            <div>
              <label className="block text-xs font-sans text-[#6E6862] dark:text-[#A8A29A] mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F4F2F0] dark:bg-[#161514] border border-[#EDEAE7] dark:border-[#2C2927] text-[#1A1918] dark:text-[#F4F2F0] placeholder-[#99938B] focus:outline-none focus:ring-1 focus:ring-[#1A1918]"
              />
            </div>

            <div>
              <label className="block text-xs font-sans text-[#6E6862] dark:text-[#A8A29A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl bg-[#F4F2F0] dark:bg-[#161514] border border-[#EDEAE7] dark:border-[#2C2927] text-[#1A1918] dark:text-[#F4F2F0] placeholder-[#99938B] focus:outline-none focus:ring-1 focus:ring-[#1A1918]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#99938B] hover:text-[#1A1918]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-[#1A1918] dark:bg-white text-white dark:text-[#1A1918] hover:opacity-90 transition-opacity cursor-pointer mt-2"
            >
              Sign Up
            </button>

            <p className="text-[10px] text-[#99938B] dark:text-[#78736B] text-center leading-relaxed">
              Password: At least 8 characters, one uppercase letter, one lowercase letter, one digit, one special character
            </p>

            <div className="pt-2 text-center text-xs text-[#6E6862] dark:text-[#A8A29A]">
              Already a member?{' '}
              <Link to="/admin/login" className="font-medium text-[#1A1918] dark:text-[#F4F2F0] hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#99938B]">
          <Lock className="w-3.5 h-3.5" />
          <span>Powered by FrameAuth</span>
        </div>

        <h2 className="font-serif italic font-medium text-2xl text-[#1A1918] dark:text-[#F4F2F0]">
          Memoir
        </h2>
      </div>
    </motion.div>
  );
};
