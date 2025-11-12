import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const systemPrompt = {
      role: 'system',
      content: `You are a helpful travel planning assistant. Help users plan their trips by:
- Suggesting destinations, activities, and itineraries
- Providing travel tips and recommendations
- Estimating costs and durations
- Recommending best times to visit
- Suggesting accommodations and restaurants
Keep responses concise, friendly, and practical. Focus on creating memorable travel experiences.`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiMessage = completion.choices[0].message;

    return NextResponse.json({
      message: aiMessage,
      success: true,
    });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get AI response',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
