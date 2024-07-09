'use client';
import LogInTemplate from '@/components/templates/LogInTemplate';
import { imgURLs } from '@/constants/auth.contant';

function SignUpPage() {
  const imgURL = imgURLs.signUpImgUrl;

  return <LogInTemplate type="signup" imgURL={imgURL} title="LOG IN" />;
}

export default SignUpPage;
