import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';
import { nanoid } from 'nanoid';

type UserType = Tables<'users'>;

class AuthAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async logIn(email: string, password: string) {
    const path = '/api/auth/log-in';

    const response = await this.axios.post<UserType>(path, { email, password });

    return response.data;
  }

  async logOut() {
    const path = '/api/auth/log-out';

    const response = await this.axios.post<UserType>(path);
    return response.data;
  }

  async signUp(email: string, password: string, nickname: string) {
    const path = 'api/auth/sign-up';

    const response = await this.axios.post<UserType>(path, { email, password, nickname });

    return response.data;
  }

  async getUser(id: string) {
    const path = 'api/auth/user';

    const response = await this.axios.post<UserType[]>(path, { id });

    return response.data;
  }

  async updateUser(id: string, updates: { images?: string; nickname?: string }) {
    const path = 'api/auth/user-update';

    if (!id) {
      return;
    }
    const response = await this.axios.patch<UserType[]>(path, { id, ...updates });

    return response.data[0];
  }

  async uploadImage(editimage: File) {
    const supabase = createClient();

    const uniquepath = `userimage/${nanoid()}`;
    const { data: imgData, error } = await supabase.storage.from('images').upload(uniquepath, editimage);

    const { data: imgUrl } = supabase.storage.from('images').getPublicUrl(uniquepath);

    if (error) {
      console.error('파일 업로드 에러:', error);
      return null;
    }
    return imgUrl.publicUrl as string;
  }
}

export default AuthAPI;
