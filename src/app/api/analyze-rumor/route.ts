import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RumorReference } from '../../../types';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { rumor } = await request.json();

    if (!rumor) {
      return NextResponse.json(
        { error: 'Rumor text is required' },
        { status: 400 }
      );
    }

    // Use OpenAI to analyze the rumor and search for references
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using 3.5 initially as it's cheaper
      messages: [
        {
          role: "system",
          content: "You are a fact-checking assistant. Your task is to analyze the given rumor and search for its origins and related references on the internet. Format your response as JSON with an array of references, each containing id, url, title, date, source, excerpt, and relevance score."
        },
        {
          role: "user",
          content: `Please analyze this rumor and find its origins and related references: "${rumor}"`
        }
      ]
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

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
    console.error('Error processing rumor:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process rumor',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 