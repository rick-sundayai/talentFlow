'use client';

import { useState } from 'react';
import SalesManagerDashboard from './SalesManagerDashboard';
import RecruitingManagerDashboard from './RecruitingManagerDashboard';
import { DarkModeProvider, useDarkMode } from '../contexts/DarkModeContext';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<'sales' | 'recruiting'>('recruiting');
  const { darkMode } = useDarkMode();

  return (
    <div className="min-h-screen">
      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-10 backdrop-blur-sm border-b transition-colors duration-300 ${
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
  return (
    <DarkModeProvider>
      <DashboardContent />
    </DarkModeProvider>
  );
}