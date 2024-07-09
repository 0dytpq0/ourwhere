import api from '@/api/api';
import { useState } from 'react';
import Button from '../atoms/js-Button/Button';
import Input from '../atoms/js-Input/Input';

function LogInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClickLogIn = async () => await api.auth.logIn(email, password);
  const handleClickLogOut = async () => await api.auth.logOut();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col w-72">
        <Input placeholder="이메일을 입력해주세요" required onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="비밀번호를 입력해주세요" required onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="flex w-72 justify-around mt-12">
        <Button title="LOG IN" onClick={handleClickLogIn} />
        <Button href="/sign-up" title="SIGN UP" />
        {/* <Button title="로그아웃" onClick={handleClickLogOut} /> */}
      </div>
    </div>
  );
}

export default LogInForm;
