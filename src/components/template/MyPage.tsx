'use client';
import { ChangeEvent, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
export default function MyPageTemplate() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-row items-center mt-24 m-20">
      <div className="flex flex-col mb-4 m-8 border-solid border-loginpage-color-2 h-96 w-64 items-center bg-loginpage-color text-font-color relative">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-8 mt-8 flex items-center justify-center relative">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">사진</div>
          )}
        </div>
        <div className="text-lg bg-gray-300 w-28 h-8 text-center z-10">
          {isEditing ? (
            <input type="text" value={nickname} onChange={handleNicknameChange} className="w-full h-full text-center" />
          ) : (
            nickname
          )}
        </div>
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md flex flex-col items-center">
              <input type="file" onChange={handleImageChange} className="mb-4" />
              <div className="flex space-x-2">
                <button onClick={handleSave} className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                  Save
                </button>
                <button onClick={handleCancel} className="bg-gray-500 text-white px-2 py-1 rounded-md text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <CiEdit
          className="text-4xl absolute bottom-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={handleEditClick}
        />
      </div>
      <div className="w-screen">
        <h2 className="text-center font-bold">내 모임 목록</h2>
        <div className="border-solid w-full bg-gray-100 mb-2 p-4 rounded-md text-font-color">
          <div className="flex justify-between items-center mb-2">
            <span>첫 번째 모임</span>
            <span className="bg-white px-14 py-1 rounded-md">2024-07-10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
