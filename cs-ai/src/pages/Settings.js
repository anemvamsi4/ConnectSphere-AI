import React, { useState } from 'react';

export default function Settings(){
  const [profile, setProfile] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@university.edu",
    university: "Stanford University",
    major: "Computer Science",
    graduationYear: "2024",
    location: "San Francisco, CA",
    linkedinUrl: "linkedin.com/in/alexjohnson",
    githubUrl: "github.com/alexjohnson",
    bio: "Computer Science student passionate about AI and full-stack development. Seeking software engineering opportunities in tech.",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyReports: true,
    connectionReminders: false,
    followUpSuggestions: true,
    darkMode: true,
    autoGenerateMessages: true
  });

  const [integrations] = useState([
    { 
      name: "LinkedIn", 
      status: "connected", 
      icon: "💼", 
      description: "Sync profile and connections",
      lastSync: "2 hours ago"
    },
    { 
      name: "Gmail", 
      status: "connected", 
      icon: "📧", 
      description: "Email integration for outreach",
      lastSync: "5 minutes ago"
    },
    { 
      name: "Calendar", 
      status: "not_connected", 
      icon: "📅", 
      description: "Schedule meetings automatically",
      lastSync: null
    },
    { 
      name: "Slack", 
      status: "not_connected", 
      icon: "💬", 
      description: "Workspace networking alerts",
      lastSync: null
    }
  ]);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status) => {
    return status === 'connected' ? 'text-green-400' : 'text-slate-400';
  };

  const getStatusText = (status) => {
    return status === 'connected' ? 'Connected ✓' : 'Not Connected';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">Account Settings ⚙️</h1>
          <p className="text-slate-300 mt-2">Manage your profile, preferences, and integrations</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            👤 Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Full Name</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.fullName}
                onChange={(e) => handleProfileChange('fullName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Email</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">University</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.university}
                onChange={(e) => handleProfileChange('university', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Major</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.major}
                onChange={(e) => handleProfileChange('major', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Graduation Year</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.graduationYear}
                onChange={(e) => handleProfileChange('graduationYear', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Location</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">LinkedIn URL</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.linkedinUrl}
                onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">GitHub URL</label>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                value={profile.githubUrl}
                onChange={(e) => handleProfileChange('githubUrl', e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm text-slate-300 mb-2">Professional Bio</label>
            <textarea 
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              value={profile.bio}
              onChange={(e) => handleProfileChange('bio', e.target.value)}
              placeholder="Write a brief professional bio that will be used for personalized outreach messages..."
            />
          </div>
        </div>

        {/* Account Stats */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Messages Generated</span>
                <span className="text-blue-400 font-bold">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Connections Made</span>
                <span className="text-green-400 font-bold">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Success Rate</span>
                <span className="text-purple-400 font-bold">73%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Account Level</span>
                <span className="text-orange-400 font-bold">Pro</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
            <h4 className="font-bold mb-2">🚀 Upgrade to Premium</h4>
            <p className="text-sm mb-4 opacity-90">Unlock advanced AI features and unlimited connections</p>
            <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          🔔 Notifications & Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries({
            emailNotifications: "Email Notifications",
            weeklyReports: "Weekly Analytics Reports",
            connectionReminders: "Connection Reminders",
            followUpSuggestions: "Follow-up Suggestions",
            darkMode: "Dark Mode",
            autoGenerateMessages: "Auto-generate Messages"
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div>
                <div className="text-white font-medium">{label}</div>
                <div className="text-xs text-slate-400">
                  {key === 'emailNotifications' && "Get notified about new connections"}
                  {key === 'weeklyReports' && "Receive weekly performance summaries"}
                  {key === 'connectionReminders' && "Reminders to follow up"}
                  {key === 'followUpSuggestions' && "AI-powered follow-up recommendations"}
                  {key === 'darkMode' && "Use dark theme interface"}
                  {key === 'autoGenerateMessages' && "Automatically create personalized messages"}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={preferences[key]}
                  onChange={(e) => handlePreferenceChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          🔗 Integrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-sm text-slate-400">{integration.description}</div>
                  {integration.lastSync && (
                    <div className="text-xs text-green-400 mt-1">Last sync: {integration.lastSync}</div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getStatusColor(integration.status)}`}>
                  {getStatusText(integration.status)}
                </div>
                <button className={`mt-2 px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
                  integration.status === 'connected' 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            🔒 Security & Privacy
          </h3>
          <div className="space-y-4">
            <button className="w-full text-left p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="font-medium text-white">Change Password</div>
              <div className="text-sm text-slate-400">Update your account password</div>
            </button>
            <button className="w-full text-left p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="font-medium text-white">Two-Factor Authentication</div>
              <div className="text-sm text-slate-400">Add an extra layer of security</div>
            </button>
            <button className="w-full text-left p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="font-medium text-white">Privacy Settings</div>
              <div className="text-sm text-slate-400">Control your data visibility</div>
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            📊 Data & Export
          </h3>
          <div className="space-y-4">
            <button className="w-full text-left p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="font-medium text-white">Export Connections</div>
              <div className="text-sm text-slate-400">Download your networking data</div>
            </button>
            <button className="w-full text-left p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="font-medium text-white">Export Messages</div>
              <div className="text-sm text-slate-400">Download generated messages</div>
            </button>
            <button className="w-full text-left p-3 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors">
              <div className="font-medium text-red-400">Delete Account</div>
              <div className="text-sm text-red-300">Permanently delete your account</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
