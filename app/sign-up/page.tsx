'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSignUp, useUser } from '@clerk/nextjs'
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
import { OnboardingDialog } from '@/components/onboarding-dialog'

interface ClerkError {
  errors?: Array<{
    message: string;
    code?: string;
  }>;
}

const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const verifyEmailSchema = z.object({
  code: z.string().min(6, 'Code must be 6 characters'),
})

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const { user, isLoaded: userLoaded } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()

  // Check if user is already authenticated after verification
  useEffect(() => {
    if (userLoaded && user && verifying) {
      // User is now authenticated, show onboarding
      setVerifying(false)
      setShowOnboarding(true)
    }
  }, [user, userLoaded, verifying])

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const verifyForm = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    if (!isLoaded || !signUp) return

    setIsLoading(true)

    try {
      await signUp.create({
        firstName: values.firstName,
        lastName: values.lastName,
        emailAddress: values.email,
        password: values.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setVerifying(true)
    } catch (error: unknown) {
      console.error('Error creating account:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onVerify(values: z.infer<typeof verifyEmailSchema>) {
    if (!isLoaded) return

    // If user is already authenticated, just show onboarding
    if (user) {
      setVerifying(false)
      setShowOnboarding(true)
      return
    }

    if (!signUp || !setActive) return

    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        // Don't set showOnboarding here, let the useEffect handle it
        // This prevents race conditions
      }
    } catch (error: unknown) {
      console.error('Error verifying email:', error)
      // Handle "already signed in" error
      if ((error as ClerkError)?.errors?.[0]?.message?.includes('already signed in')) {
        setVerifying(false)
        setShowOnboarding(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function signUpWithGoogle() {
    if (!signUp) return
    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      })
    } catch (error) {
      console.error('Error signing up with Google:', error)
    }
  }

  async function signUpWithGitHub() {
    if (!signUp) return
    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_github',
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      })
    } catch (error) {
      console.error('Error signing up with GitHub:', error)
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        {/* Clerk CAPTCHA element */}
        <div id="clerk-captcha"></div>
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 z-20 flex items-center text-lg font-medium"
        >
          Connect Sphere AI
        </Link>
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Verify your email
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter the verification code sent to your email
            </p>
          </div>
          <div className="grid gap-6">
            <Form {...verifyForm}>
              <form onSubmit={verifyForm.handleSubmit(onVerify)} className="space-y-4">
                <FormField
                  control={verifyForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 6-digit code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} className="w-full">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Verify Email
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      {/* Clerk CAPTCHA element */}
      <div id="clerk-captcha"></div>
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 z-20 flex items-center text-lg font-medium"
      >
        Connect Sphere AI
      </Link>
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
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
              <Button disabled={isLoading} className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create account
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
              onClick={signUpWithGitHub}
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
              onClick={signUpWithGoogle}
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
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
      
      <OnboardingDialog 
        open={showOnboarding} 
        onComplete={() => {
          setShowOnboarding(false)
          router.push('/dashboard')
        }} 
      />
    </div>
  )
}