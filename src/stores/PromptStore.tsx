import { create } from "zustand";
import { useApplicationStore } from "./ApplicationStore";
import { useAuthStore } from "./AuthStore";
import { HttpError } from "../errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_PROMPT_URL = `${API_BASE_URL}/imagine/prompts`;
const API_KEY_HEADER = import.meta.env.VITE_API_KEY_HEADER as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

type Prompt = {
  title: string;
  text: string;
};

interface PromptStoreState {
  defaultPrompts: Prompt[];
  fetchDefaultPrompts: (abortSignal?: AbortSignal) => Promise<Prompt[] | HttpError | void>;
  prompt: Prompt;
  setPrompt(text: string, title?: string): void;
  defaultPromptIndex: number;
  selectDefaultPromptIndex(index: number): void;
}

export const usePromptStore = create<PromptStoreState>((set, _) => ({
  /**
   * Default prompts
   */
  defaultPrompts: [],

  /**
   * @param abortSignal
   * @returns
   */
  fetchDefaultPrompts: async (abortSignal?: AbortSignal) => {
    // Set loading state in true from ApplicationStore
    useApplicationStore.getState().loading(true);
    set({ defaultPrompts: [], defaultPromptIndex: -1 });

    const response = await fetch(API_PROMPT_URL, {
      method: "GET",
      headers: {
        [API_KEY_HEADER]: API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-session-token": useAuthStore.getState().sessionToken,
      },
      signal: abortSignal,
    });

    if (!response.ok) {
      useApplicationStore.getState().loading(false);
      if (abortSignal && abortSignal.aborted) return Promise.reject();

      const error: ErrorAPI = await response.json();
      return Promise.reject<HttpError>(new HttpError(response.status, error.detail));
    }

    const json = await response.json();
    const prompts = json.data as Prompt[];

    // fetch prompts from an API
    // Mocking...
    return new Promise((resolve) => {
      useApplicationStore.getState().loading(false);
      resolve(prompts);
      set({
        defaultPrompts: prompts,
      });
    });
  },

  /**
   * Prompt object
   */
  prompt: {
    title: "Custom",
    text: "",
  },

  /**
   *
   * @param text
   * @param title
   */
  setPrompt: (text: string, title?: string) => {
    set({
      prompt: {
        title: title || "Custom",
        text: text,
      },
    });
  },
  defaultPromptIndex: -1,
  selectDefaultPromptIndex: (index: number) => set({ defaultPromptIndex: index }),
}));
