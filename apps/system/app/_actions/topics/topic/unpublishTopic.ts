'use server';

// No imports needed for mock

/**
 * トピックを非公開にする
 */
export async function unpublishTopic(id: string) {
  // モック: アラートを表示
  alert(`unpublishTopic called with id=${id}`);
  return { success: true };
}
