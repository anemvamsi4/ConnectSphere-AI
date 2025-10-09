/**
 * AI Connections Generation Test
 * This file demonstrates how to use the AI-based connections generation system
 */

import { findPeopleWithAI, generatePersonalizedMessages, SearchInput, UserProfile } from '@/lib/realApi';

// Example usage function
export async function testAIConnections() {
  try {
    // Define search input
    const searchInput: SearchInput = {
      company: 'Google',
      role: 'Software Engineer',
      location: 'San Francisco, CA',
      userBio: 'Recent computer science graduate passionate about AI and machine learning. Looking to connect with experienced professionals in tech.',
      tone: 'enthusiastic',
      includeFollowUps: true
    };

    // Define user profile
    const userProfile: UserProfile = {
      firstName: 'John',
      lastName: 'Doe',
      age: 24,
      location: 'San Francisco, CA',
      education: {
        degree: 'Bachelor of Science',
        institution: 'Stanford University',
        fieldOfStudy: 'Computer Science'
      },
      skills: ['JavaScript', 'Python', 'React', 'Machine Learning', 'Problem Solving'],
      interests: ['Artificial Intelligence', 'Startup Culture', 'Tech Innovation'],
      experience: 'Intern at tech startup, built several personal projects',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe'
      }
    };

    console.log('🔍 Generating AI connections...');
    
    // Generate connections using AI
    const connections = await findPeopleWithAI(searchInput);
    
    console.log(`✅ Generated ${connections.length} connections`);
    console.log('Sample connections:', connections.slice(0, 2));

    // Generate personalized messages
    console.log('💬 Generating personalized messages...');
    
    const connectionsWithMessages = await generatePersonalizedMessages(
      connections,
      userProfile,
      searchInput.tone
    );

    console.log('✅ Generated personalized messages');
    console.log('Sample with messages:', connectionsWithMessages.slice(0, 2));

    return connectionsWithMessages;

  } catch (error) {
    console.error('❌ Error testing AI connections:', error);
    throw error;
  }
}

// API endpoint test function
export async function testAIConnectionsAPI() {
  try {
    const response = await fetch('/api/ai-connections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchInput: {
          company: 'Microsoft',
          role: 'Product Manager',
          location: 'Seattle, WA',
          userBio: 'MBA graduate with 3 years of consulting experience. Transitioning to product management in tech.',
          tone: 'formal',
          includeFollowUps: true
        },
        userProfile: {
          firstName: 'Jane',
          lastName: 'Smith',
          age: 28,
          location: 'Seattle, WA',
          education: {
            degree: 'Master of Business Administration',
            institution: 'Wharton School',
            fieldOfStudy: 'Business Administration'
          },
          skills: ['Strategy', 'Analytics', 'Leadership', 'Product Development'],
          interests: ['Technology', 'Product Innovation', 'User Experience'],
          experience: 'Management consultant at McKinsey & Company'
        },
        generateMessages: true
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('🚀 API Response:', data);
    
    return data;

  } catch (error) {
    console.error('❌ Error testing AI connections API:', error);
    throw error;
  }
}

// Different search scenarios for testing
export const testScenarios = {
  techStartup: {
    searchInput: {
      company: 'Stripe',
      role: 'Frontend Developer',
      location: 'Remote',
      userBio: 'Full-stack developer with 2 years experience. Interested in fintech and payment systems.',
      tone: 'casual',
      includeFollowUps: true
    }
  },
  
  consulting: {
    searchInput: {
      company: 'McKinsey & Company',
      role: 'Associate',
      location: 'New York, NY',
      userBio: 'Finance background looking to transition into management consulting.',
      tone: 'formal',
      includeFollowUps: false
    }
  },
  
  jobSearch: {
    searchInput: {
      jobUrl: 'https://linkedin.com/jobs/view/123456789',
      userBio: 'Recent graduate seeking entry-level opportunities in data science.',
      tone: 'enthusiastic',
      includeFollowUps: true
    }
  },
  
  networking: {
    searchInput: {
      role: 'Data Scientist',
      location: 'Austin, TX',
      userBio: 'Mid-level data scientist looking to expand professional network and learn about industry trends.',
      tone: 'casual',
      includeFollowUps: true
    }
  }
};

export default testAIConnections;