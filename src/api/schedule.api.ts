import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';

type ScheduleType = Tables<'schedule'>;

class ScheduleAPI {
  private supabase;

  constructor() {
    this.supabase = createClient();
  }

  /**
   *
   * @returns schedule 테이블 데이터 전부
   */
  async selectSchedule() {
    const { data } = await this.supabase.from('schedule').select().returns<Tables<'schedule'>>();
    console.log('data', data);
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
  async insertSchedule(insertData: ScheduleType) {
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
  async updateSchedule(id: number, updateData: ScheduleType) {
    const { meetingId, content, place, address, time } = updateData;
    console.log('id, updateData', id, updateData);
    const { data, error } = await this.supabase
      .from('schedule')
      .update({ meetingId, content, place, address, time })
      .eq('id', id)
      .select('*');

    return data;
  }
}

export default ScheduleAPI;
