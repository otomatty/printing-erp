'use server';

// No imports needed for mock

/**
 * トピックを削除する
 */
export async function deleteTopic(id: string) {
  // モック: アラートを表示
  alert(`deleteTopic called with id=${id}`);
  return { success: true };
}
