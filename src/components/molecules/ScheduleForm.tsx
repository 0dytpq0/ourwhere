import React, { useState } from 'react';
import Input from '../atoms/js-Input/Input';
import useModalStore from '@/stores/modal.store';

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

  const toggleModal = useModalStore((state) => state.toggleModal);

  const onCreateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSchedule = {
      content: content,
      place: place,
      address: address,
      time: time
    };

    toggleModal();
  };

  return (
    <div>
      <form className="flex flex-col space-y-4 " onClick={onCreateSchedule}>
        <Input placeholder="장소 검색" value={placeSearch} label="검색" required />
        <p>
          <h4>장소</h4>
          <div className="border w-full h-10 ">{place}</div>
        </p>
        <p>
          <h4>주소</h4>
          <div className="border w-full h-10 ">{address}</div>
        </p>
        <Input type="time" value={time} label="시간" required />
        <input
          type="text"
          placeholder="✍🏻 작성"
          value={content}
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
