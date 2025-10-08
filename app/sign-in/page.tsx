'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const SocialButton = ({ icon, provider, onClick }: { icon: React.ReactNode, provider: string, onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex-1 flex items-center justify-center gap-3 py-3 px-4 bg-card/50 hover:bg-card/80 rounded-lg border border-border transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-foreground"
    >
      {icon}
    </svg>
    <span className="text-sm font-medium text-foreground">{provider}</span>
  </button>
)

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    setIsLoading(true)

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      }
    } catch (err: any) {
      console.error('Error:', err.errors?.[0]?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/dashboard',
      redirectUrlComplete: '/dashboard',
    })
  }

  const handleGithubSignIn = () => {
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_github',
      redirectUrl: '/dashboard',
      redirectUrlComplete: '/dashboard',
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/20"></div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="backdrop-blur-xl bg-card/60 border border-border rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Clerk CAPTCHA element for bot protection */}
            <div id="clerk-captcha" className="flex justify-center"></div>
            
            <div>
              <label htmlFor="email-signin" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email-signin"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="password-signin" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password-signin"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-sm">Or sign in with</span>
            <div className="flex-grow border-t border-border"></div>
          </div>
          <div className="flex gap-4">
            <SocialButton
              provider="Google"
              onClick={handleGoogleSignIn}
              icon={
                <>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </>
              }
            />
            <SocialButton
              provider="GitHub"
              onClick={handleGithubSignIn}
              icon={
                <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.1.73-.24.73-.53v-1.84c-3.03.65-3.67-1.47-3.67-1.47-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.2 3.18.92.1-.72.38-1.2.7-1.48-2.43-.28-4.98-1.22-4.98-5.42 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3 1.12a10.4 10.4 0 015.46 0c2.08-1.42 3-1.12 3-1.12.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.21-2.55 5.14-5 5.42.39.34.73 1 .73 2.02v2.99c0 .29.18.63.73.53A11 11 0 0012 1.27" />
              }
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{' '}
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
          <Link 
            href="/" 
            className="block w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition text-center"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}