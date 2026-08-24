import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const [siteTitle, setSiteTitle] = useState('ÆTHER');
  const [tagline, setTagline] = useState('An independent publication & knowledge archive exploring technology, design, and systems thinking.');
  const [authorName, setAuthorName] = useState('Julian Vance');
  const [authorBio, setAuthorBio] = useState('Writer and software architect exploring the intersection of digital craftsmanship, philosophy, and modern systems.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight">Publication Settings</h1>
        <p className="text-xs font-mono text-[#9E9A8E] mt-1">GENERAL SITE IDENTITY & EDITORIAL PREFERENCES</p>
      </div>

      {saved && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-sm text-xs text-green-600 font-mono flex items-center gap-2">
          <Check className="w-4 h-4" /> Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm p-6 space-y-5">
        <h3 className="text-xs font-mono tracking-widest text-[#9E9A8E] uppercase pb-2 border-b border-[#E8E5DC] dark:border-[#262626]">
          SITE IDENTITY
        </h3>

        <div>
          <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Publication Name</label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full text-xs font-mono bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2.5"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Tagline & Description</label>
          <textarea
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            rows={2}
            className="w-full text-xs bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2.5"
          />
        </div>

        <h3 className="text-xs font-mono tracking-widest text-[#9E9A8E] uppercase pt-4 pb-2 border-b border-[#E8E5DC] dark:border-[#262626]">
          AUTHOR PROFILE
        </h3>

        <div>
          <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Author Name</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full text-xs font-mono bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2.5"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Author Bio</label>
          <textarea
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
            rows={3}
            className="w-full text-xs bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2.5"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-2 hover:opacity-90 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </form>
    </div>
  );
};
