import type { ReactNode } from 'react';

/**
 * FAQItem represents a question-answer pair for FAQ sections.
 */
export type FAQItem = {
  question: string;
  answer: string | ReactNode;
  id?: string;
};
