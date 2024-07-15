import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'id가 없습니다.' }, { status: 400 });
  }
  const { data, error } = await supabase.from('users').select().eq('id', id).returns<Tables<'users'>>();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
