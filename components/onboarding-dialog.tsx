'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/lib/supabase'
import { Icons } from '@/components/icons'

// Schema for Step 1: Personal Details
const personalDetailsSchema = z.object({
  age: z.string().min(1, 'Age is required'), // Take as string
  gender: z.string().min(1, 'Please select your gender'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  phone: z.string().optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid Portfolio URL').optional().or(z.literal('')),
})

// Schema for Step 2: Professional Details
const professionalDetailsSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  startYear: z.number().min(1950).max(new Date().getFullYear()),
  endYear: z.number().min(1950).max(new Date().getFullYear() + 10).optional(),
  grade: z.string().optional(),
  skills: z.array(z.object({
    name: z.string().min(1),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
  })).min(1, 'Please add at least one skill'),
  interests: z.array(z.string()).min(1, 'Please select at least one domain'),
})

interface OnboardingDialogProps {
  open: boolean
  onComplete: () => void
}

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'India', 'Japan', 'China', 'Brazil', 'Mexico', 'Spain',
  'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland',
  'Switzerland', 'Singapore', 'South Korea', 'Other'
]

const interestDomains = [
  'Software Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence',
  'Cybersecurity', 'Cloud Computing', 'DevOps', 'Mobile Development',
  'Web Development', 'Blockchain', 'IoT', 'Robotics', 'Game Development',
  'UI/UX Design', 'Digital Marketing', 'Product Management', 'Business Analysis',
  'Finance', 'Healthcare', 'Education', 'E-commerce', 'Other'
]

export function OnboardingDialog({ open, onComplete }: OnboardingDialogProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [personalData, setPersonalData] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; path: string } | null>(null)
  const { user } = useUser()
  const router = useRouter()

  const personalForm = useForm<z.infer<typeof personalDetailsSchema>>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      age: '', // String default value
      gender: '',
      country: '',
      city: '',
      phone: '',
      linkedin: '',
      twitter: '',
      github: '',
      portfolio: '',
    },
  })

  const professionalForm = useForm<z.infer<typeof professionalDetailsSchema>>({
    resolver: zodResolver(professionalDetailsSchema),
    defaultValues: {
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(), // Use current year instead of undefined
      grade: '',
      skills: [],
      interests: [],
    },
  })

  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' as const })

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const currentSkills = professionalForm.getValues('skills')
      professionalForm.setValue('skills', [...currentSkills, newSkill])
      setNewSkill({ name: '', level: 'Beginner' })
    }
  }

  const removeSkill = (index: number) => {
    const currentSkills = professionalForm.getValues('skills')
    professionalForm.setValue('skills', currentSkills.filter((_, i) => i !== index))
  }

  const onPersonalSubmit = async (values: z.infer<typeof personalDetailsSchema>) => {
    // Convert age string to number and validate
    const ageNumber = parseInt(values.age, 10)
    if (isNaN(ageNumber) || ageNumber < 16 || ageNumber > 100) {
      personalForm.setError('age', { 
        type: 'manual', 
        message: 'Age must be a number between 16 and 100' 
      })
      return
    }
    
    // Store the data with age as number
    setPersonalData({ ...values, age: ageNumber })
    setStep(2)
  }

  const onProfessionalSubmit = async (values: z.infer<typeof professionalDetailsSchema>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Save personal details to user_profiles table
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          email: user.emailAddresses[0]?.emailAddress || '',
          first_name: user.firstName || '',
          last_name: user.lastName || '',
          age: personalData.age,
          gender: personalData.gender,
          country: personalData.country,
          city: personalData.city,
          phone: personalData.phone,
          linkedin: personalData.linkedin,
          twitter: personalData.twitter,
          github: personalData.github,
          portfolio: personalData.portfolio,
        })

      if (profileError) throw profileError

      // Save education details
      const { error: educationError } = await supabase
        .from('user_education')
        .insert({
          user_id: user.id,
          degree: values.degree,
          institution: values.institution,
          field_of_study: values.fieldOfStudy,
          start_year: values.startYear,
          end_year: values.endYear,
          grade: values.grade,
        })

      if (educationError) throw educationError

      // Save skills
      if (values.skills.length > 0) {
        const skillsData = values.skills.map(skill => ({
          user_id: user.id,
          skill_name: skill.name,
          proficiency_level: skill.level,
        }))
        
        const { error: skillsError } = await supabase
          .from('user_skills')
          .insert(skillsData)

        if (skillsError) throw skillsError
      }

      // Save interests
      if (values.interests.length > 0) {
        const interestsData = values.interests.map(interest => ({
          user_id: user.id,
          domain: interest,
        }))
        
        const { error: interestsError } = await supabase
          .from('user_interests')
          .insert(interestsData)

        if (interestsError) throw interestsError
      }

      // Call onComplete to close dialog and handle redirect
      onComplete()
    } catch (error) {
      console.error('Error saving onboarding data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    console.log('Starting file upload for user:', user.id)
    setIsLoading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/resume.${fileExt}`
      
      console.log('Uploading file to storage:', fileName)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file, { upsert: true })

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        throw uploadError
      }
      
      console.log('File uploaded successfully to storage:', uploadData)

      // Save document reference in database
      console.log('Saving document reference to database')
      const documentData = {
        user_id: user.id,
        document_type: 'resume',
        file_name: file.name,
        file_path: fileName,
        file_size: file.size,
      }
      console.log('Document data to insert:', documentData)
      
      const { data: dbData, error: dbError } = await supabase
        .from('user_documents')
        .insert(documentData)

      if (dbError) {
        console.error('Database insert error:', dbError)
        console.error('Error details:', JSON.stringify(dbError, null, 2))
        // Don't throw error, just log it - file is already uploaded
        console.warn('File uploaded but database record failed - continuing...')
      } else {
        console.log('Document reference saved to database:', dbData)
      }

      // Track the uploaded file
      setUploadedFile({ name: file.name, path: fileName })
      console.log('Resume uploaded successfully:', fileName)
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Welcome to Connect Sphere AI!</DialogTitle>
          <DialogDescription>
            Let's set up your profile to provide personalized networking recommendations.
          </DialogDescription>
          <Progress value={(step / 2) * 100} className="w-full" />
        </DialogHeader>

        {step === 1 && (
          <Form {...personalForm}>
            <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={personalForm.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="25" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={personalForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={personalForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 8900" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Label>Social Media & Professional Links (Optional)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={personalForm.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalForm.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={personalForm.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter/X</FormLabel>
                        <FormControl>
                          <Input placeholder="https://twitter.com/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalForm.control}
                    name="portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourportfolio.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Continue to Professional Details
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...professionalForm}>
            <form onSubmit={professionalForm.handleSubmit(onProfessionalSubmit)} className="space-y-4">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Education</Label>
                <FormField
                  control={professionalForm.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="Bachelor of Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={professionalForm.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input placeholder="University of Technology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={professionalForm.control}
                  name="fieldOfStudy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={professionalForm.control}
                    name="startYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2020" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || new Date().getFullYear())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={professionalForm.control}
                    name="endYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Year (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2024" 
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value
                              field.onChange(value === '' ? new Date().getFullYear() : parseInt(value) || new Date().getFullYear())
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={professionalForm.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="3.8 GPA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Skills</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter skill"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Select 
                    value={newSkill.level} 
                    onValueChange={(value: any) => setNewSkill(prev => ({ ...prev, level: value }))}
                  >
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
                  <Button type="button" onClick={addSkill}>Add</Button>
                </div>
                <div className="space-y-2">
                  {professionalForm.watch('skills').map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span>{skill.name} - {skill.level}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <FormField
                control={professionalForm.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <Label className="text-base font-semibold">Interested Domains</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {interestDomains.map((domain) => (
                        <FormField
                          key={domain}
                          control={professionalForm.control}
                          name="interests"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={domain}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(domain)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, domain])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== domain
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {domain}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Label className="text-base font-semibold">Resume Upload (Optional)</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                />
                {uploadedFile && (
                  <p className="text-sm text-green-600">
                    ✓ Uploaded: {uploadedFile.name}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Complete Setup
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}