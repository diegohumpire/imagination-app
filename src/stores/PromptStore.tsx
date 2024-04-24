import { create } from "zustand";
import { useApplicationStore } from "./ApplicationStore";

type Prompt = {
  title: string;
  text: string;
};

interface PromptStoreState {
  defaultPrompts: Prompt[];
  fetchDefaultPrompts: () => Promise<Prompt[]>;
  prompt: Prompt;
  setPrompt(text: string): void;
  defaultPromptIndex: number;
  selectDefaultPromptIndex(index: number): void;
}

export const usePromptStore = create<PromptStoreState>((set) => ({
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
  setPrompt: (text: string) => {
    set({
      prompt: {
        title: "Custom",
        text: text,
      },
    });
  },
  defaultPromptIndex: -1,
  selectDefaultPromptIndex: (index: number) => set({ defaultPromptIndex: index }),
}));
