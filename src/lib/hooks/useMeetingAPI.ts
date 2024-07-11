import { useMutation, useQueryClient } from '@tanstack/react-query';
import MeetingAPI from '@/api/meeting.api';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/types/supabase';

type MeetingType = Tables<'meeting'>;

const meetingApi = new MeetingAPI();

// Meeting 여러개 불러오기
export const useMeetings = () => {
  return useQuery({
    queryKey: ['meetings'],
    queryFn: () => meetingApi.selectMeetings()
  });
};

// Meeting 한개 불러오기
export const useMeeting = (id: number) => {
  return useQuery({
    queryKey: ['meeting', id],
    queryFn: () => meetingApi.selectMeeting(id)
  });
};

// Meeting 생성하기
export const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newMeeting: MeetingType) => await meetingApi.insertMeeting(newMeeting),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meetings']
      });
    }
  });
};

// Meeting 삭제하기
export function useDeleteMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => meetingApi.deleteMeeting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meetings']
      });
    }
  });
}

// Meeting 수정하기
export function useUpdateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updateData }: { id: number; updateData: MeetingType }) =>
      meetingApi.updateMeeting(id, updateData),
    onSuccess: (data, variables) => {
      // 'variables'를 통해 mutationFn에 전달된 'id'에 접근
      queryClient.invalidateQueries({
        queryKey: ['meetings']
      });
      queryClient.invalidateQueries({
        queryKey: ['meeting', variables.id]
      });
    }
  });
}
