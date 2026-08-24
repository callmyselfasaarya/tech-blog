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

### Sanity TypeScript Schemas
1. `article`: Title, slug, excerpt, content, cover image, category reference, author reference, tags, reading time, status (`published`, `draft`, `archived`), featured, pinned.
2. `category`: Category name, slug, description.
3. `author`: Author name, slug, avatar image, bio, role.
4. `subscriber`: Newsletter subscriber records and status.
5. `settings`: Global site title and publication description.

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