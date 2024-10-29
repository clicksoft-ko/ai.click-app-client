import { GoGraph } from "react-icons/go";
import { FloatButton } from "./FloatButton";

interface GraphFloatButtonProps {
  onClick: () => void;
}
export const GraphFloatButton = ({ onClick }: GraphFloatButtonProps) => {
  return (
    <FloatButton onClick={onClick} icon={<GoGraph className="text-white" />} />
  );
};
