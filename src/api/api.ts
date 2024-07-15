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
    this.axios = axios.create({ baseURL: 'https://ourwhere.vercel.app' });

    this.auth = new AuthAPI(this.axios);
    this.meeting = new MeetingAPI();
    this.schedule = new ScheduleAPI();
  }
}

const api = new API();

export default api;
