"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NetworkingForm from '@/components/networking/NetworkingForm'
import ResultsList from '@/components/networking/ResultsList'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { findPeople, generateMessagesBatch, PersonResult } from '@/lib/mockApi'
import { Target } from 'lucide-react'

function DashboardContent() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<PersonResult[]>([])

  async function handleSearch(input: {
    company: string
    role: string
    userBio: string
    tone: string
    includeFollowUps: boolean
  }) {
    console.log('Form input received:', input)
    setLoading(true)
    try {
      const people = await findPeople({ 
        company: input.company, 
        role: input.role,
        bio: input.userBio 
      })
      
      console.log('People found:', people)
      
      const messages = await generateMessagesBatch(
        people, 
        input.userBio, 
        input.tone.toLowerCase(), 
        input.includeFollowUps
      )
      
      console.log('Messages generated:', messages)
      setResults(messages)
    } catch (error) {
      console.error('Error during search:', error)
      setResults([])
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Continue your networking journey and connect with industry professionals</p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <NetworkingForm onSearch={handleSearch} loading={loading} />
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Target className="h-5 w-5" />
                Generated Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResultsList results={results} loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isLoaded && !userId && isClient) {
      router.push('/sign-in')
    }
  }, [isLoaded, userId, router, isClient])

  if (!isLoaded || !isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Redirecting...</div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}