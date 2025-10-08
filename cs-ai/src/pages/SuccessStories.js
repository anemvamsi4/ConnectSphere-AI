import React, { useState } from 'react';

export default function SuccessStories() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const successStories = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Software Engineer",
      company: "Google",
      previousRole: "CS Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      story: "Connected through university alumni network and landed my dream job at Google after 3 months of networking!",
      outcome: "Job Offer",
      timeframe: "3 months",
      connectionsUsed: 5,
      keyTactic: "Alumni networking"
    },
    {
      id: 2,
      name: "Sarah Kim",
      role: "Product Manager",
      company: "Microsoft",
      previousRole: "Business Analyst",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150",
      story: "Used AI-powered personalization to reach out to PMs at Microsoft. Got 3 interviews from 10 messages sent!",
      outcome: "Career Switch",
      timeframe: "4 months",
      connectionsUsed: 10,
      keyTactic: "Personalized outreach"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Data Scientist",
      company: "Netflix",
      previousRole: "Research Assistant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      story: "Leveraged mutual connections and got warm introductions. The personal referrals made all the difference!",
      outcome: "Referral",
      timeframe: "2 months",
      connectionsUsed: 3,
      keyTactic: "Warm introductions"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      previousRole: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      story: "Consistent follow-up strategy helped me build relationships with Apple designers. Patience paid off!",
      outcome: "Dream Job",
      timeframe: "6 months",
      connectionsUsed: 15,
      keyTactic: "Consistent follow-up"
    },
    {
      id: 5,
      name: "David Park",
      role: "DevOps Engineer",
      company: "Spotify",
      previousRole: "System Admin",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      story: "Attended virtual meetups and connected with Spotify engineers. Built genuine relationships before asking for opportunities.",
      outcome: "Internal Referral",
      timeframe: "5 months",
      connectionsUsed: 8,
      keyTactic: "Community engagement"
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Marketing Manager",
      company: "Meta",
      previousRole: "Marketing Coordinator",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      story: "Used connection strength scoring to prioritize outreach. Focused on high-potential connections first!",
      outcome: "Promotion Path",
      timeframe: "3 months",
      connectionsUsed: 7,
      keyTactic: "Strategic prioritization"
    }
  ];

  const connectionHistory = [
    { month: 'Jan 2024', connections: 12, interviews: 2, offers: 0 },
    { month: 'Feb 2024', connections: 18, interviews: 4, offers: 1 },
    { month: 'Mar 2024', connections: 25, interviews: 6, offers: 2 },
    { month: 'Apr 2024', connections: 31, interviews: 8, offers: 3 },
    { month: 'May 2024', connections: 28, interviews: 5, offers: 2 },
    { month: 'Jun 2024', connections: 35, interviews: 9, offers: 4 }
  ];

  const filters = [
    { id: 'all', label: 'All Stories', count: successStories.length },
    { id: 'job-offer', label: 'Job Offers', count: successStories.filter(s => s.outcome.includes('Job')).length },
    { id: 'referral', label: 'Referrals', count: successStories.filter(s => s.outcome.includes('Referral')).length },
    { id: 'career-switch', label: 'Career Switch', count: successStories.filter(s => s.outcome.includes('Switch')).length }
  ];

  const filteredStories = selectedFilter === 'all' 
    ? successStories 
    : successStories.filter(story => 
        story.outcome.toLowerCase().replace(' ', '-').includes(selectedFilter.replace('-', ' ').toLowerCase())
      );

  const getOutcomeColor = (outcome) => {
    if (outcome.includes('Job')) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (outcome.includes('Referral')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (outcome.includes('Switch')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  };

  const getOutcomeIcon = (outcome) => {
    if (outcome.includes('Job')) return '🎉';
    if (outcome.includes('Referral')) return '🤝';
    if (outcome.includes('Switch')) return '🔄';
    return '🚀';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">Success Stories & Connection History 🏆</h1>
          <p className="text-slate-300 mt-2">Learn from successful networking campaigns and track your progress</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <span>📝</span> Share Your Story
        </button>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-200 text-sm">Total Success Stories</span>
            <span className="text-2xl">🏆</span>
          </div>
          <div className="text-3xl font-bold">{successStories.length}</div>
          <div className="text-green-200 text-sm">+2 this month</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-200 text-sm">Average Time</span>
            <span className="text-2xl">⏱️</span>
          </div>
          <div className="text-3xl font-bold">3.8m</div>
          <div className="text-blue-200 text-sm">months to success</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-200 text-sm">Success Rate</span>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-3xl font-bold">78%</div>
          <div className="text-purple-200 text-sm">of active networkers</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-200 text-sm">Avg Connections</span>
            <span className="text-2xl">🤝</span>
          </div>
          <div className="text-3xl font-bold">9.2</div>
          <div className="text-orange-200 text-sm">per success story</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div key={story.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all group">
            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-4">
              <img 
                src={story.image} 
                alt={story.name}
                className="w-12 h-12 rounded-full border-2 border-slate-600 object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(story.name)}&background=334155&color=e2e8f0&size=128`;
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {story.name}
                </h3>
                <p className="text-slate-300 text-sm">{story.role} at {story.company}</p>
                <p className="text-slate-400 text-xs">Previously: {story.previousRole}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getOutcomeColor(story.outcome)}`}>
                {getOutcomeIcon(story.outcome)} {story.outcome}
              </div>
            </div>

            {/* Story */}
            <blockquote className="text-slate-200 text-sm italic mb-4 leading-relaxed">
              "{story.story}"
            </blockquote>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-600">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{story.timeframe}</div>
                <div className="text-xs text-slate-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{story.connectionsUsed}</div>
                <div className="text-xs text-slate-400">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">✨</div>
                <div className="text-xs text-slate-400">Success</div>
              </div>
            </div>

            {/* Key Tactic */}
            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Key Tactic:</div>
              <div className="text-sm text-slate-200 font-medium">{story.keyTactic}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Connection History Timeline */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          📊 Your Connection History
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timeline */}
          <div className="space-y-4">
            {connectionHistory.map((month, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{month.month}</span>
                    <span className="text-slate-400 text-sm">{month.connections} connections</span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-300">
                    <span>📞 {month.interviews} interviews</span>
                    <span>🎉 {month.offers} offers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-lg border border-blue-500/30">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                🎯 Your Progress
              </h4>
              <div className="text-sm text-slate-300 space-y-1">
                <div>• Total connections made: 149</div>
                <div>• Interview conversion rate: 23%</div>
                <div>• Offer conversion rate: 8%</div>
                <div>• Most successful month: April 2024</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 p-4 rounded-lg border border-emerald-500/30">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                💡 Insights & Tips
              </h4>
              <div className="text-sm text-slate-300 space-y-1">
                <div>• Your response rate improved 40% over 6 months</div>
                <div>• Alumni connections have 3x higher success rate</div>
                <div>• Follow-up messages increase responses by 65%</div>
              </div>
            </div>

            <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
              <span>📈</span> View Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}