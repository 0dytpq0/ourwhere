'use client';
import ScheduleAPI from '@/api/schedule.api';
import { useAuthStore } from '@/providers/js-auth.store.provider';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';

type ScheduleType = Tables<'schedule'>;

function Schedule() {
  const [scheduleData, setScheduleData] = useState<ScheduleType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const scheduleAPI = new ScheduleAPI();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      setError('User not logged in');
      return;
    }

    const fetchData = async () => {
      const data = await scheduleAPI.selectUserSchedule(user.id);
      if (!data) {
        setError('Error fetching schedule data');
      } else {
        setScheduleData(data);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-4">
      {error && <div className="text-red-500">{error}</div>}
      {scheduleData.map((items, index) => (
        <div key={items.id} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-white">
                {index + 1}
              </div>
              <div className="ml-2 text-purple-500">{items.time}</div>
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">{items.place}</div>
            <div className="mt-1 text-sm text-gray-500">{items.address}</div>
          </div>
          <div className="p-3 h-[100px] bg-postpage-listcolor rounded-tr-lg rounded-bl-lg">
            <div className="text-sm">
              <span role="img" aria-label="pencil">
                ✍️
              </span>{' '}
              {items.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Schedule;
