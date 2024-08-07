import {
  ChildrenClassNameProps
} from "@/shared/interfaces/props";
import { createContext, useState } from "react";

export type RadioValueType = string | number | undefined;

interface RadioGroupState {
  value: RadioValueType;
}

interface RadioGroupAction {
  setValue: (value: RadioValueType) => void;
}

const initValue = { value: undefined, setValue: () => {} };

export type RadioGroupType = RadioGroupState & RadioGroupAction;
export const RadioGroupContext = createContext<RadioGroupType>(initValue);

export function RadioGroupProvider({
  children,
  className,
}: ChildrenClassNameProps) {
  const [value, setValue] = useState<RadioValueType>();
  return (
    <RadioGroupContext.Provider value={{ value, setValue: setValue }}>
      <div className={className}>{children}</div>
    </RadioGroupContext.Provider>
  );
}
