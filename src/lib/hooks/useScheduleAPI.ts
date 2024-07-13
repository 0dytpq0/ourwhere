import ScheduleAPI from '@/api/schedule.api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ScheduleType = Tables<'schedule'>;

export type UpdateScheduleType = {
  content: string;
  place: string;
  address: string;
  time: string;
  meetingId: number;
};

const scheduleApi = new ScheduleAPI();

// Schedule 여러개 불러오기
export const useSchedules = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: () => scheduleApi.selectSchedules()
  });
};

// Schedule 같은 meetingId만 불러오기
export const useSchedulesToMeetingId = (meetingId: number) => {
  return useQuery({
    queryKey: ['schedule', meetingId],
    queryFn: () => scheduleApi.selectUserSchedule(meetingId)
  });
};

// Schedule 한개 불러오기
export const useSchedule = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['schedule', id],
    queryFn: () => scheduleApi.selectScheduleOfMeeting(id)
  });
  return { data, isLoading };
};

// Schedule 생성하기
export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSchedule: UpdateScheduleType) => await scheduleApi.insertSchedule(newSchedule),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule']
      });
    }
  });
};

// Schedule 삭제하기
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => scheduleApi.deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule']
      });
    }
  });
};

// Schedule 수정하기
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updateData }: { id: number; updateData: UpdateScheduleType }) =>
      scheduleApi.updateSchedule(id, updateData),
    onSuccess: (data, variables) => {
      // 'variables'를 통해 mutationFn에 전달된 'id'에 접근
      queryClient.invalidateQueries({
        queryKey: ['schedule']
      });
      queryClient.invalidateQueries({
        queryKey: ['schedule', variables.id]
      });
    }
  });
};
