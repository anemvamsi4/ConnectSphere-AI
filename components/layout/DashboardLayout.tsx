"use client"

import AppSidebar from '@/components/navigation/AppSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-72 min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  )
}