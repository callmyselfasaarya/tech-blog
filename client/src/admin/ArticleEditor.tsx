import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit3, 
  Check, 
  Image as ImageIcon, 
  Pin, 
  Sparkles, 
  Globe 
} from 'lucide-react';
import { Article } from '../types';
import { api, slugify, calculateReadingTime } from '../services/api';

export const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('WRITING');
  const [tagsInput, setTagsInput] = useState('Engineering, Craft');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80');
  const [status, setStatus] = useState<'published' | 'draft'>('draft');
  const [pinned, setPinned] = useState(false);
  const [featured, setFeatured] = useState(false);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  useEffect(() => {
    if (id) {
      loadArticle(id);
    }
  }, [id]);

  const loadArticle = async (artId: string) => {
    const articles = await api.getAllArticlesAdmin();
    const found = articles.find(a => a.id === artId);
    if (found) {
      setTitle(found.title);
      setSlug(found.slug);
      setExcerpt(found.excerpt);
      setContent(found.content);
      setCategory(found.category);
      setTagsInput(found.tags.join(', '));
      setCoverImage(found.coverImage || '');
      setStatus(found.status);
      setPinned(Boolean(found.pinned));
      setFeatured(Boolean(found.featured));
      setSeoTitle(found.seo?.title || '');
      setSeoDescription(found.seo?.description || '');
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (targetStatus?: 'published' | 'draft') => {
    setSaving(true);
    const finalStatus = targetStatus || status;
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const readTime = calculateReadingTime(content);

    const articleData: Partial<Article> = {
      title,
      slug: slug || slugify(title),
      excerpt,
      content,
      category,
      tags,
      coverImage,
      status: finalStatus,
      pinned,
      featured,
      readingTime: readTime,
      seo: {
        title: seoTitle || `${title} — Æther`,
        description: seoDescription || excerpt,
        keywords: tags
      }
    };

    try {
      if (isEditing && id) {
        await api.updateArticle(id, articleData);
      } else {
        await api.createArticle(articleData);
      }
      setSavedMsg(finalStatus === 'published' ? 'Published successfully!' : 'Saved draft!');
      setTimeout(() => setSavedMsg(''), 2500);
      navigate('/admin/articles');
    } catch (e) {
      console.error('Error saving article:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E5DC] dark:border-[#262626]">
        <div className="flex items-center gap-3">
          <Link to="/admin/articles" className="p-1.5 text-[#6B685F] hover:text-[#1A1A1A] dark:hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-semibold">
              {isEditing ? 'Edit Essay' : 'Create New Essay'}
            </h1>
            <p className="text-xs font-mono text-[#9E9A8E]">
              {calculateReadingTime(content)} · {content.length} characters
            </p>
          </div>
        </div>

        {/* Tab Controls & Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex bg-[#FAF9F5] dark:bg-[#1A1A1A] p-0.5 border border-[#E8E5DC] dark:border-[#333] rounded-sm">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1 text-xs font-mono rounded-sm flex items-center gap-1 cursor-pointer ${
                activeTab === 'edit' ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-black font-semibold' : 'text-[#6B685F]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Write
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 text-xs font-mono rounded-sm flex items-center gap-1 cursor-pointer ${
                activeTab === 'preview' ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-black font-semibold' : 'text-[#6B685F]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          </div>

          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-3.5 py-1.5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#333] text-xs font-mono uppercase font-semibold rounded-sm hover:border-[#1A1A1A] transition-colors cursor-pointer"
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-4 py-1.5 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase font-semibold rounded-sm hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1"
          >
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      {savedMsg && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-sm text-xs text-green-600 font-mono flex items-center gap-2">
          <Check className="w-4 h-4" /> {savedMsg}
        </div>
      )}

      {/* Editor Body */}
      {activeTab === 'edit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <label className="block text-xs font-mono text-[#9E9A8E] uppercase mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Essay Title..."
                className="w-full font-serif text-3xl font-semibold bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-3.5 text-[#1A1A1A] dark:text-[#ECECEC] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#9E9A8E] uppercase mb-1">Excerpt / Summary</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Short editorial summary of this article..."
                className="w-full text-sm font-sans bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-3 text-[#1A1A1A] dark:text-[#ECECEC] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#9E9A8E] uppercase mb-1">Article Content (Markdown)</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                placeholder="Write your long-form article here using markdown formatting (## Headings, > Quotes, - Lists, code blocks)..."
                className="w-full font-mono text-sm leading-relaxed bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-4 text-[#1A1A1A] dark:text-[#ECECEC] focus:outline-none"
              />
            </div>
          </div>

          {/* Sidebar Metadata Settings */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-[#9E9A8E] uppercase">METADATA & SETTINGS</h3>

              <div>
                <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Slug URL</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full font-mono text-xs bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full font-mono text-xs bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2"
                >
                  <option value="WRITING">WRITING</option>
                  <option value="TECHNOLOGY">TECHNOLOGY</option>
                  <option value="DESIGN">DESIGN</option>
                  <option value="MINDSET">MINDSET</option>
                  <option value="SYSTEMS">SYSTEMS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full text-xs font-mono bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#6B685F] uppercase mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full text-xs font-mono bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2 mb-2"
                />
                {coverImage && (
                  <img src={coverImage} alt="Cover preview" className="w-full h-24 object-cover rounded-sm border" />
                )}
              </div>

              <div className="pt-2 border-t border-[#E8E5DC] dark:border-[#262626] space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono text-[#1A1A1A] dark:text-[#ECECEC] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pinned}
                    onChange={(e) => setPinned(e.target.checked)}
                    className="rounded"
                  />
                  <span>Pin to Top of Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-mono text-[#1A1A1A] dark:text-[#ECECEC] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded"
                  />
                  <span>Featured Essay</span>
                </label>
              </div>
            </div>

            {/* SEO Panel */}
            <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm space-y-3">
              <h3 className="text-xs font-mono tracking-widest text-[#9E9A8E] uppercase flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> SEO METADATA
              </h3>

              <div>
                <label className="block text-[11px] font-mono text-[#6B685F] mb-1">Meta Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={`${title || 'Title'} — Æther`}
                  className="w-full text-xs bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#6B685F] mb-1">Meta Description</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={2}
                  placeholder={excerpt || 'Search engine summary...'}
                  className="w-full text-xs bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm p-2"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Live Preview Mode */
        <div className="bg-[#FAF9F5] dark:bg-[#121212] p-8 border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <div className="max-w-[720px] mx-auto prose-editorial">
            <span className="text-xs font-mono uppercase text-[#9E9A8E]">{category}</span>
            <h1 className="font-serif text-4xl font-semibold mb-4 mt-2">{title || 'Untitled Article'}</h1>
            <p className="text-lg text-[#6B685F] font-sans font-light mb-6">{excerpt}</p>

            {coverImage && (
              <img src={coverImage} alt={title} className="w-full h-64 object-cover rounded-sm mb-8" />
            )}

            <div className="space-y-4 font-sans text-base leading-relaxed">
              {content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
