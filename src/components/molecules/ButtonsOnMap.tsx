import { IMGURLS } from '@/constants/images.constant';
import Image from 'next/image';
const ButtonsOnMap = () => {
  const kakaoShareImgUrl = IMGURLS.kakaoShareImgUrl;
  const handleKakaoShare = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href
    });
  };
  return (
    <div className="absolute left-3 bottom-5 z-[2]">
      <button onClick={handleKakaoShare}>
        <Image src={kakaoShareImgUrl} alt="kakao" width={60} height={60} />
      </button>
    </div>
  );
};

export default ButtonsOnMap;
