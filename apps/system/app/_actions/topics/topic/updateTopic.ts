'use server';

import type { TopicFormData } from '../../../../types/topics';

/**
 * トピックを更新する
 */
export async function updateTopic(id: string, formData: TopicFormData) {
  // モック: アラートを表示
  alert(`updateTopic called with id=${id}, data=${JSON.stringify(formData)}`);
  return { success: true };
}
