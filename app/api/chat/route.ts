import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    // We expect the latest message to be the user prompt
    const latestMessage = messages[messages.length - 1]
    const prompt = latestMessage.content

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 })
    }

    // Dynamically fetch available models to select whichever is available
    const modelRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelData = await modelRes.json();
    let selectedModel = 'gemini-1.5-flash'; // Fallback
    
    if (modelData.models) {
      const availableModels = modelData.models.filter((m: any) => 
        m.supportedGenerationMethods.includes('generateContent') && 
        m.name.includes('gemini') && 
        !m.name.includes('vision') // Prefer standard text models
      );
      if (availableModels.length > 0) {
        selectedModel = availableModels[0].name.replace('models/', '');
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: selectedModel })

    const systemContext = "You are an expert Election Guide Assistant. Your goal is to educate users about the election process in simple, engaging terms. Keep responses concise, neutral, and informative. If asked to 'Explain like I'm 10', use very simple analogies. If asked to summarize, provide bullet points."
    
    const fullPrompt = `${systemContext}\n\nUser: ${prompt}`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ reply: text })

  } catch (error: any) {
    console.error('Error in chat API:', error)
    return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 })
  }
}
