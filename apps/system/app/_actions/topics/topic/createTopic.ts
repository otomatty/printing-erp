'use server';

import type { TopicFormData } from '../../../../types/topics';

/**
 * トピックを作成する
 */
export async function createTopic(formData: TopicFormData) {
  // モック: アラートを表示
  alert(`createTopic called with: ${JSON.stringify(formData)}`);
  return { success: true };
}
