import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
  user: User;
  accessToken: string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    // type: ignore
    // @ts-ignore
    (set, get) => ({
      user: {
        email: "",
      },
      accessToken: null,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      version: 2,
      partialize: (state) => ({ accessToken: state.accessToken, user: state.user }),
    },
  ),
);
