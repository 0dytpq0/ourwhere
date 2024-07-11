import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();
  return NextResponse.json(data.session?.user);
}
