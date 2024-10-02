import { Patient, Weib } from "@/shared/dto/socket-io";
import { useScrollHandler } from "@/shared/hooks";
import { OpenProps } from "@/shared/interfaces/props";
import { usePatientStore } from "@/shared/stores";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/widgets/ui";
import { useEffect, useState } from "react";
import { useInfiniteSelectPat } from "../hooks";
import { PatSearchInput } from "./PatSearchInput";
import { PatBox } from "./PatBox";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { useQueryClient } from "@tanstack/react-query";
import { PathTypeKey } from "@/shared/hooks/types";
import { scrollClearCarousels } from "@/features/root/lib";

interface Props extends OpenProps {}

export const SelectPatSheet = ({ open, setOpen }: Props) => {
  const queryClient = useQueryClient();
  const { setPatientInfo } = usePatientStore();
  const [weib, setWeib] = useState(Weib.입원);
  const [searchString, setSearchString] = useState("");
  const { targetRef, scrollToTop } = useScrollHandler<HTMLDivElement>();
  const { data, refetch, ...result } = useInfiniteSelectPat({
    enabled: open,
    searchString,
    weib,
  });

  useEffect(() => {
    scrollToTop();
  }, [searchString, weib]);

  useEffect(() => {
    if (open) {
      setSearchString("");
    }
  }, [open]);

  function handleSelectPatient(patient: Patient): void {
    scrollClearCarousels();
    setPatientInfo(patient);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent ref={targetRef} className="min-w-[70%] overflow-auto p-0">
        <SheetHeader className="sticky top-0 z-10 bg-white p-4">
          <SheetTitle>인적사항 조회</SheetTitle>
          <SheetDescription>인적사항을 조회하고 선택하세요.</SheetDescription>
          <PatSearchInput
            weib={weib}
            onChange={setSearchString}
            onWeibChagne={(weib) => {
              queryClient.removeQueries({
                queryKey: ["getPatients" as PathTypeKey],
              });
              setWeib(weib);
            }}
          />
        </SheetHeader>

        <InfiniteBodyWrapper className="px-4 pb-4" {...result}>
          {data?.map((patient) => (
            <PatBox
              key={patient!.id}
              patient={patient!}
              onClick={handleSelectPatient.bind(null, patient!)}
            />
          ))}
        </InfiniteBodyWrapper>
      </SheetContent>
    </Sheet>
  );
};
