import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';

type meetingType = Tables<'meeting'>;

class MeetingAPI {
  private axios: AxiosInstance;
  private supabase;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.supabase = createClient();
  }

  /**
   *
   * @returns meeting 테이블 데이터 전부
   */
  async selectMeeting() {
    const { data } = await this.supabase.from('meeting').select().returns<Tables<'meeting'>>();

    return data;
  }

  /**
   *
   * @param intertData  {date, password,title}
   * @returns data 추가된 data
   */
  async insertMeeting(intertData: meetingType) {
    const { date, password, title } = intertData;

    const { data } = await this.supabase.from('meeting').insert({ date, password, title });

    return data;
  }

  /**
   *
   * @param id {number} 미팅 게시물 아이디
   * @returns 삭제된 data
   */
  async deleteMeeting(id: number) {
    console.log('id', id);
    const { data } = await this.supabase.from('meeting').delete().eq('id', id).select();
    console.log('data', data);
    return data;
  }

  /**
   *
   * @param id  {number} 미팅 게시물 아이디
   * @param updateData {string[]}
   * @returns
   */
  async updateMeeting(id: number, updateData: meetingType) {
    const { date, password, title } = updateData;
    console.log('id, updateData', id, updateData);
    const { data, error } = await this.supabase
      .from('meeting')
      .update({ date: updateData.date, password: updateData.password, title: updateData.title })
      .eq('id', id)
      .select('*');

    return data;
  }
}

export default MeetingAPI;
