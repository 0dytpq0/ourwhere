import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();
  return NextResponse.json(data);
}
