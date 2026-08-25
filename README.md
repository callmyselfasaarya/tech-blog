# Techniccal — Software Architecture, AI & Engineering Journal

> **Techniccal** is a modern, production-grade technology publication and headless CMS platform. Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Express.js, MongoDB, and Sanity Studio v3.

---

## 📌 Table of Contents

- [🌟 Overview \& Mission](#-overview--mission)
- [🎨 Brand Identity \& Design System](#-brand-identity--design-system)
- [🏛️ Workspace Monorepo Architecture](#-workspace-monorepo-architecture)
- [🗺️ Complete Website Route Hierarchy](#-complete-website-route-hierarchy)
- [📝 15-Point Article Anatomy Specification](#-15-point-article-anatomy-specification)
- [🎨 Sanity Studio Headless CMS (`studio-techniccal`)](#-sanity-studio-headless-cms-studio-techniccal)
- [👑 5-Tier Role-Based Access Control (RBAC)](#-5-tier-role-based-access-control-rbac)
- [🔐 Security \& Authentication Architecture](#-security--authentication-architecture)
- [⚙️ Environment Variables Reference](#️-environment-variables-reference)
- [☁️ Production Deployment Guides](#️-production-deployment-guides)
- [🚀 Quickstart \& Local Development](#-quickstart--local-development)
- [🔑 Seed Test Accounts](#-seed-test-accounts)

---

## 🌟 Overview & Mission

**Techniccal** delivers high-signal, deep-dive engineering blueprints, software architecture patterns, machine learning insights, and career strategies. It is architected for maximum speed, security, and editorial clarity.

- **Frontend**: React 18 + Vite + TypeScript SPA with Framer Motion micro-animations and Lenis smooth scrolling.
- **Backend API**: Express.js REST API with MongoDB/Mongoose ORM, JWT dual-token authentication, and role-based access control.
- **Headless CMS**: Sanity Studio v3 (`pbxpf8xj` / `production`) for real-time editorial content authoring.

---

## 🎨 Brand Identity & Design System

Techniccal features a precision design system built around an engineering grid aesthetic:

- **Geometric T Monogram**: Custom SVG vector monogram constructed on an engineering grid.
- **Brand Color Palette**:
  - **Deep Black**: `#1C1C1E` (Primary dark background & text)
  - **Warm White**: `#F6F5F0` (Editorial paper background)
  - **Soft Gray**: `#E1E1E1` (Borders & dividers)
  - **Graphite Blue**: `#4C586F` (Technical accents)
  - **Muted Electric Blue**: `#3B719F` (Interactive elements)
- **Typography System**:
  - **Headings & Display**: `Manrope` (Geometric Sans)
  - **Editorial Body**: `Source Serif 4` (High-readability serif accent)
  - **Interface UI**: `Inter`
  - **Code & Technical Specs**: `JetBrains Mono`

---

## 🏛️ Workspace Monorepo Architecture

```text
tech-blog/ (Workspace Root)
├── client/                 # Web Application (React 18 + Vite + Tailwind CSS + TypeScript)
│   ├── src/
│   │   ├── admin/          # Admin CMS management views & dashboards
│   │   ├── components/     # UI, Layout, Logo, Navigation & Article components
│   │   ├── context/        # Auth, Theme, and Lenis smooth scroll providers
│   │   ├── data/           # Initial mock datasets & fallbacks
│   │   ├── lib/            # Sanity client & GROQ query helpers (sanity.ts)
│   │   ├── pages/          # Public editorial views & member portal
│   │   ├── services/       # Unified API client service layer (api.ts)
│   │   ├── types/          # TypeScript interfaces & type definitions
│   │   └── vite-env.d.ts   # Vite environment variable type declarations
│   ├── .env.example        # Client environment variable template
│   └── package.json
│
├── server/                 # Production REST API Backend (Express + MongoDB + JWT Auth)
│   ├── middleware/         # Auth & RBAC guard middlewares (authMiddleware.js)
│   ├── models/             # Mongoose schemas (User, Article, Category, Subscriber, Media)
│   ├── routes/             # REST API routes (auth, articles, categories, newsletter, user, media)
│   ├── uploads/            # Media assets storage directory
│   ├── .env.example        # Server secret environment template
│   ├── railway.json        # Service-level Railway deployment configuration
│   ├── Procfile            # Web process start specification
│   ├── seed.js             # Database seeding script for initial setup
│   ├── server.js           # Production Express server entry point (0.0.0.0 binding)
│   └── package.json
│
├── studio-techniccal/      # Standalone Headless CMS (Sanity Studio v3)
│   ├── schemaTypes/        # Sanity TypeScript schemas (article, category, author, subscriber, settings)
│   ├── sanity.config.ts    # Studio configuration (Project: pbxpf8xj, Dataset: production)
│   ├── sanity.cli.ts       # CLI options & deployment config (studioHost: techniccal)
│   └── package.json
│
├── .env.example            # Master root environment template
├── .gitignore              # Git ignore rules protecting all .env files and build outputs
├── Procfile                # Master Railway / Heroku process declaration
├── railway.json            # Master Railway deployment configuration
├── RAILWAY_DEPLOYMENT.md   # Step-by-step Railway backend deployment guide
└── README.md               # Master Project Documentation
```

---

## 🗺️ Complete Website Route Hierarchy

Techniccal enforces the following clean URL route structure:

```text
techniccal.com
│
├── /                       # Homepage (Hero dispatch, featured blueprints, latest articles, newsletter)
├── /blog                   # All Articles Library (Filter by search query & category tags)
├── /ai                     # AI & Machine Learning Dispatches
├── /programming            # Software Architecture & Programming Articles
├── /career                 # Tech Careers, Software Engineering Roles & Interviews
├── /projects               # Hands-On Project Blueprints & Technical Tutorials
├── /tools                  # Essential Developer Tools & Productivity Workflows
├── /newsletter             # Newsletter Archive & Direct Email Dispatch Subscription
├── /about                  # Editorial Mission, Vision, and Core Contributors
├── /contact                # Inquiries, Sponsorships & Editorial Contacts
│
├── /article/:slug          # Individual Article Post Reader (15-point specification)
├── /account                # Member Profile Portal (Saved reading list, newsletter preferences)
├── /login                  # Member Sign In
├── /register               # Member Registration
├── /forgot-password        # Password Reset Request
├── /reset-password         # Hashed Password Reset Confirmation View
├── /verify-email           # Email Verification Confirmation View
│
└── /admin                  # Administrative CMS Management Portal (Requires Admin / Editor Role)
    ├── /admin/login        # Dedicated Admin Authentication
    ├── /admin/articles     # Article Content Management & Publishing
    ├── /admin/categories   # Category Taxonomy Editor
    ├── /admin/subscribers  # Subscriber List & Export Tools
    └── /admin/users        # RBAC User Role Management (Super Admin only)
```

---

## 📝 15-Point Article Anatomy Specification

Every published dispatch at `/article/:slug` adheres strictly to this 15-point architectural standard:

1. **Title**: Clear, high-impact headline.
2. **Author**: Author avatar, name, and publication role (`AuthorInfo`).
3. **Published Date**: Exact ISO publication timestamp and relative time formatting.
4. **Updated Date**: Revision timestamp ensuring technical accuracy.
5. **Featured Image**: High-resolution cover photo with optimized aspect ratio and image captions.
6. **Introduction**: Executive summary abstract framing key technical takeaways.
7. **Table of Contents**: Sticky desktop sidebar + collapsible mobile drawer TOC with smooth heading jump links.
8. **Main Content**: Rich editorial content rendered with high-readability typography (`Source Serif 4`).
9. **Code Examples**: `JetBrains Mono` code blocks with syntax highlighting and instant one-click copy button.
10. **Images / Diagrams**: Interactive architectural diagrams, flowcharts, and technical screenshots.
11. **Related Articles**: 3-column curated grid of contextual follow-up dispatches.
12. **Newsletter CTA**: Dedicated inline email subscription box.
13. **Author Information Card**: Expanded author bio, credentials, and social links (X/Twitter, GitHub, LinkedIn).
14. **Comments / Discussion**: Community discussion board with member authentication.
15. **Share Buttons**: Sticky social sharing bar (X/Twitter, LinkedIn, Copy Link).

---

## 🎨 Sanity Studio Headless CMS (`studio-techniccal`)

Editorial content is managed in real-time via **Sanity Studio v3**:

- **Project ID**: `pbxpf8xj`
- **Dataset**: `production`
- **Studio Host**: [https://techniccal.sanity.studio](https://techniccal.sanity.studio)

### Sanity TypeScript Schemas
1. `article`: Title, slug, excerpt, content, cover image, category reference, author reference, tags, reading time, status (`published`, `draft`, `archived`), featured, pinned.
2. `category`: Category name, slug, description.
3. `author`: Author name, slug, avatar image, bio, role.
4. `subscriber`: Newsletter subscriber records and status.
5. `settings`: Global publication metadata.

### Transparent GROQ Query Strategy
In `client/src/lib/sanity.ts`, `ALL_ARTICLES` queries all published documents using `!(_id in path("drafts.**"))`:

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

### Sanity CORS Origins Management
```bash
cd studio-techniccal

# 1. Local Development Origin (Allow credentials)
npx sanity cors add http://localhost:5173 --credentials

# 2. Production Domain Origins
npx sanity cors add https://techniccal.com --credentials
npx sanity cors add https://www.techniccal.com --credentials
npx sanity cors add https://techniccal.sanity.studio --credentials
```

---

## 👑 5-Tier Role-Based Access Control (RBAC)

Techniccal enforces a strict 5-tier role hierarchy across the frontend and API layers:

| Role | Access Level | Description & Privileges |
| :--- | :--- | :--- |
| **Reader** | Public Website | Browse articles, view categories, search dispatches, read newsletter issues. |
| **Member** | Reader Track | Signed-in profile, saved reading list (`/account`), newsletter preferences. |
| **Editor** | Admin Track | CMS Access: Create and edit draft articles, upload media items. |
| **Admin** | Admin Track | CMS Access: Create, edit, publish, pin, delete articles, manage categories & subscribers. |
| **Super Admin** | System Admin | Full system control: Manage team users & roles (`/admin/users`), system settings. |

---

## 🔐 Security & Authentication Architecture

1. **Dual-Token System (Access + Refresh Tokens)**:
   - **Access Token**: 15-minute lifespan, transmitted via `Authorization: Bearer <accessToken>` header.
   - **Refresh Token**: 7-day lifespan, stored in a secure `httpOnly`, `sameSite: 'lax'` cookie.
   - **Token Rotation**: Each refresh invalidates the previous refresh token and issues a rotated refresh token cookie.
2. **Dedicated Admin Authentication (`POST /api/auth/admin/login`)**:
   - Separate endpoint that explicitly verifies `EDITOR`, `ADMIN`, or `SUPER_ADMIN` privileges before issuing administrative sessions.
3. **SHA-256 Hashed Email Verification & Password Resets**:
   - Security tokens are generated using 32-byte crypto hex and hashed with SHA-256 (`emailVerificationTokenHash`, `resetPasswordToken`). Raw tokens are never stored in the database.

---

## ⚙️ Environment Variables Reference

### Frontend Public Environment (`client/.env`)
```env
VITE_SANITY_PROJECT_ID=pbxpf8xj
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-03-01
VITE_API_URL=http://localhost:5000
```

### Backend Private Secrets (`server/.env`)
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
1. Connect GitHub repo `tech-blog` to Railway.
2. In Service Settings, set **Root Directory** to `server`.
3. Add production environment variables in the Railway **Variables** tab (`DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`, `SANITY_PROJECT_ID`, `SANITY_DATASET`).
4. Generate domain in **Networking** (e.g. `https://tech-blog-server.up.railway.app`).

> For full Railway steps, see `RAILWAY_DEPLOYMENT.md`.

### 2. Sanity Studio Deployment (`studio-techniccal`)
```bash
cd studio-techniccal
npx sanity deploy
```
Studio will deploy to `https://techniccal.sanity.studio`.

---

## 🚀 Quickstart & Local Development

### 1. API Backend Server (`server`)
```bash
cd server
npm install
npm run seed     # Populate database with initial users, articles & categories
npm run dev      # Start Express API server at http://localhost:5000
```

### 2. Web Application (`client`)
```bash
cd client
npm install
npm run dev      # Start React Vite frontend at http://localhost:5173
```

### 3. Sanity Studio (`studio-techniccal`)
```bash
cd studio-techniccal
npm install
npm run dev      # Start Sanity Studio v3 CMS at http://localhost:3333
```

---

## 🔑 Seed Test Accounts & Production Management

### 🛠️ Local Development Seeding
During development, populate your local database with initial mock articles, categories, and test accounts:
```bash
cd server
npm run seed
```

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@techniccal.com` | `SuperAdminPass2026!` | Complete System Control |
| **Admin** | `admin@techniccal.com` | `AdminPass2026!` | Content Publishing & Categories |
| **Editor** | `editor@techniccal.com` | `EditorPass2026!` | Draft Editing & Media Uploads |
| **Member** | `member@techniccal.com` | `MemberPass2026!` | Profile & Saved Articles List |
| **Reader** | `reader@techniccal.com` | `ReaderPass2026!` | Standard Reading Access |

---

### 🛡️ Production Database Workflow

> [!CAUTION]
> `npm run seed` automatically aborts in production (`NODE_ENV=production`) to prevent accidental default account creation or database overwrites.

#### 1. Create a Production Super Admin (Custom Credentials)
Execute `create-admin` with custom environment variables:
```bash
cd server
ADMIN_EMAIL="admin@techniccal.com" ADMIN_PASSWORD="your-secure-production-password" npm run create-admin
```

#### 2. Purge Development Test Accounts from Production
If default test accounts were migrated or seeded previously, purge them instantly:
```bash
cd server
npm run purge-test-accounts
```