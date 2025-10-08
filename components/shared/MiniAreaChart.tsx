"use client"

import { Card, CardContent } from "@/components/ui/card"

// Simple SVG chart placeholder - you can replace with recharts once installed
export default function MiniAreaChart() {
  return (
    <div className="w-full h-20">
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#374151" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 L20,25 L40,15 L60,20 L80,10 L100,5 L100,40 L0,40 Z"
          fill="url(#area-gradient)"
          stroke="#6b7280"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  )
}