import Input from '@/components/atoms/Input';

function LoginPage() {
  return (
    <div>
      <Input label="이메일" required={false} />
      <Input label="비밀번호" required={false} />
      <Input label="닉네임" required={false} />
      <button>회원가입</button>
    </div>
  );
}

export default LoginPage;
