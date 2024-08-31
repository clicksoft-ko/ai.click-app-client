import { TabType, useMedicalStore } from "@/shared/stores";
import { Button, DateRangePicker, Input } from "@/widgets/ui";
import { CustomRadio, RadioGroup } from "@/widgets/ui/radio";
import { MedicalTab, WardTab } from "../enums";
import { useQueryClient } from "@tanstack/react-query";
import { PathTypeKey } from "@/shared/hooks/types";

const queryObj: {
  [key: string]: PathTypeKey;
} = {
  [MedicalTab.처방]: "getPrescriptions",
  [MedicalTab.초진]: "getFirstCharts",
  [MedicalTab.경과]: "getProgressNotes",

  [WardTab.간호]: "getNursingRecords",
  [WardTab.Vital]: "getVitalSigns",
};

interface Props {
  tabTypes: TabType[];
}
export const SearchTabControl = ({ tabTypes }: Props) => {
  const tab = useMedicalStore((state) => state.tab);
  const isPending = useMedicalStore((state) => state.isPending);
  const searchString = useMedicalStore((state) => state.searchString);
  const setSearchString = useMedicalStore((state) => state.setSearchString);
  const setTab = useMedicalStore((state) => state.setTab);
  const setDateRange = useMedicalStore((state) => state.setDateRange);
  const queryClient = useQueryClient();

  function onSearchStringChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (tab) setSearchString(tab, e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    window.scrollTo({ top: 0 });
    if (tab) {
      const key = queryObj[tab];
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    }
  }

  return (
    <div className="sticky top-14 flex justify-between gap-1 border-b bg-white p-2">
      <RadioGroup
        className="flex gap-2 rounded border bg-gray-100 p-1"
        value={tab}
        onValueChange={(v) => {
          setTab(v as MedicalTab);
        }}
      >
        {tabTypes.map((tab) => (
          <MedicalRadio key={tab} tab={tab} />
        ))}
      </RadioGroup>

      <form className="flex gap-1" onSubmit={handleSubmit}>
        <Input
          className="h-full w-36"
          placeholder="키워드 검색"
          value={searchString?.[tab ?? ""] ?? ""}
          onChange={onSearchStringChange}
        />
        <DateRangePicker onDateChange={setDateRange} />
        <Button type="submit" disabled={isPending} className="h-full">
          조회
        </Button>
      </form>
    </div>
  );
};

interface MedicalRadioProps {
  tab: TabType;
}

function MedicalRadio({ tab }: MedicalRadioProps) {
  return (
    <CustomRadio
      className="min-w-20 rounded p-1 text-center hover:cursor-pointer hover:bg-slate-200"
      classNames={{
        checked: "border !bg-white",
      }}
      value={tab}
    >
      {tab}
    </CustomRadio>
  );
}
