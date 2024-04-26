// ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailTry {
  email: string;
  count: number;
}

interface AppicationState {
  isLoading: boolean;
  loading: (loading: boolean) => void;
  tries: EmailTry[];
  getTry: (email: string) => EmailTry | undefined;
  setTry: (email: string, count: number) => void;
}

export const useApplicationStore = create<AppicationState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      loading: (loading: boolean) => set({ isLoading: loading }),
      tries: [],
      getTry: (email: string) => {
        return get().tries.find((t) => t.email === email);
      },
      setTry: (email: string, count: number) => {
        set((state) => {
          const index = state.tries.findIndex((t) => t.email === email);
          if (index === -1) {
            state.tries.push({ email, count });
          } else {
            state.tries[index].count = count;
          }
          return { tries: state.tries };
        });
      },
    }),
    {
      name: "application-storage",
      getStorage: () => localStorage,
      version: 1,
      partialize: (state: AppicationState) => ({ tries: state.tries }),
    },
  ),
);
