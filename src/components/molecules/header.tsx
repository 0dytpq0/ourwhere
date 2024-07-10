import api from '@/api/api';
import { useAuthStore } from '@/providers/js-auth.store.provider';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

export default function Header() {
  const buttons = [
    { text: '로그인', href: '/log-in' },
    { text: '회원가입', href: '/sign-up' }
  ];
  const { user, setUser } = useAuthStore((state) => state);
  const { mutate: getUserSession } = useMutation({
    mutationFn: () => api.auth.getUserSession(),
    onSuccess: (data) => {
      setUser(data);
    }
  });

  getUserSession();
  console.log('user', user);
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-10  bg-header-color">
        <ul className="text-white h-16 flex items-center m-auto px-4">
          <Link href="/" className="font-lg font-bold">
            {' '}
            OURWHERE{' '}
          </Link>
          <div className="ml-auto flex space-x-4 mx-4">
            {buttons.map((button, index) => (
              <Link key={index} href={button.href}>
                <button className="border-solid bg-loginpage-color text-font-color px-3.5 py-1 rounded-lg font-bold">
                  {button.text}
                </button>
              </Link>
            ))}
          </div>
        </ul>
      </nav>
    </>
  );
}
