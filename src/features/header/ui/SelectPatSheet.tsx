import { useSettingsStore } from "@/shared/stores";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Switch,
} from "@/widgets/ui";
import { useSelectPatient } from "../contexts";
import SearchPatientList from "./search-patients/SearchPatientList";
import SearchWardList from "./search_wards/SearchWardList";

export const SelectPatSheet = () => {
  const { open, setOpen } = useSelectPatient();
  const { defaultSearch, setDefaultSearch } = useSettingsStore();
  const isWardView = defaultSearch === "wards";
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex min-w-[70%] flex-col overflow-hidden p-0">
        <SheetHeader className="sticky top-0 z-10 bg-white p-4 pb-0">
          <SheetTitle className="relative flex items-center gap-2">
            <span className="min-w-28">
              {isWardView ? "병실현황판" : "인적사항 조회"}
            </span>
            <Switch
              checked={isWardView}
              onCheckedChange={(checked) =>
                setDefaultSearch(checked ? "wards" : "patients")
              }
            />
          </SheetTitle>
          <SheetDescription>인적사항을 조회하고 선택하세요.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden px-2 pb-2">
          {isWardView ? <SearchWardList /> : <SearchPatientList />}
        </div>
      </SheetContent>
    </Sheet>
  );
};
