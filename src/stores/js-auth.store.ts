import { User } from '@supabase/supabase-js';
import { createStore } from 'zustand';

export type AuthState = {
  user: User | null;
};

export type AuthActions = {
  setUser: (user: any) => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return {
    user: {
      id: '',
      aud: '',
      role: '',
      email: '',
      email_confirmed_at: '',
      phone: '',
      phone_confirmed_at: '',
      confirmed_at: '',
      last_sign_in_at: '',
      app_metadata: {
        provider: '',
        providers: []
      },
      user_metadata: {},
      identities: [],
      created_at: '',
      updated_at: '',
      is_anonymous: false
    }
  };
};

export const defaultInitState: AuthState = {
  user: {
    id: '',
    aud: '',
    role: '',
    email: '',
    email_confirmed_at: '',
    phone: '',
    phone_confirmed_at: '',
    confirmed_at: '',
    last_sign_in_at: '',
    app_metadata: {
      provider: '',
      providers: []
    },
    user_metadata: {},
    identities: [],
    created_at: '',
    updated_at: '',
    is_anonymous: false
  }
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setUser: (user: any) => set((state) => ({ user }))
  }));
};
