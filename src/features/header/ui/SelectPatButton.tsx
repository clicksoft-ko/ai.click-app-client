import { cn } from "@/shared/utils";
import { GenderIcon } from "@/widgets/ui";
import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { SelectPatSheet } from "./SelectPatSheet";
import { usePatientStore } from "@/shared/stores";

interface SelectPatButtonProps {}

export function SelectPatButton({}: SelectPatButtonProps) {
  const { patient } = usePatientStore();
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen(true);
  }

  return (
    <>
      <SelectPatSheet open={open} setOpen={setOpen} />
      <button className="flex items-center" onClick={handleClick}>
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
