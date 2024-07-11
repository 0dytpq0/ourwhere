import React from 'react';
import ScheduleForm from '../molecules/ScheduleForm';

const Modal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-10 rounded-lg shadow-lg ">
        <h2>1</h2>
        <ScheduleForm />
      </div>
    </div>
  );
};

export default Modal;
