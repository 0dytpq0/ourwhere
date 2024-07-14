import useModalStore from '@/stores/modal.store';
import React from 'react';
import EditScheduleForm from '../molecules/EditScheduleForm';
import MarkerWithOrder from '../atoms/MarkerWithOrder';
import useScheduleStore from '@/stores/schedule.store';

const EditScheduleModal = () => {
  const { toggleEditScheduleModal, isEditScheduleModalOpen, isCreateScheduleModalOpen } = useModalStore(
    (state) => state
  );
  const { scheduleIndex } = useScheduleStore((state) => state);

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
      <div className="relative bg-white rounded-[2.5rem] w-[30rem] h-[38rem] ">
        <div className="w-64 mx-auto my-12 ">
          <div className=" w-fit mx-auto mb-2">
            <MarkerWithOrder order={scheduleIndex} />
          </div>
          <EditScheduleForm />
          <button onClick={toggleEditScheduleModal} className="absolute top-3 right-4 text-gray-500 p-1 text-2xl">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditScheduleModal;
