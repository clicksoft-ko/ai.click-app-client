import { useEffect, useRef, useState } from "react";
import { TimeSelector } from "./TimeSelector";

interface TimeKeyboardProps {
  timeValue: string;
  onValueChange: (time: string) => void;
  showKeyboard: boolean;
  onNext: () => void;
}

export const TimeKeyboard = ({
  timeValue,
  onValueChange,
  onNext,
  showKeyboard,
}: TimeKeyboardProps) => {
  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();

  useEffect(() => {
    if (showKeyboard) {
      setHour(parseInt(timeValue.slice(0, 2)));
      setMinute(parseInt(timeValue.slice(2)));
    }
  }, [showKeyboard]);

  function handleValueChange(hour: number, minute: number): void {
    onValueChange(
      `${String(hour).padStart(2, "0")}${String(minute).padStart(2, "0")}`,
    );
  }

  function handleMinuteChange(value: number | undefined): void {
    setMinute(value);
    handleValueChange(hour!, value!);
    onNext();
  }

  function handleHourChange(value: number | undefined): void {
    setHour(value);
    handleValueChange(value!, minute!);
  }

  return (
    <div className="flex w-full justify-center p-2 shadow-2xl">
      <div className="flex space-x-4">
        <TimeSelector
          label="시"
          range={{ min: 1, max: 23 }}
          value={hour}
          onChange={handleHourChange}
        />
        <TimeSelector
          label="분"
          range={{ min: 0, max: 59 }}
          value={minute}
          onChange={handleMinuteChange}
        />
      </div>
    </div>
  );
};
