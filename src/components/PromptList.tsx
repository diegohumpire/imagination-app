import { useEffect, useState } from "react";
import { usePromptStore } from "../stores/PromptStore";
import PromptCard from "./PromptCard";

const PrompsList = () => {
  const prompts = usePromptStore((state) => state.defaultPrompts);
  const fetchDefaultPrompts = usePromptStore((state) => state.fetchDefaultPrompts);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number | null>(null);

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
