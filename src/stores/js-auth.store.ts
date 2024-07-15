import { Tables } from '@/types/supabase';
import { Session } from '@supabase/supabase-js';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

type UserType = Tables<'users'>;

export type AuthState = {
  user: UserType | null | undefined;
  userSession: Session | null;
};

export type AuthActions = {
  setUser: (user: UserType | null | undefined) => void;
  setUserSession: (userSession: Session | null) => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return {
    user: null,
    userSession: null
  };
};

export const defaultInitState: AuthState = {
  user: null,
  userSession: null
};
export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (user: UserType | null | undefined) => set((state) => ({ user })),
        setUserSession: (userSession: Session | null) => set((state) => ({ userSession }))
      }),
      {
        name: 'auth-storage',
        getStorage: () => localStorage
      }
    )
  );
};
