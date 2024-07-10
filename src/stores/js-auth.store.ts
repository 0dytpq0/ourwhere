import { createStore } from 'zustand';

export type AuthState = {
  auth: string;
};

export type AuthActions = {};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthStore => {
  return {
    auth: '기본값 입니다.'
  };
};

export const defaultInitState: AuthState = {
  auth: '기본 유저 정보'
};

// state는 initState에서 추가, action은 initScheduleStore 밑 아래에 같이 추가해야될듯?
// next.js 문서 따라 쳤는데 흠... 한번 하면서 알아봐야할듯함.
export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState
  }));
};
