'use client';

import { useEffect, useState } from 'react';
import Schedule from '../molecules/Schedule';
import ScheduleModal from './ScheduleModal';
import KebabIcon from '../atoms/Kebab';
import useModalStore from '@/stores/modal.store';
import MeetingAPI from '@/api/meeting.api';
import { Tables } from '@/types/supabase';
import Image from 'next/image';

export default function Meeting() {
  const modal = useModalStore((state) => state.modal);
  const toggleModal = useModalStore((state) => state.toggleModal);
  const [meeting, setMeeting] = useState<Tables<'meeting'>[]>([]);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [currentMeeting, setCurrentMeeting] = useState<Tables<'meeting'> | null>(null);

  const meetingAPI = new MeetingAPI();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await meetingAPI.selectMeetings();
        if (!data) return;
        setMeeting(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeetings();
  }, []);

  const handleToggleModal = () => {
    toggleModal();
  };

  const handleToggleMenu = (id: number) => {
    setShowMenu(showMenu === id ? null : id);
  };

  const handleEditMeeting = (meeting: Tables<'meeting'>) => {
    setCurrentMeeting(meeting);
    handleToggleModal();
  };

  return (
    <>
      <section className="bg-loginpage-color pt-16 pb-16 h-dvh overflow-auto">
        {meeting.map((data) => (
          <div key={data.id} className="flex flex-col items-center pt-10 relative">
            <div
              className="absolute right-4 top-4 flex items-center cursor-pointer"
              onClick={() => handleToggleMenu(data.id)}
            >
              <KebabIcon />
            </div>
            <h1 className="text-4xl mb-3 text-font-color">🎈{data.title}🎈</h1>
            {/* 수적,삭제 버튼 */}
            {showMenu === data.id && (
              <div className="absolute right-12 top-4 bg-white rounded-md shadow-md p-2">
                <button
                  className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                  onClick={() => handleEditMeeting(data)}
                >
                  <Image src={'/edit.png'} alt="수정" width={17} height={20} />
                </button>
                <button
                  className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                  onClick={() => console.log('삭제')}
                >
                  <Image src={'/trash.png'} alt="삭제" width={17} height={20} />
                </button>
              </div>
            )}
            <div className="p-1 w-64 rounded-xl bg-white flex justify-center items-center drop-shadow-md mt-2">
              {data.date}
            </div>
            <Schedule />
            <button
              onClick={handleToggleModal}
              className="w-16 h-16 rounded-full bg-header-color text-loginpage-color text-4xl mt-5"
            >
              +
            </button>
          </div>
        ))}
      </section>

      {modal && <ScheduleModal handleClose={handleToggleModal} />}
    </>
  );
}
