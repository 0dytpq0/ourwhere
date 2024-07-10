'use client';
import LogInTemplate from '@/components/template/LogInTemplate';
import { IMGURLS } from '@/constants/images.constant';

function SignUpPage() {
  const imgURL = IMGURLS.signUpImgUrl;

  return <LogInTemplate type="signup" imgURL={imgURL} title="SIGN UP" />;
}

export default SignUpPage;
