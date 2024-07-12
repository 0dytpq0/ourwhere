'use client';

import MeetingModal from '@/components/template/MeetingModal';
import { useAuthStore } from '@/providers/js-auth.store.provider';
import useModalStore from '@/stores/modal.store';

export default function Home() {
  const { user } = useAuthStore((state) => state);
  console.log('user', user);
  const isMeetingModalOpen = useModalStore((state) => state.isMeetingModalOpen);
  const toggleMeetingModal = useModalStore((state) => state.toggleMeetingModal);

  const handleOpenModal = () => {
    toggleMeetingModal();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">OURWHERE</h2>
        <p className="mt-4"> 소개 글</p>
        <button className="mt-4 px-4 py-2 bg-button-color text-white rounded-lg" onClick={handleOpenModal}>
          새 모임 생성하기!
        </button>
      </div>
      {isMeetingModalOpen && <MeetingModal />}
    </div>
  );
}
