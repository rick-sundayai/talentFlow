'use client';

import { useState, useEffect } from 'react';

interface Recruiter {
  id: string;
  name: string;
  placements: number;
  clients: number;
  successRate: number;
  revenue: string;
}

interface Reward {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  active: boolean;
  locked: boolean;
}

const recruiters: Recruiter[] = [
  { id: 'sarah-johnson', name: 'Sarah Johnson', placements: 47, clients: 12, successRate: 89, revenue: '$847K' },
  { id: 'michael-chen', name: 'Michael Chen', placements: 32, clients: 8, successRate: 92, revenue: '$621K' },
  { id: 'emma-rodriguez', name: 'Emma Rodriguez', placements: 55, clients: 15, successRate: 87, revenue: '$923K' },
  { id: 'david-kim', name: 'David Kim', placements: 41, clients: 11, successRate: 94, revenue: '$756K' },
];

const initialRewards: Reward[] = [
  {
    id: 'priority-placements',
    icon: '🎯',
    title: '5x Priority Placements Available',
    description: 'Fast-track your top candidates with priority placement sessions',
    progress: 100,
    active: true,
    locked: false,
  },
  {
    id: 'premium-client',
    icon: '💎',
    title: 'Premium Client Access from Package',
    description: 'Unlock exclusive Fortune 500 client opportunities',
    progress: 60,
    active: false,
    locked: true,
  },
  {
    id: 'elite-membership',
    icon: '👑',
    title: 'Elite Recruiter Membership',
    description: 'Access to VIP networking events and exclusive resources',
    progress: 30,
    active: false,
    locked: true,
  },
  {
    id: 'express-scheduling',
    icon: '⚡',
    title: 'Express Interview Scheduling',
    description: 'Skip the queue with instant interview booking privileges',
    progress: 80,
    active: false,
    locked: true,
  },
  {
    id: 'bonus-commission',
    icon: '🚀',
    title: 'Bonus Commission Tier from Package',
    description: 'Earn higher commissions on successful placements',
    progress: 45,
    active: false,
    locked: true,
  },
];

export default function Dashboard() {
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter>(recruiters[0]);
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRecruiterChange = (recruiterId: string) => {
    const recruiter = recruiters.find(r => r.id === recruiterId);
    if (recruiter) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRecruiter(recruiter);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleRewardClick = (rewardId: string) => {
    setRewards(prevRewards =>
      prevRewards.map(reward => ({
        ...reward,
        active: reward.id === rewardId && !reward.locked,
      }))
    );
  };

  // Floating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const activeCards = document.querySelectorAll('.reward-card.active');
      activeCards.forEach(card => {
        const element = card as HTMLElement;
        element.style.transform = 'translateY(-7px)';
        setTimeout(() => {
          element.style.transform = 'translateY(-5px)';
        }, 1000);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700">
      {/* Header */}
      <header className="bg-white shadow-xl px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 font-bold text-xl text-blue-600">
          <span className="text-2xl">💼</span>
          TalentFlow
        </div>
        
        <nav className="flex gap-4 items-center">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            ← Back to Dashboard
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Candidate Search
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Schedule Interview
          </button>
        </nav>
        
        <div className="text-gray-600 text-sm">Hi, Sarah</div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Recruiter Selector */}
        <div className="bg-white p-6 rounded-xl mb-12 shadow-xl">
          <label htmlFor="recruiter-select" className="block mb-2 font-semibold text-gray-700">
            Select Recruiter
          </label>
          <select
            id="recruiter-select"
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-base bg-white cursor-pointer transition-colors focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            value={selectedRecruiter.id}
            onChange={(e) => handleRecruiterChange(e.target.value)}
          >
            {recruiters.map(recruiter => (
              <option key={recruiter.id} value={recruiter.id}>
                {recruiter.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rewards Section */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="flex items-center gap-3 mb-8 text-blue-600 text-xl font-bold">
            <span className="text-2xl">🏆</span>
            ACHIEVEMENTS & REWARDS
          </h2>
          
          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {rewards.map(reward => (
              <div
                key={reward.id}
                className={`reward-card relative bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                  reward.active
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-500 text-white -translate-y-1 shadow-2xl shadow-blue-500/30'
                    : reward.locked
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:-translate-y-1 hover:shadow-xl'
                }`}
                onClick={() => handleRewardClick(reward.id)}
              >
                <div className={`w-15 h-15 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl transition-all ${
                  reward.active ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {reward.icon}
                </div>
                <div className="font-bold text-base mb-2 leading-tight">
                  {reward.title.split(' ').map((word, index, array) => (
                    index === Math.floor(array.length / 2) ? <><br key={index} />{word} </> : word + ' '
                  ))}
                </div>
                <div className="text-xs opacity-80 leading-relaxed">
                  {reward.description}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/20">
                  <div
                    className={`h-full transition-all duration-300 ${
                      reward.active ? 'bg-white/80' : 'bg-blue-500'
                    }`}
                    style={{ width: `${reward.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex justify-around bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center">
              <span className={`text-3xl font-bold text-blue-600 block transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                {selectedRecruiter.placements}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-wider">
                Successful Placements
              </span>
            </div>
            <div className="text-center">
              <span className={`text-3xl font-bold text-blue-600 block transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                {selectedRecruiter.clients}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-wider">
                Active Clients
              </span>
            </div>
            <div className="text-center">
              <span className={`text-3xl font-bold text-blue-600 block transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                {selectedRecruiter.successRate}%
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-wider">
                Success Rate
              </span>
            </div>
            <div className="text-center">
              <span className={`text-3xl font-bold text-blue-600 block transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                {selectedRecruiter.revenue}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-wider">
                Revenue Generated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}