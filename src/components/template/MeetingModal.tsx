import React from 'react';
import MeetingForm from '../molecules/MeetingForm';

const MeetingModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-20 rounded-[2.5rem] shadow-lg w-[28rem] ">
        <h2 className="mx-auto mb-[3rem] w-fit text-3xl font-bold text-font-color">새 모임 만들기</h2>
        <MeetingForm />
      </div>
    </div>
  );
};

export default MeetingModal;
