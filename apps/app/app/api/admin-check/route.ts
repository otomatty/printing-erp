import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.rpc('check_is_admin');

    if (error) {
      console.error('Error checking admin status:', error);
      return NextResponse.json({ isAdmin: false }, { status: 500 });
    }

    return NextResponse.json({ isAdmin: !!data });
  } catch (error) {
    console.error('Unexpected error in admin check API:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
