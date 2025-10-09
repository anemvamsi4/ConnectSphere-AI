// Real API integrations for Apollo and Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface PersonResult {
  name: string;
  title: string;
  company: string;
  location: string;
  profileUrl: string;
  profileImage: string;
  email?: string;
  linkedinUrl?: string;
  headline?: string;
  summary?: string;
  experience?: string[];
  education?: string[];
  skills?: string[];
  message: string;
  confidence: number;
  // Legacy fields for compatibility
  isAlumni: boolean;
  connectionStrength: number;
  mutualConnections: number;
  responseRate: number;
  lastActive: string;
  interests?: string[];
  followUpSequence?: string[];
  recentActivity?: string;
}

export interface SearchInput {
  // Option 1: Company and role search
  company?: string;
  role?: string;
  location?: string;
  
  // Option 2: Job posting URL
  jobUrl?: string;
  
  // Common fields
  userBio: string;
  tone: string;
  includeFollowUps: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
  education: {
    degree: string;
    institution: string;
    fieldOfStudy: string;
  };
  skills: string[];
  interests: string[];
  experience?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

// AI-generated connection schema for structured output
export interface AIGeneratedConnection {
  name: string;
  title: string;
  company: string;
  location: string;
  profileUrl: string;
  profileImage: string;
  email?: string;
  linkedinUrl?: string;
  headline: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
  interests: string[];
  connectionReason: string;
  relevanceScore: number;
}

export interface AIConnectionsResponse {
  connections: AIGeneratedConnection[];
  metadata: {
    query: string;
    generatedAt: string;
    totalCount: number;
    confidence: number;
  };
}

// Apollo API configuration
const APOLLO_API_KEY = process.env.NEXT_PUBLIC_APOLLO_API_KEY;
const APOLLO_BASE_URL = 'https://api.apollo.io/v1';

// Gemini API configuration  
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

class ApolloAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchPeople(params: {
    organization_names?: string[];
    person_titles?: string[];
    person_locations?: string[];
    limit?: number;
  }): Promise<unknown> {
    const response = await fetch(`${APOLLO_BASE_URL}/mixed_people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({
        ...params,
        limit: params.limit || 25,
        reveal_personal_emails: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apollo API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getPersonByLinkedIn(linkedinUrl: string): Promise<unknown> {
    const response = await fetch(`${APOLLO_BASE_URL}/people/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({
        linkedin_url: linkedinUrl,
        reveal_personal_emails: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apollo API error: ${response.statusText}`);
    }

    return response.json();
  }
}

class GeminiAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateMessage(prompt: string): Promise<string> {
    const response = await fetch(
      `${GEMINI_BASE_URL}/models/gemini-pro:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  }
}

class AIConnectionsGenerator {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateConnections(input: SearchInput, userProfile: UserProfile): Promise<AIConnectionsResponse> {
    const model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2000, // Reduced to prevent truncation
      }
    });

    const prompt = this.createConnectionGenerationPrompt(input, userProfile);
    
    try {
      console.log('Calling Gemini API for connection generation...');
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      console.log('Gemini API response received, length:', text.length);
      
      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from Gemini API');
      }
      
      // Clean and repair JSON response
      text = this.repairJsonResponse(text);
      
      console.log('Cleaned JSON length:', text.length);
      console.log('JSON preview:', text.substring(0, 200) + '...');
      
      let aiResponse: AIConnectionsResponse;
      
      try {
        aiResponse = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Problematic JSON snippet:', text.substring(Math.max(0, text.length - 300)));
        throw new Error('Invalid JSON response from Gemini API. Response was malformed.');
      }
      
      if (!aiResponse.connections || !Array.isArray(aiResponse.connections)) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      console.log(`Generated ${aiResponse.connections.length} connections via AI`);
      
      // Transform AI response to match PersonResult interface
      return {
        ...aiResponse,
        connections: aiResponse.connections.map(conn => ({
          ...conn,
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(conn.name)}&background=6b7280&color=ffffff&size=128`,
          linkedinUrl: conn.linkedinUrl || `https://linkedin.com/in/${conn.name.toLowerCase().replace(/\s+/g, '-')}`,
          profileUrl: conn.profileUrl || `https://linkedin.com/in/${conn.name.toLowerCase().replace(/\s+/g, '-')}`,
        }))
      };
    } catch (error) {
      console.error('Error generating AI connections:', error);
      
      if (error instanceof Error && error.message.includes('quota')) {
        console.log('Quota exceeded, will fall back to mock connections');
        throw new Error('Gemini API quota exceeded. Using fallback connections.');
      }
      
      throw new Error('Failed to generate AI connections');
    }
  }

  private repairJsonResponse(text: string): string {
    // Remove any markdown backticks or formatting
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Trim whitespace
    text = text.trim();
    
    // Find the main JSON object
    const startIndex = text.indexOf('{');
    if (startIndex === -1) {
      throw new Error('No JSON object found in response');
    }
    
    // Try to find the matching closing brace
    let braceCount = 0;
    let endIndex = -1;
    
    for (let i = startIndex; i < text.length; i++) {
      if (text[i] === '{') {
        braceCount++;
      } else if (text[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }
    
    if (endIndex === -1) {
      // If we can't find a proper ending, try to repair
      // Find the last complete connection entry
      const lastConnectionIndex = text.lastIndexOf('"relevanceScore"');
      if (lastConnectionIndex !== -1) {
        // Find the number after relevanceScore
        const remainingText = text.substring(lastConnectionIndex);
        const numberMatch = remainingText.match(/:\s*(\d+)/);
        if (numberMatch) {
          const numberEndIndex = lastConnectionIndex + remainingText.indexOf(numberMatch[0]) + numberMatch[0].length;
          text = text.substring(startIndex, numberEndIndex) + '\n    }\n  ]\n}';
        }
      } else {
        // Fallback: just close the JSON structure
        text = text.substring(startIndex) + '\n  ]\n}';
      }
    } else {
      text = text.substring(startIndex, endIndex + 1);
    }
    
    return text;
  }

  private createConnectionGenerationPrompt(input: SearchInput, userProfile: UserProfile): string {
    return `Generate 3 professional connections in JSON format.

Search: ${input.company} ${input.role} ${input.location}

Return exactly this JSON structure:
{
  "connections": [
    {
      "name": "Indian Name",
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, India",
      "headline": "Professional headline",
      "summary": "Brief summary",
      "skills": ["skill1", "skill2"],
      "interests": ["interest1", "interest2"],
      "connectionReason": "Why connect",
      "relevanceScore": 85
    }
  ]
}

Generate 3 unique Indian professionals related to: ${input.role} at ${input.company}`;
  }

  private buildContextFromInput(input: SearchInput): string {
    let context = '';
    
    if (input.company && input.role) {
      context += `- Target Company: ${input.company}\n- Target Role: ${input.role}\n`;
    } else if (input.company) {
      context += `- Target Company: ${input.company}\n`;
    } else if (input.role) {
      context += `- Target Role/Industry: ${input.role}\n`;
    }
    
    if (input.location) {
      context += `- Location Preference: ${input.location}\n`;
    }
    
    if (input.jobUrl) {
      context += `- Job Posting URL: ${input.jobUrl}\n- Generate connections relevant to this opportunity\n`;
    }
    
    context += `- User Bio Context: ${input.userBio}\n`;
    context += `- Preferred Communication Tone: ${input.tone}\n`;
    
    return context;
  }

  async generatePersonalizedMessage(
    connection: AIGeneratedConnection,
    userProfile: UserProfile,
    tone: string
  ): Promise<string> {
    // TEMPORARILY USING ONLY FALLBACK TO TEST UI
    console.log(`Creating smart fallback message for ${connection.name} (API temporarily disabled for testing)`);
    return this.createSmartFallbackMessage(connection, userProfile, tone);

    const model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "text/plain",
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200, // Increased for better response
      }
    });

    const prompt = this.createMessagePrompt(connection, userProfile, tone);
    
    try {
      console.log(`Generating personalized message for ${connection.name}...`);
      console.log(`Using simplified prompt for: ${connection.name}`);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      console.log(`Raw response status:`, response);
      console.log(`Response function keys:`, Object.keys(response));
      
      let message = '';
      try {
        message = response.text().trim();
        console.log(`Raw message text: "${message}" (length: ${message.length})`);
      } catch (textError) {
        console.error(`Error getting text from response:`, textError);
        console.log(`Response candidates:`, response.candidates);
        return this.createSmartFallbackMessage(connection, userProfile, tone);
      }
      
      // Clean up the message
      message = message.replace(/^["']|["']$/g, ''); // Remove quotes
      message = message.replace(/\n/g, ' '); // Replace newlines with spaces
      message = message.replace(/\s+/g, ' '); // Normalize whitespace
      
      // Ensure message is under 300 characters
      if (message.length > 300) {
        message = message.substring(0, 297) + '...';
      }
      
      console.log(`Cleaned message for ${connection.name}: "${message}" (${message.length} chars)`);
      
      // Final check for empty message after cleaning
      if (!message || message.trim().length === 0) {
        console.warn(`Message became empty after cleaning for ${connection.name}, using fallback`);
        return this.createSmartFallbackMessage(connection, userProfile, tone);
      }
      
      return message;
      
    } catch (error: unknown) {
      console.error('Error generating personalized message:', error);
      
      const err = error as Error;
      if (err instanceof Error && (err.message.includes('quota') || err.message.includes('RESOURCE_EXHAUSTED'))) {
        console.log('Quota exceeded for message generation');
        throw new Error('AI service quota exceeded while generating messages. Please try again in a few minutes.');
      }
      
      // Create a smart fallback message based on available data
      const fallbackMessage = this.createSmartFallbackMessage(connection, userProfile, tone);
      console.log(`Using fallback message for ${connection.name}: "${fallbackMessage}"`);
      return fallbackMessage;
    }
  }

  private createSmartFallbackMessage(
    connection: AIGeneratedConnection,
    userProfile: UserProfile,
    tone: string
  ): string {
    const firstName = connection.name.split(' ')[0];
    const company = connection.company;
    const title = connection.title;
    
    // Find shared context for personalization
    const sharedSkills = userProfile.skills.filter(skill => 
      connection.skills.some(connSkill => 
        skill.toLowerCase().includes(connSkill.toLowerCase()) ||
        connSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    const sharedInterests = userProfile.interests.filter(interest => 
      connection.interests.some(connInterest => 
        interest.toLowerCase().includes(connInterest.toLowerCase()) ||
        connInterest.toLowerCase().includes(interest.toLowerCase())
      )
    );

    // Build personalized fallback based on tone
    if (tone === 'enthusiastic') {
      if (sharedSkills.length > 0) {
        return `Hi ${firstName}! I'm excited to connect with another ${sharedSkills[0]} professional. Your work at ${company} looks fascinating! Let's network and share insights.`;
      }
      return `Hi ${firstName}! I'm impressed by your work as ${title} at ${company}. Would love to connect and learn from your experience in the industry!`;
    } else if (tone === 'casual') {
      if (sharedInterests.length > 0) {
        return `Hey ${firstName}, I noticed we both share an interest in ${sharedInterests[0]}. Would be great to connect and exchange ideas about ${title} work!`;
      }
      return `Hi ${firstName}, your profile caught my attention. Would love to connect and learn more about your experience at ${company}.`;
    } else { // formal
      if (sharedSkills.length > 0) {
        return `Hello ${firstName}, I'd like to connect as we both work with ${sharedSkills[0]}. I'm interested in learning from your experience at ${company}.`;
      }
      return `Hello ${firstName}, I would like to connect to learn more about your role as ${title} at ${company}. Looking forward to networking with you.`;
    }
  }

  private createMessagePrompt(
    connection: AIGeneratedConnection,
    userProfile: UserProfile,
    tone: string
  ): string {
    const toneInstructions = {
      formal: "Write in a professional, respectful tone using proper business language",
      casual: "Write in a friendly, conversational tone as if messaging a colleague", 
      enthusiastic: "Write with genuine energy and enthusiasm while remaining professional"
    };

    // Analyze shared context for better personalization
    const sharedSkills = userProfile.skills.filter(skill => 
      connection.skills.some(connSkill => 
        connSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(connSkill.toLowerCase())
      )
    );

    const sharedInterests = userProfile.interests.filter(interest => 
      connection.interests.some(connInterest => 
        connInterest.toLowerCase().includes(interest.toLowerCase()) || 
        interest.toLowerCase().includes(connInterest.toLowerCase())
      )
    );

    // Find location commonality
    const sameCity = userProfile.location && connection.location && 
      userProfile.location.toLowerCase().includes(connection.location.split(',')[0].toLowerCase());

    // Educational background connection
    const educationalConnection = userProfile.education.fieldOfStudy && 
      (connection.headline?.toLowerCase().includes(userProfile.education.fieldOfStudy.toLowerCase()) ||
       connection.title?.toLowerCase().includes(userProfile.education.fieldOfStudy.toLowerCase()));

    // Create personalization context
    let personalizationContext = '';
    if (sharedSkills.length > 0) {
      personalizationContext += `\n- SHARED SKILLS: ${sharedSkills.slice(0, 2).join(', ')} - Use this as a connection point`;
    }
    if (sharedInterests.length > 0) {
      personalizationContext += `\n- MUTUAL INTERESTS: ${sharedInterests.slice(0, 2).join(', ')} - Reference common ground`;
    }
    if (sameCity) {
      personalizationContext += `\n- LOCATION: Both in ${connection.location.split(',')[0]} - Mention local connection`;
    }
    if (educationalConnection) {
      personalizationContext += `\n- EDUCATION: Similar background in ${userProfile.education.fieldOfStudy} - Reference academic connection`;
    }

    return `
Write a personalized LinkedIn connection message under 300 characters.

About the person you're messaging:
- Name: ${connection.name}
- Title: ${connection.title} at ${connection.company}
- Location: ${connection.location}

About you (the sender):
- Name: ${userProfile.firstName} ${userProfile.lastName}
- Background: ${userProfile.education.degree} in ${userProfile.education.fieldOfStudy}
- Skills: ${userProfile.skills.slice(0, 3).join(', ')}

Write a ${tone} message that:
1. Mentions their specific role or company
2. Shows genuine interest in connecting
3. Is under 300 characters
4. Sounds natural and professional

Example format: "Hi [Name], I'm interested in [specific aspect of their work]. I'd love to connect and learn more about [relevant topic]. Best regards!"

Write only the message, no quotes or extra text:`;
  }
}

interface ApolloPersonResult {
  first_name?: string;
  last_name?: string;
  title?: string;
  organization?: { name?: string };
  city?: string;
  state?: string;
  linkedin_url?: string;
  email?: string;
  headline?: string;
  summary?: string;
  keywords?: string[];
  photo_url?: string;
  [key: string]: unknown;
}

// Main API functions
export async function findPeople(input: SearchInput, userProfile?: UserProfile): Promise<PersonResult[]> {
  // Try Apollo API first if available
  if (APOLLO_API_KEY) {
    try {
      const apollo = new ApolloAPI(APOLLO_API_KEY);
      
      const searchParams: Record<string, unknown> = {};

      if (input.jobUrl) {
        // Extract company from job URL (simplified)
        const company = extractCompanyFromJobUrl(input.jobUrl);
        if (company) {
          searchParams.organization_names = [company];
        }
      } else if (input.company && input.role) {
        searchParams.organization_names = [input.company];
        searchParams.person_titles = [input.role];
      }

      if (input.location) {
        searchParams.person_locations = [input.location];
      }

      const apolloResponse = await apollo.searchPeople(searchParams) as { people?: ApolloPersonResult[] };
      
      return apolloResponse.people?.map((person: ApolloPersonResult) => ({
        name: `${person.first_name} ${person.last_name}`,
        title: person.title || 'Professional',
        company: person.organization?.name || 'Unknown',
        location: `${person.city || ''}, ${person.state || ''}`.trim().replace(/^,\s*/, '') || 'Unknown',
        profileUrl: person.linkedin_url || '',
        profileImage: person.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${person.first_name} ${person.last_name}`)}&background=6b7280&color=ffffff&size=128`,
        email: person.email,
        linkedinUrl: person.linkedin_url,
        headline: person.headline,
        summary: person.summary,
        message: '',
        confidence: calculateConfidence(person, input),
        // Legacy compatibility fields
        connectionStrength: calculateConfidence(person, input),
        mutualConnections: Math.floor(Math.random() * 20) + 1, // Mock for now
        responseRate: Math.floor(Math.random() * 40) + 60, // Mock 60-100%
        lastActive: getRandomLastActive(),
        interests: person.keywords?.slice(0, 3) || [],
        isAlumni: false, // Would need to check education data
      })) || [];

    } catch (error) {
      console.error('Apollo API failed, falling back to AI generation:', error);
      // Fall through to AI generation
    }
  }

  // Use AI-generated connections (no fallback)
  return findPeopleWithAI(input, userProfile);
}

export async function findPeopleWithAI(input: SearchInput, userProfile?: UserProfile): Promise<PersonResult[]> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.');
  }

  try {
    // Create a realistic Indian user profile if not provided
    const effectiveUserProfile: UserProfile = userProfile || {
      firstName: 'User',
      lastName: 'Profile', 
      age: 25,
      location: input.location || 'India',
      education: {
        degree: 'Bachelor of Technology',
        institution: 'Indian Institute of Technology',
        fieldOfStudy: 'Computer Science'
      },
      skills: ['Programming', 'Problem Solving', 'Communication'],
      interests: ['Technology', 'Innovation', 'Professional Growth'],
      experience: input.userBio,
      socialLinks: {}
    };

    console.log('Generating AI connections with input:', input);
    
    const aiGenerator = new AIConnectionsGenerator(GEMINI_API_KEY);
    const aiResponse = await aiGenerator.generateConnections(input, effectiveUserProfile);
    
    console.log('AI response received:', aiResponse);
    
    if (!aiResponse.connections || aiResponse.connections.length === 0) {
      throw new Error('AI generated empty response. Please try again or modify your search criteria.');
    }

    // Convert AI connections to PersonResult format
    const connections = aiResponse.connections.map((connection: AIGeneratedConnection) => ({
      name: connection.name,
      title: connection.title,
      company: connection.company,
      location: connection.location,
      profileUrl: connection.profileUrl,
      profileImage: connection.profileImage,
      email: connection.email,
      linkedinUrl: connection.linkedinUrl,
      headline: connection.headline,
      summary: connection.summary,
      experience: connection.experience,
      education: connection.education,
      skills: connection.skills,
      message: '', // Will be filled below
      confidence: connection.relevanceScore,
      // Legacy compatibility fields
      connectionStrength: connection.relevanceScore,
      mutualConnections: Math.floor(Math.random() * 15) + 5, // 5-20 mutual connections
      responseRate: Math.floor(Math.random() * 25) + 70, // 70-95% response rate
      lastActive: getRandomLastActive(),
      interests: connection.interests,
      isAlumni: checkAlumniStatus(connection, effectiveUserProfile),
      followUpSequence: generateFollowUpSequence(connection, input.tone),
      recentActivity: generateRecentActivity(connection)
    }));

    // Generate personalized messages for each connection
    console.log('Generating personalized messages for connections...');
    
    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];
      const aiConnection = aiResponse.connections[i];
      
      try {
        // Add delay to avoid rate limiting (except for first request)
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        console.log(`Generating message for ${connection.name} (${i + 1}/${connections.length})`);
        
        const personalizedMessage = await aiGenerator.generatePersonalizedMessage(
          aiConnection,
          effectiveUserProfile,
          input.tone || 'formal'
        );
        
        connection.message = personalizedMessage;
        console.log(`Generated message for ${connection.name}: "${personalizedMessage.substring(0, 50)}..."`);
        
      } catch (messageError) {
        console.error(`Failed to generate message for ${connection.name}:`, messageError);
        
        // Create a smart fallback message instead of empty
        const fallbackMessage = `Hi ${connection.name.split(' ')[0]}, I'd love to connect and learn more about your experience as ${connection.title} at ${connection.company}. Looking forward to networking!`;
        connection.message = fallbackMessage;
        console.log(`Using fallback message for ${connection.name}`);
      }
    }

    console.log(`Successfully processed ${connections.length} connections with messages`);
    return connections;

  } catch (error) {
    console.error('Error generating AI connections:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        throw new Error('AI service quota exceeded. Please try again in a few minutes or upgrade your plan.');
      }
      if (error.message.includes('API key')) {
        throw new Error('AI service configuration error. Please check your API key.');
      }
      if (error.message.includes('empty response')) {
        throw error; // Re-throw the specific error
      }
    }
    
    throw new Error('AI service is currently unavailable. Please try again later.');
  }
}

export async function generatePersonalizedMessages(
  people: PersonResult[],
  userProfile: UserProfile,
  tone: string
): Promise<PersonResult[]> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Cannot generate personalized messages.');
  }

  console.log(`Starting message generation for ${people.length} connections`);

  // Check if we're using AI-generated connections or Apollo data
  const isAIGenerated = people.some(person => person.headline && person.summary);
  
  if (isAIGenerated) {
    // Use the AI generator for personalized messages with proper error handling
    const aiGenerator = new AIConnectionsGenerator(GEMINI_API_KEY);
    
    const results: PersonResult[] = [];
    
    // Process each person individually to ensure proper error handling
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      
      try {
        console.log(`Generating message for ${person.name} (${i + 1}/${people.length})`);
        
        // Add delay to avoid rate limiting
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between requests
        }
        
        const aiConnection: AIGeneratedConnection = {
          name: person.name,
          title: person.title,
          company: person.company,
          location: person.location,
          profileUrl: person.profileUrl,
          profileImage: person.profileImage,
          email: person.email,
          linkedinUrl: person.linkedinUrl,
          headline: person.headline || `${person.title} at ${person.company}`,
          summary: person.summary || `Professional working in ${person.company}`,
          experience: person.experience || [],
          education: person.education || [],
          skills: person.skills || [],
          interests: person.interests || [],
          connectionReason: `Networking opportunity in ${person.company}`,
          relevanceScore: person.confidence
        };
        
        const message = await aiGenerator.generatePersonalizedMessage(aiConnection, userProfile, tone);
        
        console.log(`Generated message for ${person.name}: ${message.substring(0, 50)}...`);
        
        results.push({
          ...person,
          message: message.trim(),
        });
        
      } catch (error) {
        console.error(`Failed to generate message for ${person.name}:`, error);
        
        if (error instanceof Error && error.message.includes('quota')) {
          throw new Error('AI service quota exceeded while generating messages. Please try again in a few minutes.');
        }
        
        // For other errors, throw a proper error instead of using fallback
        throw new Error(`Failed to generate personalized message for ${person.name}. AI service error.`);
      }
    }

    console.log(`Successfully generated messages for all ${results.length} connections`);
    return results;
    
  } else {
    // Use the original Gemini API for Apollo data
    const gemini = new GeminiAPI(GEMINI_API_KEY);

    const results: PersonResult[] = [];
    
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      
      try {
        // Add delay to avoid rate limiting
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        const prompt = createMessagePrompt(person, userProfile, tone);
        const message = await gemini.generateMessage(prompt);
        
        results.push({
          ...person,
          message: message.trim(),
        });
        
      } catch (error) {
        console.error(`Error generating message for ${person.name}:`, error);
        throw new Error(`Failed to generate personalized message for ${person.name}.`);
      }
    }

    return results;
  }
}

function createMessagePrompt(
  person: PersonResult,
  userProfile: UserProfile,
  tone: string
): string {
  const toneInstructions = {
    formal: "Write in a professional, respectful tone",
    casual: "Write in a friendly, conversational tone", 
    enthusiastic: "Write with energy and enthusiasm"
  };

  return `
Write a short, personalized LinkedIn connection request message (max 200 characters) to ${person.name}.

RECIPIENT DETAILS:
- Name: ${person.name}
- Title: ${person.title}
- Company: ${person.company}
- Location: ${person.location}
${person.headline ? `- Headline: ${person.headline}` : ''}

SENDER DETAILS:
- Name: ${userProfile.firstName} ${userProfile.lastName}
- Education: ${userProfile.education.degree} in ${userProfile.education.fieldOfStudy} from ${userProfile.education.institution}
- Skills: ${userProfile.skills.join(', ')}
- Interests: ${userProfile.interests.join(', ')}
${userProfile.experience ? `- Experience: ${userProfile.experience}` : ''}

REQUIREMENTS:
- ${toneInstructions[tone as keyof typeof toneInstructions] || toneInstructions.formal}
- Keep it under 200 characters
- Be specific and relevant
- Don't be generic
- Focus on genuine connection points
- Don't mention following up
- Start with "Hi [Name]" or similar

Write only the message, nothing else.
`;
}

function extractCompanyFromJobUrl(jobUrl: string): string | null {
  // Simple extraction logic - can be enhanced
  const patterns = [
    /linkedin\.com\/company\/([^\/]+)/,
    /indeed\.com.*?q=([^&]+)/,
    /glassdoor\.com\/Overview\/Working-at-([^-]+)/,
    /jobs\.([^\.]+)\.com/,
  ];

  for (const pattern of patterns) {
    const match = jobUrl.match(pattern);
    if (match) {
      return decodeURIComponent(match[1]).replace(/[-_]/g, ' ');
    }
  }

  return null;
}

function getRandomLastActive(): string {
  const options = [
    '2 hours ago',
    '5 hours ago', 
    '1 day ago',
    '2 days ago',
    '1 week ago'
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function calculateConfidence(person: ApolloPersonResult, input: SearchInput): number {
  let confidence = 50; // Base confidence

  // Higher confidence if we have contact info
  if (person.email) confidence += 20;
  if (person.linkedin_url) confidence += 15;
  
  // Higher confidence if profile is complete
  if (person.headline) confidence += 10;
  if (person.summary) confidence += 5;
  
  // Location match
  if (input.location && person.city?.toLowerCase().includes(input.location.toLowerCase())) {
    confidence += 10;
  }

  return Math.min(confidence, 95);
}

function generateFollowUpSequence(connection: AIGeneratedConnection, tone: string): string[] {
  const sequences = {
    formal: [
      `Thank you for connecting, ${connection.name}. I'd love to learn more about your work at ${connection.company}.`,
      `I hope you're doing well. I wanted to follow up on our connection and explore potential collaboration opportunities.`,
      `I'd appreciate the chance to discuss how we might support each other's professional goals.`
    ],
    casual: [
      `Thanks for connecting! Would love to chat about your experience at ${connection.company}.`,
      `Hope you're having a great week! Wanted to follow up and see if you'd be open to a quick coffee chat.`,
      `Just checking in - would love to learn more about what you're working on these days.`
    ],
    enthusiastic: [
      `So excited to connect! Your work at ${connection.company} sounds fascinating!`,
      `Hope you're crushing it! Would love to hear about your latest projects and see how we might collaborate.`,
      `Your background is incredible! I'd be thrilled to learn from your experience and share ideas.`
    ]
  };

  return sequences[tone as keyof typeof sequences] || sequences.formal;
}

function checkAlumniStatus(connection: AIGeneratedConnection, userProfile: UserProfile): boolean {
  // Check if they share the same educational institution
  if (connection.education && userProfile.education) {
    const connectionEdu = connection.education.join(' ').toLowerCase();
    const userEdu = userProfile.education.institution.toLowerCase();
    return connectionEdu.includes(userEdu) || connectionEdu.includes(userProfile.education.institution.split(' ')[0].toLowerCase());
  }
  return Math.random() > 0.85; // 15% chance of being alumni
}

function generateRecentActivity(connection: AIGeneratedConnection): string {
  const activities = [
    `Recently shared insights about ${connection.skills[0] || 'technology'} trends`,
    `Posted about recent project at ${connection.company}`,
    `Attended ${connection.company} tech meetup`,
    `Shared article about ${connection.interests[0] || 'innovation'} in tech`,
    `Celebrated team achievement at ${connection.company}`,
    `Speaking at upcoming ${connection.skills[0] || 'tech'} conference`,
    `Promoted to ${connection.title} at ${connection.company}`,
    `Completed certification in ${connection.skills[1] || 'cloud computing'}`
  ];
  
  return activities[Math.floor(Math.random() * activities.length)];
}

// Indian name generators for unique, authentic names
function generateUniqueIndianNames(count: number): string[] {
  const firstNames = {
    male: [
      'Aarav', 'Arjun', 'Rohit', 'Vikram', 'Rahul', 'Karthik', 'Siddharth', 'Aditya',
      'Rohan', 'Abhishek', 'Varun', 'Nikhil', 'Harsh', 'Prateek', 'Shubham', 'Ankit',
      'Akash', 'Rajesh', 'Suresh', 'Deepak', 'Gaurav', 'Manish', 'Vishal', 'Amit',
      'Ashish', 'Ravi', 'Sandeep', 'Naveen', 'Sunil', 'Ajay', 'Vivek', 'Sachin'
    ],
    female: [
      'Priya', 'Sneha', 'Kavya', 'Ananya', 'Riya', 'Divya', 'Nisha', 'Pooja',
      'Shreya', 'Meera', 'Deepika', 'Rishika', 'Tanvi', 'Swati', 'Neha', 'Ritika',
      'Sakshi', 'Preeti', 'Shweta', 'Rachana', 'Madhuri', 'Sunita', 'Rekha', 'Geeta',
      'Sonal', 'Anjali', 'Pallavi', 'Smita', 'Vandana', 'Archana', 'Shilpa', 'Ritu'
    ]
  };

  const surnames = [
    'Sharma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Reddy', 'Iyer', 'Agarwal',
    'Joshi', 'Mehta', 'Shah', 'Verma', 'Rao', 'Nair', 'Bansal', 'Sinha',
    'Krishnan', 'Malhotra', 'Chopra', 'Saxena', 'Mittal', 'Tiwari', 'Pandey', 'Mishra',
    'Chauhan', 'Jain', 'Kapoor', 'Bhatt', 'Thakur', 'Chandra', 'Dubey', 'Tripathi',
    'Kulkarni', 'Desai', 'Pillai', 'Menon', 'Bhatia', 'Arora', 'Khanna', 'Sethi'
  ];

  const generatedNames = new Set<string>();
  const names: string[] = [];

  while (names.length < count) {
    // Randomly choose gender
    const isMale = Math.random() > 0.5;
    const firstNamePool = isMale ? firstNames.male : firstNames.female;
    
    const firstName = firstNamePool[Math.floor(Math.random() * firstNamePool.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const fullName = `${firstName} ${surname}`;

    // Ensure uniqueness
    if (!generatedNames.has(fullName)) {
      generatedNames.add(fullName);
      names.push(fullName);
    }
  }

  return names;
}

function generateUniqueIndianCompanies(count: number): string[] {
  const companies = [
    // Indian IT Giants
    'Tata Consultancy Services', 'Infosys', 'Wipro', 'HCL Technologies', 'Tech Mahindra',
    'Mindtree', 'L&T Infotech', 'Mphasis', 'Cognizant India', 'Capgemini India',
    
    // Indian Startups & Unicorns
    'Flipkart', 'Zomato', 'Paytm', 'Ola', 'Swiggy', 'BYJU\'S', 'Freshworks',
    'Razorpay', 'Zerodha', 'Dream11', 'Nykaa', 'PolicyBazaar', 'Unacademy',
    'UpGrad', 'Vedantu', 'PhonePe', 'Cred', 'Groww', 'Meesho', 'ShareChat',
    
    // Global Companies - India
    'Google India', 'Microsoft India', 'Amazon India', 'Meta India', 'Adobe India',
    'Oracle India', 'IBM India', 'Salesforce India', 'LinkedIn India', 'Netflix India',
    'Uber India', 'Airbnb India', 'Twitter India', 'Spotify India', 'Zoom India',
    
    // Indian Conglomerates
    'Reliance Jio', 'Bharti Airtel', 'Godrej Infotech', 'Mahindra Tech', 'Aditya Birla Digital'
  ];

  // Shuffle and return unique companies
  const shuffled = companies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, companies.length));
}

function generateUniqueIndianLocations(count: number): string[] {
  const locations = [
    'Bangalore, Karnataka', 'Hyderabad, Telangana', 'Mumbai, Maharashtra', 'Pune, Maharashtra',
    'Chennai, Tamil Nadu', 'Delhi, NCR', 'Gurgaon, Haryana', 'Noida, Uttar Pradesh',
    'Kolkata, West Bengal', 'Kochi, Kerala', 'Ahmedabad, Gujarat', 'Indore, Madhya Pradesh',
    'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Chandigarh, Punjab', 'Bhubaneswar, Odisha',
    'Coimbatore, Tamil Nadu', 'Mysore, Karnataka', 'Nagpur, Maharashtra', 'Vadodara, Gujarat',
    'Thiruvananthapuram, Kerala', 'Visakhapatnam, Andhra Pradesh', 'Surat, Gujarat',
    'Nashik, Maharashtra', 'Faridabad, Haryana', 'Ghaziabad, Uttar Pradesh'
  ];

  // Shuffle and return unique locations
  const shuffled = locations.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, locations.length));
}

function generateIndianJobTitles(count: number): string[] {
  const titles = [
    'Software Engineer', 'Senior Software Engineer', 'Lead Software Engineer', 'Principal Engineer',
    'Product Manager', 'Senior Product Manager', 'Technical Lead', 'Engineering Manager',
    'Data Scientist', 'Senior Data Scientist', 'ML Engineer', 'AI Engineer',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer',
    'DevOps Engineer', 'Cloud Architect', 'Security Engineer', 'QA Engineer',
    'UX Designer', 'UI Designer', 'Product Designer', 'Business Analyst',
    'Scrum Master', 'Project Manager', 'Technical Architect', 'Solutions Architect',
    'Database Administrator', 'System Administrator', 'Network Engineer', 'Site Reliability Engineer'
  ];

  const shuffled = titles.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, titles.length));
}

// Export for backward compatibility during migration
export { findPeople as findPeopleReal, generatePersonalizedMessages as generateMessagesReal };