'use Client';

import React, { useEffect, useState } from 'react';
import useModalStore from '@/stores/modal.store';
import { useParams, useRouter } from 'next/navigation';
import { useCreateMeeting, useMeeting, useUpdateMeeting } from '@/lib/hooks/useMeetingAPI';
import { Tables } from '@/types/supabase';

type MeetingType = Tables<'meeting'>;

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

  const { data: meeting, isLoading } = useMeeting(meetingId);
  const { mutate: createMeeting } = useCreateMeeting();
  const { mutate: updateMeeting } = useUpdateMeeting();
  const toggleMeetingModal = useModalStore((state) => state.toggleMeetingModal);
  const router = useRouter();

  useEffect(() => {
    if (meetingId && meeting) {
      setMeetingName(meeting.title);
      setMeetingStartDate(meeting.date.split('~')[0]);
      setMeetingEndDate(meeting.date.split('~')[1]);
      setMeetingPassword(meeting.password);
    }
  }, [meeting, meetingId]);

  const onCreateMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMeeting = {
      title: meetingName,
      date: `${meetingStartDate}~${meetingEndDate}`,
      password: meetingPassword
    };

    if (meetingId) {
      if (confirm('이대로 수정하시겠습니까?')) {
        updateMeeting(
          { id: meetingId, updateData: newMeeting },
          {
            onSuccess: () => {
              router.push(`${meetingId}`);
              toggleMeetingModal();
            }
          }
        );
      }
    } else {
      createMeeting(newMeeting, {
        onSuccess: (data) => {
          if (!data) {
            return;
          }

          router.push(`/meeting/${data[0].id}`);
          toggleMeetingModal();
          // alert('새로운 모임을 만드셨네요 축하드립니다~');
        }
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={onCreateMeeting} className="flex flex-col gap-[2rem] justify-center">
      <div className="flex flex-col gap-[2rem]">
        <div className="flex flex-col">
          <label htmlFor="meetingName" className="text-sm">
            모임 이름
          </label>
          <input
            type="text"
            id="meetingName"
            onChange={handleMeetingName}
            value={meetingName}
            className="border-2 rounded-md h-12 text-xl px-4"
          />
        </div>
        <div className="flex flex-row items-center justify-center ">
          <div className="flex flex-col">
            <label htmlFor="meetingStartDate" className="text-sm flex flex-col w-fit">
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
          <div className="flex flex-col">
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
          <label htmlFor="meetingPassword" className="text-sm">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="****"
            onChange={handleMeetingPassword}
            value={meetingPassword}
            className="border-2 rounded-md h-8 text-xs px-2"
          />
        </div>
      </div>
      <button type="submit" className="bg-button-color text-loginpage-color p-1 rounded-xl">
        {meetingId ? '수정하기' : '생성하기'}
      </button>
    </form>
  );
};

export default MeetingForm;
