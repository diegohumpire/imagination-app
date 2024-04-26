import { create } from "zustand";
import { usePromptStore } from "./PromptStore";
import { useAuthStore } from "./AuthStore";
import { HttpError } from "../errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_IMAGES_URL = `${API_BASE_URL}/imagine/images`;
const API_KEY_HEADER = import.meta.env.VITE_API_KEY_HEADER as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

type PromptResultType = "image" | "text" | "video" | "audio";

type Image = {
  url: string;
  sizeString: string;
  size: {
    width: number;
    height: number;
  };
};

type ImageResult = {
  type: PromptResultType;
  data: Image;
};

type Result = {
  inputPrompt: string;
  result: ImageResult;
};

interface ImageStoreState {
  processImage(abortSignal?: AbortSignal): Promise<Result | HttpError>;
  result: Result | null;
  resetResult(): void;
  getImagesBySessionToken(sessionToken: string, abortSignal?: AbortSignal): Promise<ImageResult[] | HttpError>;
}

export const useImageStore = create<ImageStoreState>((set, _) => ({
  processImage: async (abortSignal?: AbortSignal) => {
    const prompt = usePromptStore.getState().prompt;
    console.log("Processing prompt:", prompt);

    const response = await fetch(API_IMAGES_URL, {
      method: "POST",
      headers: {
        [API_KEY_HEADER]: API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-session-token": useAuthStore.getState().sessionToken,
      },
      signal: abortSignal,
      body: JSON.stringify({ prompt: prompt.text }),
    });

    if (!response.ok) {
      if (abortSignal && abortSignal.aborted) return Promise.reject();

      const error: ErrorAPI = await response.json();
      return Promise.reject<HttpError>(new HttpError(response.status, error.detail));
    }

    const json = (await response.json()) as Result;
    console.log("Prompt processed", json);

    set({ result: json });

    return Promise.resolve<Result>(json);
  },
  result: null,
  resetResult: () => set({ result: null }),
  getImagesBySessionToken: async (sessionToken: string, abortSignal?: AbortSignal) => {
    if (!sessionToken) return Promise.reject("No session token provided");

    const response = await fetch(API_IMAGES_URL, {
      method: "GET",
      headers: {
        [API_KEY_HEADER]: API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-session-token": sessionToken,
      },
      signal: abortSignal,
    });

    if (!response.ok) {
      if (abortSignal && abortSignal.aborted) return Promise.reject();

      const error: ErrorAPI = await response.json();
      return Promise.reject<HttpError>(new HttpError(response.status, error.detail));
    }

    const json = await response.json();
    const images = json.data as ImageResult[];

    return Promise.resolve<ImageResult[]>(images);
  },
}));
