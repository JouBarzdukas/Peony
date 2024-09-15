import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserProfile, setUserProfile, updateUserProfile, deleteUserProfile, UserProfile } from '@/lib/kv'

const ProfileSchema = z.object({
  userId: z.string().uuid(),
  race: z.string().min(1).max(50),
  salary: z.number().nonnegative(),
  jobTitle: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  yearsOfExperience: z.number().nonnegative().int()
})

export async function POST(req: Request) {
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ error: 'Invalid content type. Expected JSON.' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const result = ProfileSchema.safeParse(body)

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
      return NextResponse.json({ error: 'Validation failed', details: errorMessages }, { status: 400 })
    }

    const profile: UserProfile = result.data
    await setUserProfile(profile)

    return NextResponse.json({ success: true, profile })
  } catch (error: unknown) {
    console.error('Error processing profile data:', error)
    
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  try {
    const profile = await getUserProfile(userId)

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, profile })
  } catch (error: unknown) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ error: 'Invalid content type. Expected JSON.' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { userId, ...updates } = body

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const updatedProfile = await updateUserProfile(userId, updates)

    if (!updatedProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, profile: updatedProfile })
  } catch (error: unknown) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  try {
    await deleteUserProfile(userId)
    return NextResponse.json({ success: true, message: 'Profile deleted successfully' })
  } catch (error: unknown) {
    console.error('Error deleting profile:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}