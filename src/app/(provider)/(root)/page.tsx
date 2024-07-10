'use client';

import api from '@/api/api';
import { useAuthStore } from '@/providers/js-auth.store.provider';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function Home() {
  const { setUser, user } = useAuthStore((state) => state);
  const { mutate: getUserSession } = useMutation({
    mutationFn: () => api.auth.getUserSession(),
    onSuccess: (data) => {
      setUser(data);
    }
  });

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">OURWHERE</h2>
        <p className="mt-4">소개 글</p>
        <button className="mt-4 px-4 py-2 bg-button-color text-white rounded-lg"> 새 모임 생성하기! </button>
      </div>
    </div>
  );
}
