# Techniccal — Software Architecture, AI & Engineering Journal

> **Techniccal** is a minimalist personal author website, independent technical publication, and headless CMS platform. Inspired by the editorial feel of modern writer publications, it delivers high-signal software engineering dispatches, distributed systems architecture blueprints, AI research notes, and tech culture essays with generous whitespace and zero clutter.

---

## 📌 Table of Contents

- [🌟 Overview & Site Details](#-overview--site-details)
- [🎨 Brand Identity & Design Aesthetic](#-brand-identity--design-aesthetic)
- [🗺️ Complete Website Structure & Pages](#-complete-website-structure--pages)
- [📝 15-Point Article Anatomy Specification](#-15-point-article-anatomy-specification)
- [🎨 Sanity Studio Headless CMS (`studio-techniccal`)](#-sanity-studio-headless-cms-studio-techniccal)
- [🏛️ Workspace Monorepo Architecture](#-workspace-monorepo-architecture)
- [👑 5-Tier Role-Based Access Control (RBAC)](#-5-tier-role-based-access-control-rbac)
- [🔐 Security & Authentication Architecture](#-security--authentication-architecture)
- [⚙️ Environment Variables Reference](#️-environment-variables-reference)
- [🚀 Quickstart & Local Development](#-quickstart--local-development)

---

## 🌟 Overview & Site Details

**Techniccal** is built to showcase technical writing and software engineering dispatches with an editorial emphasis on readability, typography, and subtle micro-animations.

### Site Profile & Brand Details
- **Site Name**: Techniccal
- **Tagline**: Software Architecture, AI & Engineering Journal
- **Author Identity**: Techniccal Editorial / Software Engineer · AI Builder · Writer
- **Location**: From Tamil Nadu with ♡
- **Primary Topics**: Software Engineering, Artificial Intelligence, Systems, Technology, Startups, Productivity, Design, and Personal Experiments.
- **Brand Personality**: Thoughtful, technical, intelligent, understated, modern, editorial, human.

---

## 🎨 Brand Identity & Design Aesthetic

Techniccal enforces a calm paper-like editorial aesthetic avoiding generic SaaS tropes (no heavy gradients, no neon colors, no rounded card clutter):

- **Palette**:
  - **Paper Light**: `#FBFBFA` / `#FAF9F5` (Warm off-white background)
  - **Dark Canvas**: `#0C0C0D` / `#121214` (Deep obsidian dark mode)
  - **Primary Ink**: `#1C1C1E` / `#F6F5F0` (High-contrast typography)
  - **Secondary Text**: `#4C586F` / `#8E8E93` (Muted gray subtitles & metadata)
  - **Technical Cobalt**: `#3B719F` / `#5B9AD5` (Monospaced tag highlights & links)
  - **Border Gray**: `#E1E1E1` / `#2C2C30` (Precise paper grid borders)
- **Typography**:
  - **Serif Headings**: `font-serif` (Editorial headlines & article titles)
  - **Sans Interface**: `font-sans` (Clean UI text & navigation)
  - **Monospace Metadata**: `font-mono` (Category tags, dates, reading times, code blocks)
- **Motion Principles**:
  - Soft scroll reveals with `BlurFade` (`opacity: 0 -> 1`, `y: 16px -> 0px`).
  - Active tab spring sliding pill indicators (`layoutId="activeCategoryPill"`).
  - Subtle card hover scale (`scale-105`) & arrow slide animations.

---

## 🏛️ Workspace Monorepo Architecture

```text
tech-blog/ (Workspace Root)
├── client/                 # Web Application (React 19 + Vite 6 + Tailwind CSS v4 + TypeScript)
│   ├── src/
│   │   ├── admin/          # Admin CMS management views & dashboards (/admin)
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── ArticleEditor.tsx
│   │   │   ├── ArticlesManager.tsx
│   │   │   ├── CategoriesManager.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MediaManager.tsx
│   │   │   ├── NewsletterManager.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── UsersManager.tsx
│   │   ├── components/     # UI components, layout frames, logos, search modal
│   │   ├── context/        # Auth, Theme (Dark/Light), and Lenis smooth scroll providers
│   │   ├── data/           # Mock data fallbacks and default content structures
│   │   ├── lib/            # Sanity client & GROQ query helpers (sanity.ts)
│   │   ├── pages/          # Public editorial pages & member portal views
│   │   ├── services/       # Unified Axios/Fetch REST API client (api.ts)
│   │   ├── types/          # TypeScript interface definitions
│   │   └── App.tsx         # Root app router & provider shell
│   ├── .env.example        # Client public environment configuration template
│   └── package.json
│
├── server/                 # Production REST API Backend (Express + MongoDB + JWT Auth)
│   ├── middleware/         # Auth verification & RBAC access controllers (authMiddleware.js)
│   ├── models/             # Mongoose schemas (User, Article, Category, Subscriber, Media)
│   ├── routes/             # REST API endpoints (auth, articles, categories, newsletter, user, media)
│   ├── scripts/            # Admin seeding and utility maintenance scripts
│   │   ├── createAdmin.js
│   │   └── purgeTestAccounts.js
│   ├── uploads/            # Local media uploads storage directory
│   ├── .env.example        # Server private secrets environment template
│   ├── Procfile            # Process start specification for Railway / Heroku
│   ├── railway.json        # Service-level Railway deployment configuration
│   ├── seed.js             # Local database initial seeding script
│   ├── server.js           # Production Express server entry point
│   └── package.json
│
├── studio-techniccal/      # Standalone Headless CMS (Sanity Studio v3)
│   ├── schemaTypes/        # Sanity schemas (article, category, author, subscriber, settings)
│   ├── sanity.config.ts    # Studio project setup (Project: pbxpf8xj, Dataset: production)
│   ├── sanity.cli.ts       # CLI options & deployment config (studioHost: techniccal)
│   └── package.json
│
├── .env.example            # Master root environment configuration template
├── .gitignore              # Git ignore rules for node_modules, build outputs & secrets
├── Procfile                # Master Railway / Heroku process declaration
├── railway.json            # Master Railway deployment configuration
├── RAILWAY_DEPLOYMENT.md   # Step-by-step Railway backend deployment guide
└── README.md               # Master Project Documentation
```

---

## 🗺️ Complete Website Route Hierarchy

Techniccal enforces a clean, SEO-optimized URL route structure across public and administrative portals:

```text
techniccal.com
│
├── /                       # Homepage (Featured hero dispatch, blueprints, latest articles, newsletter CTA)
├── /blog                   # Master Articles Library (Search query filter & tag browsing)
├── /ai                     # AI & Machine Learning Dispatches (LLMs, RAG, Neural Search, Agents)
├── /programming            # Software Architecture & Systems (Go, Rust, Distributed DBs, High Throughput)
├── /career                 # Engineering Career & Culture (Leadership, System Design, Prep, Team Scaling)
├── /projects               # Hands-On Project Tutorials & Open-Source Code Walkthroughs
├── /tools                  # Developer Tools & Productivity Workflows
├── /newsletter             # Editorial Newsletter Dispatches & Email Subscription Portal
├── /letters                # Technical Correspondence & Editor Dispatches
├── /archive                # Historical Publication Archives & Chronological Index
├── /about                  # Editorial Mission, Principles & Core Contributors
├── /contact                # Inquiries, Sponsorships & Editorial Team Contacts
│
├── /article/:slug          # Individual Article Post Reader (Strict 15-Point Specification)
├── /account                # Member Profile Portal (Saved reading list & subscriber preferences)
├── /login                  # Member Sign In
├── /register               # Member Account Registration
├── /forgot-password        # Account Recovery & Password Reset Request
├── /reset-password         # Secure Password Reset Confirmation View
├── /verify-email           # Email Verification Confirmation View
│
└── /admin                  # Administrative CMS Management Portal (Requires Editor / Admin Role)
    ├── /admin/login        # Dedicated Administrative Gateway Login
    ├── /admin              # Dashboard Metrics (Articles count, views, subscribers, active users)
    ├── /admin/articles     # Article Content Management & Publishing Matrix
    ├── /admin/articles/new # Full-featured Article Content Editor
    ├── /admin/categories   # Category Taxonomy Editor & Metadata Management
    ├── /admin/media        # Digital Asset & Media Management Library
    ├── /admin/newsletter   # Subscriber Management & Email Campaign Dispatcher
    ├── /admin/users        # RBAC User Role Administration (Super Admin only)
    └── /admin/settings     # System Settings & Global Editorial Controls
```

---

## 📝 15-Point Article Anatomy Specification

Every technical article published at `/article/:slug` adheres strictly to this 15-point editorial standard:

1. **Title**: Concise, high-impact headline framing the technical problem or architecture.
2. **Author Header**: Author avatar, full name, credential badge, and publication role.
3. **Published Date**: Exact ISO publication timestamp paired with relative time formatting.
4. **Updated Date**: Revision timestamp guaranteeing code freshness and technical accuracy.
5. **Featured Media**: High-resolution architectural diagram or technical banner with optimized aspect ratio.
6. **Executive Abstract**: Highlighted introduction framing key engineering takeaways.
7. **Table of Contents**: Sticky desktop sidebar + collapsible mobile drawer TOC with smooth section jump links.
8. **Main Content Body**: Rich editorial text formatted with high-readability typography (`Source Serif 4`).
9. **Syntax-Highlighted Code Blocks**: `JetBrains Mono` snippets with language labels and instant one-click copy button.
10. **Technical Schemas / Diagrams**: Inline architectural flowcharts, vector sequence diagrams, and benchmarks.
11. **Contextual Related Articles**: 3-column curated grid of follow-up dispatches in the same domain.
12. **Inline Newsletter CTA**: Integrated email dispatch subscription banner.
13. **Author Bio Card**: Detailed credentials, background, and social links (GitHub, LinkedIn, X/Twitter).
14. **Interactive Discussion Section**: Authenticated member discussion and feedback thread.
15. **Sticky Share Toolbar**: Fixed social sharing widget (X/Twitter, LinkedIn, Copy Direct Link).

---

## 🎨 Sanity Studio Headless CMS (`studio-techniccal`)

Editorial dispatches can be authored and managed in real-time via **Sanity Studio v3**:

- **Project ID**: `pbxpf8xj`
- **Dataset**: `production`
- **Studio Deployment**: [https://techniccal.sanity.studio](https://techniccal.sanity.studio)

### Sanity TypeScript Schemas
1. `article`: Title, slug, excerpt, content, cover image, category reference, author reference, tags, reading time, status (`published`, `draft`, `archived`), featured flag, pinned flag.
2. `category`: Category title, slug, color accent, description.
3. `author`: Author name, slug, avatar image, bio, role title.
4. `subscriber`: Newsletter subscriber email registry, active status, subscription timestamp.
5. `settings`: Global site title, description, social links, and maintenance flags.

### GROQ Query Engine Integration
The client uses transparent GROQ queries in `client/src/lib/sanity.ts` filtering drafts automatically (`!(_id in path("drafts.**"))`):

```groq
*[_type == "article" && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  "coverImage": coverImage.asset->url,
  "category": category->name,
  tags,
  publishedAt,
  readingTime,
  featured,
  pinned,
  status,
  "author": author->{
    name,
    "avatar": avatar.asset->url,
    bio,
    role
  }
}
```

### Sanity CORS Configuration Commands
To enable API requests from development and production environments, configure CORS rules in `studio-techniccal`:

```bash
cd studio-techniccal

# Allow local frontend development server
npx sanity cors add http://localhost:5173 --credentials

# Allow production domain origins
npx sanity cors add https://techniccal.com --credentials
npx sanity cors add https://www.techniccal.com --credentials
npx sanity cors add https://techniccal.sanity.studio --credentials
```

---

## 👑 5-Tier Role-Based Access Control (RBAC)

Techniccal features granular, 5-tier role-based access control enforced across both frontend route guards and Express API endpoints:

| Role | Access Level | Description & Scope of Privileges |
| :--- | :--- | :--- |
| **Reader** | Public Website | Unauthenticated reader. Browse articles, search library, view category feeds, subscribe to newsletter. |
| **Member** | Reader Track | Authenticated user. Personal profile portal (`/account`), saved reading list, email preferences. |
| **Editor** | Admin Track | Staff content author. CMS access: Draft articles, edit assigned content, upload media assets. |
| **Admin** | Admin Track | Editorial director. CMS access: Publish, feature, pin, or delete articles, manage categories & subscribers. |
| **Super Admin** | System Admin | System owner. Full platform access: Manage team members and RBAC role assignments (`/admin/users`), system settings. |

---

## 🔐 Security & Authentication Architecture

1. **Dual-Token System (Access + Refresh Tokens)**:
   - **Access Token**: Short-lived (15-minute expiration), sent via standard `Authorization: Bearer <accessToken>` headers.
   - **Refresh Token**: Long-lived (7-day expiration), securely stored in an `httpOnly`, `sameSite: 'lax'`, `secure` cookie.
   - **Token Rotation**: Every refresh token request invalidates the previous refresh token and issues a newly rotated cookie to prevent replay attacks.
2. **Dedicated Admin Endpoint (`POST /api/auth/admin/login`)**:
   - Administrative login enforces strict verification of `EDITOR`, `ADMIN`, or `SUPER_ADMIN` roles prior to issuing elevated admin sessions.
3. **Cryptographic SHA-256 Token Protection**:
   - Email verification tokens and password reset tokens are generated using 32-byte crypto hex keys and stored exclusively as SHA-256 hashes (`emailVerificationTokenHash`, `resetPasswordToken`). Raw tokens are delivered strictly via secure email links.

---

## ⚙️ Environment Variables Reference

### 1. Master Root Configuration (`.env`)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://127.0.0.1:27017/techniccal-blog
JWT_ACCESS_SECRET=techniccal-local-access-secret-2026
JWT_REFRESH_SECRET=techniccal-local-refresh-secret-2026
VITE_SANITY_PROJECT_ID=pbxpf8xj
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-03-01
VITE_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend Environment (`client/.env`)
```env
VITE_SANITY_PROJECT_ID=pbxpf8xj
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-03-01
VITE_API_URL=http://localhost:5000
```

### 3. Backend Secrets (`server/.env`)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://127.0.0.1:27017/techniccal-blog
JWT_ACCESS_SECRET=techniccal-local-access-secret-2026
JWT_REFRESH_SECRET=techniccal-local-refresh-secret-2026
SANITY_PROJECT_ID=pbxpf8xj
SANITY_DATASET=production
SANITY_API_TOKEN=sk-local-dev-sanity-token
FRONTEND_URL=http://localhost:5173
```

---

## ☁️ Production Deployment Guides

### 1. Railway Backend Deployment (`server`)
1. Connect your GitHub repository `tech-blog` to Railway.
2. In Service Settings, set **Root Directory** to `server`.
3. Configure production variables in Railway **Variables** (`DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`, `SANITY_PROJECT_ID`, `SANITY_DATASET`).
4. Generate a public URL under **Networking** (e.g. `https://tech-blog-server.up.railway.app`).

> For full Railway deployment details, refer to [`RAILWAY_DEPLOYMENT.md`](file:///c:/Users/91994/Desktop/Projects/tech-blog/RAILWAY_DEPLOYMENT.md).

### 2. Sanity Studio Deployment (`studio-techniccal`)
```bash
cd studio-techniccal
npx sanity deploy
```
Studio will be built and hosted at `https://techniccal.sanity.studio`.

---

## 🚀 Quickstart & Local Development

### 1. API Backend Server Setup (`server`)
```bash
cd server
npm install
npm run seed     # Seeds local database with initial test users, articles & categories
npm run dev      # Starts Express REST API at http://localhost:5000
```

### 2. Web Application Setup (`client`)
```bash
cd client
npm install
npm run dev      # Starts React 19 + Vite 6 frontend at http://localhost:5173
```

### 3. Sanity Studio CMS Setup (`studio-techniccal`)
```bash
cd studio-techniccal
npm install
npm run dev      # Starts Sanity Studio CMS at http://localhost:3333
```

---

## 🔑 Seed Test Accounts & Production Management

### 🛠️ Local Development Seed Accounts
When running in local development mode (`npm run seed`), the database is populated with test accounts for each RBAC tier:

```bash
cd server
npm run seed
```

| Role | Email | Default Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@techniccal.com` | `SuperAdminPass2026!` | Complete System & RBAC User Management |
| **Admin** | `admin@techniccal.com` | `AdminPass2026!` | Article Publishing, Categories & Subscriptions |
| **Editor** | `editor@techniccal.com` | `EditorPass2026!` | Draft Editing & Media Management |
| **Member** | `member@techniccal.com` | `MemberPass2026!` | Profile Portal & Saved Reading List |
| **Reader** | `reader@techniccal.com` | `ReaderPass2026!` | Standard Reading Access |

---

### 🛡️ Production Database Utilities

> [!CAUTION]
> `npm run seed` automatically aborts when `NODE_ENV=production` to protect production databases against unintended account creations or data overwrites.

#### 1. Provision a Production Super Admin Account
To create a production Super Admin with custom secure credentials, run:
```bash
cd server
ADMIN_EMAIL="admin@techniccal.com" ADMIN_PASSWORD="your-secure-production-password" npm run create-admin
```

#### 2. Purge Test Accounts from Database
To remove default seeded test accounts from a target environment:
```bash
cd server
npm run purge-test-accounts
```

---

### 📄 License & Attribution

Designed and engineered for **Techniccal — Software Architecture, AI & Engineering Journal**. All rights reserved.