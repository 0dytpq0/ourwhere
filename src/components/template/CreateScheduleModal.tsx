import useModalStore from '@/stores/modal.store';
import React from 'react';
import CreateScheduleForm from '../molecules/CreateScheduleForm';

const CreateScheduleModal = () => {
  const { toggleCreateScheduleModal } = useModalStore((state) => state);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleCreateScheduleModal();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div className="relative bg-white rounded-[2.5rem] w-[30rem] h-[40rem] ">
        <div className="w-64 mx-auto my-12">
          <h2 className="mx-auto mb-5 w-fit text-3xl font-bold text-font-color">새로운 스케줄 만들기</h2>
          <CreateScheduleForm />
          <button onClick={toggleCreateScheduleModal} className="absolute top-3 right-4 text-gray-500 p-1 text-2xl">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateScheduleModal;
