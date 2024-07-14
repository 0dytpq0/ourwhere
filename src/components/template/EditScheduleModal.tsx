import useModalStore from '@/stores/modal.store';
import React from 'react';
import EditScheduleForm from '../molecules/EditScheduleForm';

const EditScheduleModal = () => {
  const { toggleEditScheduleModal, isEditScheduleModalOpen, isCreateScheduleModalOpen } = useModalStore(
    (state) => state
  );

  console.log('create', isCreateScheduleModalOpen);
  console.log('edit', isEditScheduleModalOpen);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleEditScheduleModal();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div className="bg-white p-10 rounded-lg shadow-lg relative">
        <h2>1</h2>
        <EditScheduleForm />
        <button onClick={toggleEditScheduleModal} className=" text-gray-500 p-1 ">
          x
        </button>
      </div>
    </div>
  );
};

export default EditScheduleModal;
