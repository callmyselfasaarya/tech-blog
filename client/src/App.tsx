import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/blog/SearchModal';

// Public Pages
import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { About } from './pages/About';
import { Letters } from './pages/Letters';
import { Archive } from './pages/Archive';
import { SignUp } from './pages/SignUp';
import { NotFound } from './pages/NotFound';

// Admin CMS Components
import { AdminLayout } from './admin/AdminLayout';
import { Login } from './admin/Login';
import { Dashboard } from './admin/Dashboard';
import { ArticlesManager } from './admin/ArticlesManager';
import { ArticleEditor } from './admin/ArticleEditor';
import { CategoriesManager } from './admin/CategoriesManager';
import { MediaManager } from './admin/MediaManager';
import { NewsletterManager } from './admin/NewsletterManager';
import { Settings } from './admin/Settings';

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
      <ThemeProvider>
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
                  <Route path="/article/:slug" element={<ArticlePage />} />
                  <Route path="/about" element={<About />} />
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

            {/* Global Search Command Overlay (Cmd+K) */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
