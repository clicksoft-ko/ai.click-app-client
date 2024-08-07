import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { RadioGroupContext, RadioValueType } from "./provider";
import { useEffect, useRef, useState } from "react";

interface RadioGroupProps extends ChildrenClassNameProps {
  value: RadioValueType;
  onValueChange: (value: RadioValueType) => void;
}
export const RadioGroup = ({
  value: radioValue,
  children,
  className,
  onValueChange,
}: RadioGroupProps) => {
  const [value, setValue] = useState<RadioValueType>(radioValue);
  const isInit = useRef(true);

  useEffect(() => {
    if (isInit.current) return;

    setValue(radioValue);
  }, [radioValue]);

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }
    onValueChange(value);
  }, [value]);

  return (
    <RadioGroupContext.Provider value={{ value, setValue: setValue }}>
      <div className={className}>{children}</div>
    </RadioGroupContext.Provider>
  );
};