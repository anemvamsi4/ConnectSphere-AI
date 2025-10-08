"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, Settings } from 'lucide-react'

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

export default function DashboardNavigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-4">
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        
        return (
          <Link key={item.name} href={item.href}>
            <Button 
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2",
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
  )
}