// 'use client';

import Meeting from '@/components/template/Meeting';
import KakaoMap from '@/components/template/KakaoMap';

export default function MeetingPage({ params }: { params: { id: string } }) {
  const paramsId = params.id;
  console.log(params);
  return (
    <div className="w-100% flex justify-center">
      <KakaoMap />
      <Meeting />
    </div>
  );
}
