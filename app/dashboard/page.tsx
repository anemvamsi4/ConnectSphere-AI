"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NetworkingForm from '@/components/networking/NetworkingForm'
import ResultsList from '@/components/networking/ResultsList'
import MiniAreaChart from '@/components/shared/MiniAreaChart'
import { findPeople, generateMessagesBatch, PersonResult } from '@/lib/mockApi'
import { Users, MessageCircle, CheckCircle, Target } from 'lucide-react'
import DashboardNavigation from '@/components/navigation/DashboardNavigation'

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
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-100">Connect Sphere AI Dashboard</h1>
            <UserButton />
          </div>
          <DashboardNavigation />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Header with greeting */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Welcome back! 👋</h1>
              <p className="text-gray-400 mt-2">Continue your networking journey and connect with industry professionals</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-300">87%</div>
              <div className="text-sm text-gray-500">Progress</div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Connections Made</p>
                    <p className="text-2xl font-bold text-gray-100">24</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-300" />
                  </div>
                </div>
                <div className="mt-3">
                  <MiniAreaChart />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Messages Sent</p>
                    <p className="text-2xl font-bold text-gray-100">18</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-gray-300" />
                  </div>
                </div>
                <div className="mt-3">
                  <MiniAreaChart />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Responses</p>
                    <p className="text-2xl font-bold text-gray-100">12</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-gray-300" />
                  </div>
                </div>
                <div className="mt-3">
                  <MiniAreaChart />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Job Prospects</p>
                    <p className="text-2xl font-bold text-gray-100">6</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-gray-300" />
                  </div>
                </div>
                <div className="mt-3">
                  <MiniAreaChart />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <NetworkingForm onSearch={handleSearch} loading={loading} />
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center gap-2">
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
      </main>
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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Redirecting...</div>
      </div>
    )
  }

  return <DashboardContent />
}