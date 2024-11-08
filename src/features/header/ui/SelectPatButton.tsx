import { usePatientStore } from "@/shared/stores";
import { cn } from "@/shared/utils";
import { GenderIcon } from "@/widgets/ui";
import { MdPersonSearch } from "react-icons/md";
import { SelectPatientProvider, useSelectPatient } from "../contexts";
import { SelectPatSheet } from "./SelectPatSheet";

export function SelectPatButton() {
  return (
    <SelectPatientProvider>
      <SelectPatButton_ />
    </SelectPatientProvider>
  );
}

function SelectPatButton_() {
  const { patient } = usePatientStore();
  const { setOpen } = useSelectPatient();

  return (
    <>
      <SelectPatSheet />
      <button className="flex items-center" onClick={() => setOpen(true)}>
        <div
          className={cn(
            "flex h-11 min-w-11 items-center justify-center rounded border border-primary/50 bg-white px-2 text-primary",
            "hover:bg-primary/10",
          )}
        >
          <MdPersonSearch className={cn("h-11 w-6", patient ? "mr-2" : "")} />
          {patient && (
            <div className="flex h-full flex-1 items-center">
              <div className="flex items-center">
                {patient.suName}
                <GenderIcon gender={patient.sex} />
              </div>
              <div className="mx-2 h-6 w-[1px] bg-slate-300" />

              <div className="py-1 text-sm">
                <div>{patient.formatedBirthday}</div>
                <div>{patient.yuhyungName}</div>
              </div>
            </div>
          )}
        </div>
      </button>
    </>
  );
}
