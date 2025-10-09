import { NextRequest, NextResponse } from 'next/server';
import { findPeopleWithAI, generatePersonalizedMessages, SearchInput, UserProfile } from '@/lib/realApi';

export async function POST(request: NextRequest) {
  try {
    console.log('AI Connections API called');
    
    const body = await request.json();
    console.log('Request body received:', JSON.stringify(body, null, 2));
    
    const { searchInput, userProfile, generateMessages = true } = body;

    // Validate required fields
    if (!searchInput) {
      console.error('Search input is missing');
      return NextResponse.json(
        { error: 'Search input is required' },
        { status: 400 }
      );
    }

    console.log('Calling findPeopleWithAI...');
    
    // Find people using AI generation
    const people = await findPeopleWithAI(searchInput as SearchInput, userProfile as UserProfile);

    console.log(`Found ${people.length} people`);

    if (people.length === 0) {
      console.warn('No connections found');
      return NextResponse.json(
        { error: 'No connections found for the given criteria' },
        { status: 404 }
      );
    }

    let finalPeople = people;

    // Messages are now generated directly in findPeopleWithAI, so we can skip the separate generation
    console.log('Connections with messages already generated');
    
    // Verify messages were actually generated
    const messagesGenerated = finalPeople.filter(p => p.message && p.message.trim().length > 0).length;
    console.log(`Found ${messagesGenerated} out of ${finalPeople.length} connections with messages`);
    
    if (messagesGenerated === 0) {
      console.warn('No personalized messages were generated');
    }

    console.log('Returning successful response');
    
    return NextResponse.json({
      success: true,
      connections: finalPeople,
      metadata: {
        total: finalPeople.length,
        generatedAt: new Date().toISOString(),
        source: 'ai-generated'
      }
    });

  } catch (error) {
    console.error('Error in AI connections API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI connections',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'AI Connections API is running',
    endpoints: {
      POST: '/api/ai-connections - Generate AI-based connections',
    },
    requiredFields: {
      searchInput: {
        company: 'string (optional)',
        role: 'string (optional)', 
        location: 'string (optional)',
        jobUrl: 'string (optional)',
        userBio: 'string (required)',
        tone: 'string (formal|casual|enthusiastic)',
        includeFollowUps: 'boolean'
      },
      userProfile: {
        firstName: 'string',
        lastName: 'string',
        age: 'number',
        location: 'string',
        education: 'object',
        skills: 'string[]',
        interests: 'string[]',
        experience: 'string (optional)',
        socialLinks: 'object (optional)'
      },
      generateMessages: 'boolean (optional, default: true)'
    }
  });
}