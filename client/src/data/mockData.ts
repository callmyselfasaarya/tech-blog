import { Article, Category, NewsletterIssue, Subscriber, User, MediaItem } from '../types';

export const INITIAL_AUTHOR = {
  name: "Skylar Rowe",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  bio: "Writer and digital creator sharing what I learn about building an independent career online.",
  role: "Writer & Digital Creator"
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Business', slug: 'business', description: 'Strategies on audience, income, and scaling.', count: 3 },
  { id: '2', name: 'Mindset', slug: 'mindset', description: 'Mental frameworks for creators and writers.', count: 2 },
  { id: '3', name: 'Design', slug: 'design', description: 'Aesthetics, tools, and digital craftsmanship.', count: 2 },
  { id: '4', name: 'Systems', slug: 'systems', description: 'Productivity routines and content workflows.', count: 1 },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-pinned-01',
    title: 'The Only Writing Tools I Actually Use',
    slug: 'the-only-writing-tools-i-actually-use',
    excerpt: 'A curated look inside my daily setup for drafting, organizing thoughts, and publishing long-form essays without distraction.',
    category: 'Design',
    tags: ['Tools', 'Writing', 'Design', 'Productivity'],
    publishedAt: '2026-08-22',
    readingTime: '3 min read',
    featured: true,
    pinned: true,
    status: 'published',
    views: 5210,
    coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    seo: {
      title: 'The Only Writing Tools I Actually Use — Memoir',
      description: 'A curated look inside my daily setup for drafting, organizing thoughts, and publishing long-form essays without distraction.',
      keywords: ['writing', 'tools', 'notion', 'creators']
    },
    content: `
## Simplify Your Stack

Over the past three years of publishing online, I have tested dozens of markdown editors, note-taking apps, and complex database systems. Eventually, I realized that more tools rarely translate to better writing.

The tools that stuck are the ones that get out of the way.

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

### 1. Minimalist Markdown Drafting
For initial drafts, speed and zero distraction are everything. I write initial notes in plain text before moving them into a structured database.

### 2. An Intuitive Idea Inbox
Ideas don't happen on schedule. Having a single friction-free inbox captured on phone or desktop ensures no good thought gets lost.

\`\`\`markdown
- Capture quickly
- Review weekly
- Draft deliberately
\`\`\`

### 3. Clean Publishing Canvas
When it's time to publish, clean typography and responsive layouts make reading an enjoyable ritual for your audience.
`
  },
  {
    id: 'art-01',
    title: 'The Truth About Sharing My Earnings Online',
    slug: 'sharing-numbers',
    excerpt: 'Sharing your earnings and stats online can feel risky, but it\'s been a game-changer for my growth and trust with readers. Here\'s what I\'ve learned from being transparent.',
    category: 'Business',
    tags: ['Business', 'Transparency', 'Growth'],
    publishedAt: '2026-08-20',
    readingTime: '5 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 4320,
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    seo: {
      title: 'The Truth About Sharing My Earnings Online — Memoir',
      description: 'Sharing your earnings and stats online can feel risky, but it\'s been a game-changer for my growth and trust with readers.',
      keywords: ['transparency', 'earnings', 'creators', 'business']
    },
    content: `
## Why I Started Sharing My Numbers

Sharing financial metrics online can feel uncomfortable. For a long time, I worried it would seem like bragging or create unnecessary pressure. But when done authentically, radical transparency builds unmatched trust with your audience.

### 1. Trust Over Hype
Readers are tired of generic advice. When you share exact numbers, lessons from failures, and genuine conversion rates, your content instantly separates itself from internet noise.

### 2. Accountability
Public goals force disciplined execution. Knowing my progress will be shared in my monthly newsletter keeps me focused on high-leverage projects.

\`\`\`typescript
const metric = {
  transparency: 100,
  trustMultiplier: 2.5,
  growthRate: "Consistent"
};
\`\`\`

> "Transparency breeds trust, and trust is the ultimate currency of the internet."
`
  },
  {
    id: 'art-02',
    title: 'How I Turned a Hobby Into Real Income',
    slug: 'turned-hobby-into-real-income',
    excerpt: 'From publishing quiet weekend notes to generating consistent revenue online. Here is the honest roadmap and mistakes to avoid.',
    category: 'Business',
    tags: ['Business', 'Side Project', 'Monetization'],
    publishedAt: '2026-08-18',
    readingTime: '4 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 3890,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## From Weekend Notes to Sustainable Revenue

Turning a passion for writing into a real digital business doesn't happen overnight. It starts with finding your specific niche and committing to serving a core group of readers.

### Phase 1: Establish Your Signal
Before worrying about monetization, focus on clarity and resonance. Write essays that answer real questions your target audience asks every day.

### Phase 2: Build a Direct Line
Social media platforms rent audiences; newsletters own relationships. Convert curious readers into email subscribers as early as possible.
`
  },
  {
    id: 'art-03',
    title: 'The Unsexy Truth About Consistent Content',
    slug: 'unsexy-truth-about-consistent-content',
    excerpt: 'Consistency is rarely glamorous. It is mostly showing up on empty document days, overcoming doubt, and doing the baseline work.',
    category: 'Mindset',
    tags: ['Mindset', 'Consistency', 'Writing'],
    publishedAt: '2026-08-15',
    readingTime: '4 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 3120,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## The Myth of Constant Inspiration

Inspiration is a bonus, not a requirement. High performers in creative fields build systems so they can produce quality work even on uninspired days.

### Micro-Habits for Long-Term Writing
- Write 300 words before checking email.
- Keep an active swipe file of ideas.
- Publish on a fixed weekly schedule.
`
  },
  {
    id: 'art-04',
    title: 'Designing for Longevity in Digital Publishing',
    slug: 'designing-for-longevity',
    excerpt: 'Why minimalist design and clean typography create timeless reading experiences for modern creators.',
    category: 'Design',
    tags: ['Design', 'Typography', 'Minimalism'],
    publishedAt: '2026-08-10',
    readingTime: '6 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 2940,
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## Timeless Design Aesthetics

Trends fade quickly, but clean serif typography, generous whitespace, and responsive layouts remain engaging for decades.

### Core Principles
1. **Prioritize Legibility**: High contrast, readable line length (60-75 characters per line).
2. **Remove Visual Noise**: Eliminate unnecessary banners and popups that ruin focus.
3. **Pace the Content**: Use section headings and quotes to create visual rhythm.
`
  },
  {
    id: 'art-05',
    title: 'Building a Creator Operating System',
    slug: 'creator-operating-system',
    excerpt: 'How to organize research, newsletter drafts, and project tasks into a frictionless weekly workflow.',
    category: 'Systems',
    tags: ['Systems', 'Workflow', 'Productivity'],
    publishedAt: '2026-08-05',
    readingTime: '5 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 2450,
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## Workflows That Save Time

A personal operating system allows you to manage research, draft articles, and distribute newsletters without feeling overwhelmed.

### The 3-Stage Pipeline
- **Capture**: Save highlights and links into a central repository.
- **Synthesize**: Outline notes into clear thesis points.
- **Distribute**: Publish across your blog and email list effortlessly.
`
  }
];

export const INITIAL_ISSUES: NewsletterIssue[] = [
  { id: '1', issueNumber: 'Issue #024', title: 'The Power of Independent Media', publishedAt: '2026-08-18', excerpt: 'Reflections on building direct relationships with your audience in 2026.', readTime: '4 min' },
  { id: '2', issueNumber: 'Issue #023', title: 'Monetizing Attention Authentically', publishedAt: '2026-08-11', excerpt: 'How to monetize your writing without compromising intellectual integrity.', readTime: '5 min' },
  { id: '3', issueNumber: 'Issue #022', title: 'The Minimalist Creator Stack', publishedAt: '2026-08-04', excerpt: 'The exact software stack I use to run my editorial publication.', readTime: '3 min' },
];
export const INITIAL_NEWSLETTER_ISSUES = INITIAL_ISSUES;

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: 'sub-1', email: 'alex.dev@example.com', subscribedAt: '2026-08-01', status: 'active', source: 'Homepage' },
  { id: 'sub-2', email: 'sarah.design@example.com', subscribedAt: '2026-08-05', status: 'active', source: 'Sidebar' },
  { id: 'sub-3', email: 'marcus.w@example.com', subscribedAt: '2026-08-12', status: 'active', source: 'Article Footer' }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: 'med-1', name: 'desk-setup.jpg', url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80', size: '1.2 MB', uploadedAt: '2026-08-22' },
  { id: 'med-2', name: 'skylar-portrait.jpg', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', size: '2.4 MB', uploadedAt: '2026-08-20' },
];

export const INITIAL_USER: User = {
  id: 'usr-1',
  name: 'Skylar Rowe',
  email: 'skylar@memoir.blog',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
};
export const MOCK_USER = INITIAL_USER;
