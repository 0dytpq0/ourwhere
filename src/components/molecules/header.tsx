'use client';
import api from '@/api/api';
import { useAuthStore } from '@/providers/js-auth.store.provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
  const { user, setUser } = useAuthStore((state) => state);
  const router = useRouter();

  const handleClickLogOut = async () => {
    await api.auth.logOut();
    setUser(null);
    router.push('/log-in');
  };

  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-10 bg-header-color">
        <ul className="text-white h-16 flex items-center m-auto px-4">
          <Link href="/" className="font-lg font-bold">
            OURWHERE
          </Link>
          <div className="ml-auto flex items-center space-x-4 mx-4">
            {user ? (
              <>
                <span className="text-lg font-bold"> {user.user_metadata.nickname} 님 안녕하세요! </span>
                <button
                  onClick={handleClickLogOut}
                  className="border-solid bg-loginpage-color text-font-color px-3.5 py-1 rounded-lg font-bold"
                >
                  로그아웃
                </button>
                <Link href="/my-page">
                  <button className="border-solid bg-loginpage-color text-font-color px-3.5 py-1 rounded-lg font-bold">
                    마이페이지
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/log-in">
                  <button className="border-solid bg-loginpage-color text-font-color px-3.5 py-1 rounded-lg font-bold">
                    로그인
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="border-solid bg-loginpage-color text-font-color px-3.5 py-1 rounded-lg font-bold">
                    회원가입
                  </button>
                </Link>
              </>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
}
