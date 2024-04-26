// @ts-nocheck
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useApplicationStore } from "./ApplicationStore";
import { useImageStore } from "./ImageStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_AUTH_URL = `${API_BASE_URL}/imagine/session`;
const API_KEY_HEADER = import.meta.env.VITE_API_KEY_HEADER as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export interface AuthState {
  tries: number;
  addTry: () => void;
  email: string;
  setEmail: (email: string) => void;
  sessionToken: string;
  getSessionToken: (abortSignal?: AbortSignal) => Promise<void>;
  restartSession: () => Promise<void>;
  fetchMyImages: (abortSignal?: AbortSignal) => Promise<any>;
  myImages: any[];
  getImages: () => Promise<any[]>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      tries: 0,
      addTry: () => set((state) => ({ tries: state.tries + 1 })),
      email: "",
      setEmail: (email) => set({ email }),
      sessionToken: "",
      getSessionToken: async (abortSignal?: AbortSignal) => {
        // Loading
        useApplicationStore.getState().loading(true);

        // Make a request to the server to get the session token
        const response = await fetch(API_AUTH_URL, {
          method: "POST",
          headers: {
            [API_KEY_HEADER]: API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: get().email }),
          signal: abortSignal,
        });

        if (!response.ok) {
          useApplicationStore.getState().loading(false);
          return Promise.reject("Error getting the session token");
        }

        const data = await response.json();

        // Save the session token
        set({ sessionToken: data.session });

        useApplicationStore.getState().loading(false);
        return Promise.resolve();
      },
      restartSession: async () => {
        set({ sessionToken: "", email: "", tries: 0 });
      },
      fetchMyImages: async (abortSignal?: AbortSignal) => {
        return useImageStore
          .getState()
          .getImagesBySessionToken(get().sessionToken, abortSignal)
          .catch((error) => error)
          .then((images: any[]) => {
            console.log(images);
            set({ tries: images.length, myImages: images });
            return images;
          });
      },
      myImages: [],
      getImages: () => Promise.resolve(get().myImages),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state: AuthState) => ({
        sessionToken: state.sessionToken,
        email: state.email,
        tries: state.tries,
        images: state.myImages,
      }),
    },
  ),
);
