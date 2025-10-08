import React, { useState } from 'react';

export default function Contacts(){
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const contacts = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      email: "sarah.chen@google.com",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150",
      status: "connected",
      connectionStrength: 85,
      lastContact: "2 days ago",
      messagesSent: 3,
      responseRate: 100,
      notes: "Alumni connection, very responsive. Interested in AI/ML discussions.",
      tags: ["Alumni", "AI/ML", "High Priority"],
      meetingScheduled: true,
      industry: "Technology"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Product Manager",
      company: "Microsoft",
      email: "m.rodriguez@microsoft.com",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      status: "pending",
      connectionStrength: 72,
      lastContact: "5 days ago",
      messagesSent: 2,
      responseRate: 50,
      notes: "Reached out via LinkedIn. Waiting for response on product management role.",
      tags: ["Product", "Cloud", "Follow-up"],
      meetingScheduled: false,
      industry: "Technology"
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "UX Designer",
      company: "Apple",
      email: "e.johnson@apple.com",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      status: "responded",
      connectionStrength: 91,
      lastContact: "1 day ago",
      messagesSent: 1,
      responseRate: 100,
      notes: "Very helpful! Shared insights about design process at Apple.",
      tags: ["Design", "UX", "Helpful"],
      meetingScheduled: true,
      industry: "Technology"
    },
    {
      id: 4,
      name: "David Park",
      title: "Data Scientist",
      company: "Netflix",
      email: "d.park@netflix.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "message_sent",
      connectionStrength: 68,
      lastContact: "3 days ago",
      messagesSent: 1,
      responseRate: 0,
      notes: "Initial outreach sent. Personalized message about recommendation systems.",
      tags: ["Data Science", "ML", "Netflix"],
      meetingScheduled: false,
      industry: "Entertainment"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Engineering Manager",
      company: "Amazon",
      email: "l.thompson@amazon.com",
      profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
      status: "connected",
      connectionStrength: 79,
      lastContact: "1 week ago",
      messagesSent: 4,
      responseRate: 75,
      notes: "Great mentor! Provided valuable career advice and team leadership insights.",
      tags: ["Management", "Mentor", "AWS"],
      meetingScheduled: false,
      industry: "Technology"
    },
    {
      id: 6,
      name: "Alex Kumar",
      title: "Frontend Developer",
      company: "Meta",
      email: "a.kumar@meta.com",
      profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      status: "no_response",
      connectionStrength: 88,
      lastContact: "2 weeks ago",
      messagesSent: 2,
      responseRate: 0,
      notes: "No response yet. Consider different approach or wait longer.",
      tags: ["Frontend", "React", "Follow-up Needed"],
      meetingScheduled: false,
      industry: "Technology"
    }
  ];

  const statusConfig = {
    connected: { color: 'bg-green-600', text: 'Connected ✓', textColor: 'text-green-400' },
    pending: { color: 'bg-yellow-600', text: 'Connection Pending', textColor: 'text-yellow-400' },
    responded: { color: 'bg-blue-600', text: 'Responded 💬', textColor: 'text-blue-400' },
    message_sent: { color: 'bg-purple-600', text: 'Message Sent 📤', textColor: 'text-purple-400' },
    no_response: { color: 'bg-gray-600', text: 'No Response 🔄', textColor: 'text-gray-400' }
  };

  const filters = [
    { id: 'all', label: 'All Contacts', count: contacts.length },
    { id: 'connected', label: 'Connected', count: contacts.filter(c => c.status === 'connected').length },
    { id: 'pending', label: 'Pending', count: contacts.filter(c => c.status === 'pending').length },
    { id: 'responded', label: 'Responded', count: contacts.filter(c => c.status === 'responded').length },
    { id: 'no_response', label: 'Follow-up Needed', count: contacts.filter(c => c.status === 'no_response').length }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = selectedFilter === 'all' || contact.status === selectedFilter;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStrengthColor = (strength) => {
    if (strength >= 85) return 'text-green-400';
    if (strength >= 75) return 'text-yellow-400';
    if (strength >= 65) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">Professional Network CRM 👥</h1>
          <p className="text-slate-300 mt-2">Manage your connections and track outreach progress</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <span>➕</span> Add Contact
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl text-white">
          <div className="text-2xl font-bold">{contacts.length}</div>
          <div className="text-blue-200 text-sm">Total Contacts</div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-xl text-white">
          <div className="text-2xl font-bold">{contacts.filter(c => c.status === 'connected').length}</div>
          <div className="text-green-200 text-sm">Connected</div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-xl text-white">
          <div className="text-2xl font-bold">{contacts.reduce((sum, c) => sum + c.messagesSent, 0)}</div>
          <div className="text-purple-200 text-sm">Messages Sent</div>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-4 rounded-xl text-white">
          <div className="text-2xl font-bold">{Math.round(contacts.reduce((sum, c) => sum + c.responseRate, 0) / contacts.length)}%</div>
          <div className="text-orange-200 text-sm">Avg Response Rate</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 rounded-xl text-white">
          <div className="text-2xl font-bold">{contacts.filter(c => c.meetingScheduled).length}</div>
          <div className="text-emerald-200 text-sm">Meetings Scheduled</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
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
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute right-3 top-2.5 text-slate-400">🔍</span>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <img 
                  src={contact.profileImage} 
                  alt={contact.name}
                  className="w-12 h-12 rounded-full border-2 border-slate-600 object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=334155&color=e2e8f0&size=128`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-white text-lg">{contact.name}</h3>
                  <p className="text-slate-300 text-sm">{contact.title}</p>
                  <p className="text-slate-400 text-sm">{contact.company}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-xs px-3 py-1 rounded-full ${statusConfig[contact.status].color} text-white mb-2`}>
                  {statusConfig[contact.status].text}
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-sm font-medium ${getStrengthColor(contact.connectionStrength)}`}>
                    {contact.connectionStrength}%
                  </span>
                  <span className="text-xs text-slate-400">match</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-slate-700/30 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{contact.messagesSent}</div>
                <div className="text-xs text-slate-400">Messages</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${getStrengthColor(contact.responseRate)}`}>
                  {contact.responseRate}%
                </div>
                <div className="text-xs text-slate-400">Response Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{contact.lastContact}</div>
                <div className="text-xs text-slate-400">Last Contact</div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <div className="text-xs text-slate-400 mb-1">Notes:</div>
              <p className="text-sm text-slate-300 bg-slate-700/50 p-2 rounded">{contact.notes}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {contact.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 text-sm px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                💬 Message
              </button>
              <button className="flex-1 text-sm px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                📅 Schedule
              </button>
              <button className="text-sm px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
                ✏️
              </button>
            </div>

            {/* Meeting indicator */}
            {contact.meetingScheduled && (
              <div className="mt-3 p-2 bg-green-600/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                <span className="text-green-400">📅</span>
                <span className="text-sm text-green-300">Meeting scheduled</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pipeline Summary */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          🔄 Outreach Pipeline Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">{contacts.reduce((sum, c) => sum + c.messagesSent, 0)}</div>
            <div className="text-sm text-slate-400 mb-2">Total Messages Sent</div>
            <div className="w-full h-2 bg-slate-600 rounded-full">
              <div className="w-full h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-purple-400">
              {contacts.filter(c => c.status === 'responded' || c.status === 'connected').length}
            </div>
            <div className="text-sm text-slate-400 mb-2">Responses Received</div>
            <div className="w-full h-2 bg-slate-600 rounded-full">
              <div 
                className="h-full bg-purple-500 rounded-full" 
                style={{ width: `${(contacts.filter(c => c.status === 'responded' || c.status === 'connected').length / contacts.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-green-400">
              {contacts.filter(c => c.status === 'connected').length}
            </div>
            <div className="text-sm text-slate-400 mb-2">Connections Made</div>
            <div className="w-full h-2 bg-slate-600 rounded-full">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(contacts.filter(c => c.status === 'connected').length / contacts.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-orange-400">
              {contacts.filter(c => c.meetingScheduled).length}
            </div>
            <div className="text-sm text-slate-400 mb-2">Meetings Scheduled</div>
            <div className="w-full h-2 bg-slate-600 rounded-full">
              <div 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${(contacts.filter(c => c.meetingScheduled).length / contacts.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">📈 Performance Insights</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Overall response rate: {Math.round(contacts.reduce((sum, c) => sum + c.responseRate, 0) / contacts.length)}%</li>
              <li>• Best performing connections: Alumni network</li>
              <li>• Optimal follow-up timing: 3-5 days</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">🎯 Next Actions</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Follow up with {contacts.filter(c => c.status === 'no_response').length} non-responders</li>
              <li>• Schedule meetings with {contacts.filter(c => c.status === 'connected' && !c.meetingScheduled).length} connections</li>
              <li>• Send thank you notes to recent responders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
