import React from 'react';
import { InputField } from '../atoms/InputField';

interface ModalProps {
  handleClose: () => void;
}

const Modal = ({ handleClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-4">
          <InputField label="검색" type="text" placeholder="장소 검색" />
          <InputField label="장소" type="text" placeholder="장소" />
          <InputField label="주소" type="text" placeholder="주소" />
          <InputField label="시간" type="datetime-local" />
          <button className="bg-button-color text-loginpage-color p-1 rounded-xl" onClick={handleClose}>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
