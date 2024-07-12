'use client';

import React, { useState } from 'react';
import Input from '../atoms/js-Input/Input';
import useModalStore from '@/stores/modal.store';
import { useCreateSchedule, useUpdateSchedule } from '@/lib/hooks/useScheduleAPI';
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

  // const { data: schedule, isLoading } = useMeeting(meetingId);
  const { mutate: createSchedule } = useCreateSchedule();
  const { mutate: updateSchedule } = useUpdateSchedule();
  const toggleScheduleModal = useModalStore((state) => state.toggleScheduleModal);

  // useEffect(() => {
  //   if (meetingId && meeting) {
  //     setPlace(meeting.title);
  //     setMeetingStartDate(meeting.date.split('~')[0]);
  //     setMeetingEndDate(meeting.date.split('~')[1]);
  //     setMeetingPassword(meeting.password);
  //   }
  // }, [meeting, meetingId]);

  const onCreateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSchedule = {
      content: content,
      place: place,
      address: address,
      time: `${time}`,
      meetingId: Number(id)
    };

    createSchedule(newSchedule, {
      onSuccess: (data) => {
        if (!data) {
          return;
        }
        toggleScheduleModal();
      }
    });
  };

  return (
    <div>
      <form className="flex flex-col space-y-4 " onSubmit={onCreateSchedule}>
        <Input placeholder="장소 검색" value={placeSearch} label="검색" required onChange={handlePlaceSearch} />
        <p>
          <h4>장소</h4>
          <div className="border w-full h-10 ">{place}</div>
        </p>
        <p>
          <h4>주소</h4>
          <div className="border w-full h-10 ">{address}</div>
        </p>
        <Input type="time" value={time} label="시간" required onChange={handleTime} />
        <input
          type="text"
          placeholder="✍🏻 작성"
          value={content}
          onChange={handleContent}
          className=" p-3 h-[100px] bg-postpage-listcolor rounded-tr-lg rounded-bl-lg"
        />
        <button className="bg-button-color text-loginpage-color p-1 rounded-xl">추가하기</button>
      </form>
    </div>
  );
};

export default ScheduleForm;

//    <PlaceSearch label="검색" type="text" placeholder="장소 검색" />
//     <InputField label="장소" type="text" placeholder="장소" />
//     <InputField label="주소" type="text" placeholder="주소" />
//     <InputField label="시간" type="time" />
