'use client';
import ScheduleAPI from '@/api/schedule.api';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';

function Schedule() {
  const [scheduleData, setScheduleData] = useState<Tables<'schedule'>[]>();
  const [error, setError] = useState<string | null>(null);

  const scheduleAPI = new ScheduleAPI();
  const user = localStorage.getItem('auth-storage');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await scheduleAPI.selectUserSchedule(user?.state.user.id);
      if (error) {
        setError(error.message);
      } else {
        setScheduleData(data as unknown as ScheduleItem[]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 ">
      {scheduleData.map((items, index) => (
        <div key={items.id}>
          <div className="flex items-center justify-between space-y-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-white">
                {/* 시간 순서대로 */}
                {index + 1}
              </div>
              <div className="ml-2 text-purple-500">{items.time}</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">{items.place}</div>
              <div className="mt-1 text-sm text-gray-500">{items.address}</div>
            </div>
          </div>
          <div className="p-3 h-[100px] bg-postpage-listcolor rounded-tr-lg rounded-bl-lg">
            <div className="text-sm">
              <span role="img" aria-label="pencil">
                ✍️
              </span>{' '}
            </div>
            <div className="text-sm">{items.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Schedule;
