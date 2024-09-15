import { kv } from '@vercel/kv'

export interface UserProfile {
  userId: string
  race: string
  salary: number
  jobTitle: string
  company: string
  yearsOfExperience: number
}

export async function setUserProfile(profile: UserProfile): Promise<void> {
  await kv.set(`user:${profile.userId}`, JSON.stringify(profile))
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const profile = await kv.get(`user:${userId}`)
  return profile ? JSON.parse(profile as string) : null
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  const currentProfile = await getUserProfile(userId)
  if (!currentProfile) return null

  const updatedProfile = { ...currentProfile, ...updates }
  await setUserProfile(updatedProfile)
  return updatedProfile
}

export async function deleteUserProfile(userId: string): Promise<void> {
  await kv.del(`user:${userId}`)
}