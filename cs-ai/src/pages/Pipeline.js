import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Pipeline = () => {
  const [pipelineData, setPipelineData] = useState([]);
  const [reachSummary, setReachSummary] = useState({});
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    // Mock pipeline data
    setPipelineData([
      { stage: 'Initial Contact', count: 45, percentage: 100 },
      { stage: 'Response Received', count: 32, percentage: 71 },
      { stage: 'Follow-up Sent', count: 28, percentage: 62 },
      { stage: 'Meeting Scheduled', count: 18, percentage: 40 },
      { stage: 'Interview/Call', count: 12, percentage: 27 },
      { stage: 'Job Offer', count: 3, percentage: 7 }
    ]);

    setReachSummary({
      totalOutreach: 156,
      responses: 89,
      responseRate: 57,
      meetings: 34,
      interviews: 18,
      offers: 5,
      connections: 67
    });

    // Timeline data for the past 30 days
    const timeline = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      timeline.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        outreach: Math.floor(Math.random() * 8) + 1,
        responses: Math.floor(Math.random() * 4) + 1,
        meetings: Math.floor(Math.random() * 2),
        applications: Math.floor(Math.random() * 3) + 1
      });
    }
    setTimelineData(timeline);
  }, []);

  const pipelineColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const reachMetrics = [
    { name: 'Response Rate', value: reachSummary.responseRate, color: '#10b981' },
    { name: 'Meeting Rate', value: Math.round((reachSummary.meetings / reachSummary.totalOutreach) * 100), color: '#3b82f6' },
    { name: 'Interview Rate', value: Math.round((reachSummary.interviews / reachSummary.totalOutreach) * 100), color: '#f59e0b' },
    { name: 'Offer Rate', value: Math.round((reachSummary.offers / reachSummary.totalOutreach) * 100), color: '#ef4444' }
  ];

  const milestones = [
    { date: '2025-01-15', title: 'Started Networking Campaign', type: 'start', description: 'Launched systematic outreach to target companies' },
    { date: '2025-02-03', title: 'First Interview Scheduled', type: 'interview', description: 'Google Software Engineer position' },
    { date: '2025-02-18', title: 'Networking Event Attended', type: 'event', description: 'Tech Leaders Meetup - 5 new connections' },
    { date: '2025-03-05', title: 'Second Round Interview', type: 'interview', description: 'Microsoft Senior Developer role' },
    { date: '2025-03-20', title: 'Job Offer Received', type: 'offer', description: 'Amazon SDE II position' },
    { date: '2025-04-01', title: 'Negotiation Complete', type: 'success', description: 'Accepted offer with 15% salary increase' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Networking Pipeline</h1>
          <p className="text-slate-300 text-lg">Track your outreach progress and conversion metrics</p>
        </div>

        {/* Pipeline Overview */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Pipeline Stages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineData.map((stage, index) => (
              <div key={stage.stage} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold text-sm">{stage.stage}</h3>
                  <span className="text-xs text-slate-300">{stage.percentage}%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stage.count}</div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${stage.percentage}%`,
                      backgroundColor: pipelineColors[index]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reach Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Stats */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Reach Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{reachSummary.totalOutreach}</div>
                <div className="text-sm text-slate-300">Total Outreach</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{reachSummary.responses}</div>
                <div className="text-sm text-slate-300">Responses</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{reachSummary.meetings}</div>
                <div className="text-sm text-slate-300">Meetings</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{reachSummary.offers}</div>
                <div className="text-sm text-slate-300">Job Offers</div>
              </div>
            </div>
            
            {/* Performance Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#f9fafb' }}
                  />
                  <Area type="monotone" dataKey="outreach" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="responses" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="meetings" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Rates */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Conversion Rates</h3>
            <div className="space-y-4">
              {reachMetrics.map((metric, index) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{metric.name}</span>
                    <span className="text-white font-semibold">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${metric.value}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Networking Timeline
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-600"></div>
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    milestone.type === 'start' ? 'bg-blue-500 border-blue-400' :
                    milestone.type === 'interview' ? 'bg-yellow-500 border-yellow-400' :
                    milestone.type === 'event' ? 'bg-purple-500 border-purple-400' :
                    milestone.type === 'offer' ? 'bg-green-500 border-green-400' :
                    'bg-emerald-500 border-emerald-400'
                  }`}>
                    {milestone.type === 'start' && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    )}
                    {milestone.type === 'interview' && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                    {milestone.type === 'event' && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {milestone.type === 'offer' && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {milestone.type === 'success' && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Timeline content */}
                  <div className="flex-1 bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold mb-1">{milestone.title}</h3>
                        <p className="text-slate-300 text-sm mb-2">{milestone.description}</p>
                        <span className="text-xs text-slate-400">{milestone.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Add Outreach
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
              Log Response
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors">
              Schedule Meeting
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;