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

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onEditSchedule = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <div className="flex flex-col justify-center ">
        <div className="border p-3 rounded-lg">
          <PlaceSearch />
        </div>

        <div className="mt-2">
          <h4 className="text-sm flex flex-col text-gray-500 h-4  font-semibold ">장소</h4>
          <div className="w-full h-8 flex items-center border-2 rounded-md  text-xs px-2">{place?.place_name}</div>
        </div>
        <div>
          <h4 className="text-sm flex flex-col text-gray-500 font-semibold">주소</h4>
          <div className="w-full h-8 flex items-center border-2 rounded-md  text-xs px-2">{place?.address_name}</div>
        </div>
        <div>
          <label className="text-sm flex flex-col font-semibold text-gray-500">시간</label>
          <input
            type="time"
            value={time}
            onChange={handleTime}
            className="w-full h-8 border-2 rounded-md  text-xs px-2"
          />
        </div>
        <textarea
          placeholder="✍🏻 작성"
          value={content}
          onChange={handleContent}
          className=" p-3 h-24 placeholder-black text-sm  bg-postpage-listcolor rounded-tr-2xl rounded-bl-lg my-2"
        />
        <button onClick={onEditSchedule} className="bg-button-color text-loginpage-color p-3 mt-3 rounded-xl">
          수정하기
        </button>
      </div>
    </div>
  );
};

export default EditScheduleForm;
