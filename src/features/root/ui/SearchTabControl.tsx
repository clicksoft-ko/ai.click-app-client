import { useCurrentQueryKey } from "@/features/common/hooks";
import { TabType } from "@/shared/stores";
import { cn } from "@/shared/utils";
import { Button, DateRangePicker, Input } from "@/widgets/ui";
import { CustomRadio, RadioGroup } from "@/widgets/ui/radio";
import { useSearchTab } from "../hooks";
import { scrollClearCarousels } from "../lib";

interface Props {
  tabTypes: TabType[];
}

export const SearchTabControl = ({ tabTypes }: Props) => {
  const {
    tab,
    isPending,
    searchString,
    dateRange,
    showKeywords,
    setSearchString,
    setTab,
    setDateRange,
  } = useSearchTab();

  const { invalidateQuery } = useCurrentQueryKey();

  function onSearchStringChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (tab) setSearchString(tab, e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    invalidateQuery();
    scrollClearCarousels();
  }

  return (
    <div
      className={cn(
        "flex w-full justify-between gap-1 overflow-hidden border-b bg-white p-2",
        "flex-col sm:flex-row",
      )}
    >
      <RadioGroup
        className="flex gap-2 overflow-x-auto rounded border bg-gray-100 p-1"
        value={tab}
        onValueChange={(v) => setTab(v as TabType)}
      >
        {tabTypes.map((tab) => (
          <MedicalRadio key={tab} tab={tab} />
        ))}
      </RadioGroup>

      <form className="flex gap-1" onSubmit={handleSubmit}>
        {showKeywords && (
          <Input
            className="h-full min-w-20 max-w-36"
            placeholder="키워드 검색"
            value={searchString?.[tab ?? ""] ?? ""}
            onChange={onSearchStringChange}
          />
        )}
        <DateRangePicker
          defaultDateRange={dateRange}
          onDateChange={setDateRange}
        />
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
      className="min-w-16 rounded p-1 text-center hover:cursor-pointer hover:bg-slate-200"
      classNames={{
        checked: "border !bg-white",
      }}
      value={tab}
    >
      {tab}
    </CustomRadio>
  );
}
