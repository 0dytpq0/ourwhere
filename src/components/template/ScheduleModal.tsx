import React from 'react';
import ScheduleForm from '../molecules/ScheduleForm';
import useModalStore from '@/stores/modal.store';

const ScheduleModal = () => {
  const toggleScheduleModal = useModalStore((state) => state.toggleScheduleModal);

  const closeScheduleModal = () => {
    toggleScheduleModal();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeScheduleModal();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div className="bg-white p-10 rounded-lg shadow-lg relative">
        <h2>1</h2>
        <ScheduleForm />
        <button onClick={closeScheduleModal} className="absolute top-1 right-2 text-gray-500 p-1 text-2xl">
          x
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;
