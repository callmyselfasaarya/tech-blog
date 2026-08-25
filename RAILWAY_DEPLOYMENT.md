# 🚂 Railway Backend Deployment Guide

This guide walks you through deploying the **Techniccal API Server** (`server/`) to **Railway** in under 2 minutes.

---

## 🛠 Step 1: Connect Repository to Railway

1. Go to [railway.app](https://railway.app/) and log in to your account.
2. Click **+ New Project** -> Select **Deploy from GitHub repo**.
3. Choose your repository: `callmyselfasaarya/tech-blog`.

---

## ⚙️ Step 2: Configure Service Root Directory

Since this repository is a monorepo containing `client/`, `server/`, and `studio-techniccal/`, configure Railway to target the `server/` directory:

1. Click on your deployed service block in the Railway canvas.
2. Go to the **Settings** tab.
3. Scroll down to **Root Directory**.
4. Set **Root Directory** to: `server`
5. Railway will automatically detect Node.js, run `npm install`, and launch using `node server.js` (`npm start`).

---

## 🔑 Step 3: Add Production Environment Variables

1. Navigate to the **Variables** tab of your service in Railway.
2. Click **Raw Editor** and paste the following environment variables:

```env
NODE_ENV=production
DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/techniccal-blog?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your-production-access-token-secret-2026
JWT_REFRESH_SECRET=your-production-refresh-token-secret-2026
SANITY_PROJECT_ID=pbxpf8xj
SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-write-api-token
FRONTEND_URL=https://techniccal.com
```

3. Click **Save and Deploy**.

---

## 🌐 Step 4: Generate Public Domain & Connect Frontend

1. Go to **Settings** -> **Networking** -> Click **Generate Domain**.
2. Railway will generate a public HTTPS URL for your backend API server (e.g. `https://tech-blog-server.up.railway.app`).
3. Copy this Railway backend domain URL.
4. Update your frontend environment variable (in Vercel/Netlify or `client/.env`):
   ```env
   VITE_API_URL=https://tech-blog-server.up.railway.app
   ```

---

## 🏥 Automated Health Check

The backend server exposes `/health` and `/api/health`. Railway will automatically poll `https://<your-railway-domain>/health` to verify zero-downtime deployment health.
