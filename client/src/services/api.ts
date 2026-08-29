import { Article, Category, NewsletterIssue, Subscriber, User, MediaItem } from '../types';
import { sanityFetch, GROQ_QUERIES } from '../lib/sanity';

// Local storage key helpers
const STORAGE_KEYS = {
  ARTICLES: 'techniccal_v3_articles',
  CATEGORIES: 'techniccal_v3_categories',
  NEWSLETTER: 'techniccal_v3_newsletter',
  SUBSCRIBERS: 'techniccal_v3_subscribers',
  MEDIA: 'techniccal_v3_media',
  USERS: 'techniccal_v3_users',
  ACTIVE_USER: 'techniccal_v3_active_user',
  AUTH: 'techniccal_v3_auth_token'
};

// Initialize Storage with empty fallback if empty
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

const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Demystifying Continuous Integration',
    slug: 'demystifying-continuous-integration',
    excerpt: 'How CI improves development workflows, automated testing pipelines, and team delivery velocity.',
    content: `# Demystifying Continuous Integration

Continuous Integration (CI) is the cornerstone of modern software engineering. By merging code changes frequently into a central repository and executing automated build and test scripts, teams catch integration bugs early and maintain software quality at scale.

## Why Continuous Integration Matters

In traditional software development, developers worked in isolation for weeks or months before attempting to merge their branches. This inevitably led to "merge hell"—endless hours spent resolving conflicting changes, broken builds, and regression bugs.

CI solves this by establishing a disciplined automated workflow:

1. **Automated Validation**: Every pull request triggers an automated build matrix.
2. **Fast Feedback Loops**: Developers learn within minutes if their commits break existing tests.
3. **High Confidence Deployments**: Maintained master/main branches are always in a releasable state.

\`\`\`yaml
# Example GitHub Actions Workflow
name: Continuous Integration
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
\`\`\`

## Key Best Practices

- **Keep Builds Fast**: Optimize pipeline caching to keep build times under 5 minutes.
- **Fix Broken Builds Immediately**: Treat main branch breakages as highest priority.
- **Maintain High Test Coverage**: Combine unit tests, integration tests, and static linting.
`,
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Techniccal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Software Engineer & Systems Architect.',
      role: 'Author'
    },
    category: 'PROGRAMMING',
    tags: ['CI/CD', 'DevOps', 'Software Architecture', 'Testing'],
    publishedAt: '01/06/25',
    readingTime: '6 min read',
    featured: true,
    pinned: true,
    status: 'published',
    views: 1420
  },
  {
    id: 'art-2',
    title: 'The Philosophy of AI Ethics',
    slug: 'philosophy-of-ai-ethics',
    excerpt: 'Exploring algorithmic accountability, human alignment, and decision transparency in modern neural systems.',
    content: `# The Philosophy of AI Ethics

As machine learning systems transition from narrow predictive tools to general cognitive assistants, the ethical implications of automated decision-making demand rigorous philosophical examination.

## Alignment, Agency, and Responsibility

When an autonomous system makes a consequential decision—whether approving a loan, diagnosing a medical condition, or generating code—who bears accountability?

- **Interpretability vs. Accuracy**: Deep neural networks often operate as high-dimensional black boxes.
- **Value Alignment**: Ensuring artificial intelligence objectives match human ethical principles.
- **Data Governance**: Addressing historical bias in training sets.

> "Ethical AI is not merely a technical constraint; it is a foundational philosophy of engineering human-centric technology."
`,
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Techniccal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Software Engineer & Systems Architect.',
      role: 'Author'
    },
    category: 'AI',
    tags: ['AI Ethics', 'Machine Learning', 'Philosophy', 'Alignment'],
    publishedAt: '01/12/25',
    readingTime: '8 min read',
    featured: true,
    pinned: false,
    status: 'published',
    views: 980
  },
  {
    id: 'art-3',
    title: 'The Role of Empathy in Design',
    slug: 'the-role-of-empathy-in-design',
    excerpt: 'Why understanding people is still one of the most important parts of building technology.',
    content: `# The Role of Empathy in Design

Technology exists to serve human needs. Behind every screen, button, and interface is a human being attempting to accomplish a goal, solve a problem, or express an idea.

## Empathy as a Core Technical Skill

Engineers often view software through the lens of algorithmic efficiency, latency, and data structures. However, true system quality emerges when technical execution meets human empathy:

1. **User Intention Over System Implementation**: Interfaces should reflect user mental models, not database schemas.
2. **Cognitive Load Reduction**: Minimizing friction, unnecessary choices, and visual noise.
3. **Accessibility First**: Designing for diverse physical abilities, environments, and devices.

> "To design effectively is to listen deeply. Empathy transforms functional software into meaningful experiences."
`,
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Techniccal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Software Engineer & Systems Architect.',
      role: 'Author'
    },
    category: 'DESIGN',
    tags: ['Design', 'UX', 'Empathy', 'Human Factors'],
    publishedAt: '02/10/26',
    readingTime: '5 min read',
    featured: true,
    pinned: false,
    status: 'published',
    views: 1120
  },
  {
    id: 'art-4',
    title: 'Why Walking Clears the Mind',
    slug: 'why-walking-clears-the-mind',
    excerpt: 'The surprising benefits of slowing down, movement, and subconscious problem solving.',
    content: `# Why Walking Clears the Mind

Some of history's greatest thinkers—from Nietzsche and Darwin to Steve Jobs—relied on long walks to solve complex intellectual problems.

## Cognitive Benefits of Walking

1. **Default Mode Network (DMN)**: Walking stimulates incubation, allowing the brain to connect non-obvious ideas.
2. **Mental Reset**: Stepping away from screens lowers cognitive fatigue and restores attention span.
3. **Physical Rhythm**: Steady walking pace creates a meditative cadence conducive to deep thought.
`,
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Techniccal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Software Engineer & Systems Architect.',
      role: 'Author'
    },
    category: 'PERSONAL',
    tags: ['Productivity', 'Mindset', 'Creativity'],
    publishedAt: '02/03/26',
    readingTime: '4 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 2100
  },
  {
    id: 'art-5',
    title: 'Why Nostalgia Shapes Modern Trends',
    slug: 'why-nostalgia-shapes-modern-trends',
    excerpt: 'Understanding why old ideas keep returning in digital interfaces and product culture.',
    content: `# Why Nostalgia Shapes Modern Trends

From skeumorphic UI elements returning in spatial computing to analog noise textures in modern web design, nostalgia remains one of the most potent drivers of human design preferences.

## The Pendulum of Design Systems

Modern web design has transitioned from extreme flat design back toward warm, tactile, and expressive aesthetics:

1. **Textural Warmth**: Off-white paper backgrounds, subtle grid lines, and crisp typography.
2. **Analog Signals**: Mechanical keyboard sound design, monospaced typography, and vinyl aesthetic.
3. **Clarity and Focus**: Stripping away unnecessary clutter to highlight pure editorial content.
`,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Techniccal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Software Engineer & Systems Architect.',
      role: 'Author'
    },
    category: 'CULTURE',
    tags: ['Design', 'Nostalgia', 'UI/UX', 'Trends'],
    publishedAt: '11/20/25',
    readingTime: '5 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 1250
  },
  {
    id: 'art-6',
    title: 'Why Code Reviews Are Essential',
    slug: 'why-code-reviews-are-essential',
    excerpt: 'The power of peer collaboration, knowledge distribution, and code quality in software engineering.',
    content: `# Why Code Reviews Are Essential

Code review is far more than a bug-finding checklist. When practiced thoughtfully, it serves as a primary vehicle for team learning, architectural alignment, and psychological safety.

## Key Benefits of Reviewing Code

- **Shared Context**: Prevents single points of knowledge failure across codebases.
- **Architectural Mentorship**: Provides continuous lightweight feedback and skill growth.
- **Higher Code Maintainability**: Ensures consistent style, readability, and test coverage.
`,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Techniccal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Software Engineer & Systems Architect.',
      role: 'Author'
    },
    category: 'ENGINEERING',
    tags: ['Engineering', 'Code Review', 'Collaboration'],
    publishedAt: '07/01/25',
    readingTime: '6 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 1850
  },
  {
    id: 'art-7',
    title: 'How AI Is Changing the Way We Work',
    slug: 'how-ai-is-changing-the-way-we-work',
    excerpt: 'AI tools, agentic workflows, and their profound impact on developer productivity.',
    content: `# How AI Is Changing the Way We Work

Generative models and autonomous coding agents are fundamentally restructuring how software engineers brainstorm, write, test, and deploy applications.

## Shifting from Manual Syntax to System Architecture

Rather than replacing developers, AI tools elevate the engineer's role from raw line-by-line syntax writing to high-level system architectural orchestration and validation.
`,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Techniccal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Software Engineer & Systems Architect.',
      role: 'Author'
    },
    category: 'AI',
    tags: ['AI', 'Productivity', 'Future of Work'],
    publishedAt: '01/16/25',
    readingTime: '6 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 2400
  }
];

// In-Memory Fallback Store
class LocalStore {
  static getArticles(): Article[] {
    return getStored(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  }

  static saveArticles(articles: Article[]): void {
    setStored(STORAGE_KEYS.ARTICLES, articles);
  }

  static getCategories(): Category[] {
    return getStored(STORAGE_KEYS.CATEGORIES, []);
  }

  static saveCategories(categories: Category[]): void {
    setStored(STORAGE_KEYS.CATEGORIES, categories);
  }

  static getSubscribers(): Subscriber[] {
    return getStored(STORAGE_KEYS.SUBSCRIBERS, []);
  }

  static saveSubscribers(subs: Subscriber[]): void {
    setStored(STORAGE_KEYS.SUBSCRIBERS, subs);
  }

  static getMedia(): MediaItem[] {
    return getStored(STORAGE_KEYS.MEDIA, []);
  }

  static saveMedia(media: MediaItem[]): void {
    setStored(STORAGE_KEYS.MEDIA, media);
  }

  static getUsers(): User[] {
    return getStored(STORAGE_KEYS.USERS, []);
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

  // Articles (Dual Mode - Transparent Sanity Fetching with Fallback)
  getArticles: async (category?: string, search?: string): Promise<Article[]> => {
    try {
      let articles = await sanityFetch<Article[]>(GROQ_QUERIES.ALL_ARTICLES);
      if (!articles || articles.length === 0) {
        articles = api.getArticlesSync(category, search);
        return articles;
      }

      let filtered = articles;
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
      console.warn('Sanity fetch fallback active:', error);
      return api.getArticlesSync(category, search);
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
      author: articleData.author || {
        name: 'Techniccal Editorial Desk',
        avatar: '',
        bio: 'Engineering research and technical analysis publication.',
        role: 'Editorial Desk'
      },
      category: articleData.category || 'WRITING',
      tags: articleData.tags || ['Article'],
      publishedAt: articleData.publishedAt || new Date().toISOString().split('T')[0],
      readingTime: calculateReadingTime(content),
      featured: articleData.featured || false,
      pinned: articleData.pinned || false,
      status: articleData.status || 'draft',
      views: 0,
      seo: articleData.seo || {
        title: `${title} — Techniccal Editorial`,
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
      const sanityCategories = await sanityFetch<Category[]>(GROQ_QUERIES.ALL_CATEGORIES);
      if (sanityCategories && sanityCategories.length > 0) return sanityCategories;

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
    try {
      const res = await fetch('/api/newsletter/issues', { signal: AbortSignal.timeout(FAST_TIMEOUT) });
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
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
      const token = `token-${found.role.toLowerCase()}-${Date.now()}`;
      localStorage.setItem(STORAGE_KEYS.AUTH, token);
      setStored(STORAGE_KEYS.ACTIVE_USER, found);
      return { token, user: found };
    }

    throw new Error('Invalid email or password.');
  },

  loginAsRole: (role: User['role']): User => {
    const users = LocalStore.getUsers();
    let target = users.find(u => u.role === role);
    if (!target) {
      throw new Error(`No local user account found for role ${role}. Please log in via API backend.`);
    }
    const token = `token-${role.toLowerCase()}-active`;
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
    return getStored<User | null>(STORAGE_KEYS.ACTIVE_USER, null);
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
