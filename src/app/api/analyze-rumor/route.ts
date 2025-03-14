import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RumorReference } from '../../../types';

// Log at startup to verify env var
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { rumor } = await request.json();
    console.log('Received rumor:', rumor);

    if (!rumor) {
      return NextResponse.json(
        { error: 'Rumor text is required' },
        { status: 400 }
      );
    }

    console.log('Making OpenAI request...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125", // Latest 3.5-turbo model, most cost-effective
      temperature: 0.3, // Lower temperature for more focused responses
      max_tokens: 1000, // Limit response length to control costs
      messages: [
        {
          role: "system",
          content: "You are a fact-checking assistant. Analyze the rumor and provide references in JSON format. Be concise. Return exactly this structure: {\"references\": [{\"id\": \"string\", \"url\": \"string\", \"title\": \"string\", \"date\": \"YYYY-MM-DD\", \"source\": \"string\", \"excerpt\": \"string (max 100 chars)\", \"relevance\": number (0-1)}]}"
        },
        {
          role: "user",
          content: `Analyze this rumor: "${rumor}"`
        }
      ]
    });
    console.log('OpenAI response received');

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }
    console.log('Raw OpenAI response:', response);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (e) {
      console.error('Invalid JSON response from OpenAI:', response);
      throw new Error('Invalid response format from OpenAI');
    }

    if (!parsedResponse.references || !Array.isArray(parsedResponse.references)) {
      console.error('Unexpected response structure:', parsedResponse);
      throw new Error('Unexpected response structure from OpenAI');
    }

    return NextResponse.json({ references: parsedResponse.references });
  } catch (error: any) {
    // Log the full error object
    console.error('Full error object:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });

    return NextResponse.json(
      { 
        error: 'Failed to process rumor',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 