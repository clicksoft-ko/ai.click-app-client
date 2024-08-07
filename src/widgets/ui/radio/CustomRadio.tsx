import { cn } from "@/shared/utils";
import { useRadioGroup } from "./hooks";
import { RadioValueType } from "./provider";

export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  value: RadioValueType;
  classNames: {
    checked: string;
    unChecked?: string;
  };
}

export const CustomRadio = ({
  value: radioValue,
  className,
  classNames,
  children,
  ...props
}: RadioProps) => {
  const { value, setValue } = useRadioGroup();
  const isSelected = value === radioValue;

  function handleChange() {
    setValue(radioValue);
  }

  return (
    <label
      className={cn(
        "flex min-h-4 min-w-4 items-center justify-center",
        isSelected ? classNames.checked : classNames.unChecked,
        className,
      )}
    >
      <input
        className={"no-radio"}
        type="radio"
        checked={isSelected}
        onChange={handleChange}
        {...props}
      />
      {children}
    </label>
  );
};
