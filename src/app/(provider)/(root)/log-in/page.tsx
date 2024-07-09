'use client';
import LogInTemplate from '@/components/templates/LogInTemplate';
import { imgURLs } from '@/constants/auth.contant';

function LogInPage() {
  const imgUrl = imgURLs.logInImgUrl;

  return <LogInTemplate type="login" imgURL={imgUrl} title="LOG IN" />;
}

export default LogInPage;
