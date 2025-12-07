import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api, { loginAnswerI, recipientI } from "../api";

interface UserData {
  id: number;
  name: string;
  quote: string;
  userImg: string;
  recipient?: recipientI | null;
}

interface AuthState {
  token: string | null;
  user: UserData | null;
  _hasHydrated: boolean; 
  setAuth: (data: loginAnswerI) => void;
  clearAuth: () => void;
  setHasHydrated: (state: boolean) => void;
  setRefreshAuth: (data: UserData) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      _hasHydrated: false,

      setAuth: (data: loginAnswerI) => {
        const { token, ...userData } = data;
        set({
          token: token,
          user: userData as UserData,
        });
        api.setToken(token);
      },

      setRefreshAuth: (data: UserData) => {
        set({
          user: data,
        });
      },

      clearAuth: () => {
        set({ token: null, user: null });
        api.removeToken();
      },

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }), // Зберігаємо user, щоб не рефрешити зайвий раз
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        if (state?.token) {
          api.setToken(state.token);
        }
      },
    }
  )
);
