import { create } from "zustand";
import { useApplicationStore } from "./ApplicationStore";

type Prompt = {
  title: string;
  text: string;
};

type PromptResultType = "image" | "text" | "video" | "audio";

type Image = {
  url: string;
  sizeString: string;
  size: {
    width: number;
    height: number;
  };
};

type Result = {
  inputPrompt: string;
  result: {
    type: PromptResultType;
    data: Image;
  };
};

interface PromptStoreState {
  defaultPrompts: Prompt[];
  fetchDefaultPrompts: () => Promise<Prompt[]>;
  prompt: Prompt;
  setPrompt(text: string, title?: string): void;
  defaultPromptIndex: number;
  selectDefaultPromptIndex(index: number): void;
  processPrompt(): Promise<Result>;
  result: Result | null;
  resetResult(): void;
}

export const usePromptStore = create<PromptStoreState>((set, get) => ({
  defaultPrompts: [],
  fetchDefaultPrompts: () => {
    // Set loading state in true from ApplicationStore
    useApplicationStore.getState().loading(true);
    set({ defaultPrompts: [], defaultPromptIndex: -1 });

    // fetch prompts from an API
    // Mocking...
    return new Promise((resolve) => {
      const prompts: Prompt[] = [
        {
          title: "Prompt 1 - lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
          text: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Prompt 2 - lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
          text: "2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Prompt 3 - lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
          text: "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Prompt 4 - lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
          text: "4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Prompt 5 - lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
          text: "5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Prompt 6 - lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
          text: "6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
      ];

      setTimeout(() => {
        useApplicationStore.getState().loading(false);
        resolve(prompts);
        set({
          defaultPrompts: prompts,
        });
      }, 2000);
    });
  },
  prompt: {
    title: "Custom",
    text: "",
  },
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
  processPrompt: async () => {
    const prompt = get().prompt;
    console.log("Processing prompt:", prompt);

    // Do something with the prompt
    // Mocking...
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Prompt processed");
        const response: Result = {
          inputPrompt: prompt.text,
          result: {
            type: "image",
            data: {
              url: "https://via.placeholder.com/512x512",
              sizeString: "512x512",
              size: {
                width: 1024,
                height: 320,
              },
            },
          },
        };
        resolve(response);
        set({ result: response });
      }, 2000);
    });
  },
  result: null,
  resetResult: () => set({ result: null }),
}));
