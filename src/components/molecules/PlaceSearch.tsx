'use client';
import { IMGURLS } from '@/constants/images.constant';
import useKakaoStore from '@/stores/kakao.store';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Input from '../atoms/js-Input/Input';
import PlaceList from './PlaceList';

interface PlaceSearchProps {
  label?: string;
  type?: string;
  placeholder?: string;
}
const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

export const PlaceSearch = ({ label, type, placeholder }: PlaceSearchProps) => {
  const { setPlaces, places } = useKakaoStore((state) => state);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const placeRef = useRef<string>('');
  useEffect(() => {
    const script = document.createElement('script');

    script.src = KAKAO_SDK_URL;
    script.onload = () => {
      kakao.maps.load(() => {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(placeRef.current, placesSearchCB);
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [isSearch]);

  function placesSearchCB(data: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      setPlaces(data);
      return data;
    } else {
      console.log('status error');
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSearch((prev) => !prev);
      }}
      className="flex items-center w-full relative"
    >
      <div className="w-full ">
        <div className="flex relative w-full items-center">
          <Input
            type="text"
            onChange={(e) => {
              placeRef.current = e.target.value;
            }}
          />
          <div className="absolute right-0 top-1/3 transform -translate-y-1/2 mr-2">
            <Image
              src={IMGURLS.searchIconImgUrl}
              alt="Search Icon"
              width={20}
              height={20}
              className="object-cover mt-2"
            />
          </div>
        </div>
        {places && <PlaceList places={places} />}
      </div>
    </form>
  );
};
