import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Check, X, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TechniccalStackedLogo, TechniccalWordmarkLogo } from '../components/ui/TechniccalLogo';
import { BlurFade } from '../components/ui/BlurFade';
import { api, validatePasswordStrength } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/Button';

export const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const strength = validatePasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!strength.isValid) {
      setError('Password does not meet security strength criteria');
      return;
    }

    setLoading(true);
    try {
      await api.register(formData.name, formData.email, formData.password);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/account');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <BlurFade delay={0.1} yOffset={20}>
        <Card className="p-6 sm:p-8">
          <CardContent className="p-0">
            {/* Top Logo */}
            <div className="text-center mb-6 flex flex-col items-center">
              <div className="mb-4">
                <TechniccalStackedLogo size="sm" />
              </div>
              <h1 className="font-display font-bold text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
                Join Techniccal Insider
              </h1>
              <p className="text-xs text-[#7E8798] dark:text-[#A0A9B8] mt-1">
                Receive weekly technical dispatches, system design breakdowns, and engineering research.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl text-center font-medium font-mono space-y-1">
                <p className="font-bold">Welcome to Techniccal Insider!</p>
                <p className="text-[11px]">Redirecting to Member Portal...</p>
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
                  <label className="block text-xs font-sans font-medium text-[#4C586F] dark:text-[#A0A9B8] mb-1.5">
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
                  <label className="block text-xs font-sans font-medium text-[#4C586F] dark:text-[#A0A9B8] mb-1.5">
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
                  <label className="block text-xs font-sans font-medium text-[#4C586F] dark:text-[#A0A9B8] mb-1.5">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E8798] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Password Strength Meter Checklist */}
                {formData.password && (
                  <div className="p-3 bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-xl space-y-1 text-[11px] font-mono">
                    <p className="font-bold text-[#7E8798] uppercase text-[10px] mb-1">Password Requirements:</p>
                    <div className={`flex items-center gap-1.5 ${formData.password.length >= 8 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {formData.password.length >= 8 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>At least 8 characters long</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(formData.password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {/[A-Z]/.test(formData.password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>At least 1 uppercase letter (A-Z)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${/[a-z]/.test(formData.password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {/[a-z]/.test(formData.password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>At least 1 lowercase letter (a-z)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${/[0-9]/.test(formData.password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {/[0-9]/.test(formData.password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>At least 1 number (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>At least 1 special character (!@#$%^&*)</span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full mt-2"
                >
                  {loading ? 'Creating Account...' : 'Join Insider Membership'}
                </Button>

                <div className="pt-2 text-center text-xs text-[#7E8798] dark:text-[#A0A9B8]">
                  Already an Insider?{' '}
                  <Link to="/admin/login" className="font-medium text-[#1C1C1E] dark:text-[#F6F5F0] hover:underline">
                    Sign In
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </BlurFade>

      <BlurFade delay={0.25} yOffset={16}>
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7E8798]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Encrypted Authentication</span>
          </div>

          <TechniccalWordmarkLogo size="lg" />
        </div>
      </BlurFade>
    </div>
  );
};
