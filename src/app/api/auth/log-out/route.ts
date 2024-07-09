import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createClient();

  // 쿠키 삭제
  await supabase.auth.signOut();

  return NextResponse.json('');
}
