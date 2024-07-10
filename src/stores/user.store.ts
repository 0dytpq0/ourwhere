import { createStore } from 'zustand';
import { randomUUID } from 'crypto';

export type AuthState = {
  id: string;
  email: string;
  nickname: string;
};

export type AuthActions = {
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return {
    id: randomUUID(),
    email: '',
    nickname: ''
  };
};

export const defaultInitState: AuthState = {
  id: randomUUID(),
  email: '',
  nickname: ''
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>((set) => ({
    ...initState,
    setEmail: (email: string) => set(() => ({ email })),
    setNickname: (nickname: string) => set(() => ({ nickname }))
  }));
};
