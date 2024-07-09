'use client';
import LogInTemplate from '@/components/template/LogInTemplate';
import { IMGURLS } from '@/constants/auth.contant';

function SignUpPage() {
  const imgURL = IMGURLS.signUpImgUrl;

  return <LogInTemplate type="signup" imgURL={imgURL} title="LOG IN" />;
}

export default SignUpPage;
