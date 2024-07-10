import React, { useState } from 'react';
import useModalStore from '@/stores/modal.store';
import { useRouter } from 'next/navigation';

const MeetingForm = () => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingStartDate, setMeetingStartDate] = useState('');
  const [meetingEndDate, setMeetingEndDate] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');

  const handleMeetingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingName(e.target.value);
  };
  const handleMeetingStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingStartDate(e.target.value);
  };
  const handleMeetingEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingEndDate(e.target.value);
  };
  const handleMeetingPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingPassword(e.target.value);
  };

  const modal = useModalStore((state) => state.modal);
  const toggleModal = useModalStore((state) => state.toggleModal);
  const router = useRouter();

  console.log('modal', modal);

  const onCreateMeeting = () => {
    toggleModal();
    router.push('/meeting');
  };

  return (
    <form onSubmit={onCreateMeeting}>
      <div className="flex flex-col space-y-4 ">
        <p>
          모임 이름
          <input type="text" placeholder="모임 이름을 입력해주세요" onChange={handleMeetingName} value={meetingName} />
        </p>
        <p>
          <label>시작 날짜</label>
          <input type="date" onChange={handleMeetingStartDate} value={meetingStartDate} />~<label>종료 날짜</label>
          <input type="date" onChange={handleMeetingEndDate} value={meetingEndDate} />
        </p>
        <p>
          비밀번호
          <input type="password" placeholder="****" onChange={handleMeetingPassword} value={meetingPassword} />
        </p>
      </div>
      <button type="submit" className="bg-button-color text-loginpage-color p-1 rounded-xl">
        생성하기
      </button>
    </form>
  );
};

export default MeetingForm;
