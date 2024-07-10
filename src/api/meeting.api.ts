import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';
type meeting = {
  title: string;
  date: string;
  password: string;
};

class MeetingAPI {
  private axios: AxiosInstance;
  private supabase = createClient();
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async selectMeeting() {
    const { data } = await this.supabase.from('meeting').select().returns<Tables<'meeting'>>();

    return data;
  }

  async insertMeeting(intertData: meeting) {
    const { date, password, title } = intertData;
    console.log('first', date, password, title);
    const { data } = await this.supabase.from('meeting').insert();
  }
}

export default MeetingAPI;
