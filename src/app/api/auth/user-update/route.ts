import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  const data = await request.json();
  console.log('나 데이터임', data);

  //   const nickname = data.nickname as string;
  const { id, nickname } = data;

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
    .update({ nickname })
    .eq('id', user.id)
    .select()
    .returns<Tables<'users'>>();

  console.log('data', updateData);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('업데이트된 데이터!!!!!!!:', updateData);

  return NextResponse.json(updateData);
}
