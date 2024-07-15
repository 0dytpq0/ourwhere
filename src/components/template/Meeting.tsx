'use client';

import api from '@/api/api';
import { useMeeting } from '@/lib/hooks/useMeetingAPI';
import useModalStore from '@/stores/modal.store';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import KebabIcon from '../atoms/Kebab';
import CheckPasswordModal from '../molecules/CheckPasswordModal';
import Schedule from '../molecules/Schedule';
import CreateScheduleModal from './CreateScheduleModal';
import MeetingModal from './MeetingModal';

export default function Meeting() {
  const { isCreateScheduleModalOpen, isMeetingModalOpen, isCheckPasswordModalOpen, closeCheckPasswordModal } =
    useModalStore();
  const toggleCreateScheduleModal = useModalStore((state) => state.toggleCreateScheduleModal);
  const toggleMeetingModal = useModalStore((state) => state.toggleMeetingModal);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [currentMeeting, setCurrentMeeting] = useState<Tables<'meeting'> | null>(null);

  const { id } = useParams();
  const meetingId = Number(id);
  const router = useRouter();

  const { data: meeting, error, isLoading } = useMeeting(meetingId);
  if (error) {
    return <div>오류가 발생했습니다. 다시 시도해 주세요.</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!meeting) return <div>데이터를 받아올 수 없습니다.</div>;

  const handleToggleMenu = (meetingId: number) => {
    setShowMenu(showMenu === meetingId ? null : meetingId);
  };

  const handleEditMeeting = (meeting: Tables<'meeting'>) => {
    setCurrentMeeting(meeting);
    toggleMeetingModal();
  };

  const handleDeleteMeeting = async (meetingId: number) => {
    try {
      await api.meeting.deleteMeeting(meetingId);
      alert('삭제가 완료 되었습니다.');
      router.push('/');
    } catch (error) {
      throw new Error();
    }
  };

  if (!meeting) return null;
  return (
    <>
      <section className="bg-loginpage-color pt-16 pb-16 h-dvh overflow-auto">
        <div className="flex flex-col items-center pt-10 relative">
          <div
            className="absolute right-4 top-4 flex items-center cursor-pointer"
            onClick={() => handleToggleMenu(meeting.id!)}
          >
            <KebabIcon />
          </div>
          <h1 className="text-4xl mb-3 text-font-color">🎈{meeting.title}🎈</h1>
          {/* 수적,삭제 버튼 */}
          {showMenu === meeting.id && (
            <div className="absolute right-12 top-4 bg-white rounded-md shadow-md p-2">
              <button
                className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                onClick={() => handleEditMeeting(meeting)}
              >
                <Image src={'/edit.png'} alt="수정" width={17} height={20} />
              </button>
              <button
                className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                onClick={() => {
                  handleDeleteMeeting(meeting.id!);
                }}
              >
                <Image src={'/trash.png'} alt="삭제" width={17} height={20} />
              </button>
            </div>
          )}
          <div className="p-1 w-64 rounded-xl bg-white flex justify-center items-center drop-shadow-md mt-2">
            {meeting.date}
          </div>
          <Schedule />
          <button
            onClick={toggleCreateScheduleModal}
            className="w-16 h-16 rounded-full bg-header-color text-loginpage-color text-4xl mt-5"
          >
            +
          </button>
        </div>
      </section>

      {isCreateScheduleModalOpen && <CreateScheduleModal />}
      {isMeetingModalOpen && <MeetingModal />}
      {isCheckPasswordModalOpen && <CheckPasswordModal password={meeting?.password} />}
    </>
  );
}
