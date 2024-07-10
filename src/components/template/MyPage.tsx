'use client';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
export default function MyPageTemplate() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex flex-row items-center mt-24 m-20">
      <div className="flex flex-col mb-4 m-8 border-solid border-loginpage-color-2 h-72 w-80 items-center bg-loginpage-color text-font-color relative">
        <div className="w-44 h-44 mt-4 flex flex-row items-center justify-center border-solid border-2 rounded-full shadow-md">
          <div> 사진 </div>
        </div>

        <div className="mt-4"> 닉네임 </div>

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
                  placeholder="닉네임"
                  className="bg-gray-200 px-2 py-1 rounded-md focus:outline-none"
                />
              </div>

              <button className="bg-button-color text-white px-4 py-2 rounded-md hover:bg-button-color">저장</button>
              <button onClick={() => setIsEditing(false)} className="ml-2 text-gray-500 hover:text-gray-700">
                취소
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-screen">
        <h2 className="text-center font-bold">내 모임 목록</h2>
        <div className="border-solid w-full bg-loginpage-color mb-2 p-4 rounded-md text-font-color">
          <div className="flex justify-between items-center mb-2">
            <span>첫 번째 모임</span>
            <span className="bg-white px-14 py-1 rounded-md">2024-07-10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
