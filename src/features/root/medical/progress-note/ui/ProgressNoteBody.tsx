import { useComponents } from "@/features/root/hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { useProgressNote } from "../hooks";
import { ProgressNoteBox } from "./ProgressNoteBox";

export const ProgressNoteBody = () => {
  const { data, ...result } = useProgressNote();
  const { components } = useComponents({
    data,
    element: (v) => (
      <ProgressNoteBox
        key={v.id}
        progressNote={v}
      />
    ),
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};
