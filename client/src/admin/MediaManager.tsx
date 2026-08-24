import React, { useEffect, useState } from 'react';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, Search } from 'lucide-react';
import { MediaItem } from '../types';
import { api } from '../services/api';

export const MediaManager: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const data = await api.getMedia();
    setMediaItems(data);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      await api.uploadMedia(files[0]);
      loadMedia();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete image asset from media library?')) {
      await api.deleteMedia(id);
      loadMedia();
    }
  };

  const filtered = mediaItems.filter(m => m.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">Media Library</h1>
          <p className="text-xs font-mono text-[#9E9A8E] mt-1">UPLOAD AND MANAGE PUBLICATION IMAGE ASSETS</p>
        </div>

        <label className="px-4 py-2 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-2 hover:opacity-90 cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-[#9E9A8E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filenames..."
            className="w-full bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm pl-9 pr-3 py-1.5 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm overflow-hidden group"
          >
            <div className="h-44 bg-[#F3F1EA] dark:bg-[#121212] overflow-hidden relative">
              <img
                src={item.url}
                alt={item.filename}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium truncate max-w-[180px]">{item.filename}</span>
                <span className="text-[10px] font-mono text-[#9E9A8E]">{(item.size / 1024).toFixed(0)} KB</span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#9E9A8E] pt-2 border-t border-[#F3F1EA] dark:border-[#222]">
                <span>{item.uploadedAt}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item.id, item.url)}
                    className="p-1 hover:text-[#1A1A1A] dark:hover:text-white flex items-center gap-1 cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
