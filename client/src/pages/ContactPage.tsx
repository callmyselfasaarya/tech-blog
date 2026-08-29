import React, { useState } from 'react';
import { BlurFade } from '../components/ui/BlurFade';
import { Mail, MessageSquare, Send, MapPin, ShieldCheck, Github, Twitter } from 'lucide-react';
import { TechniccalWordmarkLogo } from '../components/ui/TechniccalLogo';

export const ContactPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Editorial — Techniccal';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
      {/* Header Banner */}
      <section className="mb-12 text-center max-w-2xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono font-medium text-[#4C586F] dark:text-[#A0A9B8]">
            <Mail className="w-4 h-4 text-[#3B719F]" />
            <span>/contact</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
            Get in Touch with Techniccal
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
            Have questions regarding architecture benchmarks, sponsorship inquiries, or technical feedback? Send us a direct message.
          </p>
        </BlurFade>
      </section>

      {/* Main Grid: Form + Info Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form Column */}
        <BlurFade delay={0.25} yOffset={20} className="md:col-span-7">
          <div className="bg-white dark:bg-[#222225] p-6 sm:p-8 rounded-3xl border border-[#E1E1E1] dark:border-[#2C2C30] shadow-sm space-y-5">
            <h2 className="font-display font-semibold text-xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Send a Dispatch Message
            </h2>

            {submitted ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-2xl font-medium">
                Message received! We will reply within 24 business hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] font-semibold">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Alex Rivera"
                    className="w-full px-4 py-2.5 text-xs font-mono rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] font-semibold">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="alex@organization.com"
                    className="w-full px-4 py-2.5 text-xs font-mono rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] font-semibold">
                    INQUIRY CATEGORY
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-mono rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                  >
                    <option value="Editorial">Editorial (Article proposals & pitches)</option>
                    <option value="Partnerships">Partnerships (Technical collaborations)</option>
                    <option value="Sponsorship">Sponsorship (Newsletter & journal placement)</option>
                    <option value="General">General (Questions & feedback)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] font-semibold">
                    MESSAGE
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Provide detailed technical background or proposal details..."
                    className="w-full px-4 py-2.5 text-xs font-mono rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-mono font-bold tracking-wider rounded bg-[#1C1C1E] dark:bg-[#F6F5F0] text-[#F6F5F0] dark:text-[#1C1C1E] hover:opacity-90 transition-opacity cursor-pointer uppercase shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> SEND INQUIRY
                </button>
              </form>
            )}
          </div>
        </BlurFade>

        {/* Direct Contact Info & Socials */}
        <BlurFade delay={0.35} yOffset={20} className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#E8E7E2]/60 dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] space-y-4">
            <h3 className="font-display font-semibold text-base text-[#1C1C1E] dark:text-[#F6F5F0]">
              Direct Editorial Channels
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#3B719F] shrink-0" />
                <span className="text-[#4C586F] dark:text-[#A0A9B8]">editor@techniccal.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#3B719F] shrink-0" />
                <span className="text-[#4C586F] dark:text-[#A0A9B8]">London / San Francisco / Remote</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                <span className="text-[#4C586F] dark:text-[#A0A9B8]">Encrypted PGP Key Available</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] space-y-4">
            <h3 className="font-display font-semibold text-base text-[#1C1C1E] dark:text-[#F6F5F0]">
              Social & Community
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/callmyselfasaarya/tech-blog"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#F6F5F0] dark:bg-[#141416] text-xs font-medium text-[#1C1C1E] dark:text-[#F6F5F0] hover:bg-[#E1E1E1] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </div>
                <span className="text-[10px] font-mono text-[#7E8798]">@callmyselfasaarya</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#F6F5F0] dark:bg-[#141416] text-xs font-medium text-[#1C1C1E] dark:text-[#F6F5F0] hover:bg-[#E1E1E1] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  <span>X / Twitter</span>
                </div>
                <span className="text-[10px] font-mono text-[#7E8798]">@techniccal</span>
              </a>
            </div>
          </div>

          <div className="pt-2 text-center">
            <TechniccalWordmarkLogo size="md" />
          </div>
        </BlurFade>
      </div>
    </div>
  );
};
