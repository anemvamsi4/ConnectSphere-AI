'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Icons } from '@/components/icons'

interface ClerkError {
  errors?: Array<{
    message: string;
    code?: string;
  }>;
}

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const { isSignedIn } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  // Redirect if user is already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    if (!isLoaded || !signIn || !setActive) return

    setIsLoading(true)
    setError('') // Clear previous errors

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      }
    } catch (error: unknown) {
      console.error('Error:', (error as ClerkError).errors?.[0]?.message)
      
      const errorMessage = (error as ClerkError).errors?.[0]?.message || 'An error occurred during sign in'
      
      // Handle specific error cases
      if (errorMessage.includes('Session already exists')) {
        // User is already signed in, redirect to dashboard
        router.push('/dashboard')
        return
      } else if (errorMessage.includes('Invalid email or password')) {
        setError('Invalid email or password. Please check your credentials.')
      } else if (errorMessage.includes('Too many requests')) {
        setError('Too many sign-in attempts. Please try again later.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function signInWithGoogle() {
    if (!signIn) return
    setError('') // Clear previous errors
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      })
    } catch (error: unknown) {
      console.error('Error signing in with Google:', error)
      const errorMessage = (error as ClerkError).errors?.[0]?.message || 'Failed to sign in with Google'
      if (errorMessage.includes('Session already exists')) {
        router.push('/dashboard')
      } else {
        setError(errorMessage)
      }
    }
  }

  async function signInWithGitHub() {
    if (!signIn) return
    setError('') // Clear previous errors
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_github',
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      })
    } catch (error: unknown) {
      console.error('Error signing in with GitHub:', error)
      const errorMessage = (error as ClerkError).errors?.[0]?.message || 'Failed to sign in with GitHub'
      if (errorMessage.includes('Session already exists')) {
        router.push('/dashboard')
      } else {
        setError(errorMessage)
      }
    }
  }

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Don't render sign-in form if user is already signed in
  if (isSignedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Already signed in. Redirecting...</p>
          <Icons.spinner className="h-6 w-6 animate-spin mx-auto mt-2" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 z-20 flex items-center text-lg font-medium"
      >
        Connect Sphere AI
      </Link>
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div id="clerk-captcha" className="flex justify-center"></div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="p-3 rounded-md bg-destructive/15 border border-destructive/50">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}
              <Button disabled={isLoading} className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button
              variant="outline"
              onClick={signInWithGitHub}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}
              Github
            </Button>
            <Button
              variant="outline"
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>
          </div>
        </div>
        <p className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}