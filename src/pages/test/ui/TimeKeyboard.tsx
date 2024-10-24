import { useState } from "react";
import { TimeSelector } from "./TimeSelector";

export const TimeKeyboard = () => {
  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();

  return (
    <div className="flex w-full justify-center p-2 shadow-2xl">
      <div className="flex space-x-4">
        <TimeSelector label="시" range={23} value={hour} onChange={setHour} />
        <TimeSelector
          label="분"
          range={59}
          value={minute}
          onChange={setMinute}
        />
      </div>
    </div>
  );
};
