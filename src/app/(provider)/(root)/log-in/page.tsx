'use client';
import LogInTemplate from '@/components/templates/LogInTemplate';
import { IMGURLS } from '@/constants/auth.contant';

function LogInPage() {
  const imgUrl = IMGURLS.logInImgUrl;

  return <LogInTemplate type="login" imgURL={imgUrl} title="LOG IN" />;
}

export default LogInPage;
