import { Weib } from "@/shared/dto/socket-io";
import { ClassNameProps } from "@/shared/interfaces/props";
import { useSearchStore } from "@/shared/stores";
import { PatientSort } from "@/shared/types";
import { cn } from "@/shared/utils";
import {
  Input,
  Select,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  ToggleGroup,
  ToggleGroupItem,
} from "@/widgets/ui";
import { Search } from "lucide-react";
import { useState } from "react";

interface Props extends ClassNameProps {
  weib: Weib;
  onChange: (value: string) => void;
  onWeibChagne: (weib: Weib) => void;
}

let timeout: any = null;
export function PatSearchInput({
  weib,
  className,
  onChange,
  onWeibChagne,
}: Props) {
  const [text, setText] = useState("");
  const patientSort = useSearchStore((state) => state.patientSort);
  const setPatientSort = useSearchStore((state) => state.setPatientSort);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setText(e.target.value);

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(e.target.value);
    }, 300);
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Select
        value={patientSort}
        onValueChange={(v) => setPatientSort(v as PatientSort)}
      >
        <SelectTrigger className="w-[8rem]">
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-sm text-blue-500">정렬</SelectLabel>
            {weib === Weib.입원 && <SelectItem value="ward">병동순</SelectItem>}
            <SelectItem value="chart">차트순</SelectItem>
            <SelectItem value="name">이름순</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        value={text}
        onChange={handleChange}
        wrapperClassName="flex-1"
        autoFocus
        startComponent={<Search className="ml-2 text-gray-500" />}
      />
      <ToggleGroup
        value={weib.toString()}
        onValueChange={(v) => {
          if (!v) return;
          onWeibChagne(parseInt(v));
        }}
        type="single"
        variant={"outline"}
      >
        <ToggleGroupItem
          className="whitespace-nowrap"
          value={Weib.입원.toString()}
          aria-label="입원"
        >
          입원
        </ToggleGroupItem>
        <ToggleGroupItem
          className="whitespace-nowrap"
          value={Weib.전체.toString()}
          aria-label="전체"
        >
          전체
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
