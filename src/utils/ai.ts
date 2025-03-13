import { GoogleGenerativeAI } from '@google/generative-ai';

export async function summarizeContent(
  apiKey: string,
  content: string
): Promise<string> {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  if (!content || content.trim().length === 0) {
    throw new Error('No content provided for summarization');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
      Please provide a comprehensive summary of the following content. Focus on:
      - Main ideas and key points
      - Important facts and findings
      - Conclusions or outcomes
      
      Content to summarize:
      ${content}
    `.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('No summary generated');
    }
    
    return response.text();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to generate summary: ${message}`);
  }
}
