'use client';

import api from '@/api/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../atoms/js-Button/Button';
import Input from '../atoms/js-Input/Input';

function LogInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleClickLogIn = async () => {
    const user = await api.auth.logIn(email, password);
    if (user.email) router.push('/');
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full max-w-[500px]">
        <Input
          identity="login"
          type="email"
          placeholder="이메일을 입력해주세요"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          identity="login"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-around mt-20 w-full max-w-[500px] ">
        <Button title="로그인" onClick={handleClickLogIn} />
        <Button href="/sign-up" title="회원 가입" />
      </div>
    </div>
  );
}

export default LogInForm;
