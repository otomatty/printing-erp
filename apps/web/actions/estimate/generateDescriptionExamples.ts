'use server';

import { generateGeminiResponse } from '~/lib/server/gemini';
import { generateDescriptionPrompt } from '~/lib/server/gemini/prompts/description';
import type { ProjectType } from '~/types/estimate';

export interface DescriptionExample {
  title: string;
  description: string;
  features: string[];
  targetUsers: string[];
  references: string[];
}

interface GeminiResponse {
  examples: DescriptionExample[];
}

export async function generateDescriptionExamples(
  projectType: ProjectType,
  currentDescription?: string
): Promise<DescriptionExample[]> {
  try {
    const prompt = generateDescriptionPrompt(projectType, currentDescription);
    const response = await generateGeminiResponse<GeminiResponse>(prompt);

    return response.examples;
  } catch (error) {
    console.error('Error generating description examples:', error);
    throw error;
  }
}
