import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Tag as TagIcon } from 'lucide-react';
import { Category } from '../types';
import { api } from '../services/api';

export const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await api.getCategories();
    setCategories(data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    try {
      await api.createCategory(name.trim(), description.trim());
      setName('');
      setDescription('');
      loadCategories();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      await api.deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight">Categories & Topics</h1>
        <p className="text-xs font-mono text-[#9E9A8E] mt-1">MANAGE EDITORIAL TAXONOMIES & CATEGORIES</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Create Category Form */}
        <form onSubmit={handleCreate} className="md:col-span-5 p-6 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm space-y-4">
          <h3 className="text-xs font-mono tracking-widest text-[#9E9A8E] uppercase">ADD NEW CATEGORY</h3>

          <div>
            <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PHILOSOPHY"
              required
              className="w-full text-xs font-mono bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Short description of this topic..."
              className="w-full text-xs bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2.5"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase font-semibold rounded-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </form>

        {/* Existing Categories List */}
        <div className="md:col-span-7 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm p-6">
          <h3 className="text-xs font-mono tracking-widest text-[#9E9A8E] uppercase mb-4 pb-3 border-b border-[#E8E5DC] dark:border-[#262626]">
            EXISTING CATEGORIES ({categories.length})
          </h3>

          <div className="divide-y divide-[#F3F1EA] dark:divide-[#222222]">
            {categories.map((cat) => (
              <div key={cat.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1A1A1A] dark:text-[#ECECEC] uppercase">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#9E9A8E]">({cat.count} posts)</span>
                  </div>
                  {cat.description && (
                    <p className="text-xs text-[#6B685F] dark:text-[#A0A0A0] mt-0.5">{cat.description}</p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
