'use client';

import { useCreateSchedule, useSchedule, useSchedulesToMeetingId, useUpdateSchedule } from '@/lib/hooks/useScheduleAPI';
import useModalStore from '@/stores/modal.store';
import React, { useState } from 'react';
import Input from '../atoms/js-Input/Input';
import useScheduleStore from '@/stores/schedule.store';
import { useParams } from 'next/navigation';

interface onCloseProps {
  onClose?: () => void;
}
const ScheduleForm = ({ onClose }: onCloseProps) => {
  const { id } = useParams();
  const [placeSearch, setPlaceSearch] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');
  const toggleScheduleModal = useModalStore((state) => state.toggleScheduleModal);
  const clickScheduleId = useScheduleStore((state) => state.clickScheduleId);

  const handlePlaceSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceSearch(e.target.value);
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const { data: schedule, isLoading } = useSchedule(clickScheduleId);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  // const { mutate: createSchedule } = useCreateSchedule();
  // const { mutate: updateSchedule } = useUpdateSchedule();
  // const { isScheduleModalOpen } = useModalStore();

  // // const toggleScheduleModal = useModalStore((state) => state.toggleScheduleModal);

  // const onCreateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const newSchedule = {
  //     content: content,
  //     place: place,
  //     address: address,
  //     time: `${time}`,
  //     meetingId: Number(id)
  //   };

  //   createSchedule(newSchedule, {
  //     onSuccess: () => {
  //       // console.log(data);
  //       // if (!data) {
  //       //   return;
  //       // }
  //       onClose;
  //       toggleScheduleModal();
  //     }
  //   });
  // };

  return (
    <div>
      <form className="flex flex-col space-y-4 ">
        <Input placeholder="장소 검색" value={placeSearch} label="검색" required onChange={handlePlaceSearch} />
        <div>
          <h4>장소</h4>
          <div className="border w-full h-10 ">{schedule?.place}</div>
        </div>
        <div>
          <h4>주소</h4>
          <div className="border w-full h-10 ">{schedule?.address}</div>
        </div>
        <Input type="time" value={schedule?.time} label="시간" required onChange={handleTime} />
        <input
          type="text"
          placeholder="✍🏻 작성"
          value={schedule?.content}
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

//    <PlaceSearch label="검색" type="text" placeholder="장소 검색" />
//     <InputField label="장소" type="text" placeholder="장소" />
//     <InputField label="주소" type="text" placeholder="주소" />
//     <InputField label="시간" type="time" />
