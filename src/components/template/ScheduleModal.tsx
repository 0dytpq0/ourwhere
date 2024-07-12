
import React from 'react';
import ScheduleForm from '../molecules/ScheduleForm';
import useModalStore from '@/stores/modal.store';


const Modal = () => {
  const toggleScheduleModal = useModalStore((state) => state.toggleScheduleModal);

  const closeScheduleModal = () => {
    toggleScheduleModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-10 rounded-lg shadow-lg ">
        <h2>1</h2>
        <ScheduleForm />
        <button onClick={closeScheduleModal} className=" text-gray-500 p-1 ">
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
