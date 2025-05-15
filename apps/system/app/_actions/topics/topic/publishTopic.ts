'use server';

/**
 * トピックを公開する
 */
export async function publishTopic(id: string, publishDate?: Date) {
  // モック: アラートを表示
  const dateStr = publishDate
    ? publishDate.toISOString()
    : new Date().toISOString();
  alert(`publishTopic called with id=${id}, date=${dateStr}`);
  return { success: true };
}
