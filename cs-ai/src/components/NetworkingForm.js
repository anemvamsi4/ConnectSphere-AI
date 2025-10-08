import React, { useState } from 'react';

export default function NetworkingForm({ onSearch, loading }) {
  const [userBio, setUserBio] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [tone, setTone] = useState('Formal');
  const [includeFollowUps, setIncludeFollowUps] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ userBio, jobUrl, company, role, tone, includeFollowUps });
  }

  return (
    <form className="bg-slate-800 rounded-xl p-6 border border-slate-700" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <span>🔍</span> Career Network Builder
      </h3>

      <label className="block text-sm text-slate-300 mb-2">Your Professional Summary</label>
      <textarea
        value={userBio}
        onChange={(e) => setUserBio(e.target.value)}
        placeholder="e.g. Computer Science student specializing in full-stack development with internship experience..."
        rows={3}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div>
          <label className="block text-sm text-slate-300 mb-2">Target Company</label>
          <input 
            value={company} 
            onChange={(e) => setCompany(e.target.value)} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Google, Microsoft, etc." 
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-2">Dream Role</label>
          <input 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Software Engineer, PM, etc." 
            required 
          />
        </div>
      </div>

      <label className="block text-sm text-slate-300 mb-2 mt-4">Job Posting URL (optional)</label>
      <input 
        value={jobUrl} 
        onChange={(e) => setJobUrl(e.target.value)} 
        placeholder="https://careers.company.com/job..." 
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Message Style</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500">
            <option>Formal</option>
            <option>Casual</option>
            <option>Enthusiastic</option>
            <option>Direct</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input 
            type="checkbox" 
            checked={includeFollowUps} 
            onChange={(e) => setIncludeFollowUps(e.target.checked)} 
            className="rounded bg-slate-700 border-slate-600 text-blue-600 focus:ring-blue-500" 
          /> 
          Include follow-ups
        </label>
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating connections...
          </span>
        ) : (
          'Find My Network & Generate Messages 🚀'
        )}
      </button>
    </form>
  );
}
