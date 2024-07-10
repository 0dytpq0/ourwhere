import { IMGURLS } from '@/constants/images.constant';
import Image from 'next/image';

const KakaoShareButton = () => {
  const kakaoShareImgUrl = IMGURLS.kakaoShareImgUrl;
  const handleKakaoShare = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href
    });

    return (
      <button onClick={handleKakaoShare}>
        <Image src={kakaoShareImgUrl} alt="kakao" />
      </button>
    );
  };
};
export default KakaoShareButton;
