'use client';

import { useEffect, useState } from 'react';
import Schedule from '../molecules/Schedule';
import ScheduleModal from './ScheduleModal';
import KebabIcon from '../atoms/Kebab';
import useModalStore from '@/stores/modal.store';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import MeetingAPI from '@/api/meeting.api';
import api from '@/api/api';


export default function Meeting() {
  const { isScheduleModalOpen, isMeetingModalOpen } = useModalStore();
  const toggleScheduleModal = useModalStore((state) => state.toggleScheduleModal);
  const toggleMeetingModal = useModalStore((state) => state.toggleMeetingModal);
  const [meeting, setMeeting] = useState<Tables<'meeting'>>();
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [currentMeeting, setCurrentMeeting] = useState<Tables<'meeting'> | null>(null);

  const meetingAPI = new MeetingAPI();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await meetingAPI.selectMeeting(Number(params.id));
        // console.log(data);
        if (!data) return;
        setMeeting(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeetings();
  }, []);

  const handleToggleMenu = (id: number) => {
    setShowMenu(showMenu === id ? null : id);
  };

  const handleEditMeeting = (meeting: Tables<'meeting'>) => {
    setCurrentMeeting(meeting);
    toggleMeetingModal();
  };

  const handleDeleteMeeting = async (id: number) => {
    try {
      await api.meeting.deleteMeeting(id);
      // null! 수정
      setMeeting(null!);
      alert('삭제가 완료 되었습니다.');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (!meeting) return null; // meeting이 없는 경우 아무것도 랜더링 하지 않게

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
            onClick={toggleScheduleModal}
            className="w-16 h-16 rounded-full bg-header-color text-loginpage-color text-4xl mt-5"
          >
            +
          </button>
        </div>
        <PlaceSearch />
      </section>

      {isScheduleModalOpen && <ScheduleModal />}
      {isMeetingModalOpen && <MeetingModal />}
    </>
  );
}
