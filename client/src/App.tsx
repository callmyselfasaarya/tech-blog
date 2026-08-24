import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { LenisProvider } from './context/LenisContext';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Lazy Loaded Layout & Overlay Components
const MobileHeader = lazy(() => import('./components/layout/MobileHeader').then((m) => ({ default: m.MobileHeader })));
const SearchModal = lazy(() => import('./components/blog/SearchModal').then((m) => ({ default: m.SearchModal })));

// Home Page (Loaded synchronously for instant initial load)
import { Home } from './pages/Home';

// Lazy Loaded Public Pages
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const ToolsPage = lazy(() => import('./pages/ToolsPage').then((m) => ({ default: m.ToolsPage })));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage').then((m) => ({ default: m.NewsletterPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Letters = lazy(() => import('./pages/Letters').then((m) => ({ default: m.Letters })));
const Archive = lazy(() => import('./pages/Archive').then((m) => ({ default: m.Archive })));
const SignUp = lazy(() => import('./pages/SignUp').then((m) => ({ default: m.SignUp })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

// Lazy Loaded Admin CMS Components
const AdminLayout = lazy(() => import('./admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const Login = lazy(() => import('./admin/Login').then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import('./admin/Dashboard').then((m) => ({ default: m.Dashboard })));
const ArticlesManager = lazy(() => import('./admin/ArticlesManager').then((m) => ({ default: m.ArticlesManager })));
const ArticleEditor = lazy(() => import('./admin/ArticleEditor').then((m) => ({ default: m.ArticleEditor })));
const CategoriesManager = lazy(() => import('./admin/CategoriesManager').then((m) => ({ default: m.CategoriesManager })));
const MediaManager = lazy(() => import('./admin/MediaManager').then((m) => ({ default: m.MediaManager })));
const NewsletterManager = lazy(() => import('./admin/NewsletterManager').then((m) => ({ default: m.NewsletterManager })));
const Settings = lazy(() => import('./admin/Settings').then((m) => ({ default: m.Settings })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>
        <ThemeProvider>
          <Suspense fallback={<div className="min-h-screen bg-[#F4F2F0] dark:bg-[#161514]" />}>
            {isAdminRoute ? (
              /* Admin CMS Routing Frame */
              <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="articles" element={<ArticlesManager />} />
                  <Route path="articles/new" element={<ArticleEditor />} />
                  <Route path="articles/edit/:id" element={<ArticleEditor />} />
                  <Route path="categories" element={<CategoriesManager />} />
                  <Route path="media" element={<MediaManager />} />
                  <Route path="newsletter" element={<NewsletterManager />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            ) : (
              /* Public Editorial Reader Frame */
              <div className="min-h-screen flex flex-col lg:flex-row bg-[#F4F2F0] dark:bg-[#161514] text-[#1A1918] dark:text-[#F4F2F0] transition-colors duration-300">
                {/* Desktop Fixed Left Sidebar */}
                <div className="hidden lg:block">
                  <Sidebar onOpenSearch={() => setIsSearchOpen(true)} />
                </div>

                {/* Mobile Top Header Navigation */}
                <MobileHeader onOpenSearch={() => setIsSearchOpen(true)} />

                {/* Main Center Editorial Content Area */}
                <main className="flex-1 min-w-0 min-h-screen flex flex-col justify-between">
                  <div>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route
                        path="/ai"
                        element={
                          <CategoryPage
                            category="AI"
                            title="AI & Machine Learning"
                            description="Deep explorations of LLM inference engines, vector indexing, neural retrieval, and agentic workflows."
                          />
                        }
                      />
                      <Route
                        path="/programming"
                        element={
                          <CategoryPage
                            category="Programming"
                            title="Software Architecture & Systems"
                            description="Technical dispatches on high-throughput systems, Go concurrency, Rust safety, and distributed databases."
                          />
                        }
                      />
                      <Route
                        path="/career"
                        element={
                          <CategoryPage
                            category="Career"
                            title="Engineering Career & Culture"
                            description="Actionable insights on tech leadership, system design interview prep, and scaling high-performing engineering teams."
                          />
                        }
                      />
                      <Route
                        path="/projects"
                        element={
                          <CategoryPage
                            category="Projects"
                            title="Project Tutorials & Code Walkthroughs"
                            description="Step-by-step technical guides, open-source repository builds, and hands-on system blueprints."
                          />
                        }
                      />
                      <Route path="/tools" element={<ToolsPage />} />
                      <Route path="/newsletter" element={<NewsletterPage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/article/:slug" element={<ArticlePage />} />
                      <Route path="/letters" element={<Letters />} />
                      <Route path="/archive" element={<Archive />} />
                      <Route path="/sign-up" element={<SignUp />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>

                  {/* Editorial Footer */}
                  <div className="max-w-4xl mx-auto w-full px-4 sm:px-8">
                    <Footer />
                  </div>
                </main>

                {/* Global Search Command Overlay (Cmd+K) - Only loaded when search is opened */}
                {isSearchOpen && (
                  <Suspense fallback={null}>
                    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                  </Suspense>
                )}
              </div>
            )}
          </Suspense>
        </ThemeProvider>
      </LenisProvider>
    </QueryClientProvider>
  );
};

export default App;
