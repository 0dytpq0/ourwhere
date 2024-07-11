'use client';

import { useEffect, useState } from 'react';
import { IMGURLS } from '@/constants/images.constant';
import useGeoLocation from '@/lib/hooks/useGeolocation';
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

const positions = [
  {
    title: '포가레 연남본점',
    address: '서울 마포구 동교로 227-7 2층',
    number: 1
  },
  {
    title: '케이크 밀쿠',
    address: '서울 마포구 연희로1길 7 1층',
    number: 2
  },
  {
    title: 'GS25 창전태영점',
    address: '서울 마포구 서강로9길 52 1층',
    number: 3
  },
  {
    title: '홍대파티룸 와우라운지',
    address: '서울 마포구 와우산로 162 5층',
    number: 4
  }
];

const KakaoMap = () => {
  const myLocation = useGeoLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerPositions, setMarkerPositions] = useState<{ lat: number; lng: number; title: string; number: number }[]>(
    []
  );

  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.onload = () => {
      kakao.maps.load(() => {
        setIsLoaded(true);
        const geocoder = new kakao.maps.services.Geocoder();

        const promises = positions.map((position) => {
          return new Promise<{ lat: number; lng: number; title: string; number: number }>((resolve, reject) => {
            geocoder.addressSearch(position.address, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const coords = {
                  lat: parseFloat(result[0].y),
                  lng: parseFloat(result[0].x),
                  title: position.title,
                  number: position.number
                };
                resolve(coords);
              } else {
                reject(status);
              }
            });
          });
        });

        Promise.all(promises)
          .then((results) => {
            setMarkerPositions(results);
          })
          .catch((error) => {
            console.error('Geocoder failed due to: ', error);
          });
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const MarkerWithNumber = ({ number }: { number: number }) => {
    return (
      <div className="flex items-center justify-center w-16 h-16 text-black bg-white border-[10px] border-[#8085F2] rounded-full text-3xl font-bold">
        {number}
      </div>
    );
  };

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
              image={{ src: IMGURLS.myLocationIconImgUrl, size: { width: 70, height: 70 } }}
              title="현재 위치"
            />
          )}
          {markerPositions.map((position, index) => (
            <CustomOverlayMap key={`${position.title}-${index}`} position={{ lat: position.lat, lng: position.lng }}>
              <MarkerWithNumber number={position.number} />
            </CustomOverlayMap>
          ))}
        </Map>
      )}
    </section>
  );
};

export default KakaoMap;
