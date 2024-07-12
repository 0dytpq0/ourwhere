'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import useGeoLocation from '@/lib/hooks/useGeolocation';
import { IMGURLS } from '@/constants/images.constant';
import useScheduleStore from '@/stores/schedule.store';
import MarkerWithOrder from '../atoms/MarkerWithOrder';

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

const KakaoMap = () => {
  const { id } = useParams();
  const meetingId = parseInt(id, 10);
  const myLocation = useGeoLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerPositions, setMarkerPositions] = useState<{ lat: number; lng: number; title: string; order: number }[]>(
    []
  );
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const { scheduleData } = useScheduleStore();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.onload = () => {
      kakao.maps.load(() => {
        setIsLoaded(true);
        const geocoder = new kakao.maps.services.Geocoder();

        if (!scheduleData || scheduleData.length === 0) {
          if (myLocation) {
            setMapCenter({ lat: myLocation.latitude, lng: myLocation.longitude });
          }
          return;
        }

        const promises = scheduleData.map((scheduleItem, index) => {
          return new Promise<{ lat: number; lng: number; title: string; order: number }>((resolve, reject) => {
            geocoder.addressSearch(scheduleItem.address!, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const coords = {
                  lat: parseFloat(result[0].y),
                  lng: parseFloat(result[0].x),
                  title: scheduleItem.place,
                  order: index + 1
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
            if (results.length === 1) {
              const singleResult = results[0];
              setMarkerPositions(results);
              setMapCenter({ lat: singleResult.lat, lng: singleResult.lng });
            } else if (results.length > 1) {
              setMarkerPositions(results);
              const avgLat = results.reduce((acc, pos) => acc + pos.lat, 0) / results.length;
              const avgLng = results.reduce((acc, pos) => acc + pos.lng, 0) / results.length;
              setMapCenter({ lat: avgLat, lng: avgLng });
            } else {
              if (myLocation) {
                setMapCenter({ lat: myLocation.latitude, lng: myLocation.longitude });
              } else {
                console.log('정보 없음');
              }
            }
          })
          .catch((error) => {
            console.error('Geocoder failed due to:', error);
          });
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [meetingId, myLocation]);

  useEffect(() => {
    if (!mapCenter && myLocation) {
      setMapCenter({ lat: myLocation.latitude, lng: myLocation.longitude });
    }
  }, [myLocation]);

  return (
    <section className="h-lvh mr-1">
      {isLoaded && mapCenter && (
        <Map center={mapCenter} style={{ width: '800px', height: '100%' }} level={5}>
          {myLocation && (
            <MapMarker
              position={{ lat: myLocation.latitude, lng: myLocation.longitude }}
              image={{ src: IMGURLS.myLocationIconImgUrl, size: { width: 70, height: 70 } }}
              title="현재 위치"
            />
          )}
          {markerPositions.map((position, index) => (
            <CustomOverlayMap key={`${position.title}-${index}`} position={{ lat: position.lat, lng: position.lng }}>
              <MarkerWithOrder order={position.order} />
            </CustomOverlayMap>
          ))}
        </Map>
      )}
    </section>
  );
};

export default KakaoMap;
