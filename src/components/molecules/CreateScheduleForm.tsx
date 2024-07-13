'use client';

import React, { useState } from 'react';
import { PlaceSearch } from './PlaceSearch';
import { useParams } from 'next/navigation';
import useModalStore from '@/stores/modal.store';
import useKakaoStore from '@/stores/kakao.store';
import { useCreateSchedule } from '@/lib/hooks/useScheduleAPI';

const CreateScheduleForm = () => {
  const { id } = useParams();
  const meetingId = Number(id);

  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  const toggleCreateScheduleModal = useModalStore((state) => state.toggleCreateScheduleModal);
  const { place, setPlace } = useKakaoStore((state) => state);

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const { mutate: createSchedule } = useCreateSchedule();

  const onCreateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSchedule = {
      content: content,
      place: place?.place_name || '',
      address: place?.address_name || '',
      time: `${time}`,
      meetingId: meetingId
    };

    createSchedule(newSchedule);
    toggleCreateScheduleModal();
    setTime('');
    setContent('');
    setPlace(null);
  };

  return (
    <div>
      <PlaceSearch />
      <form onSubmit={onCreateSchedule} className="flex flex-col space-y-4 ">
        {/* <Input placeholder="장소 검색" value={placeSearch} label="검색" required onChange={handlePlaceSearch} /> */}
        <div>
          <h4>장소</h4>
          <div className="border w-full h-10 ">{place?.place_name}</div>
        </div>
        <div>
          <h4>주소</h4>
          <div className="border w-full h-10 ">{place?.address_name}</div>
        </div>
        <input type="time" value={time} required onChange={handleTime} />
        <input
          type="text"
          placeholder="✍🏻 작성"
          value={content}
          onChange={handleContent}
          className=" p-3 h-[100px] bg-postpage-listcolor rounded-tr-lg rounded-bl-lg"
        />
        <button type="submit" className="bg-button-color text-loginpage-color p-1 rounded-xl">
          생성하기
        </button>
      </form>
    </div>
  );
};

export default CreateScheduleForm;
