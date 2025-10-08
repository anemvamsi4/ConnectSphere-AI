import React from 'react';
import MiniAreaChart from '../shared/MiniAreaChart';
import { getNetworkingPipeline } from '../mockApi';

export default function Analytics() {
  const pipelineData = getNetworkingPipeline();
  
  const performanceMetrics = [
    { label: 'Response Rate', value: '67%', change: '+12%', trend: 'up', color: 'emerald' },
    { label: 'Connection Rate', value: '34%', change: '+8%', trend: 'up', color: 'blue' },
    { label: 'Meeting Rate', value: '18%', change: '+3%', trend: 'up', color: 'purple' },
    { label: 'Avg Response Time', value: '2.3d', change: '-0.4d', trend: 'up', color: 'orange' }
  ];

  const recentActivity = [
    { action: 'Message sent to Sarah Chen (Google)', time: '2 hours ago', status: 'pending' },
    { action: 'Alex Kumar accepted connection', time: '4 hours ago', status: 'success' },
    { action: 'Meeting scheduled with Emily Johnson', time: '1 day ago', status: 'success' },
    { action: 'Follow-up sent to Michael Rodriguez', time: '2 days ago', status: 'pending' },
    { action: 'Profile viewed by Lisa Thompson', time: '3 days ago', status: 'info' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'info': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return '✅';
      case 'pending': return '⏳';
      case 'info': return 'ℹ️';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Networking Analytics 📊</h1>
          <p className="text-slate-300 mt-2">Track your professional networking performance and insights</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            📊 Export Report
          </button>
          <button className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className={`bg-gradient-to-br from-${metric.color}-600 to-${metric.color}-700 p-6 rounded-xl text-white`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium opacity-90">{metric.label}</h3>
              <div className={`w-8 h-8 bg-${metric.color}-500 rounded-lg flex items-center justify-center`}>
                {metric.trend === 'up' ? '📈' : '📉'}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`text-sm ${metric.trend === 'up' ? 'text-green-300' : 'text-red-300'} flex items-center gap-1`}>
                  {metric.trend === 'up' ? '↗️' : '↘️'} {metric.change}
                </div>
              </div>
              <div className="w-16 h-8">
                <MiniAreaChart />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Networking Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            🔄 Networking Pipeline
          </h3>
          <div className="space-y-4">
            {pipelineData.stages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' : 
                    index === 1 ? 'bg-purple-500' : 
                    index === 2 ? 'bg-emerald-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="text-slate-300">{stage.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold">{stage.count}</span>
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-purple-500' : 
                        index === 2 ? 'bg-emerald-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-slate-400 text-sm w-10">{stage.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">Pipeline Insights</h4>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Your response rate is above industry average (50%)</li>
              <li>• Focus on improving connection acceptance rate</li>
              <li>• Schedule more meetings from existing connections</li>
            </ul>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            🕐 Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm">{activity.action}</p>
                  <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All Activity →
          </button>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            📈 Networking Trends (Last 30 Days)
          </h3>
          <div className="h-64 flex items-center justify-center bg-slate-700/30 rounded-lg">
            <div className="text-center text-slate-400">
              <div className="text-4xl mb-2">📊</div>
              <p>Advanced charts would be displayed here</p>
              <p className="text-sm">Integration with Recharts for detailed analytics</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            ⚡ Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
              <span>📝</span> Send Follow-ups
            </button>
            <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
              <span>🔍</span> Find New Contacts
            </button>
            <button className="w-full p-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
              <span>📅</span> Schedule Meetings
            </button>
            <button className="w-full p-3 bg-orange-600 hover:bg-orange-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
              <span>📊</span> Export Data
            </button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
            <h4 className="text-sm font-medium text-white mb-2">💡 Pro Tip</h4>
            <p className="text-xs text-slate-300">
              Send follow-ups on Tuesday-Thursday between 10-11 AM for best response rates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}