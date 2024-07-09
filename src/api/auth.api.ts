import { AxiosInstance } from 'axios';

class AuthAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async logIn(email: string, password: string) {
    const path = '/api/auth/log-in';

    const response = await this.axios.post(path, { email, password });

    return response.data;
  }
  async logOut() {
    const path = '/api/auth/log-out';

    const response = await this.axios.post(path);
    console.log(response);
    return response.data;
  }
}

export default AuthAPI;
