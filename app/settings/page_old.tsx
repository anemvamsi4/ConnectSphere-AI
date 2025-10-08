"use client"

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { User, Briefcase, Users, Save, Globe, Linkedin, Twitter, Github, X, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  getUserProfile,
  getUserEducation,
  getUserSkills,
  getUserInterests,
  updateUserProfile,
  updateUserEducation,
  updateUserSkills,
  updateUserInterests
} from '@/lib/user-profile'

function SettingsContent() {
  const { user } = useUser()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Personal Details
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    country: '',
    city: '',
    phone: ''
  })

  // Social Contacts
  const [socialContacts, setSocialContacts] = useState({
    linkedin: '',
    twitter: '',
    github: '',
    portfolio: ''
  })

  // Professional Details
  const [professionalDetails, setProfessionalDetails] = useState({
    degree: '',
    institution: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    grade: ''
  })

  const [skills, setSkills] = useState<{ name: string; level: string }[]>([])
  const [interests, setInterests] = useState<string[]>([])

  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' })
  const [newInterest, setNewInterest] = useState('')

  // Load user data
  useEffect(() => {
    if (!user) return

    const loadUserData = async () => {
      try {
        setLoading(true)
        
        // Load profile data
        const profileData = await getUserProfile(user.id)
        if (profileData) {
          setPersonalDetails({
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || '',
            email: profileData.email || '',
            age: profileData.age?.toString() || '',
            gender: profileData.gender || '',
            country: profileData.country || '',
            city: profileData.city || '',
            phone: profileData.phone || ''
          })
          
          setSocialContacts({
            linkedin: profileData.linkedin || '',
            twitter: profileData.twitter || '',
            github: profileData.github || '',
            portfolio: profileData.portfolio || ''
          })
        }

        // Load education data
        const educationData = await getUserEducation(user.id)
        if (educationData) {
          setProfessionalDetails({
            degree: educationData.degree || '',
            institution: educationData.institution || '',
            fieldOfStudy: educationData.field_of_study || '',
            startYear: educationData.start_year?.toString() || '',
            endYear: educationData.end_year?.toString() || '',
            grade: educationData.grade || ''
          })
        }

        // Load skills
        const skillsData = await getUserSkills(user.id)
        setSkills(skillsData.map(skill => ({
          name: skill.skill_name,
          level: skill.proficiency_level
        })))

        // Load interests
        const interestsData = await getUserInterests(user.id)
        setInterests(interestsData.map(interest => interest.domain))

      } catch (error) {
        console.error('Error loading user data:', error)
        toast({
          title: "Error",
          description: "Failed to load your profile data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [user, toast])

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, newSkill])
      setNewSkill({ name: '', level: 'Beginner' })
    }
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest])
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest))
  }

  const handleSave = async () => {
    if (!user) return

    try {
      setSaving(true)

      // Update profile data
      const profileUpdateData = {
        first_name: personalDetails.firstName,
        last_name: personalDetails.lastName,
        age: parseInt(personalDetails.age) || 0,
        gender: personalDetails.gender,
        country: personalDetails.country,
        city: personalDetails.city,
        phone: personalDetails.phone,
        linkedin: socialContacts.linkedin,
        twitter: socialContacts.twitter,
        github: socialContacts.github,
        portfolio: socialContacts.portfolio,
      }

      const profileSuccess = await updateUserProfile(user.id, profileUpdateData)
      if (!profileSuccess) throw new Error('Failed to update profile')

      // Update education data
      const educationUpdateData = {
        degree: professionalDetails.degree,
        institution: professionalDetails.institution,
        field_of_study: professionalDetails.fieldOfStudy,
        start_year: parseInt(professionalDetails.startYear) || 0,
        end_year: parseInt(professionalDetails.endYear) || 0,
        grade: professionalDetails.grade,
      }

      const educationSuccess = await updateUserEducation(user.id, educationUpdateData)
      if (!educationSuccess) throw new Error('Failed to update education')

      // Update skills
      const skillsSuccess = await updateUserSkills(user.id, skills)
      if (!skillsSuccess) throw new Error('Failed to update skills')

      // Update interests
      const interestsSuccess = await updateUserInterests(user.id, interests)
      if (!interestsSuccess) throw new Error('Failed to update interests')

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      })

    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error",
        description: "Failed to save your profile changes.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="space-y-6 w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Update your personal, professional, and social information</p>
        </div>

        {/* Personal Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                <Input
                  id="fullName"
                  value={personalDetails.fullName}
                  onChange={(e) => setPersonalDetails({...personalDetails, fullName: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalDetails.email}
                  onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                <Input
                  id="phone"
                  value={personalDetails.phone}
                  onChange={(e) => setPersonalDetails({...personalDetails, phone: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground">Location</Label>
                <Input
                  id="location"
                  value={personalDetails.location}
                  onChange={(e) => setPersonalDetails({...personalDetails, location: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-foreground">Personal Bio</Label>
              <Textarea
                id="bio"
                value={personalDetails.bio}
                onChange={(e) => setPersonalDetails({...personalDetails, bio: e.target.value})}
                className="bg-background border-border text-foreground"
                rows={3}
                placeholder="Tell others about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentRole" className="text-foreground">Current Role</Label>
                <Input
                  id="currentRole"
                  value={professionalDetails.currentRole}
                  onChange={(e) => setProfessionalDetails({...professionalDetails, currentRole: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">Company</Label>
                <Input
                  id="company"
                  value={professionalDetails.company}
                  onChange={(e) => setProfessionalDetails({...professionalDetails, company: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-foreground">Industry</Label>
                <Select value={professionalDetails.industry} onValueChange={(value) => setProfessionalDetails({...professionalDetails, industry: value})}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="Technology" className="text-foreground">Technology</SelectItem>
                    <SelectItem value="Finance" className="text-foreground">Finance</SelectItem>
                    <SelectItem value="Healthcare" className="text-foreground">Healthcare</SelectItem>
                    <SelectItem value="Education" className="text-foreground">Education</SelectItem>
                    <SelectItem value="Marketing" className="text-foreground">Marketing</SelectItem>
                    <SelectItem value="Consulting" className="text-foreground">Consulting</SelectItem>
                    <SelectItem value="Retail" className="text-foreground">Retail</SelectItem>
                    <SelectItem value="Other" className="text-foreground">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-foreground">Experience Level</Label>
                <Select value={professionalDetails.experience} onValueChange={(value) => setProfessionalDetails({...professionalDetails, experience: value})}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="Entry Level (0-2 years)" className="text-foreground">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="Mid Level (3-5 years)" className="text-foreground">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="Senior Level (5-7 years)" className="text-foreground">Senior Level (5-7 years)</SelectItem>
                    <SelectItem value="Lead/Principal (8+ years)" className="text-foreground">Lead/Principal (8+ years)</SelectItem>
                    <SelectItem value="Executive/C-Level" className="text-foreground">Executive/C-Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="text-foreground">Skills & Expertise</Label>
              <Textarea
                id="skills"
                value={professionalDetails.skills}
                onChange={(e) => setProfessionalDetails({...professionalDetails, skills: e.target.value})}
                className="bg-background border-border text-foreground"
                rows={2}
                placeholder="List your key skills and areas of expertise..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals" className="text-foreground">Networking Goals</Label>
              <Textarea
                id="goals"
                value={professionalDetails.goals}
                onChange={(e) => setProfessionalDetails({...professionalDetails, goals: e.target.value})}
                className="bg-background border-border text-foreground"
                rows={3}
                placeholder="What are you looking to achieve through networking?"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Contacts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5" />
              Social Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-foreground flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin"
                  value={socialContacts.linkedin}
                  onChange={(e) => setSocialContacts({...socialContacts, linkedin: e.target.value})}
                  className="bg-background border-border text-foreground"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-foreground flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter/X Handle
                </Label>
                <Input
                  id="twitter"
                  value={socialContacts.twitter}
                  onChange={(e) => setSocialContacts({...socialContacts, twitter: e.target.value})}
                  className="bg-background border-border text-foreground"
                  placeholder="@yourusername"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github" className="text-foreground flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  value={socialContacts.github}
                  onChange={(e) => setSocialContacts({...socialContacts, github: e.target.value})}
                  className="bg-background border-border text-foreground"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-foreground flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Personal Website
                </Label>
                <Input
                  id="website"
                  value={socialContacts.website}
                  onChange={(e) => setSocialContacts({...socialContacts, website: e.target.value})}
                  className="bg-background border-border text-foreground"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Settings() {
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
      <SettingsContent />
    </DashboardLayout>
  )
}