export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  category: string; // e.g. "WRITING", "TECHNOLOGY", "DESIGN", "MINDSET", "SYSTEMS"
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string; // e.g. "6 min read"
  featured?: boolean;
  pinned?: boolean;
  status: 'published' | 'draft';
  views?: number;
  seo?: SEO;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface NewsletterIssue {
  id: string;
  issueNumber: string; // e.g. "Issue 024"
  title: string;
  publishedAt: string;
  excerpt: string;
  readTime: string;
  link?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  source?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
  avatar?: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number; // in bytes
  uploadedAt: string;
  dimensions?: { width: number; height: number };
}
