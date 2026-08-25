import { Article, Category, NewsletterIssue, Subscriber, User, MediaItem } from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_CATEGORIES, 
  INITIAL_NEWSLETTER_ISSUES, 
  INITIAL_SUBSCRIBERS, 
  INITIAL_MEDIA,
  MOCK_USER 
} from '../data/mockData';

import { INITIAL_USERS } from '../data/mockData';
import { sanityFetch, GROQ_QUERIES } from '../lib/sanity';

// Local storage key helpers
const STORAGE_KEYS = {
  ARTICLES: 'techniccal_v2_articles',
  CATEGORIES: 'techniccal_v2_categories',
  NEWSLETTER: 'techniccal_v2_newsletter',
  SUBSCRIBERS: 'techniccal_v2_subscribers',
  MEDIA: 'techniccal_v2_media',
  USERS: 'techniccal_v2_users',
  ACTIVE_USER: 'techniccal_v2_active_user',
  AUTH: 'techniccal_v2_auth_token'
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

  static getUsers(): User[] {
    return getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  static saveUsers(users: User[]): void {
    setStored(STORAGE_KEYS.USERS, users);
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

// Password Strength Validator Utility
export function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!password || password.length < 8) {
    errors.push('At least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('One uppercase letter (A-Z)');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('One lowercase letter (a-z)');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('One number (0-9)');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('One special symbol (!@#$%^&*)');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Fast 200ms API timeout signal helper
const FAST_TIMEOUT = 200;

// API Base URL from Vite environment variables (VITE_API_URL or VITE_API_BASE_URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';

export function getEndpointUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://')) {
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    // Strip redundant leading /api if base already ends with /api or domain is API host
    return `${base}${cleanPath.startsWith('/api') && base.endsWith('/api') ? cleanPath.substring(4) : cleanPath}`;
  }
  return cleanPath;
}

// Helper to construct Auth headers for API calls
function getAuthHeaders(headers: Record<string, string> = {}): Record<string, string> {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// API Service Interface (Dual Mode: REST backend -> Local Storage Fallback)
export const api = {
  getArticlesSync: (category?: string, search?: string): Article[] => {
    let articles = LocalStore.getArticles().filter(a => a.status === 'published');
    if (category && category.toUpperCase() !== 'ALL') {
      const cat = category.toUpperCase();
      articles = articles.filter(a => {
        const artCat = (a.category || '').toUpperCase();
        if (artCat === cat || artCat.includes(cat)) return true;
        if (cat === 'AI' && (artCat.includes('AI') || artCat.includes('MACHINE LEARNING'))) return true;
        if (cat === 'PROGRAMMING' && (artCat.includes('PROGRAMMING') || artCat.includes('SOFTWARE') || artCat.includes('SYSTEMS'))) return true;
        if (cat === 'CAREER' && (artCat.includes('CAREER') || artCat.includes('JOBS') || artCat.includes('INTERVIEW'))) return true;
        if (cat === 'PROJECTS' && (artCat.includes('PROJECT') || artCat.includes('TUTORIAL'))) return true;
        if (cat === 'TOOLS' && (artCat.includes('TOOL') || artCat.includes('DEVELOPER'))) return true;
        return false;
      });
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

  getCategoriesSync: (): Category[] => {
    return LocalStore.getCategories();
  },

  // Articles (Development Mode - Transparent Sanity Fetching)
  getArticles: async (category?: string, search?: string): Promise<Article[]> => {
    try {
      const sanityArticles = await sanityFetch<Article[]>(GROQ_QUERIES.ALL_ARTICLES);
      console.log('SANITY ARTICLES:', sanityArticles);

      let filtered = sanityArticles || [];
      if (category && category.toUpperCase() !== 'ALL') {
        const cat = category.toUpperCase();
        filtered = filtered.filter(a => {
          const artCat = (a.category || '').toUpperCase();
          if (artCat === cat || artCat.includes(cat)) return true;
          if (cat === 'AI' && (artCat.includes('AI') || artCat.includes('MACHINE LEARNING'))) return true;
          if (cat === 'PROGRAMMING' && (artCat.includes('PROGRAMMING') || artCat.includes('SOFTWARE') || artCat.includes('SYSTEMS'))) return true;
          if (cat === 'CAREER' && (artCat.includes('CAREER') || artCat.includes('JOBS') || artCat.includes('INTERVIEW'))) return true;
          if (cat === 'PROJECTS' && (artCat.includes('PROJECT') || artCat.includes('TUTORIAL'))) return true;
          if (cat === 'TOOLS' && (artCat.includes('TOOL') || artCat.includes('DEVELOPER'))) return true;
          return false;
        });
      }
      if (search && search.trim()) {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(a => 
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
        );
      }
      return filtered;
    } catch (error) {
      console.error('SANITY FETCH FAILED:', error);
      throw error;
    }
  },

  getAllArticlesAdmin: async (): Promise<Article[]> => {
    try {
      const sanityArticles = await sanityFetch<Article[]>(GROQ_QUERIES.ALL_ARTICLES);
      if (sanityArticles && sanityArticles.length > 0) return sanityArticles;

      const res = await fetch('/api/articles/admin', { 
        headers: getAuthHeaders(),
        credentials: 'include',
        signal: AbortSignal.timeout(FAST_TIMEOUT) 
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return LocalStore.getArticles();
  },

  getArticleBySlug: async (slug: string): Promise<Article | null> => {
    try {
      const sanityArticle = await sanityFetch<Article>(GROQ_QUERIES.ARTICLE_BY_SLUG, { slug });
      if (sanityArticle) return sanityArticle;

      const res = await fetch(`/api/articles/${slug}`, { signal: AbortSignal.timeout(FAST_TIMEOUT) });
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
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify(articleData)
      });
      const data = await res.json();
      if (res.ok) return data;
      if (res.status === 403) throw new Error(data.error || 'Access denied: Editor role cannot perform this action');
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

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
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (res.ok) return data;
      if (res.status === 403) throw new Error(data.error || 'Access denied: Insufficient role privileges');
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

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
      const res = await fetch(`/api/articles/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) return true;
      if (res.status === 403) {
        const data = await res.json();
        throw new Error(data.error || 'Access denied: Editor role cannot delete articles. Requires Admin or Super Admin.');
      }
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    const articles = LocalStore.getArticles();
    const filtered = articles.filter(a => a.id !== id);
    LocalStore.saveArticles(filtered);
    return true;
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch('/api/categories', { signal: AbortSignal.timeout(FAST_TIMEOUT) });
      if (res.ok) return await res.json();
    } catch (e) {}
    return LocalStore.getCategories();
  },

  createCategory: async (name: string, description?: string): Promise<Category> => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({ name, description })
      });
      const data = await res.json();
      if (res.ok) return data;
      if (res.status === 403) throw new Error(data.error || 'Access denied: Requires Admin or Super Admin role');
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

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
      const res = await fetch(`/api/categories/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) return true;
      if (res.status === 403) {
        const data = await res.json();
        throw new Error(data.error || 'Access denied: Requires Admin or Super Admin role');
      }
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

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
      return { success: true, message: 'You are already subscribed to Techniccal Insider.' };
    }

    subscribers.unshift({
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString().split('T')[0],
      status: 'active'
    });
    LocalStore.saveSubscribers(subscribers);

    return { success: true, message: 'Welcome to Techniccal Insider. Check your inbox soon.' };
  },

  getSubscribers: async (): Promise<Subscriber[]> => {
    try {
      const res = await fetch('/api/admin/subscribers', {
        headers: getAuthHeaders(),
        credentials: 'include',
        signal: AbortSignal.timeout(FAST_TIMEOUT)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return LocalStore.getSubscribers();
  },

  deleteSubscriber: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) return true;
    } catch (e) {}

    const subs = LocalStore.getSubscribers();
    LocalStore.saveSubscribers(subs.filter(s => s.id !== id));
    return true;
  },

  getNewsletterIssues: async (): Promise<NewsletterIssue[]> => {
    return INITIAL_NEWSLETTER_ISSUES;
  },

  // Media Library
  getMedia: async (): Promise<MediaItem[]> => {
    try {
      const res = await fetch('/api/admin/media', {
        headers: getAuthHeaders(),
        credentials: 'include',
        signal: AbortSignal.timeout(FAST_TIMEOUT)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
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
    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) return true;
    } catch (e) {}

    const media = LocalStore.getMedia();
    LocalStore.saveMedia(media.filter(m => m.id !== id));
    return true;
  },

  // User Management (Super Admin RBAC)
  getUsers: async (): Promise<User[]> => {
    try {
      const res = await fetch('/api/admin/users', { 
        headers: getAuthHeaders(),
        credentials: 'include',
        signal: AbortSignal.timeout(FAST_TIMEOUT) 
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return LocalStore.getUsers();
  },

  createUser: async (userData: { name: string; email: string; role: User['role'] }): Promise<User> => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok) return data;
      if (res.status === 403) throw new Error(data.error || 'Access denied: Requires Super Admin role');
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    const users = LocalStore.getUsers();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.unshift(newUser);
    LocalStore.saveUsers(users);
    return newUser;
  },

  updateUserRole: async (userId: string, role: User['role']): Promise<User> => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (res.ok) return data;
      if (res.status === 403) throw new Error(data.error || 'Access denied: Only Super Admin can modify user roles');
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    const users = LocalStore.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].role = role;
      LocalStore.saveUsers(users);
      return users[idx];
    }
    throw new Error('User not found');
  },

  deleteUser: async (userId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { 
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) return true;
      if (res.status === 403) {
        const data = await res.json();
        throw new Error(data.error || 'Access denied: Only Super Admin can delete users');
      }
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    const users = LocalStore.getUsers();
    LocalStore.saveUsers(users.filter(u => u.id !== userId));
    return true;
  },

  // Auth & Security
  register: async (name: string, email: string, password: string): Promise<{ token: string; user: User; message?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      localStorage.setItem(STORAGE_KEYS.AUTH, data.token);
      setStored(STORAGE_KEYS.ACTIVE_USER, data.user);
      return data;
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    // Local simulation fallback
    const users = LocalStore.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('Email address is already registered');
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'MEMBER',
      membershipStatus: 'free',
      savedArticles: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.unshift(newUser);
    LocalStore.saveUsers(users);

    const token = `mock-token-member-${Date.now()}`;
    localStorage.setItem(STORAGE_KEYS.AUTH, token);
    setStored(STORAGE_KEYS.ACTIVE_USER, newUser);
    return { token, user: newUser, message: 'Account created successfully.' };
  },

  adminLogin: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem(STORAGE_KEYS.AUTH, data.token || data.accessToken);
        setStored(STORAGE_KEYS.ACTIVE_USER, data.user);
        return data;
      } else {
        throw new Error(data.error || 'Administrative authentication failed');
      }
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    // Local simulation fallback for admin login
    const users = LocalStore.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (!['EDITOR', 'ADMIN', 'SUPER_ADMIN'].includes(found.role)) {
        throw new Error(`Access Denied: Account role '${found.role}' lacks administrative CMS access.`);
      }
      const token = `mock-token-${found.role.toLowerCase()}-${Date.now()}`;
      localStorage.setItem(STORAGE_KEYS.AUTH, token);
      setStored(STORAGE_KEYS.ACTIVE_USER, found);
      return { token, user: found };
    }

    throw new Error('Invalid email or password. Select an administrative role button.');
  },

  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem(STORAGE_KEYS.AUTH, data.token);
        setStored(STORAGE_KEYS.ACTIVE_USER, data.user);
        return data;
      } else {
        throw new Error(data.error || 'Invalid credentials');
      }
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    // Mock multi-tier role verification fallback
    const users = LocalStore.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (found) {
      const token = `mock-token-${found.role.toLowerCase()}-${Date.now()}`;
      localStorage.setItem(STORAGE_KEYS.AUTH, token);
      setStored(STORAGE_KEYS.ACTIVE_USER, found);
      return { token, user: found };
    }

    if (email === 'admin@aether.blog' && password === 'admin123') {
      const adminUser = users.find(u => u.role === 'ADMIN') || INITIAL_USERS[1];
      const token = 'mock-jwt-token-aether-admin-2026';
      localStorage.setItem(STORAGE_KEYS.AUTH, token);
      setStored(STORAGE_KEYS.ACTIVE_USER, adminUser);
      return { token, user: adminUser };
    }

    throw new Error('Invalid email or password. Use demo account selector on login page.');
  },

  loginAsRole: (role: User['role']): User => {
    const users = LocalStore.getUsers();
    let target = users.find(u => u.role === role);
    if (!target) {
      target = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    }
    const token = `mock-token-${role.toLowerCase()}-active`;
    localStorage.setItem(STORAGE_KEYS.AUTH, token);
    setStored(STORAGE_KEYS.ACTIVE_USER, target);
    return target;
  },

  refreshAccessToken: async (): Promise<{ accessToken: string; user: User } | null> => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.AUTH, data.accessToken);
        setStored(STORAGE_KEYS.ACTIVE_USER, data.user);
        return { accessToken: data.accessToken, user: data.user };
      }
    } catch (e) {}
    return null;
  },

  getMe: async (): Promise<User | null> => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH);
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      let res = await fetch('/api/auth/me', {
        headers,
        credentials: 'include',
        signal: AbortSignal.timeout(FAST_TIMEOUT)
      });

      if (res.status === 401) {
        // Access Token expired: attempt silent refresh token rotation
        const refreshed = await api.refreshAccessToken();
        if (refreshed) {
          return refreshed.user;
        }
      }

      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setStored(STORAGE_KEYS.ACTIVE_USER, data.user);
          return data.user;
        }
      }
    } catch (e) {}

    return api.getCurrentUser();
  },

  getCurrentUser: (): User | null => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!token) return null;
    return getStored<User | null>(STORAGE_KEYS.ACTIVE_USER, INITIAL_USERS[0]);
  },

  logout: async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST', 
        credentials: 'include' 
      });
    } catch (e) {}
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string; demoResetUrl?: string }> => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { 
      success: true, 
      message: 'If an account exists with that email, a password reset link has been dispatched.',
      demoResetUrl: `http://localhost:5173/reset-password?token=demo-token-${Date.now()}`
    };
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed');
      return data;
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    return { success: true, message: 'Your password has been reset successfully. Please log in.' };
  },

  verifyEmail: async (token: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');
      return data;
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
    }

    return { success: true, message: 'Email address verified successfully!' };
  },

  // Member Bookmark / Saved Articles
  toggleSaveArticle: (articleId: string): string[] => {
    const user = api.getCurrentUser();
    if (!user) return [];
    const currentSaved = user.savedArticles || [];
    const isSaved = currentSaved.includes(articleId);
    const updated = isSaved 
      ? currentSaved.filter(id => id !== articleId)
      : [...currentSaved, articleId];

    user.savedArticles = updated;
    setStored(STORAGE_KEYS.ACTIVE_USER, user);

    // Update in local users array
    const users = LocalStore.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx].savedArticles = updated;
      LocalStore.saveUsers(users);
    }

    return updated;
  }
};
