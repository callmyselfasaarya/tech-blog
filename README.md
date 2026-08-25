# Techniccal — Software Architecture, AI & Engineering Journal

> **Techniccal** is a modern, high-signal technology publication and headless CMS platform built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and Sanity Studio v3.

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
  - **Editorial & Body**: `Source Serif 4` (Serif Accent for long-form reading)
  - **Interface UI**: `Inter`
  - **Code & Specs**: `JetBrains Mono`

---

## 🏛️ Directory Structure & Workspace Architecture

```text
tech-blog/ (Workspace Root)
├── client/                 # Web Application (React 18 + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/     # UI, Layout, Logo & Navigation components
│   │   ├── context/        # Auth, Theme, and Lenis smooth scroll providers
│   │   ├── data/           # Initial mock datasets & fallbacks
│   │   ├── lib/            # Sanity client & GROQ query helpers
│   │   ├── pages/          # Public editorial views & member portal
│   │   ├── services/       # Unified API client service layer
│   │   └── types/          # TypeScript interfaces & types
│   └── package.json
│
├── server/                 # Production API Backend (Express + MongoDB + JWT Auth)
│   ├── middleware/         # Auth & RBAC guard middlewares
│   ├── models/             # Mongoose schemas (User, Article, Category, Subscriber, Media)
│   ├── routes/             # REST routes (auth, articles, categories, newsletter, user, media)
│   ├── uploads/            # Media assets storage directory
│   ├── server.js           # Production Express server entry point
│   ├── seed.js             # Database seeding script for initial setup
│   └── package.json
│
├── studio-techniccal/      # Standalone Headless CMS (Sanity Studio v3)
│   ├── schemaTypes/        # Sanity TypeScript schemas (article, category, author, subscriber, settings)
│   ├── sanity.config.ts    # Studio configuration (Project: pbxpf8xj, Dataset: production)
│   ├── sanity.cli.ts       # CLI options & deployment config
│   └── package.json
│
├── .env.example            # Master environment variable template
└── README.md               # Master Project Documentation

```

---

## 🎨 Sanity Studio Headless CMS (`studio-techniccal`)

Content for Techniccal is authored and managed via **Sanity Studio v3**:

- **Project ID**: `pbxpf8xj`
- **Dataset**: `production`
- **Studio Directory**: `./studio-techniccal`

### Sanity CORS Origins Management

Sanity requires explicit, trusted CORS origins for browser applications accessing the Content Lake:

```bash
cd studio-techniccal

# 1. Local Development Origin (Allow credentials)
npx sanity cors add http://localhost:5173 --credentials

# 2. Production Domain Origins (Explicit non-wildcard origins)
npx sanity cors add https://techniccal.com --credentials
npx sanity cors add https://www.techniccal.com --credentials
npx sanity cors add https://techniccal.sanity.studio --credentials

# 3. List active CORS Origins
npx sanity cors list
```

> [!WARNING]
> **Avoid Broad Wildcards**: Never use broad wildcards like `https://*.vercel.app` for authenticated requests. Sanity explicitly warns against broad wildcard origins with credentials to prevent token leakage and unauthorized cross-origin requests.


### Running Sanity Studio
```bash
cd studio-techniccal
npm install
npm run dev
```
Studio will launch locally at `http://localhost:3333`.

---

## 👑 5-Tier Role-Based Access Control (RBAC)

Techniccal enforces a strict 5-tier role hierarchy across the frontend and API layers:

```text
                    TECHNICCAL
                         │
              ┌──────────┴──────────┐
              │                     │
        Public Website          Authentication
              │                     │
       Articles / Search       ┌────┴─────┐
       Categories / About      │           │
       Newsletter             Reader      Admin
                                │           │
                             Member       Editor
                                           │
                                        Admin
                                           │
                                      Super Admin
```

### Access Control Matrix

| Role | Access Level | Description & Privileges |
| :--- | :--- | :--- |
| **Reader** | Public Website | Browse articles, view categories, search dispatches, read newsletter issues. |
| **Member** | Reader Track | Signed-in reader profile, saved articles reading list (`/account`), newsletter settings. |
| **Editor** | Admin Track | CMS Access: Create and edit draft articles, upload media items. |
| **Admin** | Admin Track | CMS Access: Create, edit, publish, pin, delete articles, manage categories & subscribers. |
| **Super Admin** | System Admin | Full system control: Manage team users & roles (`/admin/users`), RBAC configuration. |

---

## 🔐 Security Architecture

1. **Dual-Token System (Access + Refresh Tokens)**:
   - **Access Token**: 15-minute lifespan, transmitted via `Authorization: Bearer <accessToken>` header.
   - **Refresh Token**: 7-day lifespan, stored in a secure `httpOnly`, `sameSite: 'lax'` cookie.
   - **Token Rotation**: Each refresh invalidates the previous refresh token and issues a rotated refresh token cookie to prevent replay attacks.
2. **Dedicated Admin Authentication (`POST /api/auth/admin/login`)**:
   - Separate endpoint that explicitly verifies `EDITOR`, `ADMIN`, or `SUPER_ADMIN` role privileges before issuing administrative sessions. Rejects `MEMBER` or `READER` roles with `403 Forbidden`.
3. **SHA-256 Hashed Email Verification**:
   - Verification tokens are generated using 32-byte crypto hex and hashed with SHA-256 before persisting (`emailVerificationTokenHash`). Raw tokens are never stored in the database.
4. **Rate Limiting**:
   - Sliding-window IP-based rate limiter protects authentication routes against brute-force attempts.

---

## ✨ Features & Pages

- **Editorial Home (`/`)**: Featured hero article, pinned blueprints, latest dispatches, and newsletter signup.
- **Article Reader (`/article/:slug`)**: High-readability serif typography, reading progress bar, code syntax highlighting, author details.
- **Category Feeds (`/ai`, `/programming`, `/career`, `/tools`)**: Topic-specific dispatches and category navigation.
- **Global Search (`Cmd+K`)**: Instant search overlay filtering articles across title, excerpt, category, and tags.
- **Member Portal (`/account`)**: User account dashboard, saved articles reading list, and newsletter preferences.
- **Security Views**: Password Reset (`/reset-password?token=...`) and Email Verification (`/verify-email?token=...`).

---

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

### Quick Railway Deployment Setup

1. **Link Repository to Railway**: Connect GitHub repo `tech-blog`.
2. **Set Root Directory**: In Railway Service Settings, set **Root Directory** to `server`.
3. **Add Environment Variables**: In Railway **Variables** tab, add `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`, `SANITY_PROJECT_ID`, `SANITY_DATASET`.
4. **Generate Public Domain**: In Railway **Networking**, click **Generate Domain** (e.g. `https://tech-blog-server.up.railway.app`).

For detailed step-by-step instructions, view [RAILWAY_DEPLOYMENT.md](file:///c:/Users/91994/Desktop/Projects/tech-blog/RAILWAY_DEPLOYMENT.md).