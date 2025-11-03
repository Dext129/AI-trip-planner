import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai"
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user’s answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along with the response also send which UI component to display for generative UI, for example 'budget', 'groupSize', 'tripDuration', or 'final' (where 'final' means AI generating the complete final output).
Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with the following JSON schema:

{
  "resp": "Text Resp",
  "ui": "budget|groupSize|tripDuration|final"
}`;



export async function POST(post: NextRequest) {
  const { message } = await post.json();
  try{
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4.1-mini",
    messages: [
      { role: "system", content: PROMPT },
      ...message
    ],
  });
  console.log(completion.choices[0].message);
  const message = completion.choices[0].message
  const reply = completion.choices?.[0]?.message?.content ?? "";
  return NextResponse.json(JSON.parse(message.content??''));
}
catch(e){
  return NextResponse.json(e)
}
}
