import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RumorReference } from '../../../lib/types';

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
      model: "gpt-4",
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

    const references: RumorReference[] = JSON.parse(response).references;

    return NextResponse.json({ references });
  } catch (error) {
    console.error('Error processing rumor:', error);
    return NextResponse.json(
      { error: 'Failed to process rumor' },
      { status: 500 }
    );
  }
} 