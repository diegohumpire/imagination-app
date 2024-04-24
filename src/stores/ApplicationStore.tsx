import { create } from "zustand";

interface AppicationState {
  isLoading: boolean;
  loading: (loading: boolean) => void;
}

export const useApplicationStore = create<AppicationState>((set) => ({
  isLoading: false,
  loading: (loading: boolean) => set({ isLoading: loading }),
}));
