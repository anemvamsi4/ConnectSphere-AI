"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NetworkingForm from '@/components/networking/NetworkingForm'
import ResultsList from '@/components/networking/ResultsList'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { findPeople, generateMessagesBatch, PersonResult } from '@/lib/mockApi'
import { Target, Edit3 } from 'lucide-react'

function DashboardContent() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<PersonResult[]>([])
  const [isFormMinimized, setIsFormMinimized] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch(input: {
    company: string
    role: string
    userBio: string
    tone: string
    includeFollowUps: boolean
  }) {
    console.log('Form input received:', input)
    setLoading(true)
    setHasSearched(true)
    
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
      
      // Minimize form after successful search with smoother timing
      setTimeout(() => {
        setIsFormMinimized(true)
      }, 1000)
    } catch (error) {
      console.error('Error during search:', error)
      setResults([])
    }
    setLoading(false)
  }

  const handleExpandForm = () => {
    setIsFormMinimized(false)
  }

  return (
    <div className="p-8 relative">
      <div className="space-y-6">
        {/* Header */}
        <div className={`transition-all duration-500 ease-out ${isFormMinimized ? 'mb-2' : ''}`}>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Continue your networking journey and connect with industry professionals</p>
        </div>

        {/* Main Content Area */}
        <div className={`transition-all duration-500 ease-out ${
          isFormMinimized 
            ? 'grid-cols-1' 
            : 'grid grid-cols-1 lg:grid-cols-2 gap-6'
        }`}>
          {/* Results Section - Left when form is visible, full width when minimized */}
          <div className={`transition-all duration-500 ease-out ${
            isFormMinimized 
              ? 'w-full order-1' 
              : 'order-2 lg:order-1'
          }`}>
            <Card className="bg-card border-border h-full">
              <CardHeader className="relative">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Generated Connections
                </CardTitle>
                {/* Edit Icon in Header when minimized */}
                {isFormMinimized && (
                  <div className="absolute top-4 right-4">
                    <Button
                      onClick={handleExpandForm}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 bg-white dark:bg-white text-black hover:bg-gray-100 border-gray-300 hover:border-gray-400 transition-all duration-300 ease-out shadow-sm hover:shadow-md"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className={`transition-all duration-500 ease-out ${
                isFormMinimized ? 'h-[calc(100vh-200px)] overflow-y-auto' : ''
              }`}>
                <ResultsList results={results} loading={loading} isMinimized={isFormMinimized} />
              </CardContent>
            </Card>
          </div>

          {/* Form Section - Right by default */}
          <div className={`transition-all duration-500 ease-out transform origin-top-right ${
            isFormMinimized 
              ? 'scale-0 opacity-0 h-0 overflow-hidden absolute top-0 right-0' 
              : 'scale-100 opacity-100 h-auto relative order-1 lg:order-2'
          }`}>
            <NetworkingForm onSearch={handleSearch} loading={loading} />
          </div>
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