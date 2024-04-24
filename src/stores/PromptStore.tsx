import { create } from "zustand";
import { useApplicationStore } from "./ApplicationStore";

type Prompt = {
  title?: string;
  text: string;
};

interface PromptStoreState {
  defaultPrompts: Prompt[];
  fetchDefaultPrompts: () => Promise<Prompt[]>;
  customPrompt: Prompt;
  setCustomPrompt(text: string): void;
  selectedPrompt: Prompt | null;
}

export const usePromptStore = create<PromptStoreState>((set) => ({
  defaultPrompts: [],
  fetchDefaultPrompts: () => {
    // Set loading state in true from ApplicationStore
    useApplicationStore.getState().loading(true);

    // fetch prompts from an API
    // Mocking...
    return new Promise((resolve) => {
      const prompts: Prompt[] = [
        {
          title: "Card title 1",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Card title 2",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Card title 3",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Card title 4",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Card title 5",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
        },
        {
          title: "Card title 6",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
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
  customPrompt: {
    title: "Custom Prompt",
    text: "",
  },
  setCustomPrompt: (text: string) => set({ customPrompt: { text } }),
  selectedPrompt: null,
}));
