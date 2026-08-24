# Techniccal — Software Architecture, AI & Engineering Journal

> **Techniccal** is a modern, high-signal technology publication and full-stack editorial blog platform built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Node.js, Express, and MongoDB.

---

## 🎨 Brand Identity & Design System

Techniccal features a precision design system based on official brand guidelines:

- **Geometric T Monogram**: A custom SVG vector monogram constructed on a geometric engineering grid.
- **Brand Palette**:
  - **Deep Black**: `#1C1C1E`
  - **Warm White**: `#F6F5F0`
  - **Soft Gray**: `#E1E1E1`
  - **Graphite Blue**: `#4C586F`
  - **Muted Electric Blue**: `#3B719F`
- **Typography System**:
  - **Headings & Display**: `Manrope` (Geometric Sans)
  - **Editorial & Body**: `Source Serif 4` (Serif Accent & Long-Form Reading)
  - **Interface UI**: `Inter`
  - **Code & Specs**: `JetBrains Mono`

---

## ✨ Features

- 📰 **Framer Memoir Inspired UI**: Warm off-white editorial aesthetic with a 3-column card grid, smooth hover arrows (`↗`), and sticky navigation sidebar.
- ⚡ **Dual-Mode Data Architecture**: Queries the Node/Express MongoDB REST API with instant, automatic `localStorage` fallback for offline or zero-configuration development.
- 🏷️ **Engineering Categories**: `Software Architecture`, `AI & Machine Learning`, `Systems Design`, `Cloud Infrastructure`, and `Developer Tools`.
- 📖 **Long-Form Reading Experience**: Reading time calculation, dynamic Table of Contents (TOC), social sharing, and related essay recommendations.
- 📬 **Techniccal Insider Membership**: Newsletter subscription widget, work email capture, and dedicated member sign-up flow.
- 🛠️ **Full CMS Admin Dashboard (`/admin`)**:
  - **Article Management**: Create, edit, publish, draft, pin, and delete technical articles.
  - **Category Manager**: Create and manage technical category tags.
  - **Subscriber Manager**: Track active newsletter dispatches and subscribers.
  - **Media Library**: Asset upload and management.
- 🌓 **Dark & Light Mode**: Seamless theme switcher preserving reader preference.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom CSS Design Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom Techniccal Vector Monogram
- **Routing**: React Router DOM v6

### Backend (`/server`)
- **Core**: Node.js, Express.js
- **Database**: MongoDB / Mongoose (with fallback local store)
- **Middleware**: CORS, Morgan logging, Express JSON parser

---

## 📁 Repository Structure

```
tech-blog/
├── client/                     # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── admin/             # CMS Admin Dashboard Components
│   │   ├── components/        # Layout, Blog, and UI Components
│   │   │   ├── blog/          # ArticleList, ArticleCard, ArticleHeader
│   │   │   ├── layout/        # Sidebar, MobileHeader, Footer
│   │   │   └── ui/            # TechniccalLogo, Monogram & Wordmark
│   │   ├── context/           # Theme Context Provider
│   │   ├── data/              # Initial Technical Mock Articles & Seed Data
│   │   ├── pages/             # Home, About, ArticlePage, SignUp, Letters
│   │   ├── services/          # REST API Service & LocalStorage Fallback Store
│   │   └── types/             # TypeScript Interfaces & Definitions
│   ├── index.html             # Google Fonts & SEO Meta Configuration
│   └── package.json
│
├── server/                     # Backend REST API (Node + Express)
│   ├── seed.js                # MongoDB Database Seeder (Techniccal Articles)
│   ├── server.js              # Express REST Endpoints
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

---

### 1. Installation

Clone the repository and install dependencies for both `client` and `server`:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

### 2. Running Locally

You can run both the client frontend and Express backend concurrently:

#### Start Frontend (Client)
```bash
cd client
npm run dev
```
The client app will launch at `http://localhost:5173/`.

#### Start Backend (Server)
```bash
cd server
npm start
```
The Express backend server will run at `http://localhost:5000/`.

---

### 3. Database Seeding (Optional)

To seed your local MongoDB database with initial Techniccal articles and categories:

```bash
cd server
node seed.js
```

> **Note**: If MongoDB is not running locally, the application automatically falls back to in-memory `localStorage` mock data so you can test the frontend seamlessly without database configuration.

<!-- ---

## 🔐 Admin Credentials

Access the publication CMS at `http://localhost:5173/admin/login`:

- **Email**: `editor@techniccal.com` (or `admin@aether.blog`)
- **Password**: `admin123` -->
