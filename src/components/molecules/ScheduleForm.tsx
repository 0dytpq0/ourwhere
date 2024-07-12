'use client';

import React, { useEffect, useState } from 'react';
import Input from '../atoms/js-Input/Input';
import useModalStore from '@/stores/modal.store';
import { useCreateSchedule, useSchedule, useSchedulesToMeetingId, useUpdateSchedule } from '@/lib/hooks/useScheduleAPI';
import { useParams } from 'next/navigation';

const ScheduleForm = () => {
  const [placeSearch, setPlaceSearch] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  const handlePlaceSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceSearch(e.target.value);
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const { id } = useParams();
  const meetingId = Number(id);

  const scheduleId = 118;

  const { data: schedule, isLoading } = useSchedule(scheduleId);
  const { mutate: createSchedule } = useCreateSchedule();
  const { mutate: updateSchedule } = useUpdateSchedule();
  const { isScheduleModalOpen, toggleScheduleModal } = useModalStore();

  console.log(schedule);

  useEffect(() => {
    if (schedule) {
      setPlace(schedule.place);
      setAddress(schedule.address);
      setTime(schedule.time);
      setContent(schedule.content);
    }
  }, [schedule]);

  const onCreateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSchedule = {
      content: content,
      place: place,
      address: address,
      time: `${time}`,
      meetingId: meetingId
    };

    if (scheduleId) {
      if (confirm('이대로 수정하시겠습니까?')) {
        updateSchedule(
          { id: meetingId, updateData: newSchedule },
          {
            onSuccess: () => {
              toggleScheduleModal();
            }
          }
        );
      }
    } else {
      createSchedule(newSchedule, {
        onSuccess: (data) => {
          console.log(data);
          if (!data) {
            return;
          }
          toggleScheduleModal();
        }
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form className="flex flex-col space-y-4 " onSubmit={onCreateSchedule}>
        <Input placeholder="장소 검색" value={placeSearch} label="검색" required onChange={handlePlaceSearch} />
        <div>
          <h4>장소</h4>
          <div className="border w-full h-10 ">{place}</div>
        </div>
        <div>
          <h4>주소</h4>
          <div className="border w-full h-10 ">{address}</div>
        </div>
        <Input type="time" value={time} label="시간" required onChange={handleTime} />
        <input
          type="text"
          placeholder="✍🏻 작성"
          value={content}
          onChange={handleContent}
          className=" p-3 h-[100px] bg-postpage-listcolor rounded-tr-lg rounded-bl-lg"
        />
        <button type="submit" className="bg-button-color text-loginpage-color p-1 rounded-xl">
          추가하기
        </button>
      </form>
    </div>
  );
};

export default ScheduleForm;
