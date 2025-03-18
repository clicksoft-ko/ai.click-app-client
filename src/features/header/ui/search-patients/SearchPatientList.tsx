import { InfiniteBodyWrapper } from "@/features/root/ui";
import { Weib } from "@/shared/dto/socket-io";
import { PathTypeKey } from "@/shared/hooks/types";
import { useSearchStore } from "@/shared/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelectPatient } from "../../contexts";
import { useInfiniteSelectPat } from "../../hooks";
import { PatBox } from "./PatBox";
import { PatSearchInput } from "./PatSearchInput";

const SearchPatientList = () => {
  const queryClient = useQueryClient();
  const { open, loadPatient } = useSelectPatient();
  const [weib, setWeib] = useState(Weib.입원);
  const [searchString, setSearchString] = useState("");
  const { data, refetch, ...result } = useInfiniteSelectPat({
    enabled: open,
    searchString,
    weib,
  });
  const setPatientSort = useSearchStore((state) => state.setPatientSort);

  return (
    <>
      <PatSearchInput
        className="py-1"
        weib={weib}
        onChange={setSearchString}
        onWeibChagne={(weib) => {
          queryClient.removeQueries({
            queryKey: ["getPatients" as PathTypeKey],
          });
          setWeib(weib);
          setPatientSort(weib === Weib.입원 ? "ward" : "chart");
        }}
      />
      <InfiniteBodyWrapper className="flex-1 overflow-y-auto pr-1" {...result}>
        {data?.map((patient) => (
          <PatBox
            key={patient!.id}
            patient={patient!}
            onClick={loadPatient.bind(null, patient!)}
          />
        ))}
      </InfiniteBodyWrapper>
    </>
  );
};

export default SearchPatientList;
