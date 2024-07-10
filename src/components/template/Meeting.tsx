'use client';

import useModalStore from '@/stores/modal.store';
import ScheduleModal from './ScheduleModal';
import Schedule from '../molecules/Schedule';
import MeetingAPI from '@/api/meeting.api';
import { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';

export default function Meeting() {
  const modal = useModalStore((state) => state.modal);
  const toggleModal = useModalStore((state) => state.toggleModal);
  const [meeting, setMeeting] = useState<Tables<'meeting'>[]>([]);
  const [error, setError] = useState(null);

  const meetingAPI = new MeetingAPI();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await meetingAPI.selectMeeting();
        if (!data) return;
        setMeeting(data);
      } catch {
        setError('error');
      }
    };

    fetchMeetings();
  }, []);

  console.log(meeting);

  console.log(modal);

  const handleToggleModal = () => {
    toggleModal();
  };

  return (
    <>
      <section className="bg-loginpage-color pt-16 pb-16 h-dvh overflow-auto">
        {meeting.map((data) => (
          <div className="flex flex-col items-center pt-10 ">
            <h1 className="text-4xl mb-3 text-font-color ">🎈{data.title}🎈</h1>
            <div className="p-1 w-64 rounded-xl bg-white flex justify-center items-center drop-shadow-md">
              {data.date}
            </div>
            <Schedule />
            <button
              onClick={handleToggleModal}
              className="w-16 h-16 rounded-full bg-header-color text-loginpage-color text-4xl mt-5 "
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
