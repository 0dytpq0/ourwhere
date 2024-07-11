'use client';

import api from '@/api/api';
import { useAuthStore } from '@/providers/js-auth.store.provider';
import { useMutation } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';

function GlobalLayout({ children }: PropsWithChildren) {
  const { setUser } = useAuthStore((state) => state);

  const { mutate: getUserSession } = useMutation({
    mutationFn: () => api.auth.getUserSession(),
    onSuccess: (data) => {
      setUser(data);
    }
  });

  useEffect(() => {
    getUserSession();
  }, []);
  return <>{children}</>;
}

export default GlobalLayout;
