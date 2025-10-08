'use client'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Vamsi Anem. All rights reserved.
          </div>
          <div>
            <Link 
              href="/privacy-policy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
