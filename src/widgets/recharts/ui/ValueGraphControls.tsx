import { useState } from "react";
import {
  ItemWithDetails,
  TitleValueGraph,
  TitleValueGraphProps,
} from "./TitleValueGraph";
import { GraphFloatButton } from "@/widgets/buttons";

export function ValueGraphControls<T extends ItemWithDetails>({
  items,
  xName,
}: TitleValueGraphProps<T>) {
  const [shown, setShown] = useState(false);

  return (
    <>
      {!shown && (
        <GraphFloatButton
          onClick={() => {
            setShown((p) => !p);
          }}
        />
      )}
      {shown && (
        <TitleValueGraph
          xName={xName}
          items={items}
          onClose={() => setShown(false)}
        />
      )}
    </>
  );
}
