import { Article, Category, NewsletterIssue, Subscriber, User, MediaItem } from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_CATEGORIES, 
  INITIAL_NEWSLETTER_ISSUES, 
  INITIAL_SUBSCRIBERS, 
  INITIAL_MEDIA,
  MOCK_USER 
} from '../data/mockData';

// Local storage key helpers
const STORAGE_KEYS = {
  ARTICLES: 'aether_articles',
  CATEGORIES: 'aether_categories',
  NEWSLETTER: 'aether_newsletter',
  SUBSCRIBERS: 'aether_subscribers',
  MEDIA: 'aether_media',
  AUTH: 'aether_auth_token'
};

// Initialize Storage with mock data if empty
function getStored<T>(key: string, initial: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  } catch (e) {
    return initial;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

// In-Memory Fallback Store
class LocalStore {
  static getArticles(): Article[] {
    return getStored(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  }

  static saveArticles(articles: Article[]): void {
    setStored(STORAGE_KEYS.ARTICLES, articles);
  }

  static getCategories(): Category[] {
    return getStored(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  static saveCategories(categories: Category[]): void {
    setStored(STORAGE_KEYS.CATEGORIES, categories);
  }

  static getSubscribers(): Subscriber[] {
    return getStored(STORAGE_KEYS.SUBSCRIBERS, INITIAL_SUBSCRIBERS);
  }

  static saveSubscribers(subs: Subscriber[]): void {
    setStored(STORAGE_KEYS.SUBSCRIBERS, subs);
  }

  static getMedia(): MediaItem[] {
    return getStored(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  }

  static saveMedia(media: MediaItem[]): void {
    setStored(STORAGE_KEYS.MEDIA, media);
  }
}

// Helper to calculate reading time
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

// Helper to generate slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// API Service Interface (Dual Mode: REST backend -> Local Storage Fallback)
export const api = {
  // Articles
  getArticles: async (category?: string, search?: string): Promise<Article[]> => {
    try {
      // Attempt REST call if available
      const url = new URL('/api/articles', window.location.origin);
      if (category && category !== 'ALL') url.searchParams.set('category', category);
      if (search) url.searchParams.set('search', search);

      const res = await fetch(url.toString());
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback to LocalStore
    }

    let articles = LocalStore.getArticles().filter(a => a.status === 'published');

    if (category && category.toUpperCase() !== 'ALL') {
      articles = articles.filter(a => a.category.toUpperCase() === category.toUpperCase());
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.content.toLowerCase().includes(q)
      );
    }

    return articles;
  },

  getAllArticlesAdmin: async (): Promise<Article[]> => {
    try {
      const res = await fetch('/api/articles/admin');
      if (res.ok) return await res.json();
    } catch (e) {}
    return LocalStore.getArticles();
  },

  getArticleBySlug: async (slug: string): Promise<Article | null> => {
    try {
      const res = await fetch(`/api/articles/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {}

    const articles = LocalStore.getArticles();
    const found = articles.find(a => a.slug === slug);
    if (found) {
      // Increment view count
      found.views = (found.views || 0) + 1;
      LocalStore.saveArticles(articles);
      return found;
    }
    return null;
  },

  createArticle: async (articleData: Partial<Article>): Promise<Article> => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const articles = LocalStore.getArticles();
    const title = articleData.title || 'Untitled Article';
    const slug = articleData.slug || slugify(title);
    const content = articleData.content || '';

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title,
      slug,
      excerpt: articleData.excerpt || title,
      content,
      coverImage: articleData.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      category: articleData.category || 'WRITING',
      tags: articleData.tags || ['Article'],
      publishedAt: articleData.publishedAt || new Date().toISOString().split('T')[0],
      readingTime: calculateReadingTime(content),
      featured: articleData.featured || false,
      pinned: articleData.pinned || false,
      status: articleData.status || 'draft',
      views: 0,
      author: articleData.author || INITIAL_ARTICLES[0].author,
      seo: articleData.seo || {
        title: `${title} — Aether Editorial`,
        description: articleData.excerpt || title,
        keywords: articleData.tags || ['writing']
      }
    };

    articles.unshift(newArticle);
    LocalStore.saveArticles(articles);
    return newArticle;
  },

  updateArticle: async (id: string, updates: Partial<Article>): Promise<Article> => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const articles = LocalStore.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Article not found');

    const updated = {
      ...articles[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0],
      readingTime: updates.content ? calculateReadingTime(updates.content) : articles[index].readingTime
    };

    articles[index] = updated;
    LocalStore.saveArticles(articles);
    return updated;
  },

  deleteArticle: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch (e) {}

    const articles = LocalStore.getArticles();
    const filtered = articles.filter(a => a.id !== id);
    LocalStore.saveArticles(filtered);
    return true;
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) return await res.json();
    } catch (e) {}
    return LocalStore.getCategories();
  },

  createCategory: async (name: string, description?: string): Promise<Category> => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const categories = LocalStore.getCategories();
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: name.toUpperCase(),
      slug: slugify(name),
      description: description || '',
      count: 0
    };
    categories.push(newCat);
    LocalStore.saveCategories(categories);
    return newCat;
  },

  deleteCategory: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch (e) {}

    const categories = LocalStore.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    LocalStore.saveCategories(filtered);
    return true;
  },

  // Newsletter
  subscribeNewsletter: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    // Local simulation
    const subscribers = LocalStore.getSubscribers();
    const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: true, message: 'You are already subscribed to Aether Letters.' };
    }

    subscribers.unshift({
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString().split('T')[0],
      status: 'active'
    });
    LocalStore.saveSubscribers(subscribers);

    return { success: true, message: 'Welcome to Aether Letters. Check your inbox soon.' };
  },

  getSubscribers: async (): Promise<Subscriber[]> => {
    try {
      const res = await fetch('/api/admin/subscribers');
      if (res.ok) return await res.json();
    } catch (e) {}
    return LocalStore.getSubscribers();
  },

  deleteSubscriber: async (id: string): Promise<boolean> => {
    const subs = LocalStore.getSubscribers();
    LocalStore.saveSubscribers(subs.filter(s => s.id !== id));
    return true;
  },

  getNewsletterIssues: async (): Promise<NewsletterIssue[]> => {
    return INITIAL_NEWSLETTER_ISSUES;
  },

  // Media Library
  getMedia: async (): Promise<MediaItem[]> => {
    return LocalStore.getMedia();
  },

  uploadMedia: async (file: File): Promise<MediaItem> => {
    const media = LocalStore.getMedia();
    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      filename: file.name,
      url: URL.createObjectURL(file),
      mimeType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString().split('T')[0],
      dimensions: { width: 1200, height: 800 }
    };
    media.unshift(newItem);
    LocalStore.saveMedia(media);
    return newItem;
  },

  deleteMedia: async (id: string): Promise<boolean> => {
    const media = LocalStore.getMedia();
    LocalStore.saveMedia(media.filter(m => m.id !== id));
    return true;
  },

  // Auth
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.AUTH, data.token);
        return data;
      }
    } catch (e) {}

    // Mock verification
    if (email === 'admin@aether.blog' && password === 'admin123') {
      const token = 'mock-jwt-token-aether-admin-2026';
      localStorage.setItem(STORAGE_KEYS.AUTH, token);
      return { token, user: MOCK_USER };
    }
    throw new Error('Invalid email or password. Use admin@aether.blog / admin123');
  },

  getCurrentUser: (): User | null => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH);
    return token ? MOCK_USER : null;
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
};
