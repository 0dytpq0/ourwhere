'use client';

import { useSchedulesToMeetingId } from '@/lib/hooks/useScheduleAPI';
import useModalStore from '@/stores/modal.store';
import { Tables } from '@/types/supabase';
import { useParams } from 'next/navigation';
import useScheduleStore from '@/stores/schedule.store';
import EditScheduleModal from '../template/EditScheduleModal';

type ScheduleType = Tables<'schedule'>;

function Schedule() {
  const { id } = useParams();
  const meetingId = Number(id);
  const { isEditScheduleModalOpen, toggleEditScheduleModal } = useModalStore((state) => state);

  const setClickScheduleId = useScheduleStore((state) => state.setClickScheduleId);
  const { data: schedules, error, isLoading } = useSchedulesToMeetingId(meetingId);

  if (error) {
    console.log('error', error);
    return <div>오류가 발생했습니다. 다시 시도해 주세요.</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!schedules) return <div>데이터를 받아올 수 없습니다.</div>;

  const handleEditClick = (schedule: ScheduleType) => {
    toggleEditScheduleModal();
    setClickScheduleId(schedule.id);
  };

  return (
    <div className="p-4">
      {schedules.map((schedule: ScheduleType, index) => (
        <div key={schedule.id} className="mb-4 p-4 bg-white flex rounded-lg shadow-lg relative">
          {/* 시간이랑 인덱스 */}
          <div className="flex items-center mb-2">
            <div className="bg-purple-100 text-purple-700 rounded-full h-8 w-8 flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="ml-4 text-lg font-semibold text-purple-700">{schedule.time}</div>
          </div>
          {/* 제목, 주소, 컨텐트 */}
          <div className="ml-12 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">{schedule.place}</div>
                <div className="mt-1 text-sm text-gray-500">{schedule.address}</div>
              </div>
              <div className="flex space-x-2">
                {/* 수정 버튼 */}
                <button
                  onClick={() => {
                    handleEditClick(schedule);
                  }}
                  className="text-purple-500 hover:text-purple-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7.5 9.672l-1.086 4.243 4.243-1.086 7.086-7.086a2 2 0 000-2.828zM5 16.414a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
                {/* 삭제 버튼 */}
                <button className="text-purple-500 hover:text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5V 6h16v-.5A1.5 1.5 0 0016.5 3H15V2a1 1 0 00-1-1H6zM2 7v8.5A1.5 1.5 0 003.5 17h13a1.5 1.5 0 001.5-1.5V7H2zm5 3a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm5 0a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-md text-purple-700 mt-2">
              <div className="text-sm">
                <span role="img" aria-label="pencil">
                  ✍️
                </span>
                {schedule.content}
              </div>
            </div>
          </div>
        </div>
      ))}
      {isEditScheduleModalOpen && <EditScheduleModal />}
    </div>
  );
}

export default Schedule;
