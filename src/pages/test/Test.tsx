import { VsMenuNameItem } from "@/features/root/ward/vital-sign/vs-input-settings/types";
import { FloatButton } from "@/widgets/buttons";
import { SortableList } from "@/widgets/dnd-kit";
import { Switch } from "@/widgets/ui";
import { useState } from "react";
import { GoGraph } from "react-icons/go";

export const TestPage = () => {
  const [menuNames, setMenuNameList] = useState<VsMenuNameItem[]>([
    { id: "hyulap2", text: "1" },
    { id: "hyulap1", text: "2" },
  ]);

  return (
    <div className="flex items-center gap-1">
      <label htmlFor="switch">한방</label>
      <Switch id="switch"></Switch>
      <FloatButton
        className="text-sm font-normal text-white"
        onClick={() => {}}
        icon={"한방"}
      />
    </div>
  );
};
