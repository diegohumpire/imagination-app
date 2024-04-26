import classNames from "classnames";

interface PromptCardProps {
  title?: string;
  text?: string;
  selected?: boolean;
  loading?: boolean;
  handleClick?: () => void;
}

const PromptCard = ({ title, text, selected, loading, handleClick }: PromptCardProps) => {
  let sizeClass = classNames("w-full min-h-16 max-h-16 m-auto my-1 p-1 text-ellipsis");

  if (loading) {
    return <div className={classNames(sizeClass, "skeleton")}></div>;
  }

  const onClick = () => handleClick && handleClick();
  const isSelected = selected ? "bg-primary border-1 border-primary text-white" : "bg-white";

  return (
    <div
      className={classNames(
        sizeClass,
        "flex gap-1 rounded-md shadow-xl cursor-pointer border-2 border-solid",
        isSelected,
      )}
      onClick={onClick}>
      <p>
        <span className="font-bold">{title}: </span>
        <span className="">{text}</span>
      </p>
    </div>
  );
};

export default PromptCard;
