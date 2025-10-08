"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PersonResult } from '@/lib/mockApi'
import { Copy, User, ChevronDown, Target, Users, Activity, Clock, GraduationCap } from 'lucide-react'

function copyToClipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }
  const ta = document.createElement('textarea')
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  try { 
    document.execCommand('copy') 
  } catch (e) {}
  ta.remove()
  return Promise.resolve()
}

interface MessageCardProps {
  item: PersonResult
}

export default function MessageCard({ item }: MessageCardProps) {
  const [copied, setCopied] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const main = item.message
  const followUps = item.followUpSequence || []

  async function handleCopy() {
    await copyToClipboard(main)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Get connection strength color
  const getStrengthColor = (strength: number) => {
    if (strength >= 85) return 'border-gray-400 bg-gray-500/10'
    if (strength >= 75) return 'border-gray-500 bg-gray-600/10'
    if (strength >= 65) return 'border-gray-600 bg-gray-700/10'
    return 'border-gray-700 bg-gray-800/10'
  }

  const getStrengthText = (strength: number) => {
    if (strength >= 85) return 'Very Strong'
    if (strength >= 75) return 'Strong'
    if (strength >= 65) return 'Moderate'
    return 'Weak'
  }

  const getResponseColor = (rate: number) => {
    if (rate >= 80) return 'text-gray-300'
    if (rate >= 65) return 'text-gray-400'
    return 'text-gray-500'
  }

  return (
    <Card className={`bg-gray-900/50 border-2 ${getStrengthColor(item.connectionStrength)} hover:border-opacity-60 transition-all duration-300 group`}>
      <CardContent className="p-5">
        {/* Header with Profile Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-gray-600">
                <AvatarImage 
                  src={item.profileImage} 
                  alt={item.name}
                />
                <AvatarFallback className="bg-gray-700 text-gray-300">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {item.isAlumni && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center text-xs">
                  <GraduationCap className="h-2 w-2 text-gray-200" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-100 text-lg group-hover:text-gray-200 transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-300 text-sm">{item.title}</p>
              <p className="text-gray-400 text-xs flex items-center gap-1">
                <span>📍</span> {item.location}
              </p>
            </div>
          </div>

          {/* Connection Strength Badge */}
          <div className="text-center">
            <Badge variant="outline" className={`${getStrengthColor(item.connectionStrength).replace('border-', 'bg-').replace('/10', '/20')} border text-gray-200`}>
              {item.connectionStrength}% Match
            </Badge>
            <p className="text-xs text-gray-400 mt-1">{getStrengthText(item.connectionStrength)}</p>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span className="text-gray-300">{item.mutualConnections} mutual</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span className={getResponseColor(item.responseRate)}>{item.responseRate}% response</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-gray-400">{item.lastActive}</span>
            </div>
          </div>
          
          {item.confidence && (
            <div className="flex items-center gap-1 text-xs">
              <Target className="h-3 w-3" />
              <span className="text-gray-300">{item.confidence}% confidence</span>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {item.recentActivity && (
          <div className="mb-4 p-2 bg-gray-800/30 rounded-lg border-l-2 border-gray-500">
            <p className="text-xs text-gray-300 flex items-center gap-1">
              <Activity className="h-3 w-3" /> {item.recentActivity}
            </p>
          </div>
        )}

        {/* Generated Message */}
        <div className="mb-4">
          <div className="text-sm text-gray-200 bg-gray-800/70 rounded-lg p-4 border-l-4 border-gray-500 leading-relaxed">
            {main}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button 
            onClick={handleCopy} 
            variant="outline"
            size="sm"
            className={`flex-1 ${
              copied 
                ? 'bg-gray-600 text-gray-100 border-gray-500' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600'
            }`}
          >
            {copied ? (
              <>✓ Copied!</>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy Message
              </>
            )}
          </Button>
          
          <Button 
            onClick={() => setShowInsights(!showInsights)}
            variant="outline"
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600"
          >
            <Target className="h-4 w-4 mr-1" />
            Insights
          </Button>
          
          <Button 
            onClick={() => window.open(item.profileImage.replace('w=150', 'w=400'), '_blank')}
            variant="outline"
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>

        {/* Connection Insights */}
        {showInsights && (
          <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
            <h4 className="text-sm font-medium text-gray-100 mb-2 flex items-center gap-1">
              <Target className="h-4 w-4" /> Connection Strategy
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-gray-400">✓</span>
                <span>Best time to reach out: {item.lastActive.includes('hour') ? 'Now - they\'re very active!' : 'Within next few days'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400">📊</span>
                <span>Response likelihood: {item.responseRate > 75 ? 'High' : item.responseRate > 60 ? 'Medium' : 'Lower'} ({item.responseRate}%)</span>
              </div>
              {item.isAlumni && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-400">🎓</span>
                  <span>Alumni connection - mention your shared school!</span>
                </div>
              )}
              {item.mutualConnections > 10 && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-400">🤝</span>
                  <span>Strong mutual network - consider asking for a warm intro</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Follow-up Messages */}
        {followUps.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 p-2 rounded hover:bg-gray-800/30 transition-colors w-full">
              <span>📝</span> 
              <span>Follow-up Sequence ({followUps.length} messages)</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {followUps.map((followUp, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-3 border-l-2 border-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-gray-600 text-gray-100 text-xs">
                      Day {(i + 1) * 3}
                    </Badge>
                    <span className="text-xs text-gray-400">Follow-up #{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{followUp}</p>
                  <Button 
                    onClick={() => copyToClipboard(followUp)}
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600 text-xs"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Interests Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {item.interests && item.interests.slice(0, 3).map((interest, i) => (
            <Badge 
              key={i} 
              variant="outline"
              className="text-xs bg-gray-700/50 text-gray-300 border-gray-600"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}