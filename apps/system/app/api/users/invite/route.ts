import { NextResponse } from 'next/server';
import { inviteUserAction } from '~/_actions/users/inviteUserAction';
import type { InviteUserFormData } from '~/types/invite';

/**
 * POST /api/users/invite
 * 受け取ったフォームデータで inviteUserAction を呼び出し、結果を JSON で返却します。
 */
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as InviteUserFormData;
    const result = await inviteUserAction(data);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error('API ➜ invite error:', e);
    const message = e instanceof Error ? e.message : '予期せぬエラー';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
