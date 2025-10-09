"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PersonResult } from '@/lib/realApi'
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
  isMinimized?: boolean
}

export default function MessageCard({ item, isMinimized = false }: MessageCardProps) {
  const [copied, setCopied] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const main = item.message || 'No message generated'
  const followUps = item.followUpSequence || []

  // Debug logging
  console.log('MessageCard received item:', {
    name: item.name,
    message: item.message,
    messageLength: item.message?.length || 0,
    hasMessage: !!item.message
  });

  async function handleCopy() {
    await copyToClipboard(main)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Get connection strength color
  const getStrengthColor = (strength: number) => {
    if (strength >= 85) return 'border-muted bg-muted/10'
    if (strength >= 75) return 'border-muted bg-muted/10'
    if (strength >= 65) return 'border-muted bg-muted/10'
    return 'border-muted bg-muted/10'
  }

  const getStrengthText = (strength: number) => {
    if (strength >= 85) return 'Very Strong'
    if (strength >= 75) return 'Strong'
    if (strength >= 65) return 'Moderate'
    return 'Weak'
  }

  const getResponseColor = (rate: number) => {
    if (rate >= 80) return 'text-foreground'
    if (rate >= 65) return 'text-muted-foreground'
    return 'text-muted-foreground'
  }

  // Minimized compact view
  if (isMinimized) {
    return (
      <Card className="bg-card/50 border border-border hover:border-accent/50 transition-all duration-300 ease-out group cursor-pointer hover:shadow-md transform hover:scale-[1.02]">
        <CardContent className="p-4">
          {/* Compact Header */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10 border border-border transition-all duration-300 ease-out group-hover:border-accent/50">
              <AvatarImage src={item.profileImage} alt={item.name} />
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                {item.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm truncate transition-colors duration-300 ease-out group-hover:text-accent-foreground">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-xs truncate">{item.title}</p>
              <p className="text-muted-foreground text-xs truncate opacity-75">{item.company}</p>
            </div>
            <Badge variant="outline" className="text-xs bg-muted/50 text-foreground border-border shrink-0 transition-all duration-300 ease-out group-hover:bg-accent/20">
              {item.connectionStrength}%
            </Badge>
          </div>

          {/* Compact Metrics */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1 transition-colors duration-300 ease-out group-hover:text-foreground">
              <Users className="h-3 w-3" />
              {item.mutualConnections}
            </span>
            <span className="flex items-center gap-1 transition-colors duration-300 ease-out group-hover:text-foreground">
              <Activity className="h-3 w-3" />
              {item.responseRate}%
            </span>
            <span className="flex items-center gap-1 transition-colors duration-300 ease-out group-hover:text-foreground">
              <Clock className="h-3 w-3" />
              {item.lastActive.split(' ')[0]}
            </span>
          </div>

          {/* Compact Message Preview */}
          <div className="text-xs text-muted-foreground bg-muted/30 rounded p-2 mb-3 line-clamp-2 leading-relaxed transition-all duration-300 ease-out group-hover:bg-muted/50">
            {main.substring(0, 100)}...
          </div>

          {/* Compact Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                handleCopy()
              }}
              variant="outline"
              size="sm"
              className="flex-1 text-xs bg-card hover:bg-accent border-border transition-all duration-300 ease-out"
            >
              {copied ? '✓' : <Copy className="h-3 w-3" />}
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                window.open(item.profileImage.replace('w=150', 'w=400'), '_blank')
              }}
              variant="outline"
              size="sm"
              className="bg-card hover:bg-accent border-border transition-all duration-300 ease-out"
            >
              <User className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Full expanded view
  return (
    <Card className={`bg-card/50 border-2 ${getStrengthColor(item.connectionStrength)} hover:border-opacity-60 transition-all duration-300 group`}>
      <CardContent className="p-5">
        {/* Header with Profile Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-border">
                <AvatarImage 
                  src={item.profileImage} 
                  alt={item.name}
                />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {item.isAlumni && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-muted rounded-full flex items-center justify-center text-xs">
                  <GraduationCap className="h-2 w-2 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg group-hover:text-accent-foreground transition-colors">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-sm">{item.title}</p>
              <p className="text-muted-foreground text-sm font-medium">{item.company}</p>
              <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                <span>📍</span> {item.location}
              </p>
            </div>
          </div>

          {/* Connection Strength Badge */}
          <div className="text-center">
            <Badge variant="outline" className={`${getStrengthColor(item.connectionStrength).replace('border-', 'bg-').replace('/10', '/20')} border text-foreground`}>
              {item.connectionStrength}% Match
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">{getStrengthText(item.connectionStrength)}</p>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span className="text-muted-foreground">{item.mutualConnections} mutual</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span className={getResponseColor(item.responseRate)}>{item.responseRate}% response</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-muted-foreground">{item.lastActive}</span>
            </div>
          </div>
          
          {item.confidence && (
            <div className="flex items-center gap-1 text-xs">
              <Target className="h-3 w-3" />
              <span className="text-muted-foreground">{item.confidence}% confidence</span>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {item.recentActivity && (
          <div className="mb-4 p-2 bg-muted/30 rounded-lg border-l-2 border-accent">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" /> {item.recentActivity}
            </p>
          </div>
        )}

        {/* Generated Message */}
        <div className="mb-4">
          <div className="text-sm text-foreground bg-muted/70 rounded-lg p-4 border-l-4 border-accent leading-relaxed">
            {main === 'No message generated' ? (
              <div className="text-muted-foreground italic">
                <span className="animate-pulse">⚡</span> Personalized message not available
              </div>
            ) : (
              main
            )}
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
                ? 'bg-muted text-foreground border-border' 
                : 'bg-card hover:bg-accent text-foreground border-border'
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
            className="bg-card hover:bg-accent text-foreground border-border"
          >
            <Target className="h-4 w-4 mr-1" />
            Insights
          </Button>
          
          <Button 
            onClick={() => window.open(item.profileImage.replace('w=150', 'w=400'), '_blank')}
            variant="outline"
            size="sm"
            className="bg-card hover:bg-accent text-foreground border-border"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>

        {/* Connection Insights */}
        {showInsights && (
          <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
              <Target className="h-4 w-4" /> Connection Strategy
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">✓</span>
                <span>Best time to reach out: {item.lastActive.includes('hour') ? 'Now - they\'re very active!' : 'Within next few days'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">📊</span>
                <span>Response likelihood: {item.responseRate > 75 ? 'High' : item.responseRate > 60 ? 'Medium' : 'Lower'} ({item.responseRate}%)</span>
              </div>
              {item.isAlumni && (
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">🎓</span>
                  <span>Alumni connection - mention your shared school!</span>
                </div>
              )}
              {item.mutualConnections > 10 && (
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">🤝</span>
                  <span>Strong mutual network - consider asking for a warm intro</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Follow-up Messages */}
        {followUps.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-2 rounded hover:bg-accent/30 transition-colors w-full">
              <span>📝</span> 
              <span>Follow-up Sequence ({followUps.length} messages)</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {followUps.map((followUp: string, i: number) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3 border-l-2 border-accent">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-muted text-foreground text-xs">
                      Day {(i + 1) * 3}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Follow-up #{i + 1}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{followUp}</p>
                  <Button 
                    onClick={() => copyToClipboard(followUp)}
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-card hover:bg-accent text-foreground border-border text-xs"
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
          {item.interests && item.interests.slice(0, 3).map((interest: string, i: number) => (
            <Badge 
              key={i} 
              variant="outline"
              className="text-xs bg-muted/50 text-muted-foreground border-border"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}