interface PromptCardProps {
  title?: string;
  text?: string;
  selected?: boolean;
  loading?: boolean;
  handleClick?: () => void;
}

const PromptCard = ({ title, text, selected, loading, handleClick }: PromptCardProps) => {
  if (loading) {
    return <div className="skeleton w-96 h-48"></div>;
  }
  const onClick = () => handleClick && handleClick();

  const isSelected = selected ? " bg-cyan-200 border-1 border-cyan-500" : "";

  return (
    <div className={"card w-96 bg-cyan-50 shadow-xl m-auto cursor-pointer" + isSelected} onClick={onClick}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PromptCard;
