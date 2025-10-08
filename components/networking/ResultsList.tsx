"use client"

import { PersonResult } from '@/lib/mockApi'
import MessageCard from './MessageCard'
import { Card, CardContent } from "@/components/ui/card"

interface ResultsListProps {
  results: PersonResult[]
  loading: boolean
}

export default function ResultsList({ results, loading }: ResultsListProps) {
  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="text-center py-8">
          <div className="animate-spin text-6xl mb-4">⚡</div>
          <div className="text-muted-foreground">Finding your connections...</div>
          <div className="text-sm text-muted-foreground mt-2">Searching through professional networks</div>
        </CardContent>
      </Card>
    )
  }
  
  if (!results || results.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="text-center py-8">
          <div className="text-6xl mb-4">🎯</div>
          <div className="text-muted-foreground">No connections found yet.</div>
          <div className="text-sm text-muted-foreground mt-2">Fill out the form to discover your professional network!</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="text-sm text-muted-foreground mb-4">Found {results.length} connections</div>
      {results.map((result, idx) => (
        <MessageCard key={idx} item={result} />
      ))}
    </div>
  )
}