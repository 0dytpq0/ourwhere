import React from 'react';
import { InputField } from '../atoms/InputField';

const MeetingForm = () => {
  return (
    <div>
      <div className="flex flex-col space-y-4 ">
        <InputField label="모임 이름" type="text" placeholder="모임 이름을 입력해주세요" />
        <label>시작 날짜</label>
        <input type="date" />~<label>종료 날짜</label>
        <input type="date" />
        <InputField label="비밀번호" type="password" placeholder="****" />
      </div>
    </div>
  );
};

export default MeetingForm;
