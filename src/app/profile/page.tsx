'use client'

import { useState, useEffect } from 'react'
import { useAuthInfo } from '@propelauth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit2, Save, PlusCircle } from 'lucide-react'

interface UserProfile {
  userId: string
  race: string
  salary: number
  jobTitle: string
  company: string
  yearsOfExperience: number
}

export default function ProfilePage() {
  const authInfo = useAuthInfo()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authInfo.user) {
      fetchProfile(authInfo.user.userId)
    } else if (!authInfo.loading) {
      setIsLoading(false)
    }
  }, [authInfo.user, authInfo.loading])

  async function fetchProfile(userId: string) {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/profile?userId=${encodeURIComponent(userId)}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        setEditedProfile(data.profile)
      } else if (response.status === 404) {
        // Profile not found, prepare for creation
        setProfile(null)
        setEditedProfile({
          userId,
          race: '',
          salary: 0,
          jobTitle: '',
          company: '',
          yearsOfExperience: 0
        })
        setIsEditing(true)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch profile')
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Failed to load profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function saveProfile(profileData: UserProfile) {
    setIsLoading(true)
    setError(null)
    try {
      const method = profile ? 'PUT' : 'POST'
      const response = await fetch('/api/profile', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        setEditedProfile(data.profile)
        setIsEditing(false)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${profile ? 'update' : 'create'} profile`)
      }
    } catch (err) {
      console.error(`Error ${profile ? 'updating' : 'creating'} profile:`, err)
      setError(`Failed to ${profile ? 'update' : 'create'} profile: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [e.target.name]: e.target.name === 'salary' || e.target.name === 'yearsOfExperience'
          ? Number(e.target.value)
          : e.target.value
      })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editedProfile) {
      saveProfile(editedProfile)
    }
  }

  if (authInfo.loading) return <div className="flex justify-center items-center h-screen">Loading user data...</div>

  if (!authInfo.user) return <div className="flex justify-center items-center h-screen">Please log in to view your profile.</div>

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{profile ? 'User Profile' : 'Create Your Profile'}</CardTitle>
          <CardDescription>{profile ? 'View and edit your profile information' : 'Fill in your profile details'}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : editedProfile ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="race">Race</Label>
                <Input
                  id="race"
                  name="race"
                  value={editedProfile.race}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  value={editedProfile.salary}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={editedProfile.jobTitle}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={editedProfile.company}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={editedProfile.yearsOfExperience}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </form>
          ) : (
            <p>Error: Profile data is not available.</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {isEditing ? (
            <Button type="submit" onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" /> {profile ? 'Save Changes' : 'Create Profile'}
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}