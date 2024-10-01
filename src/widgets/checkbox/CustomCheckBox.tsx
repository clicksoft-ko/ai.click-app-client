import { cn } from "@/shared/utils";
import { Checkbox } from "@/widgets/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";

interface CustomCheckBoxProps extends CheckboxProps {}

export const CustomCheckBox = ({
  id,
  className,
  children,
  ...props
}: CustomCheckBoxProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox id={id} {...props} />
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-500 peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
};
