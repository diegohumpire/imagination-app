import { useEffect } from "react";
import { usePromptStore } from "../stores/PromptStore";
import PromptCard from "./PromptCard";
import classNames from "classnames";

const PromptList = () => {
  const prompts = usePromptStore((state) => state.defaultPrompts);
  const fetchDefaultPrompts = usePromptStore((state) => state.fetchDefaultPrompts);
  const defaultPromptIndex = usePromptStore((state) => state.defaultPromptIndex);
  const selectDefaultPromptIndex = usePromptStore((state) => state.selectDefaultPromptIndex);
  const setPrompt = usePromptStore((state) => state.setPrompt);

  useEffect(() => {
    fetchDefaultPrompts();
  }, []);

  const maxPrompts = 6;
  let baseClassWrapper = classNames("flex flex-col gap-1");

  if (!prompts.length) {
    let skeletonPrompts = [];

    for (let i = 0; i < maxPrompts; i++) {
      skeletonPrompts.push(<PromptCard key={i} loading={true} />);
    }

    return <div className={baseClassWrapper}>{skeletonPrompts}</div>;
  }

  return (
    <div className={baseClassWrapper}>
      {prompts.map((prompt, index) => (
        <PromptCard
          key={index}
          selected={defaultPromptIndex === index}
          text={prompt.title}
          handleClick={() => {
            selectDefaultPromptIndex(index);
            setPrompt(prompt.text);
          }}
        />
      ))}
    </div>
  );
};

export default PromptList;
