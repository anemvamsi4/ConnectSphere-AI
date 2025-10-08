"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserButton } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  MessageCircle, 
  CheckCircle,
  User
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'My Network',
    href: '/network', 
    icon: Users
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
]

const stats = [
  {
    name: 'Connections Made',
    value: '24',
    icon: Users,
    color: 'text-gray-300'
  },
  {
    name: 'Messages Sent',
    value: '18',
    icon: MessageCircle,
    color: 'text-gray-300'
  },
  {
    name: 'Responses',
    value: '12',
    icon: CheckCircle,
    color: 'text-gray-300'
  }
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col z-50">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-100">ConnectSphere AI</h1>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{stat.name}</p>
                      <p className="text-lg font-semibold text-gray-100">{stat.value}</p>
                    </div>
                    <Icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Separator className="bg-gray-800 mx-4" />

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.name} href={item.href}>
                <Button 
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive 
                      ? "bg-gray-700 text-gray-100 hover:bg-gray-600" 
                      : "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gray-700 p-2 rounded-full">
            <User className="h-4 w-4 text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-100 truncate">Welcome back!</p>
            <p className="text-xs text-gray-400">Manage your account</p>
          </div>
        </div>
        <div className="flex justify-center">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}