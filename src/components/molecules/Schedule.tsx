'use client';

import { useSchedule, useSchedulesToMeetingId } from '@/lib/hooks/useScheduleAPI';

import { useParams } from 'next/navigation';

function Schedule() {
  const { id } = useParams();
  const meetingId = Number(id);

  const { data: scheduleData, error, isPending } = useSchedulesToMeetingId(meetingId);

  if (error) {
    console.log('error', error);
    return;
  }
  if (isPending) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  if (!scheduleData) return <div>데이터를 받아올 수 없습니다.</div>;

  return (
    <div className="p-4">
      {error && <div className="text-red-500">{error}</div>}
      {scheduleData.map((items, index) => (
        <div key={items.id} className="mb-4 p-4 bg-white flex rounded-lg shadow-lg relative">
          {/* 시간이랑 인텍스 */}
          <div className="flex items-center mb-2">
            <div className="bg-purple-100 text-purple-700 rounded-full h-8 w-8 flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="ml-4 text-lg font-semibold text-purple-700">{items.time}</div>
          </div>
          {/* 제목,주소,컨텐트 */}
          <div className="ml-12">
            <div className="text-2xl font-bold text-gray-800">{items.place}</div>
            <div className="mt-1 text-sm text-gray-500">{items.address}</div>
            <div className="bg-purple-100 p-4 rounded-md text-purple-700 mt-2">
              <div className="text-sm">
                <span role="img" aria-label="pencil">
                  ✍️
                </span>{' '}
                {items.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Schedule;
