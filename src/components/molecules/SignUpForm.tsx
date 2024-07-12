import api from '@/api/api';
import { validateEmail, validatePassword } from '@/lib/utils/validate';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../atoms/js-Button/Button';
import Input from '../atoms/js-Input/Input';

function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleClickSignUp = async () => {
    if (!validateEmail(email)) {
      Swal.fire({
        title: '이메일 형식이 잘못 되었습니다.',
        icon: 'error',
        confirmButtonText: 'Cool'
      }).then(() => setIsError(true));

      return;
    }
    if (!validatePassword(password)) {
      Swal.fire({
        title: '비밀번호 형식이 잘못 되었습니다.',
        icon: 'error',
        confirmButtonText: 'Cool'
      }).then(() => setIsError(true));
    }
    await api.auth.signUp(email, password, nickname);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full   ">
      <div className="flex flex-col justify-center items-center w-full max-w-[500px]">
        <Input
          identity="login"
          placeholder="이메일을 입력해주세요"
          warnning="이메일 형식을 지켜주세요"
          required={isError}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          identity="login"
          placeholder="비밀번호를 입력해주세요"
          warnning="소문자, 숫자, 특수문자 조합으로 만들어주세요"
          required={isError}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input identity="login" placeholder="닉네임을 입력해주세요" onChange={(e) => setNickname(e.target.value)} />
      </div>
      <div className="flex justify-around mt-12 w-full max-w-[500px] ">
        <Button title="회원 가입" onClick={handleClickSignUp} />
        <Button href="/log-in" title="로그인" />
      </div>
    </div>
  );
}

export default SignUpForm;
