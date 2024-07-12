import ScheduleAPI from '@/api/schedule.api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ScheduleType = Tables<'schedule'>;

const scheduleApi = new ScheduleAPI();

// Schedule 불러오기
export const useSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: () => scheduleApi.selectSchedules()
  });
};

// Schedule 생성하기
export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSchedule: ScheduleType) => await scheduleApi.insertSchedule(newSchedule),
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
    mutationFn: ({ id, updateData }: { id: number; updateData: ScheduleType }) =>
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
