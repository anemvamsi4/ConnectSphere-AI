// Mock API functions adapted from CS AI
export interface PersonResult {
  name: string;
  title: string;
  location: string;
  profileImage: string;
  isAlumni: boolean;
  connectionStrength: number;
  mutualConnections: number;
  responseRate: number;
  lastActive: string;
  confidence?: number;
  recentActivity?: string;
  interests?: string[];
  message: string;
  followUpSequence?: string[];
}

export interface SearchInput {
  company: string;
  role: string;
  bio: string;
}

// Mock data for people
const mockPeople = [
  {
    name: "Sarah Chen",
    title: "Senior Software Engineer at Google",
    location: "Mountain View, CA",
    isAlumni: true,
    connectionStrength: 92,
    mutualConnections: 15,
    responseRate: 85,
    lastActive: "2 hours ago",
    confidence: 94,
    recentActivity: "Posted about ML trends",
    interests: ["Machine Learning", "React", "Open Source"]
  },
  {
    name: "Michael Rodriguez", 
    title: "Product Manager at Microsoft",
    location: "Seattle, WA",
    isAlumni: false,
    connectionStrength: 78,
    mutualConnections: 8,
    responseRate: 72,
    lastActive: "1 day ago",
    recentActivity: "Shared article on product strategy",
    interests: ["Product Strategy", "AI", "Leadership"]
  },
  {
    name: "Emily Johnson",
    title: "Frontend Developer at Meta",
    location: "Menlo Park, CA", 
    isAlumni: true,
    connectionStrength: 88,
    mutualConnections: 12,
    responseRate: 79,
    lastActive: "5 hours ago",
    confidence: 87,
    recentActivity: "Commented on React 18 features",
    interests: ["React", "TypeScript", "Web Performance"]
  }
];

export async function findPeople(input: SearchInput): Promise<PersonResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return mockPeople.map(person => ({
    ...person,
    profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=6b7280&color=ffffff&size=128`,
    message: "",
    followUpSequence: []
  }));
}

export async function generateMessagesBatch(
  people: PersonResult[], 
  userBio: string, 
  tone: string, 
  includeFollowUps: boolean
): Promise<PersonResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return people.map(person => ({
    ...person,
    message: generatePersonalizedMessage(person, userBio, tone),
    followUpSequence: includeFollowUps ? generateFollowUpSequence(person, tone) : []
  }));
}

function generatePersonalizedMessage(person: PersonResult, userBio: string, tone: string): string {
  const templates = {
    formal: `Dear ${person.name},

I hope this message finds you well. I came across your profile and was impressed by your work as ${person.title}. 

${userBio}

I would greatly appreciate the opportunity to connect and learn from your experience in the industry. Would you be open to a brief conversation about your career journey?

Best regards`,
    
    casual: `Hi ${person.name}! 👋

Hope you're doing well! I saw your profile and your role as ${person.title} caught my attention.

${userBio}

Would love to connect and maybe chat about your experience sometime!

Thanks!`,
    
    enthusiastic: `Hi ${person.name}!

I'm really excited to reach out! Your work as ${person.title} is exactly the kind of career path I'm passionate about pursuing.

${userBio}

I'd be thrilled to connect and learn from your journey. Would you be open to sharing some insights?

Looking forward to connecting!`,
    
    direct: `Hello ${person.name},

I'm reaching out because of your role as ${person.title}.

${userBio}

I'd like to connect and discuss potential opportunities or advice in this field.

Thank you for your time.`
  };
  
  return templates[tone.toLowerCase() as keyof typeof templates] || templates.formal;
}

function generateFollowUpSequence(person: PersonResult, tone: string): string[] {
  const followUps = [
    `Hi ${person.name}, I wanted to follow up on my previous message. I'm still very interested in connecting and learning about your experience at ${person.title.split(' at ')[1] || 'your company'}.`,
    
    `Hello again ${person.name}, I hope you've been well. I noticed you recently ${person.recentActivity?.toLowerCase() || 'shared some insights'}, which I found very interesting. I'd still love to connect if you have a moment.`,
    
    `Hi ${person.name}, I understand you're likely very busy, but I wanted to reach out one final time. I'm genuinely interested in your career path and would value any brief insights you might be willing to share.`
  ];
  
  return followUps;
}