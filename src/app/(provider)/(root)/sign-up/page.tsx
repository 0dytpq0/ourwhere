'use client';
import api from '@/api/api';
import Input from '@/components/atoms/Input';
import Link from 'next/link';
import { useState } from 'react';

function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const handleClickSignUp = async () => await api.auth.signUp(email, password, nickname);

  return (
    <div>
      <Input label="이메일" required={false} onChange={(e) => setEmail(e.target.value)} />
      <Input label="비밀번호" required={false} onChange={(e) => setPassword(e.target.value)} />
      <Input label="닉네임" required={false} onChange={(e) => setNickname(e.target.value)} />
      <button onClick={handleClickSignUp}>회원가입</button>
      <Link href={'/log-in'}>로그인</Link>
    </div>
  );
}

export default SignUpPage;
