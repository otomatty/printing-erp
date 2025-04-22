'use client';

import { atom } from 'jotai';
import type { Inquiry } from '../types/inquiries';
import { updateInquiry } from '../actions/inquiries';
import { toast } from 'sonner';

/**
 * 問い合わせ一覧の atom
 */
export const inquiriesAtom = atom<Inquiry[]>([]);

/**
 * ステータス更新用 atom: 楽観的更新で UI を即時更新し、サーバーと同期する
 */
export const updateInquiryStatusAtom = atom(
  null,
  async (get, set, payload: { id: string; newStatus: Inquiry['status'] }) => {
    const { id, newStatus } = payload;
    const prev = get(inquiriesAtom);
    // optimistic UI update
    set(
      inquiriesAtom,
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    try {
      await updateInquiry(id, { status: newStatus });
      toast.success('ステータスを更新しました');
    } catch (error) {
      // revert on error
      set(inquiriesAtom, prev);
      console.error('[Jotai] updateInquiryStatus error', error);
      toast.error(
        `ステータスの更新に失敗しました: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
);
