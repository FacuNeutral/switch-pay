import { GoogleGenAI } from '@google/genai';
import { parseGeminiJsonResponse } from '../helpers/parse-json';
import { learningBuilder } from './learning';
import { config } from './system-instruction';


export async function geminiClient(base64Page: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const model = 'gemini-2.5-pro';
  const contents = learningBuilder(base64Page);
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let chunks = "";
  let count = 0;

  for await (const chunk of response) {
    chunks += chunk.text;
    console.log(`[GEMINI_PROCESS]Se procesó el chunk ${count + 1}.`);
    count++;
  }
  return parseGeminiJsonResponse(chunks);
}
