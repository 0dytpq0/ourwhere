import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  const data = await request.json();

  const { id, nickname, imageUrl } = data;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '인증 되지 않은 사용자' }, { status: 401 });
  }

  if (user.id !== id) {
    console.error('잘못된 사용자 ID');
    return NextResponse.json({ error: '잘못된 사용자 ID' }, { status: 403 });
  }

  const { data: updateData, error } = await supabase
    .from('users')
    .update({ nickname, images: imageUrl })
    .eq('id', user.id)
    .select()
    .returns<Tables<'users'>>();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(updateData);
}
