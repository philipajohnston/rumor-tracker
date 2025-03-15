import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RumorResult, MAX_API_RESULTS } from '@/types/rumor';
import { extractDomain } from '@/utils/rumorProcessing';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a rumor analysis assistant. For the given rumor, generate up to ${MAX_API_RESULTS} results that show how it might have spread across different sources and times. Each result should include a source, date, and excerpt. Make the results realistic and varied across different time periods. Format the response as a JSON array of objects with source, date, and excerpt properties.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const response = JSON.parse(content);
    
    // Process the results to add domains
    const results = response.results.map((result: Omit<RumorResult, 'domain'>) => ({
      ...result,
      domain: extractDomain(result.source)
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error analyzing rumor:', error);
    return NextResponse.json(
      { error: 'Failed to analyze rumor' },
      { status: 500 }
    );
  }
} 