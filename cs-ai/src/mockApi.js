// Enhanced Mock API for networking assistant with advanced features

const enhancedMockPeople = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    email: "sarah.chen@google.com",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150",
    bio: "Full-stack developer passionate about AI and machine learning. 5+ years at Google working on search algorithms.",
    connectionStrength: 85,
    isAlumni: true,
    mutualConnections: 12,
    recentActivity: "Posted about neural networks 2d ago",
    responseRate: 78,
    location: "Mountain View, CA",
    interests: ["Machine Learning", "AI Ethics", "Open Source"],
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Product Manager",
    company: "Microsoft",
    email: "m.rodriguez@microsoft.com",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    bio: "Product leader with experience launching cloud solutions. Currently leading Azure integration projects.",
    connectionStrength: 72,
    isAlumni: false,
    mutualConnections: 8,
    recentActivity: "Shared article about cloud computing 1d ago",
    responseRate: 65,
    location: "Seattle, WA",
    interests: ["Cloud Computing", "Product Strategy", "Team Leadership"],
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "UX Designer",
    company: "Apple",
    email: "e.johnson@apple.com",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    bio: "Design thinking advocate with 8 years creating intuitive user experiences for mobile and desktop platforms.",
    connectionStrength: 91,
    isAlumni: true,
    mutualConnections: 15,
    recentActivity: "Published UX case study 3d ago",
    responseRate: 82,
    location: "Cupertino, CA",
    interests: ["Design Systems", "User Research", "Accessibility"],
    lastActive: "4 hours ago"
  },
  {
    id: 4,
    name: "David Park",
    title: "Data Scientist",
    company: "Netflix",
    email: "d.park@netflix.com",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bio: "ML engineer specializing in recommendation systems. PhD in Computer Science from Stanford.",
    connectionStrength: 68,
    isAlumni: false,
    mutualConnections: 6,
    recentActivity: "Commented on data science trends 5d ago",
    responseRate: 71,
    location: "Los Gatos, CA",
    interests: ["Recommendation Systems", "Deep Learning", "Data Visualization"],
    lastActive: "6 hours ago"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Engineering Manager",
    company: "Amazon",
    email: "l.thompson@amazon.com",
    profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
    bio: "Technical leader managing cross-functional teams. Expert in scalable distributed systems and cloud architecture.",
    connectionStrength: 79,
    isAlumni: false,
    mutualConnections: 10,
    recentActivity: "Posted about engineering leadership 1w ago",
    responseRate: 74,
    location: "Austin, TX",
    interests: ["Engineering Management", "System Architecture", "Team Building"],
    lastActive: "2 days ago"
  },
  {
    id: 6,
    name: "Alex Kumar",
    title: "Frontend Developer",
    company: "Meta",
    email: "a.kumar@meta.com",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    bio: "React specialist building next-generation social platforms. Passionate about performance optimization and user experience.",
    connectionStrength: 88,
    isAlumni: true,
    mutualConnections: 14,
    recentActivity: "Released open-source React library 4d ago",
    responseRate: 86,
    location: "Menlo Park, CA",
    interests: ["React", "Performance Optimization", "Web Standards"],
    lastActive: "1 hour ago"
  },
  {
    id: 7,
    name: "Rachel Wong",
    title: "DevOps Engineer",
    company: "Spotify",
    email: "r.wong@spotify.com",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    bio: "Infrastructure expert focused on CI/CD pipelines and kubernetes orchestration. 6+ years scaling music streaming platforms.",
    connectionStrength: 73,
    isAlumni: false,
    mutualConnections: 9,
    recentActivity: "Spoke at DevOps conference 6d ago",
    responseRate: 69,
    location: "Stockholm, Sweden",
    interests: ["Kubernetes", "CI/CD", "Infrastructure as Code"],
    lastActive: "3 hours ago"
  },
  {
    id: 8,
    name: "James Miller",
    title: "Security Engineer",
    company: "Cloudflare",
    email: "j.miller@cloudflare.com",
    profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150",
    bio: "Cybersecurity specialist protecting global internet infrastructure. Expert in threat detection and incident response.",
    connectionStrength: 66,
    isAlumni: false,
    mutualConnections: 5,
    recentActivity: "Published security research paper 1w ago",
    responseRate: 62,
    location: "San Francisco, CA",
    interests: ["Cybersecurity", "Threat Intelligence", "Network Security"],
    lastActive: "8 hours ago"
  },
  {
    id: 9,
    name: "Lisa Wang",
    title: "Data Scientist",
    company: "Netflix",
    email: "l.wang@netflix.com",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bio: "ML engineer building recommendation systems for global streaming platform. PhD in Statistics from Stanford.",
    connectionStrength: 88,
    isAlumni: true,
    mutualConnections: 18,
    recentActivity: "Shared ML insights 1d ago",
    responseRate: 75,
    location: "Los Gatos, CA",
    interests: ["Machine Learning", "Recommendation Systems", "Big Data"],
    lastActive: "1 hour ago"
  },
  {
    id: 10,
    name: "Carlos Rodriguez",
    title: "Mobile Developer",
    company: "Uber",
    email: "c.rodriguez@uber.com",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    bio: "iOS and Android developer optimizing ride-sharing experiences for millions of users worldwide.",
    connectionStrength: 73,
    isAlumni: false,
    mutualConnections: 9,
    recentActivity: "Posted about Swift updates 2d ago",
    responseRate: 68,
    location: "San Francisco, CA",
    interests: ["iOS Development", "Android", "Mobile UI/UX"],
    lastActive: "4 hours ago"
  },
  {
    id: 11,
    name: "Rachel Green",
    title: "Frontend Engineer",
    company: "Airbnb",
    email: "r.green@airbnb.com",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150",
    bio: "React specialist creating seamless booking experiences. Passionate about accessibility and performance optimization.",
    connectionStrength: 82,
    isAlumni: true,
    mutualConnections: 14,
    recentActivity: "Contributed to React open source 3d ago",
    responseRate: 79,
    location: "San Francisco, CA",
    interests: ["React", "Frontend Performance", "Web Accessibility"],
    lastActive: "2 hours ago"
  },
  {
    id: 12,
    name: "Kevin Chen",
    title: "Backend Engineer",
    company: "Stripe",
    email: "k.chen@stripe.com",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    bio: "Payments infrastructure engineer scaling financial systems. Expert in distributed systems and API design.",
    connectionStrength: 76,
    isAlumni: false,
    mutualConnections: 11,
    recentActivity: "Blogged about microservices 4d ago",
    responseRate: 71,
    location: "San Francisco, CA",
    interests: ["Distributed Systems", "API Design", "Fintech"],
    lastActive: "6 hours ago"
  },
  {
    id: 13,
    name: "Amanda Taylor",
    title: "Product Designer",
    company: "Figma",
    email: "a.taylor@figma.com",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    bio: "Design systems architect helping teams collaborate better. 6 years of experience in B2B product design.",
    connectionStrength: 85,
    isAlumni: true,
    mutualConnections: 16,
    recentActivity: "Shared design system tips 1d ago",
    responseRate: 80,
    location: "San Francisco, CA",
    interests: ["Design Systems", "User Research", "Prototyping"],
    lastActive: "3 hours ago"
  },
  {
    id: 14,
    name: "Daniel Park",
    title: "DevOps Engineer",
    company: "GitHub",
    email: "d.park@github.com",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bio: "Infrastructure engineer managing code repositories for millions of developers. Kubernetes and Docker expert.",
    connectionStrength: 69,
    isAlumni: false,
    mutualConnections: 7,
    recentActivity: "Released CI/CD tutorial 5d ago",
    responseRate: 64,
    location: "San Francisco, CA",
    interests: ["Kubernetes", "Docker", "CI/CD Pipelines"],
    lastActive: "5 hours ago"
  },
  {
    id: 15,
    name: "Sophie Martinez",
    title: "QA Engineer",
    company: "Slack",
    email: "s.martinez@slack.com",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150",
    bio: "Quality assurance specialist ensuring reliable communication for workplace teams. Automation testing expert.",
    connectionStrength: 77,
    isAlumni: true,
    mutualConnections: 10,
    recentActivity: "Posted about test automation 2d ago",
    responseRate: 72,
    location: "San Francisco, CA",
    interests: ["Test Automation", "Quality Assurance", "Agile Testing"],
    lastActive: "1 day ago"
  },
  {
    id: 16,
    name: "Ryan Johnson",
    title: "Solutions Architect",
    company: "Amazon",
    email: "r.johnson@amazon.com",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    bio: "Cloud solutions architect helping enterprises migrate to AWS. 8+ years designing scalable cloud infrastructure.",
    connectionStrength: 71,
    isAlumni: false,
    mutualConnections: 8,
    recentActivity: "Presented at AWS summit 1w ago",
    responseRate: 67,
    location: "Seattle, WA",
    interests: ["AWS", "Cloud Architecture", "Enterprise Solutions"],
    lastActive: "12 hours ago"
  },
  {
    id: 17,
    name: "Maya Patel",
    title: "Machine Learning Engineer",
    company: "Tesla",
    email: "m.patel@tesla.com",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    bio: "AI engineer working on autonomous vehicle perception systems. Computer Vision and Deep Learning specialist.",
    connectionStrength: 89,
    isAlumni: true,
    mutualConnections: 19,
    recentActivity: "Published AI research 3d ago",
    responseRate: 83,
    location: "Palo Alto, CA",
    interests: ["Computer Vision", "Deep Learning", "Autonomous Systems"],
    lastActive: "30 minutes ago"
  },
  {
    id: 18,
    name: "Alex Thompson",
    title: "Technical Writer",
    company: "Notion",
    email: "a.thompson@notion.so",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bio: "Developer advocate creating documentation and tutorials. Bridging the gap between complex tech and user understanding.",
    connectionStrength: 74,
    isAlumni: false,
    mutualConnections: 12,
    recentActivity: "Published API documentation guide 2d ago",
    responseRate: 76,
    location: "San Francisco, CA",
    interests: ["Technical Writing", "Developer Experience", "API Documentation"],
    lastActive: "4 hours ago"
  }
];

export const findPeople = async (searchCriteria) => {
  console.log('findPeople called with:', searchCriteria);
  // Simulate API delay with realistic timing
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
  
  const { company, role, bio } = searchCriteria;
  
  // Advanced filtering with multiple criteria
  let results = enhancedMockPeople;
  
  if (company) {
    results = results.filter(person => 
      person.company.toLowerCase().includes(company.toLowerCase()) ||
      person.bio.toLowerCase().includes(company.toLowerCase())
    );
  }
  
  if (role) {
    results = results.filter(person => 
      person.title.toLowerCase().includes(role.toLowerCase()) ||
      person.bio.toLowerCase().includes(role.toLowerCase()) ||
      person.interests.some(interest => 
        interest.toLowerCase().includes(role.toLowerCase())
      )
    );
  }
  
  // If no specific filters, return diversified selection based on connection strength
  if (!company && !role) {
    results = enhancedMockPeople
      .sort((a, b) => b.connectionStrength - a.connectionStrength);
  }
  
  // Ensure we always return some results for demonstration
  if (results.length === 0) {
    results = enhancedMockPeople;
  }
  
  // Sort by connection strength and response rate
  results = results.sort((a, b) => {
    const scoreA = (a.connectionStrength * 0.6) + (a.responseRate * 0.4);
    const scoreB = (b.connectionStrength * 0.6) + (b.responseRate * 0.4);
    return scoreB - scoreA;
  });
  
  const finalResults = results.slice(0, 18);
  console.log('findPeople returning:', finalResults);
  return finalResults;
};

export const generateMessagesBatch = async (people, userBio, tone = 'professional', followUpEnabled = false) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
  
  const advancedToneTemplates = {
    professional: {
      high: [
        "Hi {name}, I came across your impressive work at {company} and would love to connect. {personalizedIcebreaker} {commonGround}",
        "Hello {name}, Your expertise in {field} at {company} caught my attention. {personalizedIcebreaker} I'd appreciate the opportunity to learn from your experience.",
        "Hi {name}, I've been following your contributions at {company}. {personalizedIcebreaker} Would you be open to a brief conversation about {topic}?"
      ],
      medium: [
        "Hi {name}, I noticed your background at {company} aligns well with my interests. {personalizedIcebreaker} Would you be open to connecting?",
        "Hello {name}, Your experience at {company} is impressive. {personalizedIcebreaker} I'd love to learn more about your journey.",
        "Hi {name}, I'm interested in your work at {company}. {personalizedIcebreaker} Mind if we connect?"
      ],
      low: [
        "Hi {name}, I see you work at {company}. {personalizedIcebreaker} Would you be interested in connecting?",
        "Hello {name}, I found your profile interesting. {personalizedIcebreaker} Let me know if you'd like to connect.",
        "Hi {name}, I'd like to connect and learn about your experience at {company}. {personalizedIcebreaker}"
      ]
    },
    casual: {
      high: [
        "Hey {name}! Your work at {company} is absolutely fascinating! {personalizedIcebreaker} {commonGround} Would love to chat!",
        "Hi {name}! Really impressed by what you're doing at {company}. {personalizedIcebreaker} Want to connect?",
        "Hey {name}! {personalizedIcebreaker} Your {company} experience sounds amazing - let's connect!"
      ],
      medium: [
        "Hey {name}! Saw your profile and your work at {company} looks cool. {personalizedIcebreaker} Mind connecting?",
        "Hi {name}! Your {company} background caught my eye. {personalizedIcebreaker} Want to chat?",
        "Hey {name}! {personalizedIcebreaker} Would love to connect and learn about {company}!"
      ],
      low: [
        "Hey {name}! Work at {company} sounds interesting. {personalizedIcebreaker} Want to connect?",
        "Hi {name}! {personalizedIcebreaker} Mind if we connect?",
        "Hey {name}! Saw you work at {company}. {personalizedIcebreaker} Let's connect!"
      ]
    },
    enthusiastic: {
      high: [
        "Hi {name}! I'm absolutely thrilled to discover your incredible work at {company}! {personalizedIcebreaker} {commonGround} I would be honored to connect!",
        "Hello {name}! Your achievements at {company} are truly inspiring! {personalizedIcebreaker} I'm eager to learn from your expertise!",
        "Hi {name}! I'm so excited about your {field} work at {company}! {personalizedIcebreaker} Would love to connect and hear your insights!"
      ],
      medium: [
        "Hi {name}! Really excited about your work at {company}! {personalizedIcebreaker} Would love to connect!",
        "Hello {name}! Your {company} experience is amazing! {personalizedIcebreaker} I'm eager to connect!",
        "Hi {name}! So impressed by what you do at {company}! {personalizedIcebreaker} Let's connect!"
      ],
      low: [
        "Hi {name}! Interested in your {company} work! {personalizedIcebreaker} Would love to connect!",
        "Hello {name}! Your profile looks great! {personalizedIcebreaker} Let's connect!",
        "Hi {name}! {personalizedIcebreaker} Excited to potentially connect!"
      ]
    }
  };
  
  return people.map(person => {
    // Determine message tier based on connection strength
    const getMessageTier = (strength) => {
      if (strength >= 80) return 'high';
      if (strength >= 70) return 'medium';
      return 'low';
    };
    
    const tier = getMessageTier(person.connectionStrength);
    const templates = advancedToneTemplates[tone]?.[tier] || advancedToneTemplates.professional.medium;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Generate personalized icebreaker based on their profile
    const generateIcebreaker = (person) => {
      const icebreakers = [
        `I noticed your recent ${person.recentActivity.toLowerCase()}.`,
        `Your work in ${person.interests[0].toLowerCase()} particularly resonates with me.`,
        `I see we have ${person.mutualConnections} mutual connections.`,
        person.isAlumni ? "I noticed we're fellow alumni!" : `Your background in ${person.interests[1]?.toLowerCase() || 'your field'} is impressive.`,
        `Your expertise in ${person.title.toLowerCase()} aligns perfectly with my interests.`
      ];
      
      // Select icebreaker based on connection strength
      if (person.connectionStrength >= 85) {
        return icebreakers[0]; // Most personal
      } else if (person.connectionStrength >= 75) {
        return icebreakers[Math.floor(Math.random() * 3)];
      } else {
        return icebreakers[Math.floor(Math.random() * icebreakers.length)];
      }
    };
    
    // Generate common ground mention for high-strength connections
    const generateCommonGround = (person) => {
      if (person.connectionStrength < 80) return '';
      
      const commonGrounds = [
        person.isAlumni ? "As fellow alumni, I'd love to hear about your journey." : "",
        person.mutualConnections > 10 ? `With ${person.mutualConnections} mutual connections, I'm sure we have lots to discuss.` : "",
        `I'm also passionate about ${person.interests[0].toLowerCase()}.`
      ];
      
      return commonGrounds.filter(ground => ground).length > 0 
        ? commonGrounds.filter(ground => ground)[0] 
        : '';
    };
    
    const personalizedIcebreaker = generateIcebreaker(person);
    const commonGround = generateCommonGround(person);
    const firstName = person.name.split(' ')[0];
    const field = person.interests[0] || person.title.split(' ').slice(-2).join(' ');
    const topic = person.interests[Math.floor(Math.random() * person.interests.length)].toLowerCase();
    
    const message = template
      .replace('{name}', firstName)
      .replace('{company}', person.company)
      .replace('{field}', field.toLowerCase())
      .replace('{topic}', topic)
      .replace('{personalizedIcebreaker}', personalizedIcebreaker)
      .replace('{commonGround}', commonGround)
      .trim()
      .replace(/\s+/g, ' '); // Clean up extra spaces
    
    // Calculate confidence based on multiple factors
    const calculateConfidence = (person) => {
      let baseConfidence = 70;
      baseConfidence += Math.min(person.connectionStrength * 0.2, 20);
      baseConfidence += Math.min(person.responseRate * 0.1, 10);
      if (person.isAlumni) baseConfidence += 5;
      if (person.mutualConnections > 10) baseConfidence += 3;
      if (person.lastActive.includes('hour')) baseConfidence += 2;
      
      return Math.min(Math.floor(baseConfidence), 95);
    };
    
    // Generate follow-up sequence if enabled
    const followUpSequence = followUpEnabled ? generateFollowUpSequence(person, tone) : null;
    
    return {
      ...person,
      message,
      confidence: calculateConfidence(person),
      followUpSequence,
      messagePersonalization: {
        icebreaker: personalizedIcebreaker,
        commonGround: commonGround || 'No specific common ground found',
        strengthTier: tier
      }
    };
  });
};

const generateFollowUpSequence = (person, tone) => {
  const sequences = {
    professional: [
      `Hi ${person.name.split(' ')[0]}, I wanted to follow up on my previous message about connecting. I'm still very interested in learning about your experience at ${person.company}.`,
      `Hello ${person.name.split(' ')[0]}, I hope you're doing well. I'd still love the opportunity to connect and discuss your work in ${person.interests[0].toLowerCase()}.`
    ],
    casual: [
      `Hey ${person.name.split(' ')[0]}! Just wanted to circle back - still would love to connect and chat about your work at ${person.company}!`,
      `Hi ${person.name.split(' ')[0]}! Hope you're having a great week. Still interested in connecting if you have time!`
    ],
    enthusiastic: [
      `Hi ${person.name.split(' ')[0]}! I'm still really excited about the possibility of connecting and learning from your amazing work at ${person.company}!`,
      `Hello ${person.name.split(' ')[0]}! I wanted to reach out again because I'm genuinely enthusiastic about your ${person.interests[0].toLowerCase()} expertise!`
    ]
  };
  
  return sequences[tone] || sequences.professional;
};

// Additional utility functions for advanced features
export const getConnectionInsights = (person) => {
  return {
    bestTimeToConnect: person.lastActive.includes('hour') ? 'Very active - great time to reach out!' : 'Less active recently - consider timing your outreach',
    responseLikelihood: person.responseRate > 75 ? 'High' : person.responseRate > 60 ? 'Medium' : 'Lower',
    connectionTips: [
      person.isAlumni ? 'Mention your shared alma mater' : 'Research their educational background',
      person.mutualConnections > 10 ? 'Ask for a warm introduction' : 'Direct outreach recommended',
      `Engage with their content about ${person.interests[0].toLowerCase()}`,
      person.recentActivity ? 'Reference their recent activity' : 'Check for new posts before reaching out'
    ],
    strengthFactors: {
      alumni: person.isAlumni,
      mutualConnections: person.mutualConnections,
      sharedInterests: person.interests.length,
      activityLevel: !person.lastActive.includes('day')
    }
  };
};

export const getNetworkingPipeline = () => {
  return {
    outreachSent: 24,
    responsesReceived: 12,
    connectionsAccepted: 8,
    meetingsScheduled: 4,
    stages: [
      { name: 'Outreach Sent', count: 24, percentage: 100 },
      { name: 'Responses', count: 12, percentage: 50 },
      { name: 'Connections', count: 8, percentage: 33 },
      { name: 'Meetings', count: 4, percentage: 17 }
    ]
  };
};
