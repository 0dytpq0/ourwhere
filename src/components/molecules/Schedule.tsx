'use client';

import { useSchedulesToMeetingId } from '@/lib/hooks/useScheduleAPI';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ScheduleForm from './ScheduleForm';

function Schedule() {
  const { id } = useParams();
  const meetingId = Number(id);
  const router = useRouter();
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: scheduleData, error, isPending } = useSchedulesToMeetingId(meetingId);

  if (error) {
    console.log('error', error);
    return;
  }
  if (isPending) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  if (!scheduleData) return <div>데이터를 받아올 수 없습니다.</div>;

  const handleEditClick = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingSchedule(null);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <ScheduleForm schedule={editingSchedule} onClose={handleFormClose} />
          </div>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {scheduleData.map((items, index) => (
        <div key={items.id} className="mb-4 p-4 bg-white flex rounded-lg shadow-lg relative">
          {/* 시간이랑 인텍스 */}
          <div className="flex items-center mb-2">
            <div className="bg-purple-100 text-purple-700 rounded-full h-8 w-8 flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="ml-4 text-lg font-semibold text-purple-700">{items.time}</div>
          </div>
          {/* 제목,주소,컨텐트 */}
          <div className="ml-12 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">{items.place}</div>
                <div className="mt-1 text-sm text-gray-500">{items.address}</div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEditClick(items)} className="text-purple-500 hover:text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7.5 9.672l-1.086 4.243 4.243-1.086 7.086-7.086a2 2 0 000-2.828zM5 16.414a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
                <button className="text-purple-500 hover:text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5V6h16v-.5A1.5 1.5 0 0016.5 3H15V2a1 1 0 00-1-1H6zM2 7v8.5A1.5 1.5 0 003.5 17h13a1.5 1.5 0 001.5-1.5V7H2zm5 3a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm5 0a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-md text-purple-700 mt-2">
              <div className="text-sm">
                <span role="img" aria-label="pencil">
                  ✍️
                </span>{' '}
                {items.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Schedule;
