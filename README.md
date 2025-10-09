# ConnectSphere AI - AI-Powered Professional Networking

🤖 **Powered by Google Gemini AI for free, realistic professional connections!**

## 🌟 Features

- **🤖 AI-Generated Connections** - Realistic professionals using Gemini API (FREE)
- **💬 Smart Message Generation** - Personalized outreach messages  
- **🔍 Intelligent Search** - Find professionals by company, role, location
- **📊 Confidence Scoring** - AI-powered relevance ranking
- **🎯 Complete Profiles** - Realistic skills, experience, education
- **📱 Modern UI** - Clean, responsive design with animations

## 💰 Completely Free with Gemini API

```bash
# 15,000 free requests per month
# No credit card required for basic tier
# Realistic AI-generated professional profiles
# Personalized connection messages
```

## 🚀 Quick Start

### 1. Get Free Gemini API Key (2 minutes)
```bash
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key" 
4. Copy your free API key
```

### 2. Setup & Run
```bash
git clone <your-repo>
cd connectsphere-ai
npm install

# Add your Gemini API key to .env.local
GEMINI_API_KEY=your_gemini_api_key_here

npm run dev
```

### 3. Start Networking
- Sign up with Clerk authentication
- Complete profile in Settings
- Search: "Google + Software Engineer + San Francisco"  
- Get realistic AI connections with personalized messages!

## 🤖 AI Magic in Action

### Sample Generated Connection:
```json
{
  "name": "Sarah Chen",
  "title": "Senior Software Engineer", 
  "company": "Google",
  "location": "Mountain View, CA",
  "summary": "Full-stack developer with 8 years experience...",
  "skills": ["React", "Node.js", "System Design"],
  "message": "Hi Sarah, I came across your profile and was impressed by your work as Senior Software Engineer at Google. I'd love to connect and learn more about your experience...",
  "confidence": 92
}
```

## 🎯 Perfect For

- **🎪 Hackathons** - Impress judges with realistic demo data
- **🚀 MVPs** - Bootstrap networking features without expensive APIs
- **🎓 Learning** - Build networking apps with real-looking data
- **💼 Professional** - Upgrade to Apollo API when budget allows

## 🔄 Smart API Hierarchy

1. **Gemini AI** (FREE) - Generates realistic connections + messages
2. **Apollo API** (Optional) - Real LinkedIn data if key provided  
3. **Enhanced Fallback** - Structured mock data as last resort

The app automatically selects the best available option!

## 📊 What You Get

- ✅ **15+ Realistic Profiles** per search
- ✅ **Personalized Messages** for each connection  
- ✅ **Smart Confidence Scoring** based on relevance
- ✅ **Professional Avatars** with UI-Avatars
- ✅ **Industry-Relevant Skills** and experience
- ✅ **Educational Backgrounds** that make sense
- ✅ **Connection Statistics** (mutual connections, response rates)

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Modern, responsive styling  
- **Clerk** - Authentication and user management
- **Supabase** - Database for user profiles
- **Gemini AI** - Google's generative AI for connections
- **shadcn/ui** - Beautiful, accessible components

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
