import { Tables } from '@/types/supabase';
import { createStore } from 'zustand';

type UserType = Tables<'users'>;

export type AuthState = {
  user: UserType | null;
};

export type AuthActions = {
  setUser: (user: UserType) => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return {
    user: null
  };
};

export const defaultInitState: AuthState = {
  user: null
};

// state는 initState에서 추가, action은 initScheduleStore 밑 아래에 같이 추가해야될듯?
// next.js 문서 따라 쳤는데 흠... 한번 하면서 알아봐야할듯함.
export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setUser: (user: UserType) => set((state) => ({ user }))
  }));
};
