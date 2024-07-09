import React from 'react';
import { InputField } from '../atoms/InputField';
import { PlaceSearch } from '../atoms/PlaceSearch';

interface MeetingModalProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ handleClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-24 rounded-[2.5rem] shadow-lg w-[28rem] ">
        <h2 className="mx-auto w-fit text-2xl font-bold">새 모임 만들기</h2>
        <div className="flex flex-col space-y-4 ">
          <InputField label="모임 이름" type="text" placeholder="모임 이름을 입력해주세요" />
          <label>시작 날짜</label>
          <input type="date" />~<label>종료 날짜</label>
          <input type="date" />
          <InputField label="비밀번호" type="password" placeholder="****" />
          <button className="bg-button-color text-loginpage-color p-1 rounded-xl" onClick={handleClose}>
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
