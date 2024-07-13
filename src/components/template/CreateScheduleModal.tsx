import useModalStore from '@/stores/modal.store';
import React from 'react';
import CreateScheduleForm from '../molecules/CreateScheduleForm';

const CreateScheduleModal = () => {
  const { toggleCreateScheduleModal, isCreateScheduleModalOpen } = useModalStore((state) => state);

  console.log(isCreateScheduleModalOpen);

  const closeCreateModal = () => {
    toggleCreateScheduleModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-10 rounded-lg shadow-lg relative">
        <h2>1</h2>
        <CreateScheduleForm />
        <button onClick={closeCreateModal} className=" text-gray-500 p-1 ">
          x
        </button>
      </div>
    </div>
  );
};

export default CreateScheduleModal;
