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
    color: 'text-muted-foreground'
  },
  {
    name: 'Messages Sent',
    value: '18',
    icon: MessageCircle,
    color: 'text-muted-foreground'
  },
  {
    name: 'Responses',
    value: '12',
    icon: CheckCircle,
    color: 'text-muted-foreground'
  }
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-background border-r border-border flex flex-col z-50">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-xl font-bold text-foreground">ConnectSphere AI</h1>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{stat.name}</p>
                      <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Separator className="bg-border mx-4" />

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
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-muted p-2 rounded-full">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Welcome back!</p>
            <p className="text-xs text-muted-foreground">Manage your account</p>
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