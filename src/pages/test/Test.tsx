import { VsMenuNameItem } from "@/features/root/ward/vital-sign/vs-input-settings/types";
import { SortableList } from "@/widgets/dnd-kit";
import { useState } from "react";

export const TestPage = () => {
  const [menuNames, setMenuNameList] = useState<VsMenuNameItem[]>([
    { id: "hyulap2", text: "1" },
    { id: "hyulap1", text: "2" },
  ]);

  return (
    <div>
      <SortableList
        items={menuNames}
        className="grid grid-cols-4"
        onChange={({ items }) => setMenuNameList(items)}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <div>
              <SortableList.DragHandleWrapper>
                <div>dasda</div>
              </SortableList.DragHandleWrapper>
              dasdsajkdsakl asdaksda
            </div>
          </SortableList.Item>
        )}
      />
    </div>
  );
};
