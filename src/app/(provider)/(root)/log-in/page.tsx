'use client';
import api from '@/api/api';
import Input from '@/components/atoms/Input';
import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClickLogIn = async () => await api.auth.logIn(email, password);
  const handleClickLogOut = async () => await api.auth.logOut();
  return (
    <div>
      <Input label="이메일" required onChange={(e) => setEmail(e.target.value)} />
      <Input label="비밀번호" required onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleClickLogIn}>로그인</button>
      <button onClick={handleClickLogOut}>로그아웃</button>
    </div>
  );
}

export default LoginPage;
