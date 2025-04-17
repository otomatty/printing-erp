import type { Atom } from 'jotai';
import { localStorageAtomCache } from '../store/localStorage';

/**
 * サーバーサイドコンポーネントでjotaiのatomの値を取得するユーティリティ関数
 * @param atom 取得対象のatom
 * @param cookieStore cookiesオブジェクト
 * @returns atomの値またはデフォルト値
 */
export function getAtomValue<T>(
  atom: Atom<T>,
  cookieStore: {
    get: (name: string) => { value: string } | undefined;
  }
): T | null {
  try {
    // localStorageAtomからキーを取得
    const atomKey = `jotai_${atom.toString().split(' ')[1]}`;

    // cookieからデータを取得
    const cookie = cookieStore.get(atomKey);
    if (!cookie) {
      // ローカルストレージのデフォルト値を使用
      const defaultValue = localStorageAtomCache[atomKey];
      return defaultValue as T | null;
    }

    // cookieの値をパース
    return JSON.parse(cookie.value) as T;
  } catch (error) {
    console.error('Failed to get atom value:', error);
    return null;
  }
}
