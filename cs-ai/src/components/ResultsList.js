import React from 'react';
import MessageCard from './MessageCard';

export default function ResultsList({ results, loading }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin text-6xl mb-4">⚡</div>
        <div className="text-slate-400">Finding your connections...</div>
        <div className="text-sm text-slate-500 mt-2">Searching through professional networks</div>
      </div>
    );
  }
  
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎯</div>
        <div className="text-slate-400">No connections found yet.</div>
        <div className="text-sm text-slate-500 mt-2">Fill out the form to discover your professional network!</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="text-sm text-slate-400 mb-4">Found {results.length} connections</div>
      {results.map((r, idx) => (
        <MessageCard key={idx} item={r} />
      ))}
    </div>
  );
}
