import classNames from "classnames";

interface PromptCardProps {
  text?: string;
  selected?: boolean;
  loading?: boolean;
  handleClick?: () => void;
}

const PromptCard = ({ text, selected, loading, handleClick }: PromptCardProps) => {
  let sizeClass = classNames("w-full min-h-16 max-h-16 m-auto my-1 p-2");

  if (loading) {
    return <div className={classNames(sizeClass, "skeleton")}></div>;
  }

  const onClick = () => handleClick && handleClick();
  const isSelected = selected ? "bg-primary border-1 border-primary text-white" : "bg-white";

  return (
    <div
      className={classNames(sizeClass, "card shadow-xl cursor-pointer border-2 border-solid", isSelected)}
      onClick={onClick}>
      {text}
    </div>
  );
};

export default PromptCard;
