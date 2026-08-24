import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Image as ImageIcon, 
  Mail, 
  Settings as SettingsIcon, 
  LogOut, 
  Globe, 
  Plus, 
  Sun, 
  Moon 
} from 'lucide-react';
import { api } from '../services/api';
import { User } from '../types';
import { useTheme } from '../context/ThemeContext';

import { TechniccalLogo } from '../components/ui/TechniccalLogo';

export const AdminLayout: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      navigate('/admin/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
    navigate('/admin/login');
  };

  if (!user && location.pathname !== '/admin/login') return null;

  const navItems = [
    { label: 'DASHBOARD', path: '/admin', icon: LayoutDashboard },
    { label: 'ARTICLES', path: '/admin/articles', icon: FileText },
    { label: 'CATEGORIES', path: '/admin/categories', icon: FolderTree },
    { label: 'MEDIA', path: '/admin/media', icon: ImageIcon },
    { label: 'NEWSLETTER', path: '/admin/newsletter', icon: Mail },
    { label: 'SETTINGS', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#F3F1EA] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#ECECEC] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#FAF9F5] dark:bg-[#1A1A1A] border-r border-[#E8E5DC] dark:border-[#262626] flex flex-col justify-between shrink-0 p-6">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E8E5DC] dark:border-[#262626]">
            <div>
              <Link to="/admin" className="block">
                <TechniccalLogo size="sm" />
              </Link>
              <p className="text-[10px] font-mono text-[#7E8798] uppercase mt-1">
                ROLE: {user?.role}
              </p>
            </div>
            <Link
              to="/"
              target="_blank"
              className="p-1.5 text-[#6B685F] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-[#ECECEC] rounded-sm transition-colors"
              title="View Public Website"
            >
              <Globe className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Action Button */}
          <Link
            to="/admin/articles/new"
            className="w-full mb-6 py-2.5 px-4 bg-[#1A1A1A] hover:bg-[#333] dark:bg-[#EEEEEE] dark:hover:bg-[#FFF] text-[#FAF9F5] dark:text-[#121212] text-xs font-mono uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Article
          </Link>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono tracking-wider rounded-sm transition-colors ${
                    active
                      ? 'bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-semibold'
                      : 'text-[#6B685F] dark:text-[#A0A0A0] hover:bg-[#F3F1EA] dark:hover:bg-[#222222] hover:text-[#1A1A1A] dark:hover:text-[#ECECEC]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 mt-6 border-t border-[#E8E5DC] dark:border-[#262626]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full object-cover" />
              <span className="text-xs font-medium truncate max-w-[110px]">{user?.name}</span>
            </div>
            <button onClick={toggleTheme} className="p-1 text-[#6B685F]">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-1.5 text-xs font-mono text-red-600 dark:text-red-400 hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main CMS View Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
