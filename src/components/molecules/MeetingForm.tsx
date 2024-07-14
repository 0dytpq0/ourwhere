'use Client';

import React, { useEffect, useState } from 'react';
import useModalStore from '@/stores/modal.store';
import { useParams, useRouter } from 'next/navigation';
import { useCreateMeeting, useMeeting, useUpdateMeeting } from '@/lib/hooks/useMeetingAPI';
import Input from '../atoms/js-Input/Input';

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

  const { id } = useParams();
  const meetingId = Number(id);

  const { data: meeting } = useMeeting(meetingId);
  const { mutate: createMeeting } = useCreateMeeting();
  const { mutate: updateMeeting } = useUpdateMeeting();
  const toggleMeetingModal = useModalStore((state) => state.toggleMeetingModal);
  const router = useRouter();

  // 수정 모드 일때만 초기값 설정
  useEffect(() => {
    if (meeting && meetingId) {
      setMeetingName(meeting?.title || '');
      setMeetingStartDate(meeting?.date.split('~')[0] || '');
      setMeetingEndDate(meeting?.date.split('~')[1] || '');
      setMeetingPassword(meeting?.password || '');
    }
  }, [meeting, meetingId]);

  const onCreateMeeting = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (meetingName.trim().length === 0) {
      alert('모임 이름을 작성해주세요.');
      return;
    }
    if (meetingStartDate.trim().length === 0 || meetingEndDate.trim().length === 0) {
      alert('시작날짜와 종료날짜를 지정해주세요');
      return;
    }
    if (meetingPassword.trim().length === 0) {
      alert('비밀번호를 설정해주세요.');
      return;
    }

    const newMeeting = {
      title: meetingName,
      date: `${meetingStartDate}~${meetingEndDate}`,
      password: meetingPassword
    };

    if (meetingId) {
      if (confirm('이대로 수정하시겠습니까?')) {
        updateMeeting({ id: meetingId, updateData: newMeeting });
        router.push(`${meetingId}`);
        toggleMeetingModal();
      }
    } else {
      createMeeting(newMeeting, {
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          toggleMeetingModal();
          router.push(`/meeting/${data[0].id}`);

          // alert('새로운 모임을 만드셨네요 축하드립니다~');
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-center w-full h-[20rem]">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <Input
            identity="meeting"
            label="모임 이름"
            type="text"
            id="meetingName"
            required
            onChange={handleMeetingName}
            value={meetingName}
            // className="border-2 rounded-md h-12 text-xl px-4"
          />
        </div>
        <div className="flex flex-row items-center justify-center mb-4">
          <div className="flex flex-col w-full">
            <label htmlFor="meetingStartDate" className="text-sm flex flex-col ">
              시작 날짜
            </label>
            <input
              type="date"
              id="meetingStartDate"
              onChange={handleMeetingStartDate}
              value={meetingStartDate}
              className=" border-2 rounded-md h-8 text-xs px-2"
            />
          </div>
          <div className="text-center m-3"> ~ </div>
          <div className="flex flex-col w-full">
            <label htmlFor="meetingEndDate" className="text-sm flex flex-col">
              종료 날짜
            </label>
            <input
              type="date"
              id="meetingEndDate"
              onChange={handleMeetingEndDate}
              value={meetingEndDate}
              className="border-2 rounded-md h-8 text-xs px-2"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Input
            identity="meeting"
            label="비밀번호"
            type="password"
            placeholder="****"
            onChange={handleMeetingPassword}
            value={meetingPassword}
          />
        </div>
      </div>
      <button onClick={onCreateMeeting} className="bg-button-color text-loginpage-color p-3 mt-3 rounded-xl">
        {meetingId ? '수정하기' : '생성하기'}
      </button>
    </div>
  );
};

export default MeetingForm;
