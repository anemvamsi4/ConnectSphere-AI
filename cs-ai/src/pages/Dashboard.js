import React, { useState } from 'react';
import MiniAreaChart from '../shared/MiniAreaChart';
import NetworkingForm from '../components/NetworkingForm';
import ResultsList from '../components/ResultsList';
import { findPeople, generateMessagesBatch } from '../mockApi';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function handleSearch(input) {
    console.log('Form input received:', input);
    setLoading(true);
    try {
      // Use the enhanced API with proper parameter structure
      const people = await findPeople({ 
        company: input.company, 
        role: input.role,
        bio: input.userBio 
      });
      
      console.log('People found:', people);
      
      const messages = await generateMessagesBatch(
        people, 
        input.userBio, 
        input.tone.toLowerCase(), 
        input.includeFollowUps
      );
      
      console.log('Messages generated:', messages);
      setResults(messages);
    } catch (error) {
      console.error('Error during search:', error);
      setResults([]);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Header with student greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Student! 👋</h1>
          <p className="text-slate-300 mt-2">Continue your learning journey and connect with industry professionals</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">87%</div>
          <div className="text-sm text-slate-400">Course Progress</div>
        </div>
      </div>

      {/* Stats Cards with Educational Theme */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Connections Made</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">👥</span>
            </div>
          </div>
          <div className="mt-3"><MiniAreaChart /></div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Messages Sent</p>
              <p className="text-2xl font-bold">18</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
          </div>
          <div className="mt-3"><MiniAreaChart /></div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-200 text-sm">Responses</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
          </div>
          <div className="mt-3"><MiniAreaChart /></div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm">Job Prospects</p>
              <p className="text-2xl font-bold">6</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
          </div>
          <div className="mt-3"><MiniAreaChart /></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <NetworkingForm onSearch={handleSearch} loading={loading} />
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>🎯</span> Generated Connections
          </h3>
          <div className="mt-3">
            <ResultsList results={results} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
