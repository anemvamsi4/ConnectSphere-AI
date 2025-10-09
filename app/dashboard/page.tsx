"use client"

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NetworkingForm from '@/components/networking/NetworkingForm'
import ResultsList from '@/components/networking/ResultsList'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { UserProfile } from '@/lib/realApi'
import { getUserProfile, getUserEducation, getUserSkills, getUserInterests } from '@/lib/user-profile'
import { Target, Edit3 } from 'lucide-react'
import { toast } from 'sonner'

// Define PersonResult type locally
interface PersonResult {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  profileImage: string;
  profileUrl: string;
  email?: string;
  linkedinUrl?: string;
  headline?: string;
  summary?: string;
  experience?: string[];
  education?: string[];
  skills?: string[];
  message: string;
  confidence: number;
  isAlumni: boolean;
  connectionStrength: number;
  mutualConnections: number;
  responseRate: number;
  lastActive: string;
  interests?: string[];
  followUpSequence?: string[];
  recentActivity?: string;
}

function DashboardContent() {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<PersonResult[]>([])
  const [isFormMinimized, setIsFormMinimized] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Show loading state while checking authentication
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isSignedIn) {
    return null // Will redirect in useEffect
  }

  async function handleSearch(input: {
    company: string
    role: string
    location: string
    userBio: string
    jobUrl: string
    tone: string
    includeFollowUps: boolean
  }) {
    console.log('Form input received:', input)
    setLoading(true)
    setHasSearched(true)
    
    try {
      // Get user profile data
      if (!user) {
        toast.error('Please sign in to search for connections')
        setLoading(false)
        return
      }

      const currentUserProfile = await getCurrentUserProfile()
      let profileToUse: UserProfile

      if (!currentUserProfile) {
        // Create a basic profile from Clerk user data for first-time users
        profileToUse = {
          firstName: user.firstName || 'User',
          lastName: user.lastName || '',
          age: 25, // Default age
          location: 'India', // Default location
          education: {
            degree: 'Bachelor of Technology',
            institution: 'University',
            fieldOfStudy: 'Computer Science'
          },
          skills: ['Communication', 'Problem Solving'],
          interests: ['Technology', 'Professional Growth'],
          socialLinks: {
            linkedin: '',
            github: '',
            portfolio: ''
          }
        }
        
        console.log('Using basic profile for new user:', profileToUse)
        toast.info('Using basic profile. Complete your profile in Settings for better matches.')
      } else {
        profileToUse = currentUserProfile
      }

      // Use AI-powered connection generation via API route
      console.log('About to make API call to /api/ai-connections')
      console.log('Request payload:', {
        searchInput: input,
        userProfile: profileToUse
      })

      let response: Response
      try {
        response = await fetch('/api/ai-connections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchInput: {
              company: input.company,
              role: input.role,
              location: input.location,
              jobUrl: input.jobUrl,
              userBio: input.userBio,
              tone: input.tone,
              includeFollowUps: input.includeFollowUps
            },
            userProfile: profileToUse
          })
        })
      } catch (fetchError) {
        console.error('Fetch request failed:', fetchError)
        throw new Error(`Network error: Unable to connect to the API. Please check if the server is running. (${fetchError instanceof Error ? fetchError.message : 'Unknown error'})`)
      }

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (!response.ok) {
        let errorMessage = 'Failed to generate connections'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (parseError) {
          console.error('Error parsing error response:', parseError)
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const { connections: people } = await response.json()
      
      console.log('People found:', people)
      
      if (people.length === 0) {
        toast.error('No connections found. Try adjusting your search criteria.')
        setResults([])
        setLoading(false)
        return
      }

      // Results already include personalized messages
      setResults(people)
      
      // Minimize form after successful search with smoother timing
      setTimeout(() => {
        setIsFormMinimized(true)
      }, 1000)
    } catch (error) {
      console.error('Error during search:', error)
      console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
      console.error('Error message:', error instanceof Error ? error.message : String(error))
      
      let errorMessage = 'Search failed. Please try again.'
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Network error: Unable to connect to the server. Please check your connection and try again.'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage)
      setResults([])
    }
    setLoading(false)
  }

  async function getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      if (!user) return null

      const [profileData, educationData, skillsData, interestsData] = await Promise.all([
        getUserProfile(user.id),
        getUserEducation(user.id),
        getUserSkills(user.id),
        getUserInterests(user.id)
      ])

      if (!profileData || !educationData) {
        return null
      }

      return {
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        age: profileData.age,
        location: `${profileData.city}, ${profileData.country}`,
        education: {
          degree: educationData.degree,
          institution: educationData.institution,
          fieldOfStudy: educationData.field_of_study
        },
        skills: skillsData.map(skill => skill.skill_name),
        interests: interestsData.map(interest => interest.domain),
        socialLinks: {
          linkedin: profileData.linkedin,
          github: profileData.github,
          portfolio: profileData.portfolio
        }
      }
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
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
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}