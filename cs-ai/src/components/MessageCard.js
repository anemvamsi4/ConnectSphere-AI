import React, { useState } from 'react';

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  ta.remove();
  return Promise.resolve();
}

export default function MessageCard({ item }) {
  const [copied, setCopied] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const main = item.message;
  const followUps = item.followUpSequence || [];

  async function handleCopy() {
    await copyToClipboard(main);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // Get connection strength color
  const getStrengthColor = (strength) => {
    if (strength >= 85) return 'border-green-500 bg-green-500/10';
    if (strength >= 75) return 'border-yellow-500 bg-yellow-500/10';
    if (strength >= 65) return 'border-orange-500 bg-orange-500/10';
    return 'border-red-500 bg-red-500/10';
  };

  const getStrengthText = (strength) => {
    if (strength >= 85) return 'Very Strong';
    if (strength >= 75) return 'Strong';
    if (strength >= 65) return 'Moderate';
    return 'Weak';
  };

  const getResponseColor = (rate) => {
    if (rate >= 80) return 'text-green-400';
    if (rate >= 65) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border-2 ${getStrengthColor(item.connectionStrength)} hover:border-opacity-60 transition-all duration-300 group`}>
      {/* Header with Profile Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            <img 
              src={item.profileImage} 
              alt={item.name}
              className="w-12 h-12 rounded-full border-2 border-slate-600 object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=334155&color=e2e8f0&size=128`;
              }}
            />
            {item.isAlumni && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                🎓
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg group-hover:text-blue-300 transition-colors">
              {item.name}
            </h3>
            <p className="text-slate-300 text-sm">{item.title}</p>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <span>📍</span> {item.location}
            </p>
          </div>
        </div>

        {/* Connection Strength Badge */}
        <div className="text-center">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStrengthColor(item.connectionStrength).replace('border-', 'bg-').replace('/10', '/20')} border`}>
            {item.connectionStrength}% Match
          </div>
          <p className="text-xs text-slate-400 mt-1">{getStrengthText(item.connectionStrength)}</p>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="flex items-center justify-between mb-4 p-3 bg-slate-900/50 rounded-lg">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span>🤝</span>
            <span className="text-slate-300">{item.mutualConnections} mutual</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📈</span>
            <span className={getResponseColor(item.responseRate)}>{item.responseRate}% response</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏰</span>
            <span className="text-slate-400">{item.lastActive}</span>
          </div>
        </div>
        
        {item.confidence && (
          <div className="flex items-center gap-1 text-xs">
            <span>🎯</span>
            <span className="text-blue-400">{item.confidence}% confidence</span>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {item.recentActivity && (
        <div className="mb-4 p-2 bg-slate-700/30 rounded-lg border-l-2 border-purple-500">
          <p className="text-xs text-purple-300 flex items-center gap-1">
            <span>📱</span> {item.recentActivity}
          </p>
        </div>
      )}

      {/* Generated Message */}
      <div className="mb-4">
        <div className="text-sm text-slate-200 bg-slate-900/70 rounded-lg p-4 border-l-4 border-blue-500 leading-relaxed">
          {main}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={handleCopy} 
          className={`flex-1 text-sm px-4 py-2 rounded-lg transition-all font-medium ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg'
          }`}
        >
          {copied ? '✓ Copied to Clipboard!' : '📋 Copy Message'}
        </button>
        
        <button 
          onClick={() => setShowInsights(!showInsights)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-all font-medium"
        >
          💡 Insights
        </button>
        
        <button 
          onClick={() => window.open(item.profileImage.replace('w=150', 'w=400'), '_blank')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all font-medium"
        >
          👤 Profile
        </button>
      </div>

      {/* Connection Insights */}
      {showInsights && (
        <div className="mb-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-1">
            💡 Connection Strategy
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Best time to reach out: {item.lastActive.includes('hour') ? 'Now - they\'re very active!' : 'Within next few days'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">📊</span>
              <span>Response likelihood: {item.responseRate > 75 ? 'High' : item.responseRate > 60 ? 'Medium' : 'Lower'} ({item.responseRate}%)</span>
            </div>
            {item.isAlumni && (
              <div className="flex items-start gap-2">
                <span className="text-purple-400">🎓</span>
                <span>Alumni connection - mention your shared school!</span>
              </div>
            )}
            {item.mutualConnections > 10 && (
              <div className="flex items-start gap-2">
                <span className="text-yellow-400">🤝</span>
                <span>Strong mutual network - consider asking for a warm intro</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Follow-up Messages */}
      {followUps.length > 0 && (
        <details className="group/details">
          <summary className="text-sm text-slate-400 hover:text-slate-300 cursor-pointer flex items-center gap-2 p-2 rounded hover:bg-slate-700/30 transition-colors">
            <span>📝</span> 
            <span>Follow-up Sequence ({followUps.length} messages)</span>
            <span className="ml-auto group-open/details:rotate-180 transition-transform">⌄</span>
          </summary>
          <div className="mt-3 space-y-3">
            {followUps.map((followUp, i) => (
              <div key={i} className="bg-slate-900/50 rounded-lg p-3 border-l-2 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                    Day {(i + 1) * 3}
                  </span>
                  <span className="text-xs text-slate-400">Follow-up #{i + 1}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{followUp}</p>
                <button 
                  onClick={() => copyToClipboard(followUp)}
                  className="mt-2 text-xs bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded transition-colors"
                >
                  📋 Copy
                </button>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Interests Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {item.interests && item.interests.slice(0, 3).map((interest, i) => (
          <span 
            key={i} 
            className="text-xs bg-slate-600/50 text-slate-300 px-2 py-1 rounded-full border border-slate-500"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
