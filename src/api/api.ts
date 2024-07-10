import axios, { AxiosInstance } from 'axios';
import AuthAPI from './auth.api';
import MeetingAPI from './meeting.api';
import ScheduleAPI from './schedule.api';

class API {
  private axios: AxiosInstance;

  auth;
  meeting;
  schedule;

  constructor() {
    this.axios = axios.create({ baseURL: 'http://localhost:3000' });

    this.auth = new AuthAPI(this.axios);
    this.meeting = new MeetingAPI(this.axios);
    this.schedule = new ScheduleAPI(this.axios);
  }
}

const api = new API();

export default api;
