'use client';
import { useEffect, useState } from 'react';
import { IMGURLS } from '@/constants/images.constant';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useGeoLocation from '@/lib/hooks/Geolocation';
const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;
const imgUrl = IMGURLS.myLocationIconImgUrl;
const KakaoMap = () => {
  const myLocation = useGeoLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.onload = () => {
      kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <section className="h-lvh mr-1">
      {isLoaded && (
        <Map
          center={
            myLocation ? { lat: myLocation.latitude, lng: myLocation.longitude } : { lat: 37.715133, lng: 126.734086 }
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
      )}
    </section>
  );
};
export default KakaoMap;
