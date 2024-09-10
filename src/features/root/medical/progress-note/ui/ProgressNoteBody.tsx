import { useComponents, useSearchString } from "@/features/root/hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { useProgressNote } from "../hooks";
import { ProgressNoteBox } from "./ProgressNoteBox";

export const ProgressNoteBody = () => {
  const { data, ...result } = useProgressNote();
  const { searchString } = useSearchString();
  const { components } = useComponents({
    data,
    element: (v) => (
      <ProgressNoteBox
        key={v.id}
        progressNote={v}
        searchString={searchString}
      />
    ),
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};
