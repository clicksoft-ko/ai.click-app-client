import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { DragHandleWrapper, SortableItem } from "./SortableComponents";
import { SortableOverlay } from "./SortableOverlay";
import { ClassNameProps } from "@/shared/interfaces/props";

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(args: { items: T[]; startIndex: number; endIndex: number }): void;
  renderItem(item: T, index: number): ReactNode;
}

export function SortableList<T extends BaseItem>({
  items,
  className,
  onChange,
  renderItem,
}: Props<T> & ClassNameProps) {
  const [active, setActive] = useState<Active | null>(null);
  const activeObject = useMemo(() => {
    const activeIndex = items.findIndex((item) => item.id === active?.id);
    if (activeIndex < 0) return;
    const activeItem = items[activeIndex];

    return { activeIndex, activeItem };
  }, [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);
          const changedItems = arrayMove(items, activeIndex, overIndex);
          const startIndex = Math.min(activeIndex, overIndex);
          const endIndex = Math.max(activeIndex, overIndex);

          onChange({ items: changedItems, startIndex, endIndex });
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <div className={className} role="application">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </div>
      </SortableContext>
      <SortableOverlay>
        {activeObject
          ? renderItem(activeObject.activeItem, activeObject.activeIndex)
          : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandleWrapper = DragHandleWrapper;
