'use client';
import api from '@/api/api';
import { MeetingType } from '@/api/meeting.api';
import { useAuthStore } from '@/providers/js-auth.store.provider';
import Image from 'next/image';
import useMeetingStore from '@/stores/meeting.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';

export default function MyPageTemplate() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user, setUser } = useAuthStore((state) => state);
  const [userMeetings, setUserMeetings] = useState<MeetingType[]>([]);
  const { meetingId, setMeetingId } = useMeetingStore((state) => state);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [editnickname, setEditNickname] = useState<string>(user?.nickname || '');
  const [editimage, setEditImage] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserMeetings = async () => {
        const meetings = await api.meeting.selectUserMeetings(user.id);
        if (!meetings) {
          return null;
        }
        setUserMeetings(meetings);
      };

      fetchUserMeetings();
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleMeetingClick = (id: number | undefined) => {
    console.log('id', id);
    setMeetingId(id!);
    router.push(`/meeting/${id}`);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSaveClick = async () => {
    try {
      const updates = { nickname: editnickname || user?.nickname };
      if (!user?.id) return;
      const updatedUser = await api.auth.updateUser(user?.id, updates);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('닉네임 업데이트 에러:', error);
    }
  };

  return (
    <div className="flex flex-row items-center mt-24 m-20">
      <div className="flex flex-col mb-4 m-8 border-solid border-loginpage-color-2 h-72 w-80 items-center bg-loginpage-color text-font-color relative">
        <div className="w-44 h-44 mt-4 flex flex-row items-center justify-center border-solid border-2 rounded-full shadow-md">
          <Image
            src={user?.images || '사진없음'}
            alt="Profile"
            width={176}
            height={176}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="mt-4"> {isMounted ? user?.nickname : '닉네임을 입력하세요'} </div>

        <CiEdit
          className="text-4xl absolute bottom-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={handleEditClick}
        />
        {isEditing && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="mb-4 text-center">프로필 편집</h2>

              <input
                type="file"
                src="profile-image"
                className="bg-gray-200 px-2 py-1 rounded-md focus:outline-none mb-4"
              />

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="변경할 닉네임을 입력해주세요"
                  value={editnickname}
                  onChange={(e) => setEditNickname(e.target.value)}
                  className="bg-gray-200 px-2 py-1 rounded-md focus:outline-none"
                />
              </div>

              <button
                className="bg-button-color text-white px-4 py-2 rounded-md hover:bg-button-color"
                onClick={handleSaveClick}
              >
                저장
              </button>
              <button onClick={() => setIsEditing(false)} className="ml-2 text-gray-500 hover:text-gray-700">
                취소
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-screen">
        <h2 className="text-center font-bold mb-4">내 모임 목록</h2>
        {userMeetings ? (
          userMeetings?.map((meeting) => (
            <div
              key={meeting.id}
              className="border-solid w-full bg-loginpage-color mb-2 p-4 rounded-md text-font-color"
              style={{ cursor: 'pointer' }}
              onClick={() => handleMeetingClick(meeting.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <span>{meeting.title}</span>
                <span className="bg-white px-14 py-1 rounded-md">{meeting.date}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">내 모임이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
