'use client';
import { CiEdit } from 'react-icons/ci';
export default function MyPageTemplate() {
  return (
    <div className="flex flex-row items-center mt-24 m-20">
      <div className="flex flex-col mb-4 m-8 border-solid border-loginpage-color-2 h-96 w-80 items-center bg-loginpage-color text-font-color relative">
        <div className="w-44 h-44 mt-4 flex flex-row items-center justify-center border-solid border-2 rounded-full shadow-md">
          <div> 사진 </div>
        </div>

        <div className="mt-4"> 닉네임 </div>

        <CiEdit className="text-4xl absolute bottom-2 right-2 bg-white rounded-full p-1 cursor-pointer" />
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
