import { Tables } from '@/types/supabase';
import { createStore } from 'zustand';

type UserType = Tables<'users'>;

export type AuthState = {
  user: UserType | null;
};

export type AuthActions = {
  setUser: (user: UserType | null) => void;
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

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setUser: (user: UserType | null) => set((state) => ({ user }))
  }));
};
