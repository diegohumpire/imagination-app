import { useEffect } from "react";
import { usePromptStore } from "../stores/PromptStore";
import PromptCard from "./PromptCard";

interface PrompsListProps {
  selectedPromptIndex: number | null;
  setSelectedPromptIndex: (index: number) => void;
}

const PrompsList = ({ selectedPromptIndex, setSelectedPromptIndex }: PrompsListProps) => {
  const prompts = usePromptStore((state) => state.defaultPrompts);
  const fetchDefaultPrompts = usePromptStore((state) => state.fetchDefaultPrompts);

  useEffect(() => {
    fetchDefaultPrompts();
  }, []);

  const maxPrompts = 6;

  if (!prompts.length) {
    let skeletonPrompts = [];

    for (let i = 0; i < maxPrompts; i++) {
      skeletonPrompts.push(<PromptCard key={i} loading={true} />);
    }

    return <>{skeletonPrompts}</>;
  }

  return (
    <>
      {prompts.map((prompt, index) => (
        <PromptCard
          key={index}
          selected={selectedPromptIndex === index}
          title={prompt.title || "Prompt " + (index + 1)}
          text={prompt.text}
          handleClick={() => setSelectedPromptIndex(index)}
        />
      ))}
    </>
  );
};

export default PrompsList;
