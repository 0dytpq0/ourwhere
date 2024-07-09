'use client';
import LogInTemplate from '@/components/templates/LogInTemplate';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';

function LogInPage() {
  const supabase = createClient();

  const { data: imgURL } = useQuery({
    queryKey: ['loginImg'],
    queryFn: () => supabase.storage.from('auth').getPublicUrl('/login.png')
  });

  return <LogInTemplate type="login" imgURL={imgURL?.data?.publicUrl} title="LOG IN" />;
}

export default LogInPage;
