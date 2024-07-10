'use client';

import { IMGURLS } from '@/constants/images.constant';
import useGeoLocation from '@/lib/hooks/Geolocation';
import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;
const imgUrl = IMGURLS.myLocationIconImgUrl;

const KakaoMap = () => {
  const myLocation = useGeoLocation();
  return (
    <>
      <section className="h-lvh mr-1">
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <Map
          center={
            myLocation ? { lat: myLocation.latitude, lng: myLocation.longitude } : { lat: 37.715133, lng: 37.413294 }
          }
          style={{ width: '800px', height: '100%' }}
        >
          {myLocation && (
            <MapMarker
              position={{ lat: myLocation.latitude, lng: myLocation.longitude }}
              image={{ src: imgUrl, size: { width: 70, height: 70 } }}
              title="현재 위치"
            />
          )}
        </Map>
      </section>
    </>
  );
};

export default KakaoMap;
