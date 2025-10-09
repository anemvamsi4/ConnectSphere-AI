import { supabase } from './supabase'

export interface UserProfile {
  user_id: string
  email: string
  first_name: string
  last_name: string
  age: number
  gender: string
  country: string
  city: string
  phone: string
  linkedin?: string
  twitter?: string
  github?: string
  portfolio?: string
}

export interface UserEducation {
  user_id: string
  degree: string
  institution: string
  field_of_study: string
  start_year: number
  end_year: number
  grade?: string
}

export interface UserSkill {
  user_id: string
  skill_name: string
  proficiency_level: string
}

export interface UserInterest {
  user_id: string
  domain: string
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    // If no profile exists (PGRST116), that's expected for new users
    if (error.code === 'PGRST116') {
      console.log('No user profile found for user:', userId)
      return null
    }
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

export async function getUserEducation(userId: string): Promise<UserEducation | null> {
  const { data, error } = await supabase
    .from('user_education')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    // If no education record exists (PGRST116), that's expected for new users
    if (error.code === 'PGRST116') {
      console.log('No user education found for user:', userId)
      return null
    }
    console.error('Error fetching user education:', error)
    return null
  }

  return data
}

export async function getUserSkills(userId: string): Promise<UserSkill[]> {
  const { data, error } = await supabase
    .from('user_skills')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user skills:', error)
    return []
  }

  return data || []
}

export async function getUserInterests(userId: string): Promise<UserInterest[]> {
  const { data, error } = await supabase
    .from('user_interests')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user interests:', error)
    return []
  }

  return data || []
}

export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<boolean> {
  const { error } = await supabase
    .from('user_profiles')
    .update(profileData)
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating user profile:', error)
    return false
  }

  return true
}

export async function updateUserEducation(userId: string, educationData: Partial<UserEducation>): Promise<boolean> {
  const { error } = await supabase
    .from('user_education')
    .update(educationData)
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating user education:', error)
    return false
  }

  return true
}

export async function updateUserSkills(userId: string, skills: { name: string; level: string }[]): Promise<boolean> {
  // Delete existing skills
  const { error: deleteError } = await supabase
    .from('user_skills')
    .delete()
    .eq('user_id', userId)

  if (deleteError) {
    console.error('Error deleting existing skills:', deleteError)
    return false
  }

  // Insert new skills
  if (skills.length > 0) {
    const skillsData = skills.map(skill => ({
      user_id: userId,
      skill_name: skill.name,
      proficiency_level: skill.level,
    }))

    const { error: insertError } = await supabase
      .from('user_skills')
      .insert(skillsData)

    if (insertError) {
      console.error('Error inserting new skills:', insertError)
      return false
    }
  }

  return true
}

export async function updateUserInterests(userId: string, interests: string[]): Promise<boolean> {
  // Delete existing interests
  const { error: deleteError } = await supabase
    .from('user_interests')
    .delete()
    .eq('user_id', userId)

  if (deleteError) {
    console.error('Error deleting existing interests:', deleteError)
    return false
  }

  // Insert new interests
  if (interests.length > 0) {
    const interestsData = interests.map(interest => ({
      user_id: userId,
      domain: interest,
    }))

    const { error: insertError } = await supabase
      .from('user_interests')
      .insert(interestsData)

    if (insertError) {
      console.error('Error inserting new interests:', insertError)
      return false
    }
  }

  return true
}