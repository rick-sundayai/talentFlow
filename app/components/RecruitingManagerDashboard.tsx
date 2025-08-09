'use client';

import { useState } from 'react';
import { JobOpening, CandidateActivity } from '../types';
import recruitingData from '../data/recruitingData.json';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function RecruitingManagerDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };


  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
    }
  };

  const getStatusColor = (status: JobOpening['status']) => {
    const lightColors = {
      'open': 'bg-sky-100 text-sky-700',
      'filled': 'bg-emerald-100 text-emerald-700',
      'cancelled': 'bg-rose-100 text-rose-700',
      'on-hold': 'bg-amber-100 text-amber-700'
    };
    
    const darkColors = {
      'open': 'bg-sky-800 text-sky-300',
      'filled': 'bg-emerald-800 text-emerald-300',
      'cancelled': 'bg-rose-800 text-rose-300',
      'on-hold': 'bg-amber-800 text-amber-300'
    };
    
    const colors = darkMode ? darkColors : lightColors;
    return colors[status] || (darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700');
  };

  const getPriorityColor = (priority: JobOpening['priority']) => {
    const lightColors = {
      'low': 'bg-slate-100 text-slate-700',
      'medium': 'bg-amber-100 text-amber-700',
      'high': 'bg-orange-100 text-orange-700',
      'urgent': 'bg-rose-100 text-rose-700'
    };
    
    const darkColors = {
      'low': 'bg-slate-700 text-slate-300',
      'medium': 'bg-amber-800 text-amber-300',
      'high': 'bg-orange-800 text-orange-300',
      'urgent': 'bg-rose-800 text-rose-300'
    };
    
    const colors = darkMode ? darkColors : lightColors;
    return colors[priority] || (darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700');
  };

  const getActionColor = (action: CandidateActivity['action']) => {
    const lightColors = {
      'applied': 'bg-slate-100 text-slate-700',
      'screened': 'bg-sky-100 text-sky-700',
      'interviewed': 'bg-amber-100 text-amber-700',
      'offered': 'bg-orange-100 text-orange-700',
      'hired': 'bg-emerald-100 text-emerald-700',
      'rejected': 'bg-rose-100 text-rose-700'
    };
    
    const darkColors = {
      'applied': 'bg-slate-800 text-slate-300',
      'screened': 'bg-sky-800 text-sky-300',
      'interviewed': 'bg-amber-800 text-amber-300',
      'offered': 'bg-orange-800 text-orange-300',
      'hired': 'bg-emerald-800 text-emerald-300',
      'rejected': 'bg-rose-800 text-rose-300'
    };
    
    const colors = darkMode ? darkColors : lightColors;
    return colors[action] || (darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700');
  };

  const formatTimeAgo = (timestamp: string) => {
    // For hydration safety, use a static format instead of relative time
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-stone-50'
    }`}>
      {/* Header */}
      <header className={`shadow-sm border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                darkMode 
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700' 
                  : 'bg-gradient-to-r from-slate-500 to-slate-600'
              }`}>
                👥
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${
                  darkMode ? 'text-slate-100' : 'text-slate-800'
                }`}>Recruiting Manager Dashboard</h1>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>TalentFlow Recruiting Performance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg font-medium transition-all hover:shadow-md ${
                  darkMode 
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
              
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as 'month' | 'quarter' | 'year')}
                className={`px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                  darkMode 
                    ? 'border-slate-600 bg-slate-700 text-slate-200 focus:ring-slate-500 focus:border-slate-500' 
                    : 'border-slate-300 bg-white text-slate-700 focus:ring-slate-400 focus:border-slate-400'
                }`}
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              
              <button className={`px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all ${
                darkMode 
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-200' 
                  : 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
              }`}>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
              }`}>
                🎯
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>+{recruitingData.recruitingMetrics.monthlyPlacements}</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Total Placements</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{formatNumber(recruitingData.recruitingMetrics.totalPlacements)}</p>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-sky-900/50' : 'bg-sky-100'
              }`}>
                📋
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-sky-400' : 'text-sky-600'
              }`}>Active</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Open Positions</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{formatNumber(recruitingData.recruitingMetrics.activeOpenings)}</p>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-violet-900/50' : 'bg-violet-100'
              }`}>
                ⏱️
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-violet-400' : 'text-violet-600'
              }`}>Days</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Avg Time to Fill</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{recruitingData.recruitingMetrics.avgTimeToFill}</p>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-amber-900/50' : 'bg-amber-100'
              }`}>
                👤
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>Rate</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Conversion Rate</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{formatPercentage(recruitingData.recruitingMetrics.candidateConversion)}</p>
          </div>
        </div>

        {/* Recruiting Pipeline Overview */}
        <div className={`rounded-xl shadow-sm border p-6 mb-8 transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            darkMode ? 'text-slate-100' : 'text-slate-800'
          }`}>Recruiting Pipeline Overview</h2>
          <div className="grid grid-cols-5 gap-4">
            {recruitingData.recruitingStages.map((stage) => (
              <div key={stage.name} className="text-center">
                <div className={`${stage.color} text-white rounded-lg p-4 mb-3`}>
                  <div className="text-2xl font-bold">{formatNumber(stage.candidates)}</div>
                  <div className="text-sm opacity-90">Candidates</div>
                </div>
                <h3 className={`font-medium mb-1 ${
                  darkMode ? 'text-slate-200' : 'text-slate-800'
                }`}>{stage.name}</h3>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>{formatPercentage(stage.conversionRate)} conversion</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performers */}
          <div className={`rounded-xl shadow-sm border p-6 transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>Top Recruiters</h2>
            <div className="space-y-4">
              {recruitingData.recruiterPerformance.map((recruiter) => (
                <div key={recruiter.id} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-slate-700/50 hover:bg-slate-700' 
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      darkMode 
                        ? 'bg-gradient-to-r from-slate-600 to-slate-700' 
                        : 'bg-gradient-to-r from-slate-500 to-slate-600'
                    }`}>
                      #{recruiter.rank}
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>{recruiter.name}</h3>
                      <p className={`text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>{recruiter.placements} placements • {formatPercentage(recruiter.fillRate)} fill rate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        {recruiter.avgTimeToFill} days
                      </div>
                      <div className={`text-xs ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>avg time to fill</div>
                    </div>
                    <span className="text-lg">{getTrendIcon(recruiter.trend)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-xl shadow-sm border p-6 transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>Recent Activity</h2>
            <div className="space-y-4">
              {recruitingData.recentActivity.map((activity) => (
                <div key={activity.id} className={`border rounded-lg p-4 hover:shadow-sm transition-all duration-300 ${
                  darkMode 
                    ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50' 
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={`font-medium ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>{activity.candidateName}</h3>
                      <p className={`text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>{activity.jobTitle} at {activity.client}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>{formatTimeAgo(activity.timestamp)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                      {activity.action.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Job Openings */}
        <div className={`rounded-xl shadow-sm border p-6 mt-8 transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            darkMode ? 'text-slate-100' : 'text-slate-800'
          }`}>Active Job Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recruitingData.activeOpenings.map((job) => (
              <div key={job.id} className={`border rounded-lg p-4 hover:shadow-sm transition-all duration-300 ${
                darkMode 
                  ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50' 
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className={`font-medium ${
                      darkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>{job.title}</h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>{job.client} • {job.location}</p>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>{job.salaryRange}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(job.priority)}`}>
                      {job.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className={`${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {job.candidatesApplied} candidates applied
                  </span>
                  <span className={`${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {job.daysOpen} days open
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}