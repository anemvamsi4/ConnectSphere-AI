"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserButton, useUser, useClerk } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  MessageCircle, 
  CheckCircle,
  User,
  LogOut
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
    value: '3',
    icon: Users,
    color: 'text-muted-foreground'
  },
  {
    name: 'Messages Sent',
    value: '0',
    icon: MessageCircle,
    color: 'text-muted-foreground'
  },
  {
    name: 'Responses',
    value: '0',
    icon: CheckCircle,
    color: 'text-muted-foreground'
  }
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-background border-r border-border flex flex-col z-50">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">ConnectSphere AI</h1>
      </div>

      <div className="px-6 mb-6">
        <Separator className="bg-muted-foreground/20" />
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-6">
        <div className="space-y-2">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name} className="bg-card border-border">
                <CardContent className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-0.5">{stat.name}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className={cn("h-8 w-8", stat.color)} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="px-6">
        <Separator className="bg-muted-foreground/20" />
      </div>

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
                    "w-full justify-start gap-3 h-11 text-sm",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-5 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full p-0 h-auto justify-start hover:bg-accent/50"
            >
              <div className="flex items-center gap-3 w-full p-2 rounded-md">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {user?.fullName?.charAt(0) || user?.firstName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.fullName || user?.firstName || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">Manage your account</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-64 ml-5 mb-2" 
            align="start"
            side="top"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.fullName || user?.firstName || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openUserProfile()}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Manage account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}