'use client';

import React, { useEffect, useState } from 'react';
import { PlaceSearch } from './PlaceSearch';
import { useParams } from 'next/navigation';
import useModalStore from '@/stores/modal.store';
import useScheduleStore from '@/stores/schedule.store';
import useKakaoStore from '@/stores/kakao.store';
import { useSchedule, useUpdateSchedule } from '@/lib/hooks/useScheduleAPI';

const EditScheduleForm = () => {
  const { id } = useParams();
  const meetingId = Number(id);
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  const toggleEditScheduleModal = useModalStore((state) => state.toggleEditScheduleModal);
  const clickScheduleId = useScheduleStore((state) => state.clickScheduleId);
  const { place, setPlace } = useKakaoStore((state) => state);

  const { data: schedule, isLoading } = useSchedule(clickScheduleId);
  const { mutate: updateSchedule } = useUpdateSchedule();

  useEffect(() => {
    setPlace(null);
    setContent(schedule?.content || '');
    setTime(schedule?.time || '');
  }, []);

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onCreateSchedule = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newSchedule = {
      content: content,
      place: place?.place_name || '',
      address: place?.address_name || '',
      time: `${time}`,
      meetingId: meetingId
    };

    if (confirm('이대로 수정하시겠습니까?')) {
      updateSchedule({ id: clickScheduleId, updateData: newSchedule });
      toggleEditScheduleModal();
    }
  };
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  return (
    <div>
      <div className="flex flex-col space-y-4 ">
        <PlaceSearch />
        <div>
          <h4>장소</h4>
          <div className="border w-full h-10 ">{place?.place_name}</div>
        </div>
        <div>
          <h4>주소</h4>
          <div className="border w-full h-10 ">{place?.address_name}</div>
        </div>
        <input type="time" value={time} onChange={handleTime} />
        <input
          type="text"
          placeholder="✍🏻 작성"
          value={content}
          onChange={handleContent}
          className=" p-3 h-[100px] bg-postpage-listcolor rounded-tr-lg rounded-bl-lg"
        />
        <button onClick={onCreateSchedule} className="bg-button-color text-loginpage-color p-1 rounded-xl">
          수정하기
        </button>
      </div>
    </div>
  );
};

export default EditScheduleForm;
