import React from 'react';
import MeetingForm from '../molecules/MeetingForm';
import useModalStore from '@/stores/modal.store';
import { useParams } from 'next/navigation';

const MeetingModal = () => {
  const { id } = useParams();
  const meetingId = Number(id);

  const toggleMeetingModal = useModalStore((state) => state.toggleMeetingModal);

  const closeMeetingModal = () => {
    toggleMeetingModal();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeMeetingModal();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div className="relative bg-white p-20 rounded-[2.5rem] shadow-lg w-[28rem] ">
        <h2 className="mx-auto mb-[3rem] w-fit text-3xl font-bold text-font-color">
          {meetingId ? '모임 수정하기' : '새 모임 만들기'}
        </h2>
        <MeetingForm />
        <button
          type="submit"
          onClick={closeMeetingModal}
          className="absolute top-3 right-4 text-gray-500 p-1 text-2xl "
        >
          x
        </button>
      </div>
    </div>
  );
};

export default MeetingModal;
