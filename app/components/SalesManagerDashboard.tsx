'use client';

import { useState } from 'react';
import { Deal } from '../types';
import salesData from '../data/salesData.json';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function SalesManagerDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  const getStageColor = (stage: Deal['stage']) => {
    const lightColors = {
      'prospect': 'bg-slate-100 text-slate-700',
      'qualified': 'bg-sky-100 text-sky-700',
      'proposal': 'bg-amber-100 text-amber-700',
      'negotiation': 'bg-orange-100 text-orange-700',
      'closed-won': 'bg-emerald-100 text-emerald-700',
      'closed-lost': 'bg-rose-100 text-rose-700'
    };
    
    const darkColors = {
      'prospect': 'bg-slate-800 text-slate-300',
      'qualified': 'bg-sky-800 text-sky-300',
      'proposal': 'bg-amber-800 text-amber-300',
      'negotiation': 'bg-orange-800 text-orange-300',
      'closed-won': 'bg-emerald-800 text-emerald-300',
      'closed-lost': 'bg-rose-800 text-rose-300'
    };
    
    const colors = darkMode ? darkColors : lightColors;
    return colors[stage] || (darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700');
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
                📊
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${
                  darkMode ? 'text-slate-100' : 'text-slate-800'
                }`}>Sales Manager Dashboard</h1>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>TalentFlow Sales Performance</p>
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
                💰
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>+{formatPercentage(salesData.salesMetrics.yearOverYearGrowth)}</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Total Revenue</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{formatCurrency(salesData.salesMetrics.totalRevenue)}</p>
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
                📈
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-sky-400' : 'text-sky-600'
              }`}>Pipeline</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Active Pipeline</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{formatCurrency(salesData.salesMetrics.activePipeline)}</p>
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
                🎯
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-violet-400' : 'text-violet-600'
              }`}>Rate</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Conversion Rate</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{formatPercentage(salesData.salesMetrics.conversionRate)}</p>
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
                💼
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>Average</span>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>Deal Size</h3>
            <p className={`text-3xl font-bold ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>{formatCurrency(salesData.salesMetrics.avgDealSize)}</p>
          </div>
        </div>

        {/* Pipeline Overview */}
        <div className={`rounded-xl shadow-sm border p-6 mb-8 transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            darkMode ? 'text-slate-100' : 'text-slate-800'
          }`}>Sales Pipeline Overview</h2>
          <div className="grid grid-cols-5 gap-4">
            {salesData.pipelineStages.map((stage) => (
              <div key={stage.name} className="text-center">
                <div className={`${stage.color} text-white rounded-lg p-4 mb-3`}>
                  <div className="text-2xl font-bold">{stage.deals}</div>
                  <div className="text-sm opacity-90">Deals</div>
                </div>
                <h3 className={`font-medium mb-1 ${
                  darkMode ? 'text-slate-200' : 'text-slate-800'
                }`}>{stage.name}</h3>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>{formatCurrency(stage.value)}</p>
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
            }`}>Top Performers</h2>
            <div className="space-y-4">
              {salesData.salesReps.map((rep) => (
                <div key={rep.id} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
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
                      #{rep.rank}
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>{rep.name}</h3>
                      <p className={`text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>{rep.deals} deals • {formatCurrency(rep.revenue)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        {formatPercentage(rep.quotaAttainment)}
                      </div>
                      <div className={`text-xs ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>quota attainment</div>
                    </div>
                    <span className="text-lg">{getTrendIcon(rep.trend)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Deals */}
          <div className={`rounded-xl shadow-sm border p-6 transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>Recent Deals</h2>
            <div className="space-y-4">
              {salesData.recentDeals.map((deal) => (
                <div key={deal.id} className={`border rounded-lg p-4 hover:shadow-sm transition-all duration-300 ${
                  darkMode 
                    ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50' 
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={`font-medium ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>{deal.clientName}</h3>
                      <p className={`text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>{deal.industry} • {deal.source}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>{formatCurrency(deal.value)}</div>
                      <div className={`text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>{deal.probability}% probability</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                      {deal.stage.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>Close: {deal.closeDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}