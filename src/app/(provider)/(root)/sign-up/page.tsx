'use client';
import LogInTemplate from '@/components/templates/LogInTemplate';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';

function SignUpPage() {
  const supabase = createClient();

  // <LogInTemplate type="login" img="/" title="LOG IN" />;
  const { data: imgURL } = useQuery({
    queryKey: ['loginImg'],
    queryFn: () => supabase.storage.from('auth').getPublicUrl('/signup.png')
  });

  return <LogInTemplate type="signup" imgURL={imgURL?.data.publicUrl} title="LOG IN" />;
}

export default SignUpPage;
