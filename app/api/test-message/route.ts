import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST() {
  try {
    console.log('Testing message generation...');
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "text/plain",
        temperature: 0.8,
        maxOutputTokens: 200,
      }
    });

    const testPrompt = `Write a short LinkedIn connection message to John Smith, a Software Engineer at Google. Keep it under 150 characters. Be professional and friendly.`;

    console.log('Sending test prompt:', testPrompt);
    
    const result = await model.generateContent(testPrompt);
    const response = await result.response;
    
    console.log('Response object:', response);
    console.log('Response candidates:', response.candidates);
    
    const message = response.text();
    console.log('Generated message:', message);
    
    return NextResponse.json({
      success: true,
      message,
      messageLength: message.length,
      rawResponse: {
        candidates: response.candidates,
        usageMetadata: response.usageMetadata
      }
    });

  } catch (error) {
    console.error('Test message generation error:', error);
    return NextResponse.json({ 
      error: 'Message generation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}