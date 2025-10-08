"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Calendar, MoreHorizontal } from 'lucide-react'
import DashboardNavigation from '@/components/navigation/DashboardNavigation'

// Mock network data
const mockConnections = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer at Google",
    location: "Mountain View, CA",
    connectionDate: "2024-10-01",
    lastContact: "2024-10-08",
    status: "Active",
    mutualConnections: 15,
    tags: ["Alumni", "Tech"]
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Product Manager at Microsoft", 
    location: "Seattle, WA",
    connectionDate: "2024-09-15",
    lastContact: "2024-09-30",
    status: "Pending",
    mutualConnections: 8,
    tags: ["Product", "AI"]
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Frontend Developer at Meta",
    location: "Menlo Park, CA",
    connectionDate: "2024-09-20", 
    lastContact: "2024-10-05",
    status: "Active",
    mutualConnections: 12,
    tags: ["React", "Frontend"]
  }
]

function NetworkContent() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-100">My Network</h1>
            <UserButton />
          </div>
          <DashboardNavigation />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-100">My Professional Network</h1>
              <p className="text-gray-400 mt-2">Manage and grow your professional connections</p>
            </div>
            <Button className="bg-gray-700 hover:bg-gray-600 text-gray-100">
              <Users className="h-4 w-4 mr-2" />
              Add Connection
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Connections</p>
                    <p className="text-2xl font-bold text-gray-100">{mockConnections.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Conversations</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {mockConnections.filter(c => c.status === 'Active').length}
                    </p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">This Month</p>
                    <p className="text-2xl font-bold text-gray-100">2</p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connections List */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-100">Your Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(connection.name)}&background=6b7280&color=ffffff&size=128`}
                          alt={connection.name}
                        />
                        <AvatarFallback className="bg-gray-700 text-gray-300">
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-100">{connection.name}</h3>
                          <Badge 
                            variant={connection.status === 'Active' ? 'default' : 'secondary'}
                            className={connection.status === 'Active' 
                              ? 'bg-gray-600 text-gray-100' 
                              : 'bg-gray-700 text-gray-300'
                            }
                          >
                            {connection.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300">{connection.title}</p>
                        <p className="text-xs text-gray-400">{connection.location}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Connected: {new Date(connection.connectionDate).toLocaleDateString()}</span>
                          <span>Last contact: {new Date(connection.lastContact).toLocaleDateString()}</span>
                          <span>{connection.mutualConnections} mutual connections</span>
                        </div>
                        
                        <div className="flex gap-1 mt-2">
                          {connection.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-gray-700 text-gray-300 border-gray-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function NetworkPage() {
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

  return <NetworkContent />
}