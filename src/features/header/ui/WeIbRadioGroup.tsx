import { MedicalTab } from "@/features/root/enums";
import { Weib } from "@/shared/dto/socket-io";
import { useSearchStore } from "@/shared/stores";
import { CustomRadio, RadioGroup } from "@/widgets/ui/radio";
import { useMemo } from "react";

export const WeIbRadioGroup = () => {
  const tab = useSearchStore((state) => state.tab);
  const weib = useSearchStore((state) => state.weib);
  const setWeib = useSearchStore((state) => state.setWeib);
  const showWeib = useMemo(() => {
    return (
      tab === MedicalTab.처방 ||
      tab === MedicalTab.초진 ||
      tab === MedicalTab.검사
    );
  }, [tab]);

  if (!showWeib) return null;

  return (
    <RadioGroup
      className="flex gap-0.5"
      value={weib}
      onValueChange={(value) => setWeib(value as Weib)}
    >
      <WeibRadio weib={Weib.입원} />
      <WeibRadio weib={Weib.외래} />
      <WeibRadio weib={Weib.전체} />
    </RadioGroup>
  );
};

const WeibRadio = ({ weib }: { weib: Weib }) => {
  return (
    <CustomRadio
      value={weib}
      className="rounded border-2 px-2 text-gray-500"
      classNames={{ checked: "border-blue-400 !text-blue-500 font-bold" }}
    >
      {Weib[weib]}
    </CustomRadio>
  );
};
