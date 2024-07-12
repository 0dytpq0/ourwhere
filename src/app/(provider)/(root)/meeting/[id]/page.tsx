// 'use client';

import Meeting from '@/components/template/Meeting';
import KakaoMap from '@/components/template/KakaoMap';

export default function MeetingPage() {
  return (
    <div className="w-100% flex justify-center">
      <KakaoMap />
      <Meeting />
    </div>
  );
}
