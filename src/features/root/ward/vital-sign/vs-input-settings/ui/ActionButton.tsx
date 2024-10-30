interface ActionButtonProps {
  type: "add" | "delete";
  onClick: () => void;
}
export const ActionButton = ({ type, onClick }: ActionButtonProps) => {
  const buttonStyle = type === "add"
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-red-500 hover:bg-red-600";

  return (
    <button
      className={`rounded px-2 py-1 text-sm text-white ${buttonStyle}`}
      onClick={onClick}
    >
      {type === "add" ? "추가" : "삭제"}
    </button>
  );
};
