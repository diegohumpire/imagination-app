// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailTry {
  email: string;
  count: number;
}

interface AppicationState {
  isLoading: boolean;
  loading: (loading: boolean) => void;
}

export const useApplicationStore = create<AppicationState>()((set, get) => ({
  isLoading: false,
  loading: (loading: boolean) => set({ isLoading: loading }),
}));
