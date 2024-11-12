import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Link as LinkIcon, Settings, LayoutDashboard } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl">Link Manager</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              location.pathname === '/dashboard'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/settings"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              location.pathname === '/settings'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-8 py-4 flex items-center justify-end">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}