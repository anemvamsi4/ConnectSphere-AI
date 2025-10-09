"use client"

import { PersonResult } from '@/lib/aiConnectionsApi'
import MessageCard from './MessageCard'
import { Card, CardContent } from "@/components/ui/card"

interface ResultsListProps {
  results: PersonResult[]
  loading: boolean
  isMinimized?: boolean
}

export default function ResultsList({ results, loading, isMinimized = false }: ResultsListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin text-6xl mb-4">⚡</div>
        <div className="text-muted-foreground">Finding your connections...</div>
        <div className="text-sm text-muted-foreground mt-2">Searching through professional networks</div>
      </div>
    )
  }
  
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎯</div>
        <div className="text-muted-foreground">No connections found yet.</div>
        <div className="text-sm text-muted-foreground mt-2">Fill out the form to discover your professional network!</div>
      </div>
    )
  }

  return (
    <>
      <div className="text-sm text-muted-foreground mb-4 transition-all duration-500 ease-out">
        Found {results.length} connections
      </div>
      <div className={`transition-all duration-500 ease-out ${
        isMinimized 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' 
          : 'space-y-4 max-h-96 overflow-y-auto'
      }`}>
        {results.map((result, idx) => (
          <div key={idx} className={`transition-all duration-500 ease-out ${isMinimized ? 'animate-in fade-in slide-in-from-bottom-4' : ''}`} style={{ animationDelay: `${idx * 100}ms` }}>
            <MessageCard item={result} isMinimized={isMinimized} />
          </div>
        ))}
      </div>
    </>
  )
}