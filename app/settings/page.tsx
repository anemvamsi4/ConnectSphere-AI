"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from '@/components/layout/DashboardLayout'
import { User, Bell, Shield, Palette, Save } from 'lucide-react'

function SettingsContent() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software engineer passionate about AI and networking',
    location: 'San Francisco, CA',
    industry: 'Technology'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    digest: true
  })

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en'
  })

  return (
    <div className="p-8">
      <div className="space-y-6 w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-gray-100"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300">Professional Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="bg-gray-800 border-gray-700 text-gray-100"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                <Select value={profile.industry} onValueChange={(value) => setProfile({...profile, industry: value})}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Technology" className="text-gray-100">Technology</SelectItem>
                    <SelectItem value="Finance" className="text-gray-100">Finance</SelectItem>
                    <SelectItem value="Healthcare" className="text-gray-100">Healthcare</SelectItem>
                    <SelectItem value="Education" className="text-gray-100">Education</SelectItem>
                    <SelectItem value="Marketing" className="text-gray-100">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
              />
            </div>
            <Separator className="bg-gray-800" />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Push Notifications</Label>
                <p className="text-sm text-gray-500">Receive push notifications in browser</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
              />
            </div>
            <Separator className="bg-gray-800" />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Weekly Digest</Label>
                <p className="text-sm text-gray-500">Receive weekly summary emails</p>
              </div>
              <Switch
                checked={notifications.digest}
                onCheckedChange={(checked) => setNotifications({...notifications, digest: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance & Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Theme</Label>
                <Select value={preferences.theme} onValueChange={(value) => setPreferences({...preferences, theme: value})}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="dark" className="text-gray-100">Dark</SelectItem>
                    <SelectItem value="light" className="text-gray-100">Light</SelectItem>
                    <SelectItem value="system" className="text-gray-100">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Language</Label>
                <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="en" className="text-gray-100">English</SelectItem>
                    <SelectItem value="es" className="text-gray-100">Spanish</SelectItem>
                    <SelectItem value="fr" className="text-gray-100">French</SelectItem>
                    <SelectItem value="de" className="text-gray-100">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 text-gray-100 border-gray-700">
              Change Password
            </Button>
            <Separator className="bg-gray-800" />
            <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 text-gray-100 border-gray-700">
              Download Your Data
            </Button>
            <Separator className="bg-gray-800" />
            <Button variant="destructive" className="bg-red-900 hover:bg-red-800 text-red-100">
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-gray-700 hover:bg-gray-600 text-gray-100">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
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

  return (
    <DashboardLayout>
      <SettingsContent />
    </DashboardLayout>
  )
}