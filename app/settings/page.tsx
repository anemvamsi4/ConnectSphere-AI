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
import { toast } from 'sonner'
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
        toast.error("Failed to load your profile data.")
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [user])

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

      toast.success("Your profile has been updated successfully.")

    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error("Failed to save your profile changes.")
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
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={personalDetails.firstName}
                  onChange={(e) => setPersonalDetails({...personalDetails, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={personalDetails.lastName}
                  onChange={(e) => setPersonalDetails({...personalDetails, lastName: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={personalDetails.email}
                onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={personalDetails.age}
                  onChange={(e) => setPersonalDetails({...personalDetails, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={personalDetails.gender || undefined} onValueChange={(value) => setPersonalDetails({...personalDetails, gender: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={personalDetails.phone}
                  onChange={(e) => setPersonalDetails({...personalDetails, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={personalDetails.country}
                  onChange={(e) => setPersonalDetails({...personalDetails, country: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={personalDetails.city}
                  onChange={(e) => setPersonalDetails({...personalDetails, city: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Contacts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Social Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={socialContacts.linkedin}
                onChange={(e) => setSocialContacts({...socialContacts, linkedin: e.target.value})}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Label>
              <Input
                id="twitter"
                value={socialContacts.twitter}
                onChange={(e) => setSocialContacts({...socialContacts, twitter: e.target.value})}
                placeholder="https://twitter.com/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Label>
              <Input
                id="github"
                value={socialContacts.github}
                onChange={(e) => setSocialContacts({...socialContacts, github: e.target.value})}
                placeholder="https://github.com/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Portfolio Website
              </Label>
              <Input
                id="portfolio"
                value={socialContacts.portfolio}
                onChange={(e) => setSocialContacts({...socialContacts, portfolio: e.target.value})}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  value={professionalDetails.degree}
                  onChange={(e) => setProfessionalDetails({...professionalDetails, degree: e.target.value})}
                  placeholder="e.g., Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={professionalDetails.institution}
                  onChange={(e) => setProfessionalDetails({...professionalDetails, institution: e.target.value})}
                  placeholder="e.g., MIT"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                value={professionalDetails.fieldOfStudy}
                onChange={(e) => setProfessionalDetails({...professionalDetails, fieldOfStudy: e.target.value})}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startYear">Start Year</Label>
                <Input
                  id="startYear"
                  type="number"
                  value={professionalDetails.startYear}
                  onChange={(e) => setProfessionalDetails({...professionalDetails, startYear: e.target.value})}
                  placeholder="2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endYear">End Year</Label>
                <Input
                  id="endYear"
                  type="number"
                  value={professionalDetails.endYear}
                  onChange={(e) => setProfessionalDetails({...professionalDetails, endYear: e.target.value})}
                  placeholder="2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={professionalDetails.grade}
                  onChange={(e) => setProfessionalDetails({...professionalDetails, grade: e.target.value})}
                  placeholder="e.g., A+, 3.8 GPA"
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-3">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill.name} ({skill.level})
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => removeSkill(index)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Skill name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  className="flex-1"
                />
                <Select value={newSkill.level} onValueChange={(value) => setNewSkill({...newSkill, level: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addSkill} variant="outline">Add</Button>
              </div>
            </div>

            {/* Interests Section */}
            <div className="space-y-3">
              <Label>Interests</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {interest}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => removeInterest(interest)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an interest"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  className="flex-1"
                />
                <Button onClick={addInterest} variant="outline">Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="min-w-32">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsContent />
    </DashboardLayout>
  )
}