'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SalesManagerDashboard from './SalesManagerDashboard';
import RecruitingManagerDashboard from './RecruitingManagerDashboard';
import { DarkModeProvider, useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';

function DashboardContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'sales' | 'recruiting'>('recruiting');
  const { darkMode } = useDarkMode();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header with User Info */}
      <div className={`sticky top-0 z-20 backdrop-blur-sm border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-800/90 border-slate-700' 
          : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <h1 className={`text-lg font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                TalentFlow
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Welcome, <span className="font-medium">{user.name}</span>
                {!user.email_verified && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Email unverified
                  </span>
                )}
              </div>
              
              <button
                onClick={handleLogout}
                className={`text-sm px-3 py-1 rounded-md transition-colors ${
                  darkMode
                    ? 'text-slate-300 hover:bg-slate-700 hover:text-slate-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`sticky top-16 z-10 backdrop-blur-sm border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-800/90 border-slate-700' 
          : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8" aria-label="Dashboard Navigation">
            <button
              onClick={() => setActiveTab('recruiting')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'recruiting'
                  ? darkMode 
                    ? 'border-slate-400 text-slate-200'
                    : 'border-slate-500 text-slate-900'
                  : darkMode
                    ? 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              👥 Recruiting Manager
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sales'
                  ? darkMode 
                    ? 'border-slate-400 text-slate-200'
                    : 'border-slate-500 text-slate-900'
                  : darkMode
                    ? 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              📊 Sales Manager
            </button>
          </nav>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="relative">
        {activeTab === 'recruiting' && <RecruitingManagerDashboard />}
        {activeTab === 'sales' && <SalesManagerDashboard />}
      </div>
    </div>
  );
}

export default function MainDashboard() {
  return <DashboardContent />;
}