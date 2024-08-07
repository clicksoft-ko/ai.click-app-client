import { useSearchString } from "@/features/root/hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { useProgressNote } from "../hooks";
import { ProgressNoteBox } from "./ProgressNoteBox";

export const ProgressNoteBody = () => {
  const { data, ...result } = useProgressNote();
  const {searchString} =  useSearchString()
  const components = data?.map((p) => (
    <ProgressNoteBox
      key={p.id}
      progressNote={p}
      searchString={searchString}
    />
  ));
  
  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};
