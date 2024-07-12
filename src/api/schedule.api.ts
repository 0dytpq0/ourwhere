import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';

type ScheduleType = Tables<'schedule'>;

export type UpdateScheduleType = {
  content: string;
  place: string;
  address: string;
  time: string;
  meetingId: number;
};

class ScheduleAPI {
  private supabase;

  constructor() {
    this.supabase = createClient();
  }

  /**
   *
   * @returns schedule 테이블 데이터 전부
   */
  async selectSchedules() {
    const { data } = await this.supabase.from('schedule').select().returns<Tables<'schedule'>[]>();
    console.log('data', data);
    return data;
  }

  async selectUserSchedule(meetingId: number) {
    const { data, error } = await this.supabase
      .from('schedule')
      .select()
      .eq('meetingId', meetingId)
      .returns<Tables<'schedule'>[]>();
    if (error) {
      console.error('Error fetching schedule:', error);
      return null;
    }
    // console.log('data', data);
    return data;
  }
  /**
   *
   * @param insertData  {
   * content : string,
   * place : string,
   * address : string,
   * time : string,
   * meetingId : number}
   * @returns data 추가된 data
   */
  async insertSchedule(insertData: UpdateScheduleType) {
    const { content, place, address, time, meetingId } = insertData;
    const { data } = await this.supabase.from('schedule').insert({ content, place, address, time, meetingId });

    return data;
  }

  /**
   *
   * @param id {number} 스케쥴 게시물 아이디
   * @returns 삭제된 data
   */
  async deleteSchedule(id: number) {
    console.log('id', id);
    const { data } = await this.supabase.from('schedule').delete().eq('id', id).select();
    console.log('data', data);
    return data;
  }

  /**
   *
   * @param id  {number} 스케쥴 게시물 아이디
   * @param updateData {
    meetingId: number,
    content: string,
    place: string,
    address: string,
    time: string
  };
   * @returns
   */
  async updateSchedule(id: number, updateData: UpdateScheduleType) {
    const { meetingId, content, place, address, time } = updateData;
    console.log('id, updateData', id, updateData);
    const { data, error } = await this.supabase
      .from('schedule')
      .update({ meetingId, content, place, address, time })
      .eq('id', id)
      .select('*');

    return data;
  }

  async selectScheduleOfMeeting(id: number) {
    const { data } = await this.supabase
      .from('schedule')
      .select('*')
      .eq('meetingId', id)
      .returns<Tables<'schedule'>[]>();
    return data;
  }
}

export default ScheduleAPI;
