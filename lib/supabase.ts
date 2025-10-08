import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  user_id: string
  email: string
  first_name: string
  last_name: string
  age?: number
  gender?: string
  country?: string
  city?: string
  phone?: string
  linkedin?: string
  twitter?: string
  github?: string
  portfolio?: string
  created_at: string
  updated_at: string
}

export interface UserEducation {
  id: string
  user_id: string
  degree: string
  institution: string
  field_of_study: string
  start_year: number
  end_year?: number
  grade?: string
  created_at: string
}

export interface UserSkill {
  id: string
  user_id: string
  skill_name: string
  proficiency_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  created_at: string
}

export interface UserInterest {
  id: string
  user_id: string
  domain: string
  created_at: string
}

export interface UserDocument {
  id: string
  user_id: string
  document_type: 'resume' | 'portfolio' | 'certificate'
  file_name: string
  file_path: string
  file_size: number
  created_at: string
}