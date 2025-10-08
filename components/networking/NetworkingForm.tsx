"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Sparkles } from 'lucide-react'

interface NetworkingFormProps {
  onSearch: (input: {
    userBio: string
    jobUrl: string
    company: string
    role: string
    tone: string
    includeFollowUps: boolean
  }) => void
  loading: boolean
}

export default function NetworkingForm({ onSearch, loading }: NetworkingFormProps) {
  const [userBio, setUserBio] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [tone, setTone] = useState('Formal')
  const [includeFollowUps, setIncludeFollowUps] = useState(true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch({ userBio, jobUrl, company, role, tone, includeFollowUps })
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100 flex items-center gap-2">
          <Search className="h-5 w-5" />
          Career Network Builder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-300">Your Professional Summary</Label>
            <Textarea
              id="bio"
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              placeholder="e.g. Computer Science student specializing in full-stack development with internship experience..."
              rows={3}
              className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-gray-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-300">Target Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-gray-500"
                placeholder="Google, Microsoft, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-300">Dream Role</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-gray-500"
                placeholder="Software Engineer, PM, etc."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobUrl" className="text-gray-300">Job Posting URL (optional)</Label>
            <Input
              id="jobUrl"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://careers.company.com/job..."
              className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-gray-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Label className="text-gray-300">Message Style</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Formal" className="text-gray-100 focus:bg-gray-700">Formal</SelectItem>
                  <SelectItem value="Casual" className="text-gray-100 focus:bg-gray-700">Casual</SelectItem>
                  <SelectItem value="Enthusiastic" className="text-gray-100 focus:bg-gray-700">Enthusiastic</SelectItem>
                  <SelectItem value="Direct" className="text-gray-100 focus:bg-gray-700">Direct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="followups"
                checked={includeFollowUps}
                onCheckedChange={(checked) => setIncludeFollowUps(checked === true)}
                className="border-gray-600 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-500"
              />
              <Label htmlFor="followups" className="text-gray-300 text-sm">
                Include follow-ups
              </Label>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-100 font-medium py-3"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                Generating connections...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Find My Network & Generate Messages
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}